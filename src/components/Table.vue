<template>
	<template v-if="propDataSet?.isAttendance">
		<div class="table-header">
			<q-space></q-space>
			<q-btn class="app-btn" color="grey" outline @click="excelDown" :disable="lastPage === 0"> Excel로 추출 </q-btn>
		</div>
		<q-table
			flat
			bordered
			:rows="propDataSet.list"
			:columns="propDataSet.columnList"
			v-model:pagination="pagination"
			hide-pagination
			row-key="rowNum"
			:table-class="'common-table'"
			:no-data-label="'데이터를 찾을 수 없습니다'"
		>
			<template v-slot:header="props">
				<q-tr :props="props">
					<q-th v-for="col in props.cols" :key="col.name" :props="props">
						<template v-if="col.label == '날짜' || col.label == '이름'">
							<div @click="sortTable(col.field)" style="cursor: pointer">
								{{ col.label }}
							</div>
						</template>
						<template v-else>
							{{ col.label }}
						</template>
					</q-th>
				</q-tr>
			</template>

			<template v-slot:body="props" v-if="authStore.user.permission">
				<q-tr class="cursor-pointer" :props="props">
					<template v-if="props.row.holidayName === null">
						<q-td v-for="col in props.cols" :key="col.name" :props="props" @click="updateModal(true, props)">
							{{ col.value }}
						</q-td>
					</template>
					<template v-else>
						<template v-if="props.row.holidayName === '토요일'">
							<q-td v-for="col in props.cols" :key="col.name" :props="props" @click="updateModal(true, props)">
								<template v-if="col.field === 'registerDate'">
									<div style="color: blue">{{ col.value }}</div>
								</template>
								<template v-else>
									{{ col.value }}
								</template>
							</q-td>
						</template>
						<template v-else>
							<q-td v-for="col in props.cols" :key="col.name" :props="props" @click="updateModal(true, props)">
								<template v-if="col.field === 'registerDate'">
									<div style="color: rgb(245, 70, 48)">{{ col.value }}</div>
								</template>
								<template v-else>
									{{ col.value }}
								</template>
							</q-td>
						</template>
					</template>
				</q-tr>
			</template>

			<template v-slot:body="props" v-else>
				<q-tr :props="props">
					<q-td v-for="col in props.cols" :key="col.name" :props="props">
						{{ col.value }}
					</q-td>
				</q-tr>
			</template>
			<template v-slot:no-data="{ message }">
				<div class="no-data full-width row flex-center text-grey-6">
					<q-icon size="24px" name="icon-warning-alt" class="m-r-12" />
					<span class="message">
						{{ message }}
					</span>
				</div>
			</template>
		</q-table>
		<div class="app-pagination-wrapper flex items-center justify-between">
			<div class="page-info">Total {{ propDataSet.total }}</div>
			<div class="page-number flex items-center">
				<q-btn
					class="app-btn btn-basic btn-ghost-black btn-only-icon btn-small"
					flat
					:disable="pagination.page === 1"
					@click="emitPageData(1)"
				>
					<em class="icon-first-page"></em>
				</q-btn>
				<q-btn
					class="app-btn btn-basic btn-ghost-black btn-only-icon btn-small"
					flat
					:disable="pagination.page === 1"
					@click="emitPageData(pagination.page - 1)"
				>
					<em class="icon-chevron-left"></em>
				</q-btn>

				<q-pagination
					class="pagination-num ml-8 mr-8"
					v-model="pagination.page"
					:max="lastPage"
					:max-pages="9"
					:ellipses="true"
					@click="emitPageData(pagination.page)"
				/>
				<q-btn
					class="app-btn btn-basic btn-ghost-black btn-small btn-only-icon"
					flat
					:disable="pagination.page === lastPage || lastPage === 0"
					@click="emitPageData(pagination.page + 1)"
				>
					<em class="icon-chevron-right"></em>
				</q-btn>

				<q-btn
					class="app-btn btn-basic btn-ghost-black btn-only-icon btn-small"
					flat
					:disable="pagination.page === lastPage || lastPage === 0"
					@click="emitPageData(lastPage)"
				>
					<em class="icon-last-page"></em>
				</q-btn>
			</div>
			<div class="page-option flex items-center">
				<q-select
					class="app-input input-select input-small"
					outlined
					dropdown-icon="icon-keyboard-arrow-down"
					v-model="pagination.rowsPerPage"
					:options="pagination.option"
					popup-content-class="select-popup small-select-popup"
					@update:model-value="updatePage"
					:disable="lastPage === 0"
				>
					<template v-slot:selected>
						<template v-if="pagination.rowsPerPage">
							{{ pagination.rowsPerPage }}
						</template>
						<template v-else> 선택하세요 </template>
					</template>
				</q-select>
			</div>
		</div>

		<q-dialog v-model="commuteUpdateModal" class="dialog-wrapper">
			<q-card>
				<q-card-section class="row items-center">
					<p class="q-ml-sm">출퇴근시간 변경</p>
				</q-card-section>
				<q-card-section>
					이름
					<q-input v-model="employeeData.nameKr" class="app-input input-medium" outlined readonly />
				</q-card-section>
				<q-card-section>
					출근일 <q-input v-model="employeeData.registerDate" class="app-input input-medium" outlined readonly />
				</q-card-section>
				<q-card-section>
					출근시간
					<q-input
						v-model="employeeData.startDate"
						mask="time"
						:rules="['time']"
						class="app-input input-medium"
						outlined
						placeholder="입력하세요"
					/>
				</q-card-section>
				<q-card-section>
					퇴근일
					<q-btn class="app-input-picker input-picker-medium" flat>
						<em class="icon-calendar-today"></em>
						<span class="picker-text">
							{{ input.duration.to ? getEndDateView(input.duration.to) : '기간을 선택하세요' }}
						</span>
						<q-popup-proxy transition-show="scale" transition-hide="scale">
							<q-date minimal v-model="input.duration.to" mask="YYYY-MM-DD" @update:model-value="endDurationPicker">
								<div class="row items-center justify-end">
									<q-btn v-close-popup label="닫기" flat />
								</div>
							</q-date>
						</q-popup-proxy>
					</q-btn>
				</q-card-section>
				<q-card-section>
					퇴근시간
					<q-input
						v-model="employeeData.endDate"
						mask="time"
						:rules="['time']"
						class="app-input input-medium"
						outlined
						placeholder="입력하세요"
					/>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn
						flat
						label="등록"
						color="primary"
						@click="updateAdminCommute"
						:disabled="input.duration.to.length === 0 || employeeData.startDate.length < 5 || employeeData.endDate.length < 5"
					/>
					<q-btn flat label="취소" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</template>

	<template v-else>
		<q-table
			flat
			bordered
			:rows="propDataSet?.list"
			:columns="propDataSet?.columnList"
			v-model:pagination="pagination"
			hide-pagination
			style="z-index: 999"
			row-key="rowNum"
			:table-class="'common-table'"
			:no-data-label="'데이터를 찾을 수 없습니다'"
		>
			<template v-slot:header="props">
				<q-tr :props="props">
					<q-th v-for="col in props.cols" :key="col.name" :props="props">
						<template v-if="col.label == '이름' || col.label == '직급' || col.label == '소속'">
							<div @click="sortTable(col.field)" style="cursor: pointer">
								{{ col.label }}
							</div>
						</template>
						<template v-else>
							{{ col.label }}
						</template>
					</q-th>
				</q-tr>
			</template>

			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td v-for="col in props.cols" :key="col.name" :props="props">
						<template v-if="col.label == '이메일'">
							<template v-if="col.value.length > 1">
								<p class="email-info-wrapper">{{ col.value[0] }} ...</p>
								<!-- 이메일 div 표시 -->
								<p class="email-hidden-info-wrapper">
									<template v-for="email in col.value" :key="email">
										<p class="email-hidden-info">{{ email }}</p>
									</template>
								</p>
							</template>
							<template v-else>
								{{ col.value[0] }}
							</template>
						</template>
						<template v-else>
							<template v-if="col.label === '이름'">
								<div @click="showUserInfo(true, props.row.employeeId)" style="cursor: pointer">
									{{ col.value }}
								</div>
							</template>
							<template v-else>
								{{ col.value }}
							</template>
						</template>
					</q-td>
				</q-tr>
			</template>
			<template v-slot:no-data="{ message }">
				<div class="no-data full-width row flex-center text-grey-6">
					<q-icon size="24px" name="icon-warning-alt" class="m-r-12" />
					<span class="message">
						{{ message }}
					</span>
				</div>
			</template>
		</q-table>
		<div class="app-pagination-wrapper flex items-center justify-between">
			<div class="page-info">Total {{ propDataSet?.total }}</div>
			<div class="page-number flex items-center">
				<q-btn
					class="app-btn btn-basic btn-ghost-black btn-only-icon btn-small"
					flat
					:disable="pagination.page === 1"
					@click="emitPageData(1)"
				>
					<em class="icon-first-page"></em>
				</q-btn>
				<q-btn
					class="app-btn btn-basic btn-ghost-black btn-only-icon btn-small"
					flat
					:disable="pagination.page === 1"
					@click="emitPageData(pagination.page - 1)"
				>
					<em class="icon-chevron-left"></em>
				</q-btn>

				<q-pagination
					class="pagination-num ml-8 mr-8"
					v-model="pagination.page"
					:max="lastPage"
					:max-pages="9"
					:ellipses="true"
					@click="emitPageData(pagination.page)"
				/>
				<q-btn
					class="app-btn btn-basic btn-ghost-black btn-small btn-only-icon"
					flat
					:disable="pagination.page === lastPage"
					@click="emitPageData(pagination.page + 1)"
				>
					<em class="icon-chevron-right"></em>
				</q-btn>

				<q-btn
					class="app-btn btn-basic btn-ghost-black btn-only-icon btn-small"
					flat
					:disable="pagination.page === lastPage"
					@click="emitPageData(lastPage)"
				>
					<em class="icon-last-page"></em>
				</q-btn>
			</div>
			<div class="page-option flex items-center">
				<q-select
					class="app-input input-select input-small"
					outlined
					dropdown-icon="icon-keyboard-arrow-down"
					v-model="pagination.rowsPerPage"
					:options="pagination.option"
					popup-content-class="select-popup small-select-popup"
					@update:model-value="updatePage"
				>
					<template v-slot:selected>
						<template v-if="pagination.rowsPerPage">
							{{ pagination.rowsPerPage }}
						</template>
						<template v-else> 선택하세요 </template>
					</template>
				</q-select>
			</div>
		</div>

		<q-dialog v-model="userInfoModal" class="dialog-wrapper">
			<q-card>
				<q-card-section class="items-center">
					<q-btn
						class="app-btn btn-basic btn-primary"
						style="width: 80px"
						flat
						v-if="authStore.user.permission"
						@click="updateUser()"
						>수정</q-btn
					>
					<p class="q-ml-sm">사원 정보 조회</p>
					<q-btn flat label="X" color="primary" v-close-popup class="modal-botton" />
				</q-card-section>
				<div class="info-wrapper">
					<div class="info-profile-wrapper">
						<div class="info-profile-section">
							<img id="profile-preview" :src="employeeInfo.profileImg" alt="No Image" />
						</div>
					</div>
					<q-card-section class="userInfo">
						<div class="info-label">이름</div>
						<q-input v-model="employeeInfo.nameKr" class="app-input input-medium" outlined readonly />
					</q-card-section>
					<q-card-section class="userInfo">
						<div class="info-label">연락처</div>
						<q-input v-model="employeeInfo.phone" class="app-input input-medium" outlined readonly />
					</q-card-section>
					<q-card-section class="userInfo">
						<div class="info-label">소속</div>
						<q-input v-model="employeeInfo.affiliationName" class="app-input input-medium" outlined readonly />
					</q-card-section>
					<q-card-section class="userInfo">
						<div class="info-label">부서</div>
						<q-input v-model="employeeInfo.departmentName" class="app-input input-medium" outlined readonly />
					</q-card-section>
					<q-card-section class="userInfo">
						<div class="info-label">직급</div>
						<q-input v-model="employeeInfo.rank" class="app-input input-medium" outlined readonly />
					</q-card-section>
				</div>

				<q-card-section> 이메일 정보 </q-card-section>
				<div class="info-wrapper">
					<q-card-section class="userInfo">
						<div class="info-label">이메일</div>
						<q-input v-model="employeeInfo.email" class="app-input input-medium email" outlined readonly />
					</q-card-section>
				</div>
			</q-card>
		</q-dialog>
	</template>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed, onMounted, ref, watch } from 'vue';
import { useUiStore } from '@/store/ui';
import attendanceService from '@/service/attendanceService';
import hrService from '@/service/hrService';
import { useAuthStore } from '@/store/auth';
import { utils, writeFile } from 'xlsx';
import { Moment } from '@/composables/util';

const uiStore = useUiStore();
const authStore = useAuthStore();

const excelVO = ref([]);

const props = defineProps({ tableData: Object });
const propDataSet = computed(() => props.tableData);

const emit = defineEmits(['emitPageData']);

const lastPage = computed(() => Math.ceil(propDataSet.value?.total / pagination.value.rowsPerPage));
const rowStart = computed(() => (pagination.value.page - 1) * pagination.value.rowsPerPage); //현재페이지-1 * 페이지당rows
const rowEnd = computed(() => pagination.value.page * pagination.value.rowsPerPage); //현재페이지 * 페이지당rows
const firstPage = computed(() => pagination.value.page * pagination.value.rowsPerPage);

const commuteUpdateModal = ref(false);
const userInfoModal = ref(false);

const showUserInfo = (flag: boolean, employeeId: number) => {
	userInfoModal.value = true;
	employeeInfo.value.employeeId = employeeId;
	getEmployeeInfo();
};

const employeeData = ref({
	id: '',
	nameKr: '',
	registerDate: '',
	startDate: '',
	endDate: '',
});

const employeeInfo = ref({
	address: '',
	affiliationName: '',
	birthday: '',
	departmentName: '',
	email: '',
	employeeId: 0,
	employeeNo: 0,
	gender: '',
	joinDate: '',
	nameEn: '',
	nameKr: '',
	phone: '',
	profileImg: '',
	rank: '',
	role: '',
	state: '',
});

const pagination = ref({
	orderBy: '',
	sort: '',
	descending: false,
	page: 1,
	rowsPerPage: 10,
	option: [2, 5, 10, 20, 50],
	rowsNumber: propDataSet.value?.pageSize,
});

const input = ref({
	string: '',
	selectList: [],
	inputDuration: '',
	duration: {
		from: '',
		to: '',
	},
});

const updateUser = () => {
	commuteUpdateModal.value = false;
	router.push({ name: 'UpdateEmployee', query: { employeeId: employeeInfo.value.employeeId } });
};

const getEndDateView = (startDt: string) => {
	let result;
	let endDt = '';

	if (startDt === 'Invalid date') {
		return '기간을 선택하세요';
	}

	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)}`;
	}

	return result;
};

const endDurationPicker = (val: any) => {
	if (val === null) {
		input.value.duration.to = '';
	} else {
		input.value.duration.to = Moment.getYYYY_MM_DD(val);
	}
};

const sortTable = (field: any) => {
	if (pagination.value.orderBy == 'desc') {
		pagination.value.orderBy = 'asc';
	} else {
		pagination.value.orderBy = 'desc';
	}
	if (field == 'registerDate') {
		field = 'date';
	}

	pagination.value.sort = field;

	emit('emitPageData', {
		pageNumber: pagination.value.page, //page
		pageSize: pagination.value.rowsPerPage,
		orderBy: pagination.value.orderBy,
		sort: pagination.value.sort,
	});
};

const emitPageData = (page: any) => {
	pagination.value.page = page;

	emit('emitPageData', {
		pageNumber: page, //page
		pageSize: pagination.value.rowsPerPage,
		orderBy: pagination.value.orderBy,
		sort: pagination.value.sort,
	});
};

const updatePage = () => {
	uiStore.dataReload = false;
	uiStore.dataReload = true;
	emit('emitPageData', {
		pageNumber: pagination.value.page, //page
		pageSize: pagination.value.rowsPerPage,
		orderBy: pagination.value.orderBy,
		sort: pagination.value.sort,
	});
};

const updateModal = (flag: any, value: any) => {
	const startDate = value.row.startDate;
	const endDate = value.row.endDate;

	commuteUpdateModal.value = flag;
	employeeData.value.id = value.row.commuteId;
	employeeData.value.nameKr = value.row.nameKr;
	employeeData.value.registerDate = value.row.registerDate;
	employeeData.value.startDate = startDate.substring(11, startDate.length);
	employeeData.value.endDate = endDate.substring(11, endDate.length);
};

// 적용될 컬럼
const defaultColumnList = ref([
	{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', headerStyle: '', style: '51', classes: 'app-fw-6' },
	{ name: 'rank', align: 'center', label: '직급', field: 'rank', headerStyle: '', style: '', classes: '' },
	{ name: 'affi', align: 'center', label: '소속', field: 'dept', headerStyle: '', style: '', classes: '' },
	{ name: 'dept', align: 'center', label: '부서', field: 'team', headerStyle: '', style: '', classes: '' },
	{ name: 'email', align: 'left', label: '이메일', field: 'email', headerStyle: '', style: '', classes: '' },
	{ name: 'phone', align: 'left', label: '연락처', field: 'phone', headerStyle: '', style: '', classes: '' },

	{ name: 'date', align: 'center', label: '날짜', field: 'date', headerStyle: '', style: '', classes: 'app-fw-6' },
	{ name: 'startDt', align: 'center', label: '출근시간', field: 'startDt', headerStyle: '', style: '', classes: '' },
	{ name: 'endDt', align: 'center', label: '퇴근시간', field: 'endDt', headerStyle: '', style: '', classes: '' },
]);

const table = ref({
	list: [],
	noData: '데이터를 찾을 수 없습니다',
	hidePagination: false,
});

const updateAdminCommute = async () => {
	await uiStore.showLoading();
	try {
		const commuteRegisterDTO = {
			commuteId: 0,
			startDate: '',
			endDate: '',
		};
		let registerDate = employeeData.value.registerDate.split(' ');

		commuteRegisterDTO.commuteId = Number(employeeData.value.id);
		commuteRegisterDTO.startDate = `${registerDate[0]} ${employeeData.value.startDate}:00`;
		commuteRegisterDTO.endDate = `${input.value.duration.to} ${employeeData.value.endDate}:00`;

		const response = await attendanceService.updateAdminCommute(commuteRegisterDTO);

		let notify = {
			caption: response.data.message,
			type: 'positive',
			icon: 'info',
			classes: 'app-notify',
			timeout: 500,
		};

		uiStore.showNotification(notify);
		updatePage();
		router.push('/attendance');
		commuteUpdateModal.value = false;
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

const getEmployeeInfo = async () => {
	await uiStore.showLoading();
	try {
		const response = await hrService.getUserInfo(employeeInfo.value.employeeId);

		const list = response.data.data.email.split(',');

		const email = list.filter((v: string) => {
			if (v.includes('@twolinecode.com')) {
				return v;
			}
		});

		response.data.data.email = email;

		employeeInfo.value = response.data.data;

		let notify = {
			caption: response.data.message,
			type: 'positive',
			icon: 'info',
			classes: 'app-notify',
			timeout: 500,
		};

		uiStore.showNotification(notify);
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

const excelDown = async () => {
	await uiStore.showLoading();
	try {
		const response = await attendanceService.exportExcelCommute(
			propDataSet.value?.startDate,
			propDataSet.value?.endDate,
			propDataSet.value?.employeeId
		);
		const list = response.data.data.map((v: any) => {
			return {
				사번: v.employeeNo,
				이름: v.nameKr,
				날짜: v.registerDate,
				요일: v.dayOfTheWeek,
				출근시간: v.startDate,
				퇴근시간: v.endDate,
				총근무시간: v.totalCommuteTime,
			};
		});

		const data = list;
		const excelData = utils.json_to_sheet(data);

		const workBook = utils.book_new();
		utils.book_append_sheet(workBook, excelData, `출퇴근현황(${propDataSet.value?.startDate} ~ ${propDataSet.value?.endDate})`);
		writeFile(workBook, `출퇴근현황(${propDataSet.value?.startDate} ~ ${propDataSet.value?.endDate}).xlsx`);

		let notify = {
			caption: response.data.message,
			type: 'positive',
			icon: 'info',
			classes: 'app-notify',
			timeout: 500,
		};

		uiStore.showNotification(notify);
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

watch(
	() => uiStore.dataReload,
	() => {
		if (uiStore.dataReload) updatePage();
		uiStore.dataReload = false;
	}
);

onMounted(() => {
	uiStore.emitter.on('filter', () => {
		pagination.value.page = 1;
	});
});
</script>

<style scoped lang="scss">
.q-card {
	width: 600px;
	height: 800px;
}

.dialog-wrapper {
	.app-input {
		width: 400px;
	}
	.app-input-picker {
		margin-top: 10px;
	}
}

.info-wrapper {
	padding: 10px;
	margin: 10px;
	background: rgb(229, 226, 226);
}

.userInfo {
	display: flex;
	justify-content: center;
	align-items: center;
}

.info-label {
	width: 70px;
}

.items-center {
	display: flex;
}

.info-profile-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 0 10px;
	.info-profile-section {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.btn-upload {
		margin-top: 16px;
	}
}

.email-info-wrapper {
	cursor: pointer;
	margin: 0px;
	padding: 0px;
}

.email-hidden-info-wrapper {
	padding: 15px 15px;
	background-color: hsl(0, 0%, 24%);
	border-radius: 5px;
	color: #ffffff;
	display: none;
}

.email-hidden-info-wrapper:hover {
	display: block;
	position: fixed;
}
.email-info-wrapper:hover + .email-hidden-info-wrapper {
	display: block;
	position: fixed;
}

.email-hidden-info {
	margin: 0px;
	padding: 2px 0px;
}

.table-header {
	display: flex;
	height: 45px;

	.app-btn {
		width: 100px;
		margin-right: 8px;
		margin-bottom: 0.7%;
	}
}
.btn-toggle-clearable {
	.q-btn {
		min-height: auto;
		padding: 0;
		&.disabled {
			&[aria-pressed='false'] {
				.q-icon {
					color: $blue-gray-3;
				}
			}
			&[aria-pressed='true'] {
				.q-icon {
					color: $primary;
				}
			}
		}
	}
}

.focus-table {
	background: red;
	&:focus {
		outline: solid;
		background: red;
	}
}
</style>

function created() { throw new Error('Function not implemented.'); }

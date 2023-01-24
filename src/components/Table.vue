<template>
	<template v-if="propDataSet.isAttendance">
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
						{{ col.label }}
					</q-th>
				</q-tr>
			</template>

			<template v-slot:body="props" v-if="authStore.user.permission">
				<q-tr class="cursor-pointer" :props="props">
					<q-td v-for="col in props.cols" :key="col.name" :props="props" @click="updateModal(true, props)">
						{{ col.value }}
					</q-td>
				</q-tr>
			</template>

			<template v-slot:body="props" v-else>
				<q-tr :props="props">
					<q-td v-for="col in props.cols" :key="col.name" :props="props">
						{{ col.value }}
					</q-td>
				</q-tr>
			</template>
		</q-table>
		<div class="app-pagination-wrapper flex items-center justify-between">
			<div class="page-info">{{ countRows(scope) }} / {{ propDataSet.total }} Total Row</div>
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
					:error="pagination.state.error.off"
					:disable="pagination.state.disable.off"
					:readonly="pagination.state.readonly.off"
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
				Page
			</div>
		</div>

		<q-dialog v-model="commuteUpdateModal" persistent>
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
					<q-btn flat label="등록" color="primary" @click="updateAdminCommute" />
					<q-btn flat label="취소" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</template>

	<template v-else>
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
						{{ col.label }}
					</q-th>
				</q-tr>
			</template>

			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td v-for="col in props.cols" :key="col.name" :props="props">
						{{ col.value }}
					</q-td>
				</q-tr>
			</template>
		</q-table>
		<div class="app-pagination-wrapper flex items-center justify-between">
			<div class="page-info">{{ countRows(scope) }} / {{ propDataSet.total }} Total Row</div>
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
					:error="pagination.state.error.off"
					:disable="pagination.state.disable.off"
					:readonly="pagination.state.readonly.off"
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
				Page
			</div>
		</div>
	</template>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import { useUiStore } from '@/store/ui';
import attendanceService from '@/service/attendanceService';
import { useAuthStore } from '@/store/auth';

const uiStore = useUiStore();
const authStore = useAuthStore();

const props = defineProps({ tableData: Object });
const propDataSet = computed(() => props.tableData);
import { Moment } from '@/composables/util';
const emit = defineEmits(['emitPageData']);

const lastPage = computed(() => Math.ceil(propDataSet.value?.total / pagination.value.rowsPerPage));
const rowStart = computed(() => (pagination.value.page - 1) * pagination.value.rowsPerPage); //현재페이지-1 * 페이지당rows
const rowEnd = computed(() => pagination.value.page * pagination.value.rowsPerPage); //현재페이지 * 페이지당rows
const firstPage = computed(() => pagination.value.page * pagination.value.rowsPerPage);

const commuteUpdateModal = ref(false);
const employeeData = ref({
	id: '',
	nameKr: '',
	registerDate: '',
	startDate: '',
	endDate: '',
});

const pagination = ref({
	sortBy: 'desc',
	descending: false,
	page: 1,
	rowsPerPage: 10,
	option: [1, 2, 3, 5, 10, 20, 50],
	rowsNumber: propDataSet.value?.pageSize,
	state: {
		error: {
			on: true,
			off: false,
		},
		disable: {
			on: true,
			off: false,
		},
		readonly: {
			on: true,
			off: false,
		},
	},
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

const getEndDateView = (startDt: string, endDt: string) => {
	let result;
	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)}`;
	}
	// console.log(input.value.inputDuration);

	return result;
};

const endDurationPicker = (val: any) => {
	input.value.duration.to = Moment.getYYYY_MM_DD(val);
};

const countRows = () => {
	if (rowEnd.value - (pagination.value.rowsPerPage - 10) > propDataSet.value?.total) {
		return `${rowStart.value + 1} ~ ${propDataSet.value?.total}`;
	}
	return `${rowStart.value + 1} ~ ${rowEnd.value}`;
};

const emitPageData = (page: any) => {
	pagination.value.page = page;

	emit('emitPageData', {
		pageNumber: page, //page
		pageSize: pagination.value.rowsPerPage,
		orderBy: '',
		sort: '',
	});
};

const updatePage = () => {
	emit('emitPageData', {
		pageNumber: '', //page
		pageSize: pagination.value.rowsPerPage,
		orderBy: '',
		sort: '',
	});
};

const updateModal = (flag: any, value: any) => {
	commuteUpdateModal.value = flag;
	employeeData.value.id = value.row.commuteId;
	employeeData.value.nameKr = value.row.nameKr;
	employeeData.value.registerDate = value.row.registerDate;
	employeeData.value.startDate = value.row.startDate;
	employeeData.value.endDate = value.row.endDate;
};

// 적용될 컬럼
const defaultColumnList = ref([
	{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', headerStyle: '', style: '', classes: 'app-fw-6' },
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
		commuteRegisterDTO.commuteId = Number(employeeData.value.id);
		commuteRegisterDTO.startDate = `${employeeData.value.registerDate} ${employeeData.value.startDate}:00`;
		commuteRegisterDTO.endDate = `${input.value.duration.to} ${employeeData.value.endDate}:00`;
		console.log(commuteRegisterDTO);

		const response = await attendanceService.updateAdminCommute(commuteRegisterDTO);
		router.push('/attendance');
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
		commuteUpdateModal.value = false;
		router.go(0);
	}
};
</script>

<style scoped lang="scss">
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

/* .test {
  display: flex;
} */

.focus-table {
	background: red;
	&:focus {
		outline: solid;
		background: red;
	}

	/* .q-field__native {
    &:focus {
      outline: solid;
      background: red;
    }
  } */
}
/* .residual-year-flex {
  display: flex;
  justify-content: center;
  align-content: center;
  background: red;
} */
</style>

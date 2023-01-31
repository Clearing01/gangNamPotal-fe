<template>
	<div class="app-table-filter-wrapper">
		<template v-if="isManagement">
			<div class="filter-wrapper">
				<div class="filter-container">
					<div class="flex items-center">
						<div class="filter-title mr-10">구분</div>
						<div>
							<q-select
								:options="titleList"
								v-model="manageMentFilterValue.selectValue"
								class="app-input input-medium input-select"
								outlined
								dropdown-icon="icon-keyboard-arrow-down"
								label="선택하세요"
								popup-content-class="select-popup"
							/>
						</div>
					</div>
				</div>

				<div class="filter-container">
					<div class="flex items-center">
						<div>
							<q-input
								class="app-input input-medium"
								v-model="manageMentFilterValue.searchText"
								outlined
								placeholder="입력하세요"
							/>
						</div>
					</div>
				</div>

				<div class="filter-container">
					<q-btn class="app-btn btn-basic btn-primary" flat @click="manageMentFilter()">입력</q-btn>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="filter-wrapper">
				<div class="filter-container">
					<div class="flex items-center">
						<div class="filter-title mr-10">날짜</div>
						<div>
							<q-btn class="app-input-picker input-picker-medium" flat>
								<em class="icon-calendar-today"></em>
								<span class="picker-text">
									{{
										input.duration.from && input.duration.to
											? getDateView(input.duration.from, input.duration.to)
											: '기간을 선택하세요'
									}}
								</span>
								<q-popup-proxy transition-show="scale" transition-hide="scale">
									<q-date
										range
										minimal
										v-model="input.inputDuration"
										mask="YYYY-MM-DD"
										@update:model-value="updateDurationPicker"
									>
										<div class="row items-center justify-end">
											<q-btn v-close-popup label="닫기" flat />
										</div>
									</q-date>
								</q-popup-proxy>
							</q-btn>
						</div>
					</div>
				</div>

				<div class="filter-container">
					<div class="flex items-center">
						<div class="filter-title mr-10">이름</div>
						<div>
							<q-input class="app-input input-medium" outlined placeholder="입력하세요" v-model="input.string" />
						</div>
					</div>
				</div>

				<div class="filter-container">
					<q-btn class="app-btn btn-basic btn-primary" flat @click="attendanceFilter()">입력</q-btn>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { Moment } from '@/composables/util';
import { useUiStore } from '@/store/ui';

const props = defineProps({ filterData: Object });
const emit = defineEmits(['emitManageMent', 'emitAttendance']);
const propDataSet = computed(() => props.filterData);

const uiStore = useUiStore();

const manageMentFilterValue = ref({
	selectValue: '이름',
	searchText: '',
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

const getDateView = (startDt: string, endDt: string) => {
	let result;
	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)} ~ ${Moment.getYYYYMMDD(endDt)}`;
	}
	return result;
};

const updateDurationPicker = (val: any) => {
	if (val) {
		if (val.from) {
			input.value.duration.from = Moment.getYYYY_MM_DD(val.from);
			input.value.duration.to = Moment.getYYYY_MM_DD(val.to);
		} else {
			input.value.duration.from = Moment.getYYYY_MM_DD(val);
			input.value.duration.to = Moment.getYYYY_MM_DD(val);
		}
	}
};

const isManagement = ref(propDataSet.value?.isManagement);

const titleList = ref(
	propDataSet.value?.titleList.map((title: any) => {
		return title.label;
	})
);

const manageMentFilter = () => {
	propDataSet.value?.titleList.forEach((title: any) => {
		if (title.label === manageMentFilterValue.value.selectValue) {
			emit('emitManageMent', {
				selectValue: title.name,
				searchText: manageMentFilterValue.value.searchText,
			});
		}
	});
};

const attendanceFilter = () => {
	emit('emitAttendance', {
		startDate: input.value.duration.from,
		endDate: input.value.duration.to,
		name: input.value.string,
	});
};

const today = () => {
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;

	input.value.duration.from = dateString;
	input.value.duration.to = dateString;
};

onMounted(() => {
	today();
	manageMentFilter();
	attendanceFilter();
});
</script>

<style scoped lang="scss">
.btn-basic {
	background: rgb(168, 167, 167);
}

.app-table-filter-wrapper {
	background: rgba(240, 243, 249, 0.8);
	border-radius: 12px;
	margin-bottom: 20px;
}
.filter-wrapper {
	width: 100%;
	padding: 16px 24px;
	.filter-container {
		border: none;
		display: inline-block;
		vertical-align: top;
		margin-left: 20px;
		&:first-child {
			margin-left: 0;
		}
	}
	.filter-title {
		font-size: $font-02;
		line-height: $font-06;
		color: $blue-gray-10;
		font-weight: 500;
	}
	.app-input .app-input-picker {
		width: 100%;
	}
}
.option-wrapper {
	width: 100%;
	border-top: 1px solid rgba(231, 235, 243, 0.8);
	padding: 16px 24px 8px;
}
.filter-chip-wrapper {
	width: calc(100% - 97px);
}
</style>

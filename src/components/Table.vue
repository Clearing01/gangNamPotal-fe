<template>
	<template v-if="propDataSet.isAttendance">
		<q-table
			flat
			bordered
			:rows="rows"
			:columns="columns"
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
				<q-tr class="cursor-pointer" :props="props">
					<q-td v-for="col in props.cols" :key="col.name" :props="props" @click="updateModal(true, props)">
						{{ col.value }}
					</q-td>
				</q-tr>
			</template>
		</q-table>
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
					날짜 <q-input v-model="employeeData.date" class="app-input input-medium" outlined readonly />
				</q-card-section>
				<q-card-section>
					출근시간 <q-input v-model="employeeData.startDt" class="app-input input-medium" outlined placeholder="입력하세요" />
				</q-card-section>
				<q-card-section>
					퇴근시간 <q-input v-model="employeeData.endDt" class="app-input input-medium" outlined placeholder="입력하세요" />
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="등록" color="primary" />
					<q-btn flat label="취소" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</template>

	<template v-else>
		<q-table
			flat
			bordered
			:rows="rows"
			:columns="columns"
			row-key="rowNum"
			:table-class="'common-table'"
			:no-data-label="'데이터를 찾을 수 없습니다'"
		>
		</q-table>
	</template>
</template>

<script setup>
import router from '@/router';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({ tableData: Object });
const propDataSet = computed(() => props.tableData);
const columns = propDataSet.value.columnList;
const rows = propDataSet.value.list;

const commuteUpdateModal = ref(false);
const employeeData = ref({
	id: '',
	nameKr: '',
	date: '',
	startDt: '',
	endDt: '',
});

const updateModal = (flag, value) => {
	commuteUpdateModal.value = flag;
	employeeData.value.nameKr = value.row.nameKr;
	employeeData.value.date = value.row.date;
	employeeData.value.startDt = value.row.startDt;
	employeeData.value.endDt = value.row.endDt;

	console.log(value);
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

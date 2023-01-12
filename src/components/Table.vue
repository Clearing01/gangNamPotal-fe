<template>
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

<script setup>
import router from '@/router';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({ tableData: Object });
const propDataSet = computed(() => props.tableData);
const columns = propDataSet.value.columnList;
const rows = propDataSet.value.list;

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

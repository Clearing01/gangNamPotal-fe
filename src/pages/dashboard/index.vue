<template>
	<div class="dashboard-calendar-section">
		<Calendar :commuteList="commuteList" @emitCalendar="getDataByCalendar" />
	</div>
</template>

<script lang="ts" setup>
import Calendar from '@/components/Calendar.vue';
import { ref } from 'vue';
import { useUiStore } from '@/store/ui';
import dashBoardService from '@/service/dashBoardService';
import { onMounted } from 'vue-demi';
import { useAuthStore } from '@/store/auth';
import authService from '@/service/authService';

const authStore = useAuthStore();

interface CommuteVO {
	title: string;
	color: string;
	start: string;
	end: string;
	display: string;
	startDate: string;
	endDate: string;
}

const uiStore = useUiStore();
const commuteList = ref<CommuteVO[]>([]);

const emitData = ref({
	selctFilter: '',
	year: '',
	month: '',
});

const getDataByCalendar = (emit: any) => {
	emitData.value.selctFilter = emit.selctFilter;
	emitData.value.year = emit.year;
	emitData.value.month = emit.month;

	onRequest();
};

const onRequest = async () => {
	const list = await getCommuteList(emitData.value.selctFilter, emitData.value.year, emitData.value.month);

	commuteList.value = list.map((v: any) => {
		let startDate = v.startDate.substring(11, 16);
		let endDate = '';

		if (v.endDate !== null && v.endDate.length > 0) {
			endDate = v.endDate.substring(11, 16);
		}

		return {
			title: v.nameKr,
			color: 'blue',
			start: v.registerDate,
			end: v.endDate,
			display: 'list-item',
			startDate: startDate,
			endDate: endDate,
		};
	});
};

const getCommuteList = async (filter: any, year: any, month: any) => {
	await uiStore.showLoading();
	let range = '';
	try {
		if (filter === '전체') {
			const response = await dashBoardService.getCommuteList(year, month, range);
			const result = response.data.data;

			return result;
		} else {
			range = 'my';
			const response = await dashBoardService.getCommuteList(year, month, range);
			const result = response.data.data;

			return result;
		}
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};
</script>

<style lang="scss">
.btn-wrapper {
	margin-left: 2%;
}
.filter-container {
	border: none;
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
}
.dashboard-calendar-section {
	padding: 1px 0;
	height: 100vh;
	border: none;
}
</style>

<template>
	<div class="dashboard-calendar-section">
		<!-- <div class="app-pageheader">
			<span class="main-title">대쉬보드</span>
		</div> -->
		<Calendar :commuteList="commuteList" @emitCalendar="getDataByCalendar" />
	</div>
</template>

<script lang="ts" setup>
import Calendar from '@/components/Calendar.vue';
import { ref } from '@vue/reactivity';
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
	name: string;
}

const uiStore = useUiStore();
const commuteList = ref<CommuteVO[]>([]);

const emitData = ref({
	selctFilter: '',
	year: '',
	month: '',
});

const commuteVO = ref({
	title: '',
	color: 'blue',
	start: '',
	end: '',
	display: 'list-item',
	name: '',
});

const getDataByCalendar = (emit: any) => {
	emitData.value.selctFilter = emit.selctFilter;
	emitData.value.year = emit.year;
	emitData.value.month = emit.month;

	onRequest();

	// console.log(emitData.value);
};

const onRequest = async () => {
	const list = await getCommuteList(emitData.value.selctFilter, emitData.value.year, emitData.value.month);

	commuteList.value = list.map((v: any) => {
		const startDate = v.startDate.substring(11, 16);
		return {
			title: v.nameKr,
			color: 'blue',
			start: v.registerDate,
			end: v.endDate,
			display: 'list-item',
			name: startDate,
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

// onMounted(() => {
// 	console.log(emitData.value);
// });
</script>

<style>
.btn-wrapper {
	margin-left: 2%;
}
.filter-container {
	border: 1px solid rgba(231, 235, 243, 0.8);
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
}
.dashboard-calendar-section {
	padding: 1px 0;
	height: 100vh;
}
</style>

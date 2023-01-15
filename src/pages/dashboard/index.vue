<template>
	<div class="dashboard-calendar-section">
		<div class="app-pageheader">
			<span class="main-title">대시보드</span>
			<div class="filter-container">
				<q-select :options="filter" v-model="filter.index" />
			</div>
		</div>
		<!-- <div class="app-pageheader">
			<span class="main-title">대쉬보드</span>
		</div> -->
		<Calendar />
	</div>
</template>

<script lang="ts" setup>
import Calendar from '@/components/Calendar.vue';
import { ref } from '@vue/reactivity';

const filter = ref(['본인', '전체']);
</script>

<style>
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

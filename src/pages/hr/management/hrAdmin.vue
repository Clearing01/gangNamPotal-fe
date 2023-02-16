<template>
	<div>
		<CreateEmployeeVue :mode="createMode" :data="[]" @function="saveEmployee" />
	</div>
</template>
<script setup lang="ts">
import CreateEmployeeVue from '@/components/HrAdmin.vue';
import { useUiStore } from '@/store/ui';
import hrService from '@/service/hrService';

const uiStore = useUiStore();

const createMode = 'createMode';

const saveEmployee = async (employeeData: Object) => {
	console.log(employeeData);

	// const response = await hrService.saveEmployeeInfo(employeeData);

	// successNotify(response.data.message);
};

const successNotify = (message: string) => {
	let notify = {
		caption: message,
		type: 'positive',
		icon: 'info',
		classes: 'app-notify',
		timeout: 500,
	};

	uiStore.showNotification(notify);
};
</script>
<style lang="scss"></style>

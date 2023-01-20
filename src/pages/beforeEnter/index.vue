<template></template>

<script setup lang>
import { useUiStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import hrService from '@/service/hrService';

const route = useRoute();
const authStore = useAuthStore();
const uiStore = useUiStore();

const getToken = () => {
	if (route.query.status === '200') {
		authStore.user.token = route.query.accessToken;
		authStore.user.refreshToken = route.query.refreshToken;
		if (route.query.role === 'ROLE_ADMIN') {
			authStore.user.permission = true;
		}
		onMypage();
		console.log(employeeData.value);

		router.push('/dashboard');
	} else {
		router.push('/login');
	}
};

const employeeData = ref({
	address: '',
	affiliation: '',
	birthday: '',
	department: '',
	email: '',
	employeeId: 0,
	employeeNo: 0,
	gen: 0,
	gender: '',
	joinDate: '',
	nameEn: '',
	nameKr: '',
	phone: '',
	profileImg: '',
	rank: '',
	role: '',
});

const onMypage = async () => {
	const info = await getInfo();
	employeeData.value = info;

	uiStore.img = employeeData.value.profileImg;
	uiStore.name = employeeData.value.nameKr;
	uiStore.department = employeeData.value.department;
	uiStore.rank = employeeData.value.rank;
	console.log(uiStore);
};

const getInfo = async () => {
	await uiStore.showLoading();
	try {
		// 토큰 전달
		const response = await hrService.getInfo();
		const result = response.data.data;

		return result;
	} catch (error) {
	} finally {
		uiStore.hideLoading();
	}
};

onMounted(() => {
	getToken();
});
</script>

<style></style>

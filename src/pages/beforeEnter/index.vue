<template></template>

<script setup>
import { useUiStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import hrService from '@/service/hrService';

import ErrorDialog from '../../layouts/ErrorDialog.vue';

const route = useRoute();
const authStore = useAuthStore();
const uiStore = useUiStore();

const getToken = async () => {
	if (route.query.status === '200') {
		authStore.user.token = route.query.accessToken;
		authStore.user.refreshToken = route.query.refreshToken;
		if (route.query.role === 'ROLE_ADMIN') {
			authStore.user.permission = true;
		}

		router.push('/dashboard');

		let notify = {
			caption: '로그인 성공',
			type: 'positive',
			icon: 'info',
			classes: 'app-notify',
			timeout: 500,
		};

		uiStore.showNotification(notify);
	} else {
		const errorResponse = {
			code: route.query.code,
			status: route.query.status,
			message: route.query.message,
		};

		await router.push('/login');

		let notify = {
			caption: errorResponse.message,
			type: 'negative',
			icon: 'warning',
			classes: 'app-notify',
			timeout: 500,
		};

		uiStore.showNotification(notify);
	}
};

onMounted(() => {
	getToken();
});
</script>

<style></style>

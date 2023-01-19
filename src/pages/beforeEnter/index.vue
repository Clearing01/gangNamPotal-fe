<template></template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { onMounted } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();

const getToken = () => {
	if (route.query.status === '200') {
		authStore.user.token = route.query.accessToken;
		authStore.user.refreshToken = route.query.refreshToken;
		if (route.query.role === 'ROLE_ADMIN') {
			authStore.user.permission = true;
		}
		router.push('/dashboard');
	} else {
		router.push('/login');
	}
};

onMounted(() => {
	getToken();
});
</script>

<style></style>

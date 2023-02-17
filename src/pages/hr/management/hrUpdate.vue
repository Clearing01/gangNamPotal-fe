<template>
	<div>
		<UpdateEmployeeVue :mode="updateMode" :employeeId="employeeId" />
	</div>
</template>
<script setup lang="ts">
import UpdateEmployeeVue from '@/components/HrAdmin.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

const employeeId = computed(() => router.currentRoute.value.query.employeeId as string);

const updateMode = 'updateMode';
</script>
<style lang=""></style>

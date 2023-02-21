<template>
	<div>
		<CreateEmployeeVue :mode="createMode" />
	</div>
</template>
<script setup lang="ts">
import CreateEmployeeVue from '@/components/HrAdmin.vue';

const createMode = 'createMode';
</script>
<style lang="scss"></style>

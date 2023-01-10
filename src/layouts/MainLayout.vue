<template>
	<q-layout view="hHh Lpr lFf" class="app-wrapper">
		<BaseHeader />
		<BaseDrawer />
		<q-page-container class="app-container">
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';
import BaseDrawer from '../components/BaseDrawer.vue';
</script>

<style scoped></style>

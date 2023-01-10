<template>
	<q-layout view="hHh Lpr lFf" class="app-wrapper">
		<!-- <BaseDrawer /> -->
		<BaseSideBar />
		<q-page-container class="app-container">
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';
import BaseDrawer from '../components/BaseDrawer.vue';
import BaseSideBar from '../components/BaseSideBar.vue';

import ProfileBox from "@/components/ProfileBox.vue";
</script>

<style scoped></style>

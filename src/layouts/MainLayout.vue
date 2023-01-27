<template>
	<q-layout view="hHh Lpr lFf" class="app-wrapper">
		<!-- <BaseDrawer /> -->
		<BaseSideBar />
		<q-page-container class="app-container">
			<router-view />
			<CommuteWindow />
		</q-page-container>
	</q-layout>

	<ErrorDialog v-if="dialog"></ErrorDialog>
</template>

<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';
import BaseDrawer from '../components/BaseDrawer.vue';
import BaseSideBar from '../components/BaseSideBar.vue';
import ProfileBox from '@/components/ProfileBox.vue';
import CommuteWindow from '@/components/CommuteWindow.vue';
import ErrorDialog from './ErrorDialog.vue';

import { computed } from 'vue';
import { useUiStore } from '@/store/ui';

const uiStore = useUiStore();

const dialog = computed({
	get: () => uiStore.getDialog.show,
	set: () => uiStore.hideDialog,
});
</script>

<style scoped lang="scss"></style>

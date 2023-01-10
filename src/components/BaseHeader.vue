<template>
	<q-header elevated>
		<q-toolbar>
			<q-btn icon="menu" flat @click="toggleDrawer" />
			<q-toolbar-title>
				<div>System</div>
			</q-toolbar-title>
			<q-space></q-space>
		</q-toolbar>
	</q-header>
</template>
<script setup lang="ts">
import { useUiStore } from '@/store/ui';
const uiStore = useUiStore();

const toggleDrawer = () => {
	uiStore.updateDrawer(!uiStore.getDrawer);
};
</script>
<style lang="scss" scoped></style>

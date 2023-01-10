<template>
	<q-drawer v-model="drawer" show-if-above side="left" bordered :width="200" behavior="desktop">
		<q-list class="q-pt-lg" />
	</q-drawer>
</template>
<script setup lang="ts">
import { useUiStore } from '@/store/ui';
import { computed } from 'vue';

const uiStore = useUiStore();

const drawer = computed({
	get: () => uiStore.getDrawer,
	set: (value: boolean) => uiStore.updateDrawer(value),
});
</script>
<style lang="scss" scoped></style>

<template>
	<q-list class="menu-list-wrapper">
		<template v-for="(currentMenu, index) of menu" :key="index">
			<q-item 
				side="left" 
				clickable 
				class="menu-list-container menu-list-parents-wrapper"
				@click="handlePageMove(currentMenu)"
			>
				<q-item-section class="menu-list-section">
					<q-item-label>
						{{ currentMenu.meta.title }}
					</q-item-label>
				</q-item-section>
			</q-item>
		</template>
	</q-list>
</template>
<script setup lang="ts">
import { useUiStore } from '@/store/ui';
import { computed, ref } from 'vue';
import router from '@/router';
import main from '@/router/main';

const uiStore = useUiStore();

const drawer = computed({
	get: () => uiStore.getDrawer,
	set: (value: boolean) => uiStore.updateDrawer(value),
});
const menu = main;
// menu.value = router.getRoutes() as Route[];
console.log(main);

const handlePageMove = (currentMenu : any) => { 
		router.push(currentMenu.path);
};
</script>
<style lang="scss" scoped></style>


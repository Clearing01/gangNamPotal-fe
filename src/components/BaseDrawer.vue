<template>
	<q-list class="menu-list-wrapper">
		<template v-for="(currentMenu, index) of menu" :key="index">
			<q-item
				v-if="currentMenu.children"
				side="left"
				clickable
				class="menu-list-container menu-list-parents-wrapper"
				@click="handlePageMove(currentMenu)"
				@mouseenter="showSubMenu(currentMenu, true)"
				@mouseleave="showSubMenu(currentMenu, false)"
				:active="uiStore.selectMenu === currentMenu.path"
			>
				<q-item-section class="menu-list-section">
					<q-item-label>
						{{ currentMenu.meta.title }}
					</q-item-label>
				</q-item-section>
				<SubDrawer
					v-if="currentMenu.showSubMenu"
					@mouseenter="showSubMenu(currentMenu, true)"
					@mouseleave="showSubMenu(currentMenu, false)"
					:parentMenu="currentMenu"
					:isShow="currentMenu.showSubMenu"
				/>
			</q-item>

			<q-item
				v-else
				side="left"
				clickable
				class="menu-list-container menu-list-parents-wrapper"
				@click="handlePageMove(currentMenu)"
				:active="uiStore.selectMenu === currentMenu.path"
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
import { onMounted, ref, watch } from 'vue';
import router from '@/router';
import main from '@/router/main';
import SubDrawer from '@/components/SubDrawer.vue';
import { debounce } from 'lodash-es';
import { useUiStore } from '@/store/ui';
import { aU } from '@fullcalendar/core/internal-common';

const uiStore = useUiStore();
const selectMenu = ref();

const menu = ref(
	main.map((menu: any) => ({
		...menu,
		showSubMenu: false,
	}))
);

const handlePageMove = (currentMenu: any) => {
	router.push(currentMenu.path);
};

const showSubMenu = debounce((currentMenu: any, value: boolean) => {
	currentMenu.showSubMenu = value;
}, 100);
</script>

<style lang="scss" scoped></style>

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

			<q-item v-else side="left" clickable class="menu-list-container menu-list-parents-wrapper" @click="handlePageMove(currentMenu)">
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
import { ref } from 'vue';
import router from '@/router';
import main from '@/router/main';
import SubDrawer from '@/components/SubDrawer.vue';
import { debounce } from 'lodash-es';

const menu = ref(
	main.map((menu: object) => ({
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

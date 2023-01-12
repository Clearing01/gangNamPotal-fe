<template>
	<q-list class="menu-list-wrapper">
		<template v-for="(currentMenu, index) of menu" :key="index">
			<q-item
				v-if="currentMenu.children"
				side="left"
				clickable
				class="menu-list-container menu-list-parents-wrapper"
				@click="handlePageMove(currentMenu)"
				@mouseenter="mouseOver(true)"
				@mouseleave="mouseLeave(false)"
			>
				<q-item-section class="menu-list-section">
					<q-item-label>
						{{ currentMenu.meta.title }}
					</q-item-label>
				</q-item-section>
				<div v-if="currentMenu.children">
					{{ showValue }}
				</div>
				<SubDrawer
					v-if="currentMenu.children && showValue"
					@mouseenter="mouseOver(true)"
					@mouseleave="mouseLeave(false)"
					:parentMenu="currentMenu"
					:showValue="showValue"
				/>
			</q-item>

			<q-item v-else side="left" clickable class="menu-list-container menu-list-parents-wrapper" @click="handlePageMove(currentMenu)">
				<q-item-section class="menu-list-section">
					<q-item-label>
						{{ currentMenu.meta.title }}
					</q-item-label>
				</q-item-section>
				<div v-if="currentMenu.children">
					{{ showValue }}
				</div>
			</q-item>
		</template>
	</q-list>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import router from '@/router';
import main from '@/router/main';
import { Router } from 'vue-router';
import SubDrawer from '@/components/SubDrawer.vue';

let closeAllTimer: any = null;

const menu = main;
const showValue = ref(false);

const handlePageMove = (currentMenu: any) => {
	router.push(currentMenu.path);
};

const mouseOver = (value: boolean) => {
	clearTimeout(closeAllTimer);
	showValue.value = value;
};

const mouseLeave = (value: boolean) => {
	showValue.value = value;
	closeAllTimer = setTimeout(() => inactiveAll(), 200);
};

const inactiveAll = () => {};
</script>
<style lang="scss" scoped></style>

<template>
	<q-menu v-model="isShow" class="sub-menu-wrapper" fit anchor="top right" self="top left" scroll-target=".scroll">
		<q-list>
			<template v-for="(currentMenu, index) of parentMenu" :key="index">
				<q-item clickable @click="handlePageMove(currentMenu)">
					<q-item-section class="menu-list-section">
						<q-item-label>
							{{ currentMenu.meta.title }}
						</q-item-label>
					</q-item-section>
				</q-item>
			</template>
		</q-list>
	</q-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import router from '@/router';

const currentMenuList = ref([]);

const props = defineProps({ parentMenu: Object, showValue: Boolean });
const parentMenu = computed(() => props.parentMenu?.children);
const propShowValue = computed(() => props.showValue);

const isShow = ref(propShowValue.value);

const mouseOver = (value: boolean) => {
	// console.log(inputSubMenu)
	// console.log(1,inputSubMenu.meta.isActive)
	// inputSubMenu.meta.isActive = true;
	// console.log(2,inputSubMenu.meta.isActive)
	isShow.value = value;
};

const mouseLeave = (value: boolean) => {
	isShow.value = value;
};

const handlePageMove = (currentMenu: any) => {
	router.push(currentMenu.path);
};
</script>

<style></style>

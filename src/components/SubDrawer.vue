<template>
	<q-menu v-model="isShow" class="sub-menu-wrapper" fit anchor="top right" self="top left" scroll-target=".scroll">
		<q-list>
			<template v-for="(currentMenu, index) of parentMenu" :key="index">
				<template
					v-if="currentMenu.meta.isActive === false || (currentMenu.meta.isAdmin === true && authStore.getPermission === false)"
				></template>
				<template v-else>
					<q-item clickable @click="handlePageMove(currentMenu)">
						<q-item-section class="menu-list-section">
							<q-item-label>
								{{ currentMenu.meta.title }}
							</q-item-label>
						</q-item-section>
					</q-item>
				</template>
			</template>
		</q-list>
	</q-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import router from '@/router';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

const props = defineProps({ parentMenu: Object, isShow: Boolean });
const parentMenu = computed(() => props.parentMenu?.children);
const isShow = computed(() => props.isShow);

const handlePageMove = (currentMenu: any) => {
	router.push(currentMenu.path);
};
</script>

<style></style>

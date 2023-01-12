<template>
	<q-layout view="hHh Lpr lFf" class="app-wrapper">
		<!-- <BaseDrawer /> -->
		<BaseSideBar />
		<q-page-container class="app-container">
			<router-view />
			<q-dialog v-model="uiStore.start" persistent>
				<q-card>
					<img src="../assets/images/teemo.png" alt="" />
					<q-card-section class="row items-center">
						<h6 class="q-ml-sm">
							현재 시각 : {{ uiStore.currentDate }} <br />
							<span>출근 등록을 하시겠습니까?</span>
						</h6>
					</q-card-section>

					<q-card-actions align="right">
						<q-btn flat label="등록" color="primary" />
						<q-btn flat label="취소" color="primary" v-close-popup />
					</q-card-actions>
				</q-card>
			</q-dialog>

			<q-dialog v-model="uiStore.end" persistent>
				<q-card>
					<img src="../assets/images/teemo.png" alt="" />
					<q-card-section class="row items-center">
						<h6 class="q-ml-sm">
							현재 시각 : {{ uiStore.currentDate }} <br />
							<span>퇴근 등록을 하시겠습니까?</span>
						</h6>
					</q-card-section>

					<q-card-actions align="right">
						<q-btn flat label="등록" color="primary" />
						<q-btn flat label="취소" color="primary" v-close-popup />
					</q-card-actions>
				</q-card>
			</q-dialog>
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue';
import BaseDrawer from '../components/BaseDrawer.vue';
import BaseSideBar from '../components/BaseSideBar.vue';
import ProfileBox from '@/components/ProfileBox.vue';
import { useUiStore } from '@/store/ui';
import { log } from 'console';
import { computed } from 'vue';

const props = defineProps({ currentDate: Object });
const currentDate = computed(() => props.currentDate);
const uiStore = useUiStore();

const startShowValue = (flag: boolean) => {
	uiStore.start = flag;
	console.log(uiStore.start + ': start');
};

const endShowValue = (flag: boolean) => {
	uiStore.end = flag;
	console.log(uiStore.end + ': end');
};
</script>

<style scoped lang="scss">
.items-center {
	text-align: center;
}

.q-card {
	width: 25%;
	.q-card-section {
		text-align: center;
	}
}
</style>

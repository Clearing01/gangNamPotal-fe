<template>
	<q-dialog v-model="uiStore.start" persistent>
		<q-card>
			<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="60%" viewBox="0 0 24 24" width="100%" fill="#000000">
				<path d="M0 0h24v24H0z" fill="none" />
				<path
					d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
				/>
			</svg>
			<q-card-section class="row items-center">
				<p class="start">출근</p>
				<p class="q-ml-sm">
					현재 시각 : {{ uiStore.currentDate }} <br />
					<span>출근 등록을 하시겠습니까?</span>
				</p>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat label="등록" color="primary" />
				<q-btn flat label="취소" color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>

	<q-dialog v-model="uiStore.end" persistent>
		<q-card>
			<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="60%" viewBox="0 0 24 24" width="100%" fill="#000000">
				<path d="M0 0h24v24H0z" fill="none" />
				<path
					d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
				/>
			</svg>
			<q-card-section class="row items-center">
				<p class="end">퇴근</p>
				<p class="q-ml-sm">
					현재 시각 : {{ uiStore.currentDate }} <br />
					<span>퇴근 등록을 하시겠습니까?</span>
				</p>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat label="등록" color="primary" />
				<q-btn flat label="취소" color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
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

<style lang="scss">
.items-center {
	text-align: center;
}

.q-card {
	width: 25%;
	.start {
		width: 100%;
		color: blue;
	}
	.end {
		width: 100%;
		color: red;
	}
	p {
		font-size: 30px;
	}
	.q-ml-sm {
		width: 100%;
		font-size: 20px;
	}
}
</style>

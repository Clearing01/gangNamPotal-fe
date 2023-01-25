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
				<q-btn flat label="등록" color="primary" @click="insertStartCommute" v-close-popup />
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
				<q-btn flat label="등록" color="primary" @click="insertEndCommute" v-close-popup />
				<q-btn flat label="취소" color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
import { useUiStore } from '@/store/ui';
import { log } from 'console';
import { computed, ref } from 'vue';
import hrService from '@/service/hrService';
import { Notify } from 'quasar';

const props = defineProps({ currentDate: Object });
const currentDate = computed(() => props.currentDate);
const uiStore = useUiStore();

interface Notification {
	caption: string;
	type: string;
	icon: string;
	classes: string;
	timeout: number;
	message?: string;
}

const date = ref({
	date: '',
});

const startShowValue = () => {
	console.log(uiStore.start + ': start');
	console.log(date.value);
};

const endShowValue = () => {
	console.log(uiStore.end + ': end');
};

const insertStartCommute = async () => {
	await uiStore.showLoading();
	try {
		date.value.date = uiStore.currentDate;
		console.log(date.value);
		const response = await hrService.insertStartCommute(date.value);

		successNotify(response.data.message);
	} catch (error: any) {
		uiStore.hideLoading();
	} finally {
		uiStore.hideLoading();
	}
};

const insertEndCommute = async () => {
	await uiStore.showLoading();
	try {
		date.value.date = uiStore.currentDate;
		const response = await hrService.insertEndCommute(date.value);

		successNotify(response.data.message);
	} catch (error: any) {
		uiStore.hideLoading();
	} finally {
		uiStore.hideLoading();
	}
};

const successNotify = (message: string) => {
	let notify: Notification = {
		caption: message,
		type: 'positive',
		icon: 'info',
		classes: 'app-notify',
		timeout: 3,
	};

	Notify.create(notify);
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

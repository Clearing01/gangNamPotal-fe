<template>
	<q-dialog v-model="show" class="app-dialog" style="widows: 530px" @hide="onDialogHide">
		<q-card>
			<q-card-section class="dialog-header" style="height: 12px; padding: 0"></q-card-section>
			<q-card-section class="dialog-body scroll" style="width: 540px">
				<div class="circle">
					<q-icon name="icon-error-outline" size="32px" color="negative"></q-icon>
				</div>
				<div class="text-center app-label" style="margin-bottom: 4px">Error Message</div>
				<q-separator class="q-my-lg"></q-separator>

				<div class="item-wrapper">
					<p class="text-error-message">status : {{ dialog.status }}</p>
					<p class="text-error-message">message : {{ dialog.message }}</p>
				</div>
			</q-card-section>
			<q-card-actions align="right">
				<q-btn class="app-btn" outline unelevated text-color="grey-6" @click="close" :ripple="false">
					<span>close</span>
				</q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useUiStore } from '@/store/ui';
import router from '@/router';
import { useAuthStore } from '@/store/auth';

const uiStore = useUiStore();
const authStore = useAuthStore();

const show = ref(true);
const dialog = computed(() => uiStore.getDialog);
const onDialogHide = () => {
	uiStore.hideDialog();
};

const close = async () => {
	uiStore.hideDialog();

	router.push('/login');
};
</script>

<style scoped lang="scss">
.circle {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: rgba(242, 77, 67, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto 12px;
}

.dialog-header:before {
	background: $error;
}

.text-error-message {
	font-size: 20px;
}
</style>

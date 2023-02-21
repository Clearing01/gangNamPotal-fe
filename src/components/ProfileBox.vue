<template>
	<div class="menu-profile-wrapper">
		<template v-if="1 !== 1">
			<img class="img-cursor" :src="profile.img" alt="" @click="employeeDetailMove" />
		</template>
		<template v-else>
			<img :src="employeeData.profileImg" alt="" @click="employeeDetailMove" style="cursor: pointer" />
		</template>
		<div class="profile-name mt-12 mb-6">
			{{ employeeData.nameKr }}
		</div>
		<div class="profile-info flex justify-center items-center">
			{{ employeeData.departmentName }}
			<q-separator class="app-divider" vertical />
			{{ employeeData.rank }}
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/store/ui';
import hrService from '@/service/hrService';

const router = useRouter();
const uiStore = useUiStore();

const employeeData = ref({
	address: '',
	affiliationName: '',
	birthday: '',
	departmentName: '',
	email: '',
	employeeId: 0,
	employeeNo: 0,
	gen: 0,
	gender: '',
	joinDate: '',
	nameEn: '',
	nameKr: '',
	phone: '',
	profileImg: '',
	rank: '',
	role: '',
});

const onMypage = async () => {
	const My = await getMy();
	employeeData.value = My;
};

const getMy = async () => {
	await uiStore.showLoading();
	try {
		const response = await hrService.getMy();
		const result = response.data.data;

		return result;
	} catch (error) {
	} finally {
		uiStore.hideLoading();
	}
};

const employeeDetailMove = () => {
	router.push('/hr/management/mypage');
};

onMounted(() => {
	onMypage();
});
</script>

<style scoped lang="scss">
.menu-profile-wrapper {
	margin-bottom: 30px;
	width: 100%;
	text-align: center;
	img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
	}
	.profile-name {
		color: $blue-gray-11;
		font-size: $font-06;
		line-height: $font-20;
		font-weight: 700;
	}
	.profile-info {
		font-size: $font-02;
		line-height: $font-06;
		color: $blue-gray-9;
	}
	.app-divider {
		height: 10px;
		margin: 3px 7px;
	}
	.btn-gradient {
		width: 188px;
	}
}

.img-cursor {
	cursor: pointer;
}
</style>

<template>
	<div class="menu-profile-wrapper">
		<template v-if="1 !== 1">
			<!-- "profile.img -->
			<!-- 수정 필요 : image path 조정 -->
			<img class="img-cursor" :src="profile.img" alt="" @click="employeeDetailMove" />
		</template>
		<template v-else>
			<!-- <img :src="require(`@/assets/images/티모.png`)" alt="" /> -->
			<img src="../assets/images/teemo.png" alt="" @click="employeeDetailMove" style="cursor: pointer" />
		</template>
		<div class="profile-name mt-12 mb-6">
			박민호
			<!-- {{profile.name}} -->
		</div>
		<div class="profile-info flex justify-center items-center">
			개발
			<!-- {{profile.dept}} -->
			<q-separator class="app-divider" vertical />
			선임
			<!-- {{profile.position}} -->
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const employeeDetailMove = () => {
	router.push('/hr/management/mypage');
	// router.push(`/hr/management/current/detail/${employeeId}`)
};
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

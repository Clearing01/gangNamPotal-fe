<template>
	<q-drawer side="left" bordered class="app-menu-wrapper" :width="200" :breakpoint="500" show-if-above>
		<ProfileBox />
		<q-separator class="app-divider" />
		<BaseDrawer />
		<q-separator class="app-divider" />
		<div class="menu-alarm-wrapper flex justify-between items-center mt-16" @click="handleLogout()">
			<!-- @click="handleLogout()" -->
			<div class="menu-title logout">
				<q-icon name="icon-login" class="mr-8" />
				로그아웃
			</div>
		</div>
		<div>
			<div class="button-wrapper start">
				<q-btn class="app-btn btn-basic btn-primary" flat @click="startShowValue(true)">출근</q-btn>
			</div>
			<div class="button-wrapper end">
				<q-btn class="app-btn btn-basic btn-primary" flat @click="endShowValue(true)">퇴근</q-btn>
			</div>
		</div>
	</q-drawer>
</template>

<script setup lang="ts">
import ProfileBox from '@/components/ProfileBox.vue';
import BaseDrawer from '@/components/BaseDrawer.vue';
import router from '@/router';
import { ref } from 'vue';
import { useUiStore } from '@/store/ui';

const uiStore = useUiStore();

const startShowValue = (flag: boolean) => {
	uiStore.start = flag;
	currentDate();
};

const endShowValue = (flag: boolean) => {
	uiStore.end = flag;
	currentDate();
};

const currentDate = () => {
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var hours = ('0' + today.getHours()).slice(-2);
	var minutes = ('0' + today.getMinutes()).slice(-2);
	var seconds = ('0' + today.getSeconds()).slice(-2);

	var dateString = year + '-' + month + '-' + day;
	var timeString = hours + ':' + minutes + ':' + seconds;

	uiStore.currentDate = dateString + ' ' + timeString;
};

const handleLogout = () => {
	//   store.dispatch("authority/logout");
	//   window.localStorage.removeItem('profile');
	router.push('/login');
};
</script>

<style scoped lang="scss">
.logout {
	margin-bottom: 30px;
}

.start {
	.app-btn {
		width: 100%;
		margin-bottom: 10px;
	}
}

.end {
	.app-btn {
		width: 100%;
		background: rgb(236, 7, 7);
		&:hover {
			background: rgb(194, 45, 45);
		}
	}
}

.menu-alarm-wrapper {
	width: 100%;
	height: 40px;
	border-radius: 8px;
	padding: 8px 12px;
	cursor: pointer;
	.menu-title {
		font-weight: 500;
		font-size: $font-04;
		color: $blue-gray-10;
		line-height: $font-08;
	}
	.icon-notifications,
	.icon-login {
		color: $blue-gray-7;
		font-size: $font-08;
		vertical-align: bottom;
	}
	&:hover {
		background: $blue-gray-1;
	}
}

.announce-container {
	.app-announce-wrapper {
		width: 460px;
		background: $blue-gray-0;
		.announce-list {
			max-height: 62vh;
			overflow-y: auto;
		}
		.no-data {
			width: 100%;
			height: 62vh;
			.text {
				font-size: $font-04;
				line-height: $font-08;
				color: $blue-gray-7;
			}
		}
	}
}

@media (max-height: 1050px) {
	.announce-container {
		.app-announce-wrapper {
			.announce-list,
			.no-data {
				max-height: 52vh;
			}
		}
	}
}

@media (max-height: 720px) {
	.announce-container {
		.app-announce-wrapper {
			.announce-list,
			.no-data {
				max-height: 32vh;
			}
		}
	}
}
</style>

<style lang="scss">
.announce-container {
	max-height: none !important;
}
</style>

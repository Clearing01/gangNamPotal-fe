<template>
	<q-drawer side="left" bordered class="app-menu-wrapper" :width="200" :breakpoint="500" show-if-above>
		<ProfileBox />
		<q-separator class="app-divider" />
		<BaseDrawer />
		<q-separator class="app-divider" />
		<div class="menu-alarm-wrapper flex justify-between items-center mt-16"
			@click="handleLogout()"
		>
			<!-- @click="handleLogout()" -->
			<div class="menu-title">
				<q-icon name="icon-login" class="mr-8" />
				로그아웃
			</div>
		</div>
	</q-drawer>
</template>

<script setup lang="ts">
import ProfileBox from '@/components/ProfileBox.vue';
import BaseDrawer from '@/components/BaseDrawer.vue';
import router from '@/router'

const handleLogout = () => {
//   store.dispatch("authority/logout");
//   window.localStorage.removeItem('profile');
  router.push('/login');
}
</script>

<style scoped lang="scss">
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

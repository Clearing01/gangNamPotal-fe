<template>
	<q-drawer side="left" bordered class="app-menu-wrapper" :width="200" :breakpoint="500" show-if-above>
		<ProfileBox />
		<div class="btn-wrapper">
			<q-btn class="app-btn btn-basic btn-primary start" flat @click="startShowValue(true)">출근</q-btn>
			<q-btn class="app-btn btn-basic btn-primary end" flat @click="endShowValue(true)">퇴근</q-btn>
		</div>
		<q-separator class="app-divider" />
		<BaseDrawer />
		<q-separator class="app-divider" />
		<div class="menu-alarm-wrapper flex justify-between items-center mt-16" @click="logout()">
			<!-- @click="handleLogout()" -->
			<div class="menu-title logout">
				<q-icon name="icon-login" class="mr-8" />
				로그아웃
			</div>
		</div>

		<div class="etc-wrapper">
			<div>
				<p class="weather-display-info" @click="setShowWeather">
					<template v-if="isShowWeather">
						<q-icon name="arrow_drop_up" class="more-icon" />
					</template>
					<template v-else>
						<q-icon name="arrow_drop_down" class="more-icon" />
					</template>
					날씨 정보
				</p>

				<q-card class="weather-wrapper">
					<template v-if="isShowWeather">
						<div class="">
							<q-inner-loading
								:showing="weatherVisible"
								label="Please wait..."
								label-class="text-teal"
								label-style="font-size: 1.1em"
								style="background-color: white; border-radius: 10px"
							/>
							<div class="weather-datetime-wrapper">
								<p>
									{{ weatherInfo.date }} {{ weatherInfo.time }}시 기준
									<span @click="getLocation"><q-icon name="refresh" class="refresh-icon" /></span>
								</p>
							</div>

							<div class="weather-temperature-wrapper">
								<img class="weather-image" v-bind:src="getWeatherImageSrc(weatherInfo)" alt="image" />
								<span class="weather-temperature">{{ weatherInfo.tmp }} ℃</span>
							</div>
							<div class="weather-temperature-wrapper">
								<img class="weather-image" src="https://i.ibb.co/d0zJZv8/image.png" alt="image" />
								<span class="weather-temperature">{{ weatherInfo.wsd }} m/s</span>
							</div>

							<div class="weather-addition-wrapper">
								<template v-if="weatherInfo.pop !== '0'">
									<div class="weather-addition">강수확률 : {{ weatherInfo.pop }} %</div>
								</template>

								<template v-if="weatherInfo.pcp !== '강수없음'">
									<div class="weather-addition">강수량 : {{ weatherInfo.pcp }} mm</div>
								</template>

								<template v-if="weatherInfo.sno !== '적설없음'">
									<div class="weather-addition">적설량 : {{ weatherInfo.sno }} cm</div>
								</template>
							</div>
						</div>
					</template>
				</q-card>
			</div>

			<div>
				<p class="weather-display-info" @click="setShowSubway">
					<template v-if="isShowSubway">
						<q-icon name="arrow_drop_up" class="more-icon" />
					</template>
					<template v-else>
						<q-icon name="arrow_drop_down" class="more-icon" />
					</template>
					강남 지하철 정보
				</p>

				<q-card class="weather-wrapper">
					<template v-if="isShowSubway">
						<div class="addition-info-wrapper">
							<div class="">
								<q-inner-loading
									:showing="subwayVisible"
									label="Please wait..."
									label-class="text-teal"
									label-style="font-size: 1.1em"
									style="background-color: white; border-radius: 10px"
								/>
								<div class="weather-datetime-wrapper">
									<p>
										{{ subwayInfoList.baseDateTime }} 기준
										<span @click="getSubwayInfo"><q-icon name="refresh" class="refresh-icon" /></span>
									</p>
								</div>

								<div class="subway-body-wrapper">
									<template v-for="subwayInfo in subwayList" :key="subwayInfo.direction">
										<div class="subway-body-content">
											<template v-if="subwayInfo.direction !== '없음'">
												<template v-if="subwayInfo.direction === '교대방면' || subwayInfo.direction === '역삼방면'">
													<p class="subway-direction station2">{{ subwayInfo.direction }}</p>
												</template>
												<template v-else>
													<p class="subway-direction stationNew">{{ subwayInfo.direction }}</p>
												</template>
												<template v-for="arriveTime in subwayInfo.time" :key="arriveTime">
													<p>{{ arriveTime }}</p>
												</template>
											</template>
											<template v-else>
												<p>없음</p>
											</template>
										</div>
									</template>
								</div>
							</div>
						</div>
					</template>
				</q-card>
				<div class="addition-wrapper" @click="setFortuneModal(true)">
					<q-icon name="auto_awesome" class="addition-icon" />
					<span class="addition-content">오늘의 운세</span>
				</div>
			</div>

			<q-dialog v-model="fortuneMessageModal">
				<div class="fortune-modal-wrapper">
					<div class="fortune-modal-close" @click="setFortuneModal(false)"><q-icon name="close" /></div>
					<div class="fortune-header-wrapper">
						<h4 class="fortune-header">오늘의 운세</h4>
						<span>믿든지 말든지~</span>
					</div>
					<div class="fortune-message-wrapper">
						<template v-if="fortuneMessage.isOpened">
							<p id="fortune-message">{{ fortuneMessage.message }}</p>
						</template>
						<template v-else>
							<q-btn @click="showMessage"><q-icon name="touch_app" class="fortune-message-open-icon" />클릭해주세요~</q-btn>
						</template>
					</div>
				</div>
			</q-dialog>
		</div>
	</q-drawer>
</template>

<script setup lang="ts">
import Vue from 'vue';
import ProfileBox from '@/components/ProfileBox.vue';
import BaseDrawer from '@/components/BaseDrawer.vue';
import { debounce } from 'lodash-es';
import router from '@/router';
import { ref, onMounted } from 'vue';
import { useUiStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import etcService from '@/service/etcService';
import authService from '@/service/authService';
import _ from 'lodash';
import { TextScramble2 } from '@/modules/util';

const authStore = useAuthStore();
const uiStore = useUiStore();

const fortuneMessageModal = ref(false);

const isShowWeather = ref(false);
const isShowSubway = ref(false);
const subwayList: any = ref([]);

const fortuneMessage = ref({
	isOpened: false,
	message: '메시지가 없습니다',
});

const weatherVisible = ref(false);
const showWeaterSimulatedReturnData = ref(false);

const subwayVisible = ref(false);
const showSubwaySimulatedReturnData = ref(false);

const subwayInfoList = ref({
	baseDateTime: '',
	subwayInfo: [
		{
			direction: '없음',
			time: '없음',
			currentPosition: '없음',
		},
	],
});

const weatherInfo = ref({
	date: '0', // 기준 날짜
	time: '0', // 기준 시간
	isNight: false,
	tmp: '0', // 기온(도)
	wsd: '0', // 풍속(m/s)
	pty: '', // 강수 형태(없음, 비, 비/눈, 눈, 소나기)
	sky: '', // 하늘 상태(맑음, 구름많음, 흐림)
	pop: '', // 강수 확률(%)
	pcp: '', // 강수량(mm)
	sno: '', // 신적설량(cm)
});

const logout = debounce(async () => {
	await authService.logout(authStore.getAuthorization);

	authStore.logout();
}, 300);

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
	uiStore.dateString = dateString;
	uiStore.timeString = timeString;
};

const getWeatherImageSrc = (weaterInfo: any) => {
	const pty = weaterInfo.pty;
	const sky = weaterInfo.sky;
	const isNight = weaterInfo.isNight;

	// 맑음 - 낮
	const sunnyMorning = 'https://i.ibb.co/LgXkhSb/image.png';
	// 맑음 - 밤
	const sunnyNight = 'https://i.ibb.co/LgXkhSb/image.png';
	// 구름많음 - 낮
	const cloudsMorning = 'https://i.ibb.co/MgwT2nM/image.png';
	// 구름많음 - 밤
	const cloudsNight = 'https://i.ibb.co/QrK4GTY/image.png';
	// 흐림 - 낮
	const fogMorning = 'https://i.ibb.co/V2PpgYC/image.png';
	// 흐림 - 밤
	const fogNight = 'https://i.ibb.co/LgXkhSb/image.png';
	// 비/소나기 - 낮
	const rainMorning = 'https://i.ibb.co/XXnTVcN/image.png';
	// 비/소나기 - 밤
	const rainNight = 'https://i.ibb.co/bFK4jvL/image.png';
	// 비/눈 - 낮
	const rainSnowMorning = 'https://i.ibb.co/nrMnnvt/image.png';
	// 비/눈 - 밤
	const rainSNowNight = 'https://i.ibb.co/nj0T8zS/image.png';
	// 눈 - 낮
	const snowMorning = 'https://i.ibb.co/BNSkCWg/image.png';
	// 눈 - 낮
	const snowNight = 'https://i.ibb.co/jbTk8Bq/image.png';

	if (pty === '없음') {
		if (sky === '맑음') {
			if (isNight === false) {
				return sunnyMorning;
			} else {
				return sunnyNight;
			}
		} else if (sky === '구름 많음') {
			if (isNight === false) {
				return cloudsMorning;
			} else {
				return cloudsNight;
			}
		} else if (sky === '흐림') {
			if (isNight === false) {
				return fogMorning;
			} else {
				return fogNight;
			}
		}
	} else if (pty === '비' || pty === '소나기') {
		if (isNight === false) {
			return rainMorning;
		} else {
			return rainNight;
		}
	} else if (pty === '비/눈') {
		if (isNight === false) {
			return rainSnowMorning;
		} else {
			return rainSNowNight;
		}
	} else if (pty === '눈') {
		if (isNight === false) {
			return snowMorning;
		} else {
			return snowNight;
		}
	}
};

const getLocation = async () => {
	onRequest();
};

const getSubwayInfo = async () => {
	subwayVisible.value = true;
	showSubwaySimulatedReturnData.value = false;

	try {
		const response = await etcService.getSubwayInfo();
		const result = response.data.data;

		subwayInfoList.value = result;

		setSubwayList();
		return result;
	} catch (error: any) {
	} finally {
		subwayVisible.value = false;
		showSubwaySimulatedReturnData.value = true;
	}
};

const setSubwayList = () => {
	let list = _.cloneDeep(subwayInfoList.value.subwayInfo);
	let cloneList: any = [];

	const set = new Set(list.map((station) => station.direction));

	const directionList = [...set];

	directionList.forEach((direction) => {
		const timeList = list.filter((obj) => obj.direction === direction).map((obj) => obj.time);

		cloneList.push({
			direction,
			time: timeList,
		});
	});

	subwayList.value = cloneList;
};

const onRequest = async () => {
	const weaterInfo = await getWeatherInfo();

	weatherInfo.value = weaterInfo;
};

const getWeatherInfo = async () => {
	weatherVisible.value = true;
	showWeaterSimulatedReturnData.value = false;

	try {
		const response = await etcService.getWeatherInfo();
		const result = response.data.data;

		return result;
	} catch (error: any) {
		const notification = {
			caption: '위치 정보를 찾을 수 없습니다.',
			type: 'negative',
			icon: 'warning',
			classes: 'app-notify',
			timeout: 3,
		};
		uiStore.showNotification(notification);
	} finally {
		weatherVisible.value = false;
		showWeaterSimulatedReturnData.value = true;
	}
};

const setFortuneModal = (flag: boolean) => {
	fortuneMessageModal.value = flag;
};

const getFortuneMessage = async () => {
	try {
		const response = await etcService.getFortuneInfo();
		const result = response.data.data;

		fortuneMessage.value = result;
	} catch (error: any) {}
};

const showMessage = async () => {
	const result = await getFortuneMessage();

	fortuneMessage.value.isOpened = true;
	setTimeout(() => {
		const el = document.getElementById('fortune-message');
		if (el) {
			const textScramble = new TextScramble2(el);
			textScramble.setText(fortuneMessage.value.message);
		}
	}, 0);
};

const setShowWeather = () => {
	isShowWeather.value = !isShowWeather.value;

	if (isShowWeather.value === true) {
		getLocation();
	}
};

const setShowSubway = () => {
	isShowSubway.value = !isShowSubway.value;

	if (isShowSubway.value === true) {
		getSubwayInfo();
	}
};

onMounted(() => {
	getLocation();
});
</script>

<style scoped lang="scss">
.station2 {
	color: rgb(2, 139, 2);
}
.stationNew {
	color: rgb(192, 73, 73);
}
.logout {
	margin-bottom: 30px;
}

.btn-wrapper {
	display: flex;
	margin: 0px;
	.start {
		width: 48%;
		margin-right: 1%;
	}

	.end {
		width: 48%;
		background: rgb(236, 7, 7);
		&:hover {
			background: rgb(194, 45, 45);
		}
	}
}

.etc-wrapper {
	padding-top: 50px;
}

.weather-display-info {
	cursor: pointer;
	font-size: 14px;
	margin: 0px;
	margin-top: 20px;
	color: #4d586f;
}

.more-icon {
	font-size: 1.5rem;
}

.weather-datetime-wrapper > p {
	margin: 0px;
	font-size: 0.7rem;
	padding: 10px 0px;
}

.weather-wrapper {
	border: 1px solid grey;
	width: 100%;
	// height: 200px;
	// background-color: rgb(48,48,48);
	border-radius: 10px;
	color: #4d586f;

	// background-color: #f7f9fc;
}

.addition-info-wrapper {
	// margin-top: 20px;
	border-radius: 10px;
}

.subway-header-wrapper {
	text-align: center;
	margin-top: 10px;
	margin-bottom: 15px;
}
.subway-body-wrapper {
	// margin-left: 5px;

	font-size: 0.8rem;
}

.subway-body-content {
	padding-top: 10px;
	padding-bottom: 15px;
	font-size: 14px;
	text-align: center;
	border-top: 1px solid grey;
}

.subway-body-content > p {
	margin: 0px;
	font-size: 14px;
}

.subway-direction {
	font-size: 1rem;
}

.addition-wrapper {
	margin: 15px 5px;
	margin-top: 50px;
	display: flex;
	cursor: pointer;
	justify-content: center;
}

.addition-icon {
	font-size: 1.8rem;
	padding-bottom: 10px;
}

.addition-content {
	padding-top: 5px;
	padding-left: 10px;
	color: #4d586f;
}

.weather-wrapper > p {
	margin: 0px;
	padding: 0px;
}

.weather-datetime-wrapper {
	margin-top: 2px;
	font-size: 0.7rem;
	text-align: right;
}

.refresh-icon {
	font-size: 1rem;
	color: grey;
	cursor: pointer;
}

.weather-image {
	width: 50px;
	padding-left: 4px;
	text-align: center;
}

.weather-temperature {
	padding-left: 10px;
	padding-top: 7px;
	font-size: 14px;
	text-align: center;
	width: 90px;
}

.weather-temperature-wrapper {
	width: 100%;
	font-size: 1.1rem;
	display: inline-flex;

	flex-direction: row;
	justify-content: center;
}

.weather-addition-wrapper {
	width: 100%;
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;

	// padding-top: 10px;
	font-size: 0.8rem;
}
.weather-addition {
	padding-bottom: 5px;
}

.fortune-modal-wrapper {
	width: 550px;
	// height: 500px;
	border-radius: 10px;
	background-color: white;
	border: 1px solid rgb(48, 48, 48);
	color: #4d586f;
}

.fortune-modal-close {
	float: right;
	margin: 5px 5px;
	font-size: 1.2rem;
	width: 20px;
	cursor: pointer;
}

.fortune-header-wrapper {
	margin: 20px;
	margin-bottom: 30px;
	text-align: center;
}
.fortune-header {
	margin-bottom: 10px;
}
.fortune-message-wrapper {
	margin: 10px 30px;
	margin-bottom: 30px;
	font-size: 1.1rem;
	text-align: center;
	line-height: 220%;
}

.fortune-message-open-icon {
	margin-right: 10px;
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

<template>
	<div class="app-pageheader">
		<span class="main-title">대시보드</span>
		<div class="filter-container">
			<q-select
				outlined
				dense
				:options="filter"
				v-model="selectFilter.param"
				@update:model-value="calendarFilter"
				popup-content-class="app-dropbox"
				class="app-input"
			/>
		</div>

		<!-- <div class="btn-wrapper">
			<q-btn class="app-btn btn-basic btn-primary" flat @click="calendarFilter">입력</q-btn>
		</div> -->
	</div>
	<FullCalendar ref="calendarRef" :options="calendarOptions">
		<template v-slot:eventContent="arg">
			<div class="event-content">
				<div class="circle" :style="{ background: arg.event.backgroundColor }"></div>
				<div class="event-content-title">{{ arg.event.title }}</div>
				&nbsp;
				<div class="event-content-name">
					<q-icon name="icon-notifications-active" class="mr-8" />
					<span class="startDate">{{ arg.event.extendedProps.startDate }}</span>
					&nbsp;
					<q-icon name="icon-notifications-paused" class="mr-8" />
					<span class="endDate">{{ arg.event.extendedProps.endDate }}</span>
				</div>
			</div>
		</template>
	</FullCalendar>
</template>
<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';
import { computed, onMounted, ref } from 'vue';
import { Moment } from '@/composables/util';
import moment from 'moment';

const props = defineProps({ commuteList: Array });
const propDataSet = computed(() => props.commuteList);

const emit = defineEmits(['emitCalendar']);

const filter = ref(['전체', '본인']);
const selectFilter = ref({
	param: '전체',
});

const calendarRef = ref(null);

const calendarOptions = ref({
	plugins: [
		dayGridPlugin,
		timeGridPlugin,
		interactionPlugin, // needed for dateClick
		momentPlugin,
	],
	initialView: 'dayGridMonth',
	locale: 'ko',
	headerToolbar: {
		left: 'title',
		center: '',
		right: 'prev,next',
	},
	dayMaxEventRows: 4,
	events: propDataSet,
	eventContent: '',
	customButtons: {
		prev: {
			click: async (e) => {
				calendarRef.value.getApi().prev();
				calendarFilter();
			},
		},
		next: {
			click: async (e) => {
				calendarRef.value.getApi().next();
				calendarFilter();
			},
		},
	},
});

const calendarFilter = () => {
	const date = calendarRef.value.getApi().getDate();
	const startAt = Moment.add(date, -1 * Moment.getWeekday(date));
	const endAt = Moment.add(startAt, 41);

	const startOf = moment(date).clone().startOf('month').format('YYYY-MM-DD');
	const endOf = moment(date).clone().endOf('month').format('YYYY-MM-DD');

	const year = startOf.substring(0, 4);
	const month = startOf.substring(5, 7);

	emit('emitCalendar', {
		selctFilter: selectFilter.value.param,
		year: year,
		month: month,
	});
};
onMounted(() => {
	calendarFilter();
});
</script>

<style lang="scss">
.filter-container {
	// padding-inline: 10px;
	width: 150px;
}

.main-title {
	margin-right: 2%;
}

$fc-magin-top: 16px;

.more-link {
	color: #6e98f8;
	text-decoration: underline;
	margin-left: 6px;
}

.fc-media-screen {
	background: $white;
	border-radius: 12px;
	margin-top: $fc-magin-top;
}

.circle {
	height: 6px;
	width: 6px;
	border-radius: 50%;
	background: black;
}

.event-content {
	display: flex;
	align-items: center;
	.event-content-title {
		padding-left: 6px;
		padding-right: 4px;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		color: #65728a;
	}
	.event-content-name {
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		color: #374155;
		// color: #ef7c7c;
	}
}

.fc {
	height: calc(100% - #{$fc-magin-top});

	//toolbar 영역
	.fc-toolbar.fc-header-toolbar {
		height: 56px;
		padding: 12px 24px;
		margin-bottom: 0;
		.fc-toolbar-title {
			font-family: $font-family;
			font-size: $font-20;
			line-height: $font-24;
			font-weight: 700;
			color: $blue-gray-10;
		}
		.fc-button-group {
			width: 76px;
			height: 32px;
			.fc-button {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 32px;
				height: 32px;
				margin-right: 12px;
				background: $white;
				border: 1px solid $blue-gray-4 !important;
				border-radius: 6px;
				.fc-icon {
					color: $blue-gray-7;
					font-size: $font-06;
				}
				&:hover:not(:disabled) {
					background: $blue-gray-2 !important;
				}
				&.active:not(:disabled) {
					background: $white !important;
					border: 1px solid $blue-gray-4 !important;
				}
			}
		}
	}

	//table 영역
	.fc-scrollgrid {
		border: none;

		//table-header 영역
		.fc-col-header {
			border: none;
			thead {
				tr {
					th {
						min-width: 136px;
						height: 38px;
						background: $blue-gray-1;
						border: 1px solid $blue-gray-2;
						&:first-child {
							border-left: none;
						}
						&:last-child {
							border-right: none;
						}
						.fc-scrollgrid-sync-inner {
							display: flex;
							justify-content: center;
							align-items: center;
							height: 38px;
							font-family: $font-family;
							font-size: $font-04;
							text-align: center;
							font-weight: 500;
							color: $blue-gray-8;
						}
					}
				}
			}
		}

		//table-body 영역
		tbody {
			tr {
				td {
					// overflow: hidden;
					min-width: 136px;
					min-height: 134px;
					border-color: $blue-gray-2;
					//오늘
					&.fc-day-today {
						background: linear-gradient(0deg, rgba(255, 199, 0, 0.04), rgba(255, 199, 0, 0.04)), #ffffff !important;
						/* 현재 날짜 before 색상 */
						&::before {
							content: '';
							display: block;
							width: 100%;
							height: 2px;
							background: $primary;
						}
						.fc-daygrid-day-frame {
							.fc-daygrid-day-top {
								.fc-daygrid-day-number {
									font-weight: 700;
									color: $primary-hover;
								}
							}
						}
					}
					//날짜 영역
					.fc-daygrid-day-frame {
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						height: 134px;
						font-family: $font-family;

						.fc-daygrid-day-top {
							flex-direction: row;
							.fc-daygrid-day-number {
								margin: 6px 0 4px 8px;
								font-size: $font-04;
								line-height: $font-08;
								color: $blue-gray-9;
							}
						}

						.fc-daygrid-day-events {
							margin: 0 3px 0 2px;
							.fc-daygrid-event-harness {
								.fc-daygrid-event {
									padding: 4px;
									margin: 0;
									&:hover {
										background: transparent;
									}
									// .fc-daygrid-event-dot{
									//   margin-right: 6px;
									//   border-width: 3px;
									//   border-radius: 50%;
									//   background: var(--fc-event-border-color);
									// }
									// .fc-event-title{
									//   font-size: $font-02;
									//   line-height: $font-06;
									//   font-weight: 500;
									//   // color: $blue-gray-9;
									//   text-overflow: ellipsis;
									//   white-space: nowrap;
									//   overflow: hidden;
									//   .name{
									//     margin-left: 4px;
									//     // color: $blue-gray-11;
									//   }
									// }
								}
							}
						}
					}
				}
			}
		}
	}

	// 외곽 오른쪽 border 제거
	&.fc-theme-standard {
		thead {
			tr {
				th {
					border-right: none;
				}
			}
		}
		tbody {
			tr {
				td {
					border-right: none;
				}
			}
		}
	}

	.fc-view-harness {
		flex: 1;
		.fc-popover {
			box-shadow: 3px 2px 10px 0px #0000000a;
			border: 1px solid var(--blue-gray-4);
			filter: drop-shadow(3px 2px 10px rgba(0, 0, 0, 0.04));
			border-radius: 6px;
			.fc-popover-header {
				padding: 10px 16px;
				background: var(--blue-gray-1);
				font-weight: 600;
				font-size: 14px;
				line-height: 18px;
			}
			.fc-popover-body {
				padding: 10px 12px;
				.fc-daygrid-event-harness {
					.fc-daygrid-event {
						&:hover {
							background: transparent;
						}
					}
				}
			}
		}
	}
}

// tbody {
// 	height: 700px;
// }

// .fc-daygrid-day-top ::after {
// 	margin-left: 35px;
// 	content: '출근 \00a0\00a0\00a0\00a0\00a0 퇴근';
// }
</style>

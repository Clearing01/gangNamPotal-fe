<template>
	<div class="app-table-filter-wrapper">
		<template v-if="isManagement">
			<div class="filter-wrapper">
				<div class="filter-container">
					<div class="flex items-center">
						<div class="filter-title mr-10">구분</div>
						<div>
							<q-select
								:options="titleList"
								v-model="titleList.index"
								class="app-input input-medium input-select"
								outlined
								dropdown-icon="icon-keyboard-arrow-down"
								label="선택하세요"
								popup-content-class="select-popup"
							/>
							<!-- v-model="filterData.index"
							@update:model-value="handleIndexFilter"
							:options="propDataSet?.indexList" -->
						</div>
					</div>
				</div>

				<div class="filter-container">
					<div class="flex items-center">
						<div>
							<q-input class="app-input input-medium" outlined placeholder="입력하세요" />
							<!-- v-model="input.string"
					:disable="selectedFilter?.isDisable"
					@keydown="keyupEnter($event)" -->
						</div>
					</div>
				</div>

				<div class="filter-container">
					<q-btn class="app-btn btn-basic btn-primary" flat @click="employeeUpdate()">입력</q-btn>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="filter-wrapper">
				<div class="filter-container">
					<div class="flex items-center">
						<div class="filter-title mr-10">날짜</div>
						<div>
							<q-btn class="app-input-picker input-picker-medium" flat>
								<em class="icon-calendar-today"></em>
								<span class="picker-text"> "기간을 선택하세요" </span>
								<q-popup-proxy transition-show="scale" transition-hide="scale">
									<q-date range minimal mask="YYYY-MM-DD">
										<div class="row items-center justify-end">
											<q-btn v-close-popup label="닫기" flat />
										</div>
									</q-date>
								</q-popup-proxy>
							</q-btn>
						</div>
					</div>
				</div>

				<div class="filter-container">
					<div class="flex items-center">
						<div class="filter-title mr-10">이름</div>
						<div>
							<q-input class="app-input input-medium" outlined placeholder="입력하세요" />
							<!-- v-model="input.string"
					:disable="selectedFilter?.isDisable"
					@keydown="keyupEnter($event)" -->
						</div>
					</div>
				</div>

				<div class="filter-container">
					<q-btn class="app-btn btn-basic btn-primary" flat @click="employeeUpdate()">입력</q-btn>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({ filterData: Object });
const propDataSet = computed(() => props.filterData);

const isManagement = ref(propDataSet.value.isManagement);

const titleList = ref(
	propDataSet.value.titleList.map((title) => {
		return title.label;
	})
);

console.log(propDataSet.value.isManagement);
</script>

<style scoped lang="scss">
.btn-basic {
	background: rgb(168, 167, 167);
}

.app-table-filter-wrapper {
	background: rgba(240, 243, 249, 0.8);
	border-radius: 12px;
	margin-bottom: 20px;
}
.filter-wrapper {
	width: 100%;
	padding: 16px 24px;
	.filter-container {
		display: inline-block;
		vertical-align: top;
		margin-left: 20px;
		&:first-child {
			margin-left: 0;
		}
	}
	.filter-title {
		font-size: $font-02;
		line-height: $font-06;
		color: $blue-gray-10;
		font-weight: 500;
	}
	.app-input,
	.app-input-picker {
		width: 100%;
	}
}
.option-wrapper {
	width: 100%;
	border-top: 1px solid rgba(231, 235, 243, 0.8);
	padding: 16px 24px 8px;
}
.filter-chip-wrapper {
	width: calc(100% - 97px);
}
</style>

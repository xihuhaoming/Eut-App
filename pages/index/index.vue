<template>
	<view class="content">
		<up-navbar class="top" title="待办事项" :placeholder="true">
			<template #right>
				<view class="u-nav-slot">
					<view style="position: relative;">
						<up-badge :type="type" :value="ReadCountData" :offset="[-5,-20]" :absolute="true"></up-badge>
					</view>
					<image @click="msgClick" class="msgicon" src="/static/msg.png"></image>
				</view>
			</template>
		</up-navbar>
		<up-tabs :scrollable="false" :list="list" @click="tabclick" itemStyle="height: 34rpx; margin:10rpx 0 30rpx 0;"
			inactiveStyle="font-size: 28rpx;color: #B7C4D7;" activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="u-flex filter u-col-center u-row-around">
			<!-- 时间 -->
			<up-dropdown ref="uDropdownRef" border-radius="20">
				<up-dropdown-item title="时间">
					<view class="slot-content">
						<view class="slotCon up-flex up-text-center up-content-color u-row-around up-p-t-40 up-p-b-40">
							<view class="timeView" @click="timeTan(1)">{{startTime}}</view>
							<view class="timeView" @click="timeTan(2)">{{endTime}}</view>
						</view>
						<view class="slotCon up-flex up-text-center u-row-around up-p-t-40 up-p-b-40">
							<view class="timeBtn" @click="chongzTime">重置</view>
							<view class="timeBtn2" @click="SubmitTime">确认</view>
						</view>
						<!-- <up-button type="primary" @click="closeDropdown">时间</up-button> -->
					</view>
				</up-dropdown-item>
				<!-- 类型 -->
				<up-dropdown-item title="类型">
					<view class="slot-content up-p-l-25 up-p-r-25">
						<view class="slotCon up-text-center up-content-color up-p-t-40 up-p-b-40">
							<!-- 任务 -->
							<view class="typeTitle u-flex u-col-center ">
								<view class="ttleft up-m-r-20"></view>
								<view class="ttright">任务&通知</view>
							</view>
							<hy-btn-group class="up-m-t-30 up-m-l-20" :list="typeList" v-model="typeValue" @itemClick="itemClick1"
								multiple :unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
								:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
							<!-- 工作组名称 -->
							<view class="typeTitle u-flex u-col-center up-m-t-30">
								<view class="ttleft1 up-m-r-20"></view>
								<view class="ttright">工作组名称</view>
							</view>
							<hy-btn-group class="up-m-t-30 up-m-l-20" :label="categoryName" :value="categoryId" :list="workList"
								v-model="workValue" @itemClick="itemClick" multiple
								:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
								:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>

						</view>
						<view class="slotCon up-flex up-text-center u-row-around up-p-t-40 up-p-b-40">
							<view class="timeBtn" @click="chongzTime">重置</view>
							<view class="timeBtn2" @click="SubmitTime">确认</view>
						</view>
						<!-- <up-button type="primary" @click="closeDropdown">时间</up-button> -->
					</view>
				</up-dropdown-item>
			</up-dropdown>
		</view>

		<block v-if="listData" v-for="(item,index) in listData">
			<view class="card-box u-flex up-m-t-30">
				<view class="itemIcon" v-if="item.type==0">任务</view>
				<view class="itemIcon" v-if="item.type==1">审批</view>
				<view class="itemBot up-m-l-20">
					<view class="itemType">{{item.workFlowName}}</view>
					<view class="itemCard up-m-t-20">
						<view class="cardTitle bold">{{item.formData.sendUserName}}发起的开票申请</view>
						<view class="cardxt">部门：</view>
						<view class="cardcon">{{item.formData.departName}}</view>
						<view class="cardxt">客户部门：</view>
						<view class="cardcon">{{item.formData.customerName}}</view>
						<view class="cardxt">税号：</view>
						<view class="cardcon">{{item.formData.taxNo}}</view>
						<view class="cardxt">金额：</view>
						<view class="cardcon">{{item.formData.amount}}</view>
						<view class="up-flex u-row-around up-m-t-30">
							<view class="card-btnl" v-if="item.type==0">拒绝</view>
							<view class="card-btnr" v-if="item.type==0">同意</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<up-empty v-else class="up-m-t-50" mode="list" icon="/static/ques.png"></up-empty>
		<!-- 选择时间 -->
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow1"
			v-model="startTime" mode="date" placeholder="开始时间" @confirm="confirm1"
			@cancel="timeshow1 = false"></up-datetime-picker>
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow2"
			v-model="endTime" mode="date" placeholder="结束时间" @confirm="confirm2"
			@cancel="timeshow2 = false"></up-datetime-picker>
	</view>
</template>

<script setup>
	import {
		timeFrom
	} from '@/uni_modules/uview-plus';
	import {
		API_getListByType,
		API_getWorkGroupList
	} from '../../api/home.js'
	import {
		noticeUnReadCount
	} from '../../api/user.js'
	import {
		onReachBottom,
		onLoad,
		onReady
	} from "@dcloudio/uni-app"
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const list = reactive([{
			name: '我的待办'
		},
		{
			name: '已处理'
		},
		{
			name: '已拒绝'
		},

	]);
	const typeList = reactive([{
		label: '任务',
		value: 0
	}, {
		label: '通知',
		value: 1
	}]);

	const workList = ref([]);
	// const workList2 = reactive([{
	// 		label: '采购流程',
	// 		value: 1
	// 	}, {
	// 		label: '入库流程',
	// 		value: 2
	// 	},
	// 	{
	// 		label: '合同流程',
	// 		value: 3
	// 	}
	// ]);
	const typeValue = reactive([])
	const workValue = reactive([])
	const workValue2 = reactive([])
	const uDropdownRef = ref(null)
	const startTime = ref('开始时间')
	const endTime = ref('结束时间')
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);
	const pageNum = ref(1)
	const listData = ref([])
	const ReadCountData = ref()
	const typeValueData = ref()
	onReady(() => {

	})
	// 初始化
	onMounted(() => {})
	onLoad(() => {
		worklistData();
		noticeData();
		WorkGroupListFn();
	})
	onReachBottom(() => {
		console.log("触底")
	})
	const WorkGroupListFn = () => {
		API_getWorkGroupList().then(res => {
			console.log(res.data)
			res.data.forEach((item, index) => {
				// console.log(item)
				item.label = item.categoryName
				item.value = item.categoryId
			})
			workList.value.push(...res.data)

			console.log(workList.value)
		})
	}
	// 未读消息
	const noticeData = () => {
		noticeUnReadCount().then(res => {
			console.log(res)
			ReadCountData.value = res.data
		})
	}
	// 列表
	const worklistData = () => {
		let workGroupId = workValue.join(',')
		let noticeTypes = typeValue.join(',')
		// console.log(startTime.value,endTime.value)
		let startTimeData, endTimeData;
		startTimeData = startTime.value
		endTimeData = endTime.value
		if (startTime.value == '开始时间') {
			startTimeData = ""
		}
		if (endTime.value == '结束时间') {
			endTimeData = ""
		}

		API_getListByType({
			startTime: startTimeData,
			endTime: endTimeData,
			workGroupId: workGroupId,
			type: typeValueData.value,
			noticeTypes: noticeTypes
		}).then(res => {
			listData.value = res.data
			// listData.value.push(...res.data)
			console.log(res)
		})
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e.index)
		typeValueData.value = e.index
		worklistData();
	}
	// 消息跳转
	const msgClick = () => {
		uni.navigateTo({
			url: "/pages/index/msg/msg"
		})
	}
	// 关闭
	const closeDropdown = () => {
		// this.$refs.uDropdownRef.close();
		uDropdownRef.value.close()
	}
	// 选择类型
	const itemClick1 = (e) => {
		console.log(e)
	}
	// 选择时间
	const timeTan = (e) => {
		if (e == 1) {
			timeshow1.value = true
		} else {
			timeshow2.value = true
		}
	}
	const confirm1 = (e) => {
		startTime.value = formatTimestamp(e.value)
		timeshow1.value = false;
	}
	const confirm2 = (e) => {
		endTime.value = formatTimestamp(e.value)
		timeshow2.value = false;
	}
	// 时间重置
	const chongzTime = () => {
		startTime.value = "开始时间"
		endTime.value = "结束时间"
		typeValue.length = 0;
		workValue.length = 0;
		workValue2.length = 0;
	}
	// 时间确定
	const SubmitTime = () => {
		// console.log(workValue)
		worklistData();
		uDropdownRef.value.close()
		typeValue.length = 0;
		workValue.length = 0;
		workValue2.length = 0;
		startTime.value = "开始时间";
		endTime.value = "结束时间";

	}
	// 转换时间戳
	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
</script>

<style scoped lang="scss">
	::v-deep .u-navbar__content__left {
		display: none !important;
	}

	::v-deep .u-navbar__content__right {
		right: 20rpx;
	}

	::v-deep .u-dropdown {
		top: 2px;
	}

	::v-deep .u-tabs {
		background: #fff;
	}

	page {
		background: #F6F8FA;
	}

	.top {
		position: relative !important;
		z-index: 99 !important;
	}

	.content {
		.msgicon {
			width: 40rpx;
			height: 40rpx;
		}

		.filter {
			width: 100%;
			height: 100rpx;
			background: #fff;
			color: #092D5C;
		}

		.text-area {
			display: flex;
			justify-content: center;
		}

		.title {
			font-size: 36rpx;
			color: #8f8f94;
		}


	}

	.slot-content {
		background: #fff;

		.timeView {
			padding: 18rpx 85rpx;
			background: #F5F7FB;
			font-size: 24rpx;
			color: #5A78A0;
			border-radius: 34rpx;
		}

		.timeBtn {
			font-size: 28rpx;
			color: #3C82FE;
			padding: 24rpx 120rpx;
			background: #F6F8FC;
			border-radius: 49rpx;
		}

		.timeBtn2 {
			font-size: 28rpx;
			color: #fff;
			padding: 24rpx 120rpx;
			background: #3C82FE;
			border-radius: 49rpx;
		}

		.typeTitle {
			font-size: 30rpx;
			color: #092D5C;

			.ttleft {
				width: 12rpx;
				height: 12rpx;
				background: linear-gradient(53deg, #FFC46F 0%, #FEAC49 100%);
				box-shadow: 0rpx 2rpx 6rpx 0rpx #FEAC49;
			}

			.ttleft1 {
				width: 12rpx;
				height: 12rpx;
				background: linear-gradient(53deg, #6FB8FF 0%, #3C82FE 100%);
				box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(60, 130, 254, 0.3);
			}
		}
	}

	.btn-group-item {
		font-size: 24rpx !important;
		border-radius: 34rpx !important;
	}

	.card-box {
		padding: 35rpx;

		.itemIcon {
			width: 80rpx;
			height: 80rpx;
			background: #FEAC49;
			border-radius: 60rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
			flex-shrink: 0;
		}

		.itemType {
			font-size: 28rpx;
			color: #092D5C;
		}

		.itemCard {
			background: #FFFFFF;
			padding: 35rpx;
			box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
			border-radius: 10rpx;
			width: 500rpx;

			/* height:625rpx; */
			.cardTitle {
				font-size: 36rpx;
				color: #092D5C;
			}

			.cardxt {
				font-size: 28rpx;
				color: #B7C4D7;
				line-height: 50rpx;
			}

			.cardcon {
				font-size: 28rpx;
				color: #5A78A0;
				line-height: 40rpx;
			}

			.card-btnl {
				width: 231rpx;
				height: 64rpx;
				background: #F6F8FC;
				border-radius: 49rpx;
				font-size: 28rpx;
				color: #3C82FE;
				line-height: 64rpx;
				text-align: center;
			}

			.card-btnr {
				width: 231rpx;
				height: 64rpx;
				background: #3C82FE;
				box-shadow: 0rpx 4rpx 11rpx 0rpx rgba(60, 130, 254, 0.3);
				border-radius: 49rpx;
				font-size: 28rpx;
				color: #ffffff;
				line-height: 64rpx;
				text-align: center;
			}
		}
	}
</style>
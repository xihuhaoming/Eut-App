<!-- 完成情况 -->
<template>
	<view>
		<up-navbar title="完成情况" :placeholder="true" :autoBack="true" />

		<view class="up-p-t-20" style="background:#ffffff;">
			<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="keyword" :showAction="false" bgColor="#F6F8FC"
				height="40"></up-search>
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
								<!-- 工作组名称 -->
								<view class="typeTitle u-flex u-col-center up-m-t-0">
									<view class="ttleft1 up-m-r-20"></view>
									<view class="ttright">工作组名称</view>
								</view>
								<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList" v-model="workValue" @itemClick="itemClick1"
									:multiple="false" :unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
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
		</view>
		<view class="taskbox">
			<!-- <block v-if="listData.value?.length"> -->
			<view class="taskItem up-m-t-30" v-for="(item,index) in listData" :key="index">
				<view class="u-flex u-row-between u-col-center">
					<view class="itleft" style="width:120rpx">{{item.userName}}</view>
					<view class="itleft2" v-if="item.status==0" style="background-color:#3C82FE;">待完成</view>
					<view class="itleft2" v-if="item.status==2" style="background-color:#1CAA42;">已确认</view>
					<view class="itleft2" v-if="item.status==1" style="background-color:#FEAC49;">待确认</view>
					<view class="itleft2" v-if="item.status==3">退回</view>

					<view class="itright up-m-l-20">{{item.completeTime}}</view>
					<view class="itright2" @click="chak(item.taskReplyId)">查看</view>
				</view>
			</view>
			<!-- </block>
			<up-empty v-else class="up-m-t-50" mode="list" icon="/static/ques.png"></up-empty> -->
		</view>


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
		API_taskReplyList
	} from '/api/task.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const typeList = reactive([{
		label: '任务',
		value: 1
	}, {
		label: '通知',
		value: 2
	}]);

	const workList = reactive([{
			label: '待完成',
			value: 0
		}, {
			label: '待确认',
			value: 1
		},
		{
			label: '已完成',
			value: 2
		},
		{
			label: '驳回',
			value: 3
		},
	]);
	const listData = ref([])
	const typeValue = reactive([])
	const workValue = reactive([])
	const uDropdownRef = ref(null)
	const startTime = ref('开始时间')
	const endTime = ref('结束时间')
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);
	const taskId = ref()
	const keyword = ref('')
	onLoad((e) => {
		taskId.value = e.taskId
		ReplyList();
	})
	const chak = (taskReplyId) => {
		uni.navigateTo({
			url: '/pages/work/task/commit?taskReplyId=' + taskReplyId
		})
	}
	const ReplyList = () => {
		console.log(taskId)
		let startTimeData, endTimeData;
		startTimeData = startTime.value
		endTimeData = endTime.value
		if (startTime.value == '开始时间') {
			startTimeData = ""
		}
		if (endTime.value == '结束时间') {
			endTimeData = ""
		}
		console.log(workValue.value)
		API_taskReplyList({
			taskId: taskId.value,
			searchParam: keyword.value,
			status: workValue.value,
			startDate: startTimeData,
			endDate: endTimeData
		}).then(res => {
			console.log(res)
			listData.value = res.data
		})
	}
	// 新增任务
	const addnavTap = (url) => {
		uni.navigateTo({
			url: url
		})
	}

	// 关闭筛选框
	const closeDropdown = () => {
		// this.$refs.uDropdownRef.close();
		uDropdownRef.value.close()
	}
	// 选择类型
	const itemClick1 = (e) => {
		console.log(e)
		workValue.value = e.val
	}
	// 选择时间
	const timeTan = (e) => {
		if (e == 1) {
			timeshow1.value = true
		} else {
			timeshow2.value = true
		}
	}
	// const confirm1 = (e) => {
	// 	startTime.value = formatTimestamp(e.value)
	// 	timeshow1.value = false;
	// }
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
		ReplyList();
		uDropdownRef.value.close()
		workValue.length = 0;
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
	page {
		background: #F6F8FA;
	}

	::v-deep .u-tabs {
		background: #fff;
	}

	.taskbox {
		padding: 30rpx;
	}

	.taskItem {
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		padding: 30rpx;

		.itleft {
			font-size: 28rpx;
			color: #092D5C;
		}

		.itleft2 {
			background: #FE4949;
			border-radius: 26rpx;
			padding: 2rpx 17rpx;
			font-size: 20rpx;
			color: #FFFFFF;
			line-height: 2;
		}

		.itright {
			font-size: 26rpx;
			color: #B7C4D7;
		}

		.itright2 {
			background: #F6F8FC;
			border-radius: 26rpx;
			padding: 2rpx 17rpx;
			font-size: 20rpx;
			color: #092D5C;
			line-height: 2;
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
</style>
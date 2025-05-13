<template>
	<view>
		<up-navbar title="任务&通知" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
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
								<block v-if="typeIndex==0||typeIndex==1">
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList" v-model="workValue" @itemClick="itemClick1"
										:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
								</block>
								<block v-if="typeIndex==2||typeIndex==3">
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList2" v-model="workValue2"
										@itemClick="itemClick1"
										:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
								</block>
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
		<view class="taskbox" v-if="typeIndex==0">
			<block v-if="todoList.value.length">
				<view class="taskItem" v-for="(item,index) in todoList.value" :key="index">
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>{{item.createInDate}}</view>
						</view>
						<view class="ttright" v-if="item.status==0">待确认</view>
						<view class="ttright" v-if="item.status==1">确认中</view>
						<view class="ttright" v-if="item.status==2">已完成</view>
						<view class="ttright" v-if="item.status==3">已驳回</view>
					</view>
					<view class="task-title up-m-t-20 bold">
						{{item.title}}
					</view>
					<view class="tasktext" v-if="item.type==0">类型：任务</view>
					<view class="tasktext" v-if="item.type==1">类型：通知</view>
					<view class="tasktext">下发人：{{item.createUserName}}</view>
					<view class="tasktext">截止时间：{{item.endTime}}</view>
				</view>
			</block>
			<up-empty v-else class="up-m-t-50" mode="list" icon="/static/ques.png"></up-empty>
		</view>

		<view class="taskbox" v-if="typeIndex==1">
			<block v-if="completedList.value.length">
				<view class="taskItem" v-for="(item,index) in completedList.value" :key="index">
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>{{item.createInDate}}</view>
						</view>
						<view class="ttright" v-if="item.status==0">待确认</view>
						<view class="ttright" v-if="item.status==1">确认中</view>
						<view class="ttright" v-if="item.status==2">已完成</view>
						<view class="ttright" v-if="item.status==3">已驳回</view>
					</view>
					<view class="task-title up-m-t-20 bold">
						{{item.title}}
					</view>
					<view class="tasktext" v-if="item.type==0">类型：任务</view>
					<view class="tasktext" v-if="item.type==1">类型：通知</view>
					<view class="tasktext">下发人：{{item.createUserName}}</view>
					<view class="tasktext">截止时间：{{item.endTime}}</view>
				</view>
			</block>
			<up-empty v-else class="up-m-t-50" mode="list" icon="/static/ques.png"></up-empty>
		</view>
		<view class="taskbox" v-if="typeIndex==2">
			<block v-if="issuedList.value.length">
				<view class="taskItem" v-for="(item,index) in issuedList.value" :key="index" @click="detileTap(item)">
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>{{item.createInDate}}</view>
						</view>
						<view class="ttright" style="color:#3C82FE" v-if="item.status==0">进行中:{{item.waitConfirmCount}}</view>
						<view class="ttright" style="color:#1CAA42" v-if="item.status==1">已完成</view>
						<view class="ttright" style="color:#FE4949" v-if="item.status==2">已超期</view>
						<view class="ttright" style="color:#FEAC49" v-if="item.status==3">终止</view>
					</view>
					<view class="task-title up-m-t-20 bold">
						{{item.title}}
					</view>
					<view class="tasktext" v-if="item.type==0">类型：任务</view>
					<view class="tasktext" v-if="item.type==1">类型：通知</view>
					<view class="tasktext">下发人：{{item.createUserName}}</view>
					<view class="tasktext">截止时间：{{item.endTime}}</view>
					<view class="tasktext">状态：{{item.status}}</view>
					<view class="tasktext">当前进度：{{item.completedCount}}/{{item.totalCount}}</view>
				</view>
			</block>
			<up-empty v-else class="up-m-t-50" mode="list" icon="/static/ques.png"></up-empty>
		</view>
		<view class="taskbox" v-if="typeIndex==3">
			<block v-if="copyList.value.length">
				<view class="taskItem" v-for="(item,index) in copyList.value" :key="index" @click="detileTap(item)">
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>{{item.createInDate}}</view>
						</view>

						<view class="ttright" style="color:#3C82FE" v-if="item.status==0">进行中:{{item.waitConfirmCount}}</view>
						<view class="ttright" style="color:#1CAA42" v-if="item.status==1">已完成</view>
						<view class="ttright" style="color:#FE4949" v-if="item.status==2">已超期</view>
						<view class="ttright" style="color:#FEAC49" v-if="item.status==3">终止</view>



					</view>
					<view class="task-title up-m-t-20 bold">
						{{item.title}}
					</view>
					<view class="tasktext" v-if="item.type==0">类型：任务</view>
					<view class="tasktext" v-if="item.type==1">类型：通知</view>
					<view class="tasktext">下发人：{{item.createUserName}}</view>
					<view class="tasktext">截止时间：{{item.endTime}}</view>
					<view class="tasktext">状态：{{item.status}}</view>
					<view class="tasktext">当前进度：{{item.completedCount}}/{{item.totalCount}}</view>
				</view>
			</block>
			<up-empty v-else class="up-m-t-50" mode="list" icon="/static/ques.png"></up-empty>
		</view>
		<image src="/static/work/jia.png" class="tianj" @click="addnavTap('/pages/work/task/addtask')"></image>


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
		API_taskList
	} from '/api/task.js'
	import {
		ref,
		reactive,
		onMounted,
	} from 'vue';
	import {
		onReachBottom,
		onLoad,
		onShow
	} from "@dcloudio/uni-app"


	const list = reactive([{
			name: '待处理'
		},
		{
			name: '已处理'
		},
		{
			name: '我发起的'
		},
		{
			name: '抄送'
		},
	]);
	const typeList = reactive([{
		label: '任务',
		value: 1
	}, {
		label: '通知',
		value: 2
	}]);

	const workList = reactive([{
			label: '待处理',
			value: 0
		}, {
			label: '处理中',
			value: 1
		},
		{
			label: '已完成',
			value: 2
		},
		{
			label: '已驳回',
			value: 3
		},
	]);
	const workList2 = reactive([{
			label: '进行中',
			value: 0
		}, {
			label: '已完成',
			value: 1
		},
		{
			label: '已超期',
			value: 2
		}, {
			label: '终止',
			value: 3
		}
	]);
	const typeIndex = ref(0)
	const typeValue = reactive([])
	const workValue = reactive([])
	const workValue2 = reactive([])
	const uDropdownRef = ref(null)
	const startTime = ref('开始时间')
	const endTime = ref('结束时间')
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);
	const keyword = ref('')

	const todoList = reactive([])
	const completedList = reactive([])
	const issuedList = reactive([])
	const copyList = reactive([])
	onShow(() => {
		tasklistData();
	})

	// 列表
	const tasklistData = () => {
		let noticeTypes = typeValue.join(',')
		let startTimeData, endTimeData;
		startTimeData = startTime.value
		endTimeData = endTime.value
		if (startTime.value == '开始时间') {
			startTimeData = ""
		}
		if (endTime.value == '结束时间') {
			endTimeData = ""
		}
		let status;

		API_taskList({
			type: typeIndex.value,
			startTime: startTimeData,
			endTime: endTimeData,
			noticeTypes: noticeTypes,
			title: keyword.value,
			status: workValue.value
		}).then(res => {
			console.log(res)
			todoList.value = res.data.todoList
			completedList.value = res.data.completedList
			issuedList.value = res.data.issuedList
			copyList.value = res.data.copyList
		})
	}
	// 详情
	const detileTap = (item) => {
		console.log(item)
		if (typeIndex.value == 2 || typeIndex.value == 3) {
			uni.navigateTo({
				url: `/pages/work/task/taskDetile2?typeIndex=${typeIndex.value}&id=${item.id}`
			})
		}
	}
	onReachBottom(() => {
		console.log("触底")
	})
	// 新增任务
	const addnavTap = (url) => {
		uni.navigateTo({
			url: url
		})
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e)
		typeIndex.value = e.index
		tasklistData()
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
		// workValue.length = 0;
		// workValue2.length = 0;
	}
	// 时间确定
	const SubmitTime = () => {
		console.log(workValue.value)
		tasklistData();
		uDropdownRef.value.close()
		typeValue.length = 0;
		// workValue.length = 0;
		// workValue2.length = 0;
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
		margin-top: 30rpx;

		.titemTop {
			border-bottom: 1rpx solid #F5F5F5;

			.ttleft {
				font-size: 26rpx;
				color: #B7C4D7;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}

			.ttright {
				font-size: 26rpx;
				color: #3C82FE;
			}
		}

		.task-title {
			font-size: 36rpx;
			color: #092D5C;
		}

		.tasktext {
			font-size: 26rpx;
			color: #5A78A0;
			line-height: 50rpx;
		}
	}

	.tianj {
		width: 120rpx;
		height: 120rpx;
		position: fixed;
		right: 10rpx;
		bottom: 15vh;
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
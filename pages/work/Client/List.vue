<template>
	<view>
		<up-navbar title="客户" :placeholder="true" :autoBack="true">
			<template #right>
				<view style="padding-left: 4px;" @tap="$u.route('/pages/work/Client/addClient')">
					<up-icon name="plus"></up-icon>
				</view>
			</template>

		</up-navbar>
		<up-tabs :scrollable="false" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>

		<view class="up-p-t-20 up-p-b-20" style="background:#ffffff;">
			<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="searchParam" :showAction="false" bgColor="#F6F8FC"
				height="40" @search=""></up-search>

			<view class="u-flex filter u-col-center u-row-around">
				<!-- 时间 -->
				<up-dropdown ref="uDropdownRef" border-radius="20">
					<up-dropdown-item title="添加时间">
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
								<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList0" v-model="workValue0" @itemClick="itemClick1"
									multiple :unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
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
		<view class="content">
			<view class="itemkh up-m-t-20" @click="detaileTap()">
				<view class="title">公司名称</view>
				<view class="u-flex u-col-center up-m-t-10">
					<view class="bqclass">标签</view>
					<view class="bqclass">标签</view>
					<view class="bqclass">标签</view>
				</view>
				<view class="up-m-t-30 laiy">来源：老客户</view>
				<view class="up-m-t-10 laiy">等级：钻石客户</view>
				<image src="/static/msg.png"></image>
			</view>
		</view>
		<view class="bottom u-flex u-col-center u-row-center">
			<view class="botitem u-flex u-col-center" @click="addFlow()">
				<image src="/static/client/btn2.png"></image>
				<view>新建跟进</view>
			</view>
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
		ref,
		reactive,
		onMounted
	} from 'vue';

	const lxshow = ref(false);
	const lxValue = ref("")
	const tabIndex = ref(0)
	const searchParam = ref("")
	const list = reactive([{
			name: '企业客户'
		},
		{
			name: '个人客户'
		}
	]);
	const typeValue = ref(1)
	const workList0 = reactive([{
		label: '任务',
		value: 1
	}, {
		label: '通知',
		value: 2
	}]);
	const name = ref('')
	const textValue = ref('')
	const workValue0 = reactive([])
	const workValue = reactive([])
	const workValue2 = reactive([])
	const uDropdownRef = ref(null)
	const startTime = ref('开始时间')
	const endTime = ref('结束时间')
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);

	// 详情
	const detaileTap = (e) => {
		uni.$u.route('/pages/work/Client/Details')
	}
	// 选择类型Z 
	const itemClick = (e) => {
		console.log(e)
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
	}
	// 关闭筛选框
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
		console.log(e)
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
		workValue0.length = 0;
		workValue.length = 0;
		workValue2.length = 0;
	}
	// 时间确定
	const SubmitTime = () => {
		uDropdownRef.value.close()
		workValue0.length = 0;
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

<style setup lang="scss">
	page {
		background: #F6F8FA;
	}

	::v-deep .u-dropdown-item {
		background: #fff;
	}

	::v-deep .u-tabs {
		background: #fff;
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

	.content {
		padding: 30rpx;
	}

	.bottom {
		background: #ffffff;
		width: 100%;
		// height:200rpx;
		position: fixed;
		bottom: 0;
		padding: 40rpx;

		.botitem {
			font-size: 28rpx;
			color: #092D5C;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
	}

	.itemkh {
		padding: 30rpx;
		background: #fff;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		position: relative;

		.title {
			font-size: 36rpx;
			color: #092D5C;
		}

		.bqclass {
			padding: 8rpx 20rpx;
			background: #E1ECFF;
			font-size: 22rpx;
			color: #3C82FE;
			margin-left: 10rpx;
		}

		.laiy {
			font-size: 26rpx;
			color: #5A78A0;
		}

		image {
			width: 87rpx;
			height: 87rpx;
			position: absolute;
			right: 30rpx;
			top: 100rpx;
		}
	}
</style>
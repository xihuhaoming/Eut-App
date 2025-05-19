<template>
	<view>
		<up-navbar title="日常报销" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="content" v-if="tabIndex == 0">
			<view class="xtitle bold">
				申请信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="申请部门" value="易尤特集团" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="报销流程" value="易尤特集团" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="办理人" value="易尤特集团" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell @click="lxshow = true" title="报销类型" :value="lxValue" :isLink="true" arrow-direction="right"
						:required="true"></up-cell>
					<!-- 报销类型选择 -->
					<up-picker :show="lxshow" :columns="columns" @cancel="lxshow = false" @confirm="qeudlx"></up-picker>

					<up-cell v-if="lxValue=='油卡'" title="选择油卡" value="易尤特集团" :isLink="true" arrow-direction="right"
						:required="true"></up-cell>
					<up-cell title="借支单" value="易尤特集团" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<!-- 	<up-cell title="事项名称" isLink :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> -->
				</up-cell-group>
				<view class="u-flex u-row-between u-col-center">
					<view class="xtitle bold">发票列表</view>
					<view class="u-flex u-col-center">
						<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加发票</view>
						<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
					</view>
				</view>
				<view class="card">
					<up-cell-group :border="false">
						<up-cell title="发票类型" value="IS9001" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="发票号码" value="5000" :isLink="false" arrow-direction="right" :required="true"></up-cell>
						<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
							<view class="attLeft">
								发票图片：<text style="color: #B7C4D7;">请添加图片或文件</text>
							</view>
							<up-icon name="plus-circle" size="22px" color="#5A78A0"></up-icon>
						</view>
						<view class="u-flex up-m-t-30 u-row-between ">
							<view class="updataLeft u-flex u-col-center">
								<image src="/static/logo.png"></image>
								<view class="up-m-l-10 name">文件名称</view>
							</view>
							<up-icon name="close-circle-fill" size="22px" color="#B7C4D7"></up-icon>
						</view>
					</up-cell-group>
				</view>
				<view class="xtitle bold">
					报销信息
				</view>
				<view class="card">
					<up-cell-group :border="false">
						<up-cell title="是否预算内" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="报销公司" value="IS9001" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="收款人" value="5000" :isLink="false" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="开户行" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="卡号" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="报销金额" value="5000" :isLink="false" arrow-direction="right" :required="true"></up-cell>
					</up-cell-group>
					<!-- 					<view class="textClass up-m-t-20">
						<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="textValue"></textarea>
					</view> -->
				</view>
				<!-- 			<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
					<view class="attLeft">
						附件：<text style="color: #B7C4D7;">请添加图片或文件</text>
					</view>
					<up-icon name="plus-circle" size="22px" color="#5A78A0"></up-icon>
				</view>
				<view class="u-flex up-m-t-30 u-row-between ">
					<view class="updataLeft u-flex u-col-center">
						<image src="/static/logo.png"></image>
						<view class="up-m-l-10 name">文件名称</view>
					</view>
					<up-icon name="close-circle-fill" size="22px" color="#B7C4D7"></up-icon>
				</view> -->
				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="textValue"></textarea>
				</view>
			</view>
			<view class="qued up-m-t-70">提交</view>

		</view>
		<view class="content1" v-if="tabIndex == 1">
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
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList0" v-model="workValue0"
										@itemClick="itemClick1" multiple
										:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
									<!-- 工作组名称 -->
									<view class="typeTitle u-flex u-col-center up-m-t-30">
										<view class="ttleft1 up-m-r-20"></view>
										<view class="ttright">工作组名称</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList" v-model="workValue" @itemClick="itemClick1"
										multiple :unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
									<!-- 工作组名称 -->
									<view class="typeTitle u-flex u-col-center up-m-t-30">
										<view class="ttleft1 up-m-r-20"></view>
										<view class="ttright">工作组名称</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList2" v-model="workValue2"
										@itemClick="itemClick1" multiple
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
			</view>
			<view class="taskbox">
				<view class="taskItem">
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>2023.03.05 16:00</view>
						</view>
						<view class="ttright">待确认</view>
						<!-- 	<view class="ttright" style="color:#FE4949">待确认</view>
						<view class="ttright" style="color:#1CAA42">待确认</view>
						<view class="ttright" style="color:#092D5C">已作废</view> -->
					</view>
					<view class="task-title up-m-t-20 bold">
						报销金额：500 元
					</view>
					<view class="tasktext up-m-b-10" style="color:#B7C4D7">董事长（研发） </view>
					<view class="tasktext">是否预算内：预算内</view>
					<view class="tasktext">打款金额：<text style="color:red">28930.00</text></view>
					<view class="tasktext">备注：西塘镇2021-2022年度广告服务商入</view>
				</view>
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
		API_finApitranslateadd
	} from '/api/task.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	const lxshow = ref(false);
	const columns = reactive([
		['油卡', '办公用品']
	]);
	const lxValue = ref("")
	const tabIndex = ref(0)
	const keyword = ref("")
	const list = reactive([{
			name: '发起提交'
		},
		{
			name: '提交记录'
		}
	]);
	const typeValue = ref(1)
	const typeList = reactive([{
		label: '增值税普通发票',
		value: 1
	}, {
		label: '增值税专用发票',
		value: 2
	}]);
	const workList0 = reactive([{
		label: '任务',
		value: 1
	}, {
		label: '通知',
		value: 2
	}]);
	const name = ref('')
	const textValue = ref('')
	const workList = reactive([{
			label: '采购流程',
			value: 1
		}, {
			label: '入库流程',
			value: 2
		},
		{
			label: '合同流程',
			value: 3
		},
		{
			label: '工作流流程',
			value: 4
		},
	]);
	const workList2 = reactive([{
			label: '采购流程',
			value: 1
		}, {
			label: '入库流程',
			value: 2
		},
		{
			label: '合同流程',
			value: 3
		}
	]);
	const workValue0 = reactive([])
	const workValue = reactive([])
	const workValue2 = reactive([])
	const uDropdownRef = ref(null)
	const startTime = ref('开始时间')
	const endTime = ref('结束时间')
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);

	// 选择报销类型
	const qeudlx = (e) => {
		console.log(e)
		lxValue.value = e.value[0]
		lxshow.value = false
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

	::v-deep .u-cell__body {
		padding: 25rpx 0 !important;
	}

	::v-deep .u-cell__title-text,
	.u-cell__value {
		color: #5A78A0 !important;
	}

	::v-deep .u-cell__value {
		color: #092D5C !important;
	}

	.content {
		padding: 30rpx;

		.updataLeft {
			image {
				width: 68rpx;
				height: 68rpx;
			}

			.name {
				font-size: 22rpx;
				color: #092D5C;
			}
		}

		.attachmentTitle {
			.attLeft {
				font-size: 28rpx;
				color: #5A78A0;
			}
		}

		.textClass {
			width: 618rpx;
			height: 160rpx;
			background: #F6F8FC;
			border-radius: 8rpx;
			padding: 10rpx 0 0 10rpx;
		}

		.card {
			padding: 30rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
			border-radius: 10rpx;
		}

		.xtitle {
			font-size: 36rpx;
			color: #092D5C;
			padding: 30rpx 0 20rpx 0;
		}

		.typeTop {
			width: 100%;
			padding: 30rpx;
			background: #fff;
		}

		::v-deep .btn-group {
			justify-content: center !important;
			display: flex !important;
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

	.taskbox {
		padding: 30rpx;
	}

	.taskItem {
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		padding: 30rpx;

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
</style>
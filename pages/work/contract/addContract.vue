<template>
	<view>
		<up-navbar title="新增合同" :placeholder="true" :autoBack="true" />

		<view class="content">

			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="申请部门" value="易尤特集团" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="签约人" value="默认创建人姓名" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="合同流程" value="请选择合同流程" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="审批人" value="请先选择合同流程" :isLink="false" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="关联项目" value="默认创建人姓名" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="报价单" value="73294839" :isLink="true" arrow-direction="right" :required="false"></up-cell>
				</up-cell-group>


				<!-- 					<view class="textClass up-m-t-20">
						<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="textValue"></textarea>
					</view> -->
			</view>
			<view class="xtitle bold">
				合同信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="合同编号" value="IS9001" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="甲方" value="请选择客户" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="甲方地址" :required="true" :isLink="false">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="甲方经办人" :required="true" :isLink="false">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> <up-cell title="经办人电话" :required="true" :isLink="false">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="签约方式" value="5000" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="签约日期" value="5000" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="交付日期" value="5000" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="合同条款" :required="true" :isLink="false">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<view class="textClass up-m-t-20">
						<textarea type="textarea" placeholder="请输入备注（对内）" border="surround" v-model="textValue"></textarea>
					</view>
					<view class="textClass up-m-t-20">
						<textarea type="textarea" placeholder="请输入备注（对外）" border="surround" v-model="textValue"></textarea>
					</view>

					<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
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
					</view>
				</up-cell-group>
			</view>

			<view class="u-flex u-row-between u-col-center">
				<view class="xtitle bold">产品及服务</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加收款产品</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="产品" value="根据选择的产品显示名称" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="编码" value="2874392" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="单价" :required="true" :isLink="false">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="数量" :required="false" :isLink="false">
						<template #value>
							<view class="u-flex">
								<up-icon name="minus-circle-fill" color="#B7C4D7" size="16"></up-icon>
								<view class="up-m-l-10 up-m-r-10">1</view>
								<up-icon name="plus-circle-fill" color="#2979ff" size="16"></up-icon>
							</view>
						</template>
					</up-cell>
					<up-cell title="已付款金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#3C82FE">1000</view>
						</template>
					</up-cell>
					<view class="up-m-t-20 up-m-t-20 u-text-center" style="color:red">删除</view>
				</up-cell-group>

			</view>
			<view class="card up-m-t-20">
				<up-cell title="共计" :isLink="false" arrow-direction="right" :required="false">
					<template #right-icon>
						<view style="color:#FE4949">729493.00</view>
					</template>
				</up-cell> <up-cell title="大写" :isLink="false" arrow-direction="right" :required="false">
					<template #right-icon>
						<view style="color:#FE4949">壹万伍仟元整</view>
					</template>
				</up-cell>
			</view>
			<view class="u-flex u-row-between u-col-center">
				<view class="xtitle bold">付款方式</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加一项付款方式</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell value="">
						<template #label>
							<view class="u-flex u-row-between">
								<view>
									<view>
										产品名称
									</view>
									<view style="color:#B7C4D7">6284390</view>
								</view>
								<view class="u-text-right">
									<view>×1</view>
									<view style="color:#3C82FE">2684939.00</view>
								</view>
							</view>
						</template>
					</up-cell>
					<up-cell title="单元格" :required="false" :isLink="false">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text" style="text-align:right;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="单元格" :required="false" :isLink="false">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text" style="text-align:right;font-size:26rpx;">
						</template>
					</up-cell>
				</up-cell-group>

			</view>
			<view class="card up-m-t-20">
				<up-cell title="共计" :isLink="false" arrow-direction="right" :required="false">
					<template #right-icon>
						<view style="color:#FE4949">729493.00</view>
					</template>
				</up-cell> <up-cell title="大写" :isLink="false" arrow-direction="right" :required="false">
					<template #right-icon>
						<view style="color:#FE4949">壹万伍仟元整</view>
					</template>
				</up-cell>
			</view>
			<view class="btnbox u-flex u-col-center">
				<view class="btnleft">放入公共池</view>
				<view class="btnright">提交</view>
			</view>
			<view class="qued up-m-t-70">提交</view>
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

	const tabIndex = ref(0)
	const keyword = ref("")
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

	.btnbox {
		// position: absolute;
		// bottom: 5vw;
		// left: 9vw;
		margin-top:30rpx;
		.btnleft {
			padding: 25rpx 100rpx;
			font-size: 34rpx;
			color: #3C82FE;
			background: #ECF1FF;
			border-radius: 59rpx;
		}

		.btnright {
			padding: 25rpx 100rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			background: #3C82FE;
			border-radius: 59rpx;
			margin-left: 20rpx;
		}
	}
</style>
<template>
	<view>
		<up-navbar title="选择合同" :placeholder="true" :autoBack="true" />

		<view class="up-p-t-20 up-p-b-20" style="background:#ffffff;">
			<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="searchParam" :showAction="false" bgColor="#F6F8FC"
				height="40"></up-search>

		</view>
		<view class="taskbox">
			<block v-if="listData">
				<view class="taskItem up-m-t-20" v-for="(item,index) in listData" :key="index">
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">

							<view>{{item.code}}</view>
						</view>
						<view class="ttright">查看</view>
						<!-- 	<view class="ttright" style="color:#FE4949">待确认</view>
						<view class="ttright" style="color:#1CAA42">待确认</view>
						<view class="ttright" style="color:#092D5C">已作废</view> -->
					</view>
					<view class="task-title up-m-t-20 bold">
						{{item.csrCustomerName}}
					</view>
					<!-- <view class="tasktext up-m-b-10" style="color:#3C82FE">TU-UI69-7329589 </view> -->
					<view class="tasktext">签单时间：{{item.signUpDate}}</view>
					<view class="tasktext">部门：{{item.deptName}}</view>
					<view class="tasktext">签单人：{{item.userName}}</view>
					<view class="tasktext">合同金额：<text style="color:red">{{item.allPrice}}</text></view>
					<view class="tasktext">开票情况：<text style="color:red">{{item.invoicePrice}}</text></view>
					<view class="tasktext">交款情况：<text style="color:red">{{item.putPrice}}</text></view>
					<view class="tasktext">指令单情况：</view>
					<view class="u-flex u-row-between" v-for="(it,i) in item.serverList" :key="i">
						<view class="tasktext" style="color:#3C82FE">{{it.proServeName}}</view>
						<view class="tasktext">{{it.progressName}}
							<text style="color:red" v-if="it.useStatus==0">（进行中）</text>
							<text style="color:red" v-if="it.useStatus==1">（完成）</text>
							<text style="color:red" v-if="it.useStatus==2">（停项）</text>
							<text style="color:red" v-if="it.useStatus==-1">（超期）</text>
						</view>
					</view>

					<!-- <view class="tasktext">产品：<text style="color:#3C82FE">IS9001</text></view> -->

				</view>
			</block>
			<up-empty v-else class="up-m-t-50" mode="list" icon="/static/ques.png"></up-empty>
		</view>

	</view>
</template>

<script setup>
	import {
		API_getUnionContractList
	} from '../../../api/task.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	const searchParam = ref("")
	const listData = ref([])
	onMounted(() => {
		getList()
	})
	const getList = () => {
		API_getUnionContractList({
			searchParam: searchParam.value
		}).then(res => {
			console.log(res)
			listData.value = res.data
		})
	}
	// 跳转
	const addnavTap = (e) => {
		uni.navigateTo({
			url: e
		})
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
		// padding: 30rpx;

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

	.tianj {
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		right: 10rpx;
		bottom: 15vh;
	}
</style>
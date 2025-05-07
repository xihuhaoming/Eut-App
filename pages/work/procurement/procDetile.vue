<template>
	<view class="">
		<up-navbar title="采购详情" :placeholder="true" :autoBack="true" />
		<view class="conTop">
			<view class="time">2023.02.12 16:00:00</view>
			<view class="title bold">易尤特提交的采购申请</view>
			<view class="zhongx">嘉兴运营中心</view>
			<view class="type">已确认</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold  up-m-b-20">采购单信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">系统编号</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">采购单号</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">供应商</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">联系人</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">联系电话</view>
				<view class="zhoRi up-m-l-30">UI-3299-732959</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">跟单员</view>
				<view class="zhoRi up-m-l-30">UI-3299-732959</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">采购类型</view>
				<view class="zhoRi up-m-l-30">UI-3299-732959</view>
			</view>
			<view class="zhoLf">备注</view>
			<view class="textClass up-m-t-20">
				<view>如怀疑存在 DNS 劫持，可尝试更换 D</view>
			</view>

			<view class="zhoItem">
				<view class="zhoLf">附件</view>
				<view class="u-flex up-m-t-20">
					<image class="up-m-l-20" style="width:124rpx;height:124rpx" src="/static/logo.png"></image>
				</view>
			</view>
			<!-- 	<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">金额</view>
				<view class="zhoRi up-m-l-30" style="color:#FE4949">5000</view>
			</view> -->

		</view>
		<view class="fengx"></view>
		<view class="conbot">
			<view class="u-flex u-row-between u-col-center">
				<view class="xinx bold up-m-b-20">实物产品</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #FE4949;">共计：19000.00（壹万玖仟元）</view>
				</view>
			</view>
			<view class="conZho">
				<view class="zhoItem u-flex u-col-center u-row-between">
					<view class="zhoLf">
						<view class="zltop">实物产品名称</view>
						<view class="zltbot up-m-t-10">6284390</view>
					</view>
					<view class="zhoRi up-m-l-30">
						<view>100.00 <text class="zltbot">X1</text></view>
						<view class="up-m-t-10" style="color:#3C82FE;">2684939.00</view>
					</view>
				</view>
				<view class="conbbb">待入库：<text style="color:#FE4949">20</text></view>
				<view class="conbbb">待入库：20</view>
			</view>
		</view>
		<view class="conbot">
			<view class="u-flex u-row-between u-col-center">
				<view class="xinx bold up-m-b-20">入库单</view>
			</view>
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
					2379534895
				</view>
				<view class="tasktext">供应商：上海淼创信息科技有限公司</view>
				<view class="tasktext">跟单员：葫芦娃</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

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
</script>

<style scoped lang="scss">
	page {
		background: #F5F7F9;
	}

	.liucItem {
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			display: block;
		}

		.liucRight {
			width: 70vw;

			.lrleft {
				font-size: 26rpx;
				color: #B7C4D7;
			}

			.lrlbot {
				font-size: 28rpx;
				color: #092D5C;
			}
		}
	}

	.shux {
		width: 1rpx;
		height: 60rpx;
		border: 3rpx solid #B7C4D7;
	}

	.conZho {
		padding: 30rpx 35rpx;
		background: #fff;

		.zhoItem {
			padding: 10rpx 0;
		}

		.xinx {
			font-size: 36rpx;
			color: #092D5C;
		}

		.zhoLf {
			font-size: 26rpx;
			color: #5A78A0;
			width: 25vw;
		}

		.zhoRi {
			font-size: 28rpx;
			color: #092D5C;
		}

		.zhotable {
			// border: 1rpx solid #979797;
			box-shadow: inset 0 0 0 0.5rpx #979797;

			.tbaletop {
				height: 200rpx;
				background-color: #3C82FE;
				color: #fff;
			}

			.tbalebot {
				height: 88rpx;
			}
		}


	}

	.conbbb {
		font-size: 28rpx;
		color: #B7C4D7;
		line-height: 2;
	}

	.conTop {
		padding: 30rpx 35rpx;
		background: #ffffff;

		.time {
			font-size: 26rpx;
			color: #B7C4D7;
		}

		.title {
			font-size: 36rpx;
			color: #092D5C;
		}

		.zhongx {
			font-size: 26rpx;
			color: #5A78A0;
			line-height: 2;
		}

		.type {
			font-size: 28rpx;
			color: #1CAA42;
		}
	}

	.fengx {
		width: 100vw;
		height: 20rpx;
		background: #F6F8FA;
	}

	.textClass {
		width: 618rpx;
		height: 160rpx;
		background: #F6F8FC;
		border-radius: 8rpx;
		padding: 10rpx 0 0 10rpx;
		font-size: 28rpx;
		color: #B7C4D7;
	}

	.conbot {
		padding: 30rpx;
	}

	.zltop {
		font-size: 28rpx;
		color: #092D5C;
		font-weight: bold;
	}

	.zlbot {
		font-size: 26rpx;
		color: #B7C4D7;
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
		margin-top: 30rpx;

		.btnleft {
			padding: 25rpx 100rpx;
			font-size: 34rpx;
			color: #3C82FE;
			background: #ECF1FF;
			border-radius: 59rpx;
		}

		.btnright {
			padding: 15rpx 80rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			background: #3C82FE;
			border-radius: 59rpx;
			margin: 20rpx 0rpx 50rpx 20rpx;
		}
	}
</style>
<template>
	<view class="">
		<up-navbar title="履约金详情" :placeholder="true" :autoBack="true" />
		<view class="conTop">
			<view class="time">2023.02.12 16:00:00</view>
			<view class="title bold">易尤特提交的路约保证金申请</view>
			<view class="zhongx">退回</view>
			<view class="type">已确认</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold  up-m-b-20">履约金信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">系统编号</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">合同编号</view>
				<view class="zhoRi up-m-l-30"  style="color:#3C82FE">UI-3299-732959</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">履约类型</view>
				<view class="zhoRi up-m-l-30">退回备份</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">企业名称</view>
				<view class="zhoRi up-m-l-30">易尤特集团</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">税号</view>
				<view class="zhoRi up-m-l-30">3279596</view>
			</view>
			<!-- 	<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">金额</view>
				<view class="zhoRi up-m-l-30" style="color:#FE4949">5000</view>
			</view> -->
			<view class="zhoItem">
				<view class="zhoLf">产品</view>
				<view class="zhotable up-m-l-30 up-m-t-20">
					<view class="tbaletop u-flex u-col-center u-row-around">
						<view class="ttleft">发票类型</view>
						<view class="ttright">发票号码</view>
					</view>
					<view class="tbalebot u-flex u-col-center u-row-around">
						<view class="ttleft">CE-EMC</view>
						<view class="ttright" style="color:#FE4949">26000</view>
					</view>
				</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">支付/收款单位</view>
				<view class="zhoRi up-m-l-30">3279596</view>
			</view>
			<view class="zhoLf">备注</view>
			<view class="textClass up-m-t-20">
				<view>如怀疑存在 DNS 劫持，可尝试更换 D</view>
			</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">确认信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">确认人</view>
				<view class="zhoRi up-m-l-30">崔总助理</view>
			</view>
			<view class="zhoLf">备注</view>
			<view class="textClass up-m-t-20">
				<view>如怀疑存在 DNS 劫持，可尝试更换 D</view>
			</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">流程及办理</view>
			<view class="liucItem u-flex">
				<image src="/static/logo.png"></image>
				<view class="liucRight u-flex up-m-l-20 u-row-between">
					<view class="">
						<view class="lrleft">发起申请</view>
						<view class="lrlbot">发起人</view>
					</view>
					<view class="lrleft">2023.03.26 16:00:00</view>
				</view>
			</view>
			<view class="shux up-m-l-50 up-m-t-20"></view>
		</view>
	</view>
</template>

<script setup>
</script>

<style scoped lang="scss">
	page {}

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
				height: 88rpx;
				background-color: #3C82FE;
				color: #fff;
			}

			.tbalebot {
				height: 88rpx;
			}
		}


	}

	.conTop {
		padding: 30rpx 35rpx;

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
</style>
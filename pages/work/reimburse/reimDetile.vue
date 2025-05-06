<template>
	<!-- 开票详情 -->
	<view class="">
		<up-navbar title="报销详情" :placeholder="true" :autoBack="true" />
		<view class="conTop">
			<view class="time">2023.02.12 16:00:00</view>
			<view class="title bold">易尤特提交的报销申请</view>
			<view class="zhongx">嘉兴运营中心</view>
			<view class="type">已确认</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold  up-m-b-20">申请信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">系统编号</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">报销类型</view>
				<view class="zhoRi up-m-l-30">油卡</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">借支单号</view>
				<view class="zhoRi up-m-l-30">20240812090816363960备份</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">油卡卡号</view>
				<view class="zhoRi up-m-l-30">20240812090816363960备份 2</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">是否预算内</view>
				<view class="zhoRi up-m-l-30">预算内</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">金额</view>
				<view class="zhoRi up-m-l-30" style="color:#FE4949">5000</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">报销内容</view>
				<view class="zhoRi up-m-l-30">西塘镇2021-2022年度广告服务商入</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">报销公司</view>
				<view class="zhoRi up-m-l-30">易尤特集团</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">报销时间</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem">
				<view class="zhoLf">发票信息</view>
				<view class="zhotable up-m-l-30 up-m-t-20">
					<view class="tbaletop u-flex u-col-center u-row-around">
						<view class="ttleft">发票类型</view>
						<view class="ttright">发票号码</view>
						<view class="ttright">图片</view>
					</view>
					<view class="tbalebot u-flex u-col-center u-row-around">
						<view class="ttleft">CE-EMC</view>
						<view class="ttright">26000</view>
						<image style="width:50rpx;height:50rpx" src="/static/logo.png"></image>
					</view>
				</view>
			</view>
		
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">打款信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">打款流水号</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">打款金额</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">卡号</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开户行</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">收款人</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
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
</style>
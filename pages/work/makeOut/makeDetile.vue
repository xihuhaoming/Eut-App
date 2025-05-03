<template>
	<!-- 开票详情 -->
	<view class="">
		<up-navbar title="开票详情" :placeholder="true" :autoBack="true" />
		<view class="conTop">
			<view class="time">2023.02.12 16:00:00</view>
			<view class="title bold">易尤特提交的开票申请</view>
			<view class="zhongx">嘉兴运营中心</view>
			<view class="type">已开票</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold  up-m-b-20">申请信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">系统编号</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">合同编号</view>
				<view class="zhoRi up-m-l-30" style="color:#3C82FE">EUT-HT-LS-1901</view>
			</view>
			<view class="zhoItem">
				<view class="zhoLf">开票信息</view>
				<view class="zhotable up-m-l-30 up-m-t-20">
					<view class="tbaletop u-flex u-col-center u-row-around">
						<view class="ttleft">产品</view>
						<view class="ttright">开票金额</view>
					</view>
					<view class="tbalebot u-flex u-col-center u-row-around">
						<view class="ttleft">CE-EMC</view>
						<view class="ttright">26000</view>
					</view>
				</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">发票类型</view>
				<view class="zhoRi up-m-l-30">增值税专用发票</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">税号</view>
				<view class="zhoRi up-m-l-30">72385940304590</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">地址</view>
				<view class="zhoRi up-m-l-30">浙江省嘉兴市嘉善县大云镇云寺西路268号</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">电话</view>
				<view class="zhoRi up-m-l-30">72394830</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开户行</view>
				<view class="zhoRi up-m-l-30">中国银行</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">银行账号</view>
				<view class="zhoRi up-m-l-30">72394830备份</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票公司</view>
				<view class="zhoRi up-m-l-30">中国银行备份</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票接收邮箱</view>
				<view class="zhoRi up-m-l-30">72394830备份 2</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票金额</view>
				<view class="zhoRi up-m-l-30" style="color:#FE4949">5000</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票备注</view>
				<view class="zhoRi up-m-l-30"></view>
			</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">开票信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">发票代码</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">发票号码</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票人</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票时间</view>
				<view class="zhoRi up-m-l-30">20240812090816363960</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">备注</view>
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
	.liucItem{
		image{
			width:100rpx;
			height:100rpx;
			border-radius:50%;
			display:block;
		}
		.liucRight{
			width:70vw;
			.lrleft{
				font-size: 26rpx;
				color: #B7C4D7;
			}
			.lrlbot{
				font-size: 28rpx;
				color: #092D5C;
			}
		}
	}
	.shux{
		width:1rpx;
		height:60rpx;
		border:3rpx solid #B7C4D7;
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
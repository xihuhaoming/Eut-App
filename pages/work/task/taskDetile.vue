<template>
	<view>
		<up-navbar title="事项详情" :placeholder="true" :autoBack="true" />
		<view class="const">
			<view class="detileItem">
				<view class="itemTime up-flex u-col-center">
					<view class="timeLeft up-m-r-10">通知</view>
					<view class="timeright">2023.03.05截止</view>
				</view>
				<view class="up-flex u-col-center up-m-t-15">
					<image src="/static/logo.png" class="infoLeft up-m-r-10">通知</image>
					<view class="inforight">下发人名字：2023.03.05 16:00 下发</view>
				</view>
				<view class="rwname bold up-m-t-20 up-m-b-20">任务事项名称</view>
				<view class="rwcon">
					如怀疑存在 DNS 劫持，可尝试更换 DNS 服务器或使用其他域名解析服务进行测试，以确定是否是 DNS 方面的问题
				</view>
				<view class="updateImg up-flex u-flex-wrap">
					<image src="/static/logo.png" class="up-m-l-20 up-m-t-20"></image>
					<image src="/static/logo.png" class="up-m-l-20 up-m-t-20"></image>
					<image src="/static/logo.png" class="up-m-l-20 up-m-t-20"></image>
					<image src="/static/logo.png" class="up-m-l-20 up-m-t-20"></image>
				</view>
				<view class="rightIcon">待处理</view>
			</view>
			<view class="qued btn" style="position:absolute;bottom:50rpx;">完成</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
</script>


<style scoped lang="scss">
	page {
		background: #F6F8FA;
	}

	.const {
		padding: 30rpx;
	}

	.btn {
		position: absolute;
		bottom: 50rpx;
		left:50%;
		margin-left:-319rpx;
	}

	.detileItem {
		padding: 30rpx 35rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		position: relative;

		.rightIcon {
			position: absolute;
			right: 0;
			top: 30rpx;
			width: 92rpx;
			height: 36rpx;
			background: #FEAC49;
			border-radius: 18rpx 0rpx 0rpx 18rpx;
			font-size: 20rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 32rpx;
		}

		.itemTime {
			.timeLeft {
				width: 50rpx;
				height: 50rpx;
				background: #3C82FE;
				border-radius: 6rpx;
				color: #fff;
				font-size: 20rpx;
				text-align: center;
				line-height: 50rpx;
			}

			.timeright {
				font-size: 28rpx;
				color: #092D5C;
			}
		}

		.infoLeft {
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
		}

		.inforight {
			font-size: 26rpx;
			color: #5A78A0;
		}

		.rwname {
			font-size: 36rpx;
			color: #092D5C;
		}

		.rwcon {
			background: #F6F8FC;
			border-radius: 8rpx;
			padding: 10rpx 20rpx;
			font-size: 28rpx;
			color: #B7C4D7;
		}

		.updateImg image {
			width: 125rpx;
			height: 125rpx;
		}
	}
</style>
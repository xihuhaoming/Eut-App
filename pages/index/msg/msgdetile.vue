<template>
	<view>
		<up-navbar title="消息详情" :placeholder="true" :autoBack="true" />
		<view class="msgbox">
			<view class="detiil-title up-flex u-row-between u-col-center">
				<view class="title-left">消息通知</view>
				<view class="title-right">2024-04-23 16:00</view>
			</view>
			<view class="detile-con up-m-t-30">
				您提交的【开票申请】已被【员工名】拒绝，
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
</script>

<style scoped lang="scss">
	.msgbox {
		padding: 30rpx;
		width: 100%;

		.detiil-title {
			.title-left {
				font-size: 56rpx;
				color: #000000;
			}

			.title-right {
				font-size: 26rpx;
				color: #B7C4D7;
			}
		}

		.detile-con {
			font-size: 28rpx;
			color: #5A78A0;
		}
	}
</style>
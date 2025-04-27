<template>
	<view>
		<up-navbar title="消息中心" :placeholder="true" :autoBack="true" />
		<view class="msgbox">
			<view class="u-flex msgItem" @click="detileClick">
				<view class="itemLeft up-m-r-20">通知</view>
				<view class="itemright">
					<view class="itemr-top up-flex u-row-between">
						<view class="up-m-r-80">消息通知</view>
						<view>2024-04-12 16:00</view>
					</view>
					<view class="itemr-bot up-m-t-20">消息通知消息通知消息通知消息通知消息通知消息通知消息通知</view>
				</view>
			</view>
			<view class="u-flex msgItem">
				<view class="itemLeft up-m-r-20" style="background:#3C82FE">公告</view>
				<view class="itemright">
					<view class="itemr-top up-flex u-row-between">
						<view class="up-m-r-80">消息通知</view>
						<view>2024-04-12 16:00</view>
					</view>
					<view class="itemr-bot up-m-t-20">消息通知消息通知消息通知消息通知消息通知消息通知消息通知</view>
				</view>
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
	const detileClick = () => {
		uni.navigateTo({
			url: "/pages/index/msg/msgdetile"
		})
		route('/pages/index/msg/msgdetile');
	}
</script>

<style scoped lang="scss">
	.msgbox {
		padding: 30rpx;

		.msgItem {
			border-bottom: 1rpx solid #e5e5e5;
			padding: 30rpx 0;

			.itemLeft {
				width: 99rpx;
				height: 99rpx;
				background: #FEAC49;
				border-radius: 50%;
				text-align: center;
				line-height: 99rpx;
				color: #fff;
				font-size: 28rpx;
			}

			.itemright {
				width: 80vw;
			}

			.itemr-top {
				font-size: 26rpx;
				color: #B7C4D7;
			}

			.itemr-bot {
				font-size: 28rpx;
				color: #092D5C;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				/* 显示的行数 */
				overflow: hidden;
			}
		}
	}
</style>
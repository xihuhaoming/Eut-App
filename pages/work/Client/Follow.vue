<template>
	<view>
		<up-navbar title="跟进记录详情" :placeholder="true" :autoBack="true" />
		<view style="padding:30rpx">
			<view class="u-flex u-row-between u-col-center">
				<view class="">
					<view class="con-time bold">
						2023.12.31 15:00
					</view>
					<view class="con-xtime">
						下次跟进日期：2023.12.31
					</view>
				</view>
				<view class="con-right" style="background:#3C82FE">
					有意向
				</view>
				<!-- 	<view class="con-right" style="background:#FE4949">
					无意向
				</view> -->
			</view>
			<view>
				<up-parse :content="content" class="up-m-t-20"></up-parse>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const content = ref('<div>123123</div>')
</script>

<style scoped lang="scss">
	.con-time {
		font-size: 36rpx;
		color: #000000;
	}

	.con-xtime {
		font-size: 28rpx;
		color: #092D5C;
	}

	.con-right {
		padding: 10rpx 35rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		width: 163rpx;
		border-radius: 0px 10rpx 0px 10rpx;
	}
</style>
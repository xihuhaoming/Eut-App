<template>
	<view>
		<up-navbar title="物资详情" :placeholder="true" :autoBack="true" />
		<view class="content">
			<view class="mateItem u-flex">
				<image src="/static/logo.png"></image>
				<view class="up-m-l-20">
					<view class="meTop">实物产品名称实物产品名称实物产</view>
					<view class="meTop2 up-m-t-10">793493749</view>
					<view class="meBot up-m-t-30">单价：739250.00</view>
					<view class="meBot2 up-m-t-10">总价值：739250.00</view>
				</view>
			</view>
		</view>
		<up-tabs :scrollable="false" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>

		<!-- 选择时间 -->
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow1"
			v-model="startTime" mode="date" placeholder="开始时间" @confirm="confirm1"
			@cancel="timeshow1 = false"></up-datetime-picker>
		<view class="content">
			<view class="up-m-b-20 u-flex" @click="timeshow1 = true">
				<view>时间</view>
				<up-icon name="arrow-down"></up-icon>
			</view>
			<view class="taskItem">
				<view class="titemTop u-flex u-row-between up-p-b-15 u-col-center">
					<view class="task-title bold">
						2023.05.20 16:00:00
					</view>
					<view class="tasktext">出库 <text style="color:#FE4949"> 20</text></view>
				</view>
				<view class="tasktext">操作人：皮卡丘</view>
				<view class="tasktext">备注：领用单:2022011114585</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		formatTimestamp
	} from '../../../util/formatTimestamp.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const timeshow1 = ref(false)
	const tabIndex = ref(0)
	const startTime = ref(Date.now())
	const list = reactive([{
			name: '出库记录'
		},
		{
			name: '入库记录'
		}
	]);
	const confirm1 = (e) => {
		startTime.value = formatTimestamp(e.value)
		timeshow1.value = false;
		console.log(startTime.value)
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
	}
</script>

<style lang='scss' scoped>
	page {
		background: #F6F8FA;
	}

	.content {
		padding: 30rpx;
	}

	::v-deep .uni-scroll-view-content {
		background: #ffffff;
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

	.mateItem {
		image {
			width: 200rpx;
			height: 200rpx;
		}

		.meTop {
			font-size: 28rpx;
			color: #092D5C;
		}

		.meTop2 {
			font-size: 26rpx;
			color: #B7C4D7;
		}

		.meBot {
			font-size: 26rpx;
			color: #3C82FE;
		}

		.meBot2 {
			font-size: 26rpx;
			color: #092D5C;

		}
	}
</style>
<template>
	<view>
		<up-navbar title="事项详情" :placeholder="true" :autoBack="true" />
		<view class="const">
			<view class="detileItem">
				<view class="itemTime up-flex u-col-center">
					<view class="timeLeft up-m-r-10" v-if="data.taskDetail.type==1">通知</view>
					<view class="timeLeft up-m-r-10" v-if="data.taskDetail.type==0">任务</view>
					<view class="timeright">{{data.taskDetail.endTime}}截止</view>
				</view>
				<view class="up-flex u-col-center up-m-t-15">
					<image src="/static/logo.png" class="infoLeft up-m-r-10">通知</image>
					<view class="inforight">{{data.userInfo.name}}：{{data.taskDetail.createInDate}}下发</view>
				</view>
				<view class="rwname bold up-m-t-20 up-m-b-20">{{data.taskDetail.title}}</view>
				<view class="rwcon">
					{{data.taskDetail.content}}
				</view>
				<view class="rightIcon" style="background: #FEAC49;" v-if="data.taskDetail.status == 0">待处理</view>
				<view class="rightIcon" style="background: #3C82FE;" v-if="data.taskDetail.status == 1">处理中</view>
				<view class="rightIcon" style="background: #1CAA42;" v-if="data.taskDetail.status == 2">已处理</view>
				<view class="rightIcon" style="background: #FE4949;" v-if="data.taskDetail.status == 3">已驳回</view>
			</view>
			<block v-if="data.submitList?.length">
				<view class="xtitle bold">提交记录</view>
				<block v-for="(item,index) in data.submitList" :key="index">
					<view class="detileItem">
						<view class="itemTime up-flex u-col-center">
							<view class="timeLeft up-m-r-10" v-if="data.taskDetail.type==1">通知</view>
							<view class="timeLeft up-m-r-10" v-if="data.taskDetail.type==0">任务</view>
							<view class="timeright">{{data.taskDetail.endTime}}截止</view>
						</view>
						<view class="up-flex u-col-center up-m-t-15">
							<image src="/static/logo.png" class="infoLeft up-m-r-10">通知</image>
							<view class="inforight">{{data.taskDetail.title}}：{{item.replyTime}} 下发</view>
						</view>
						<view class="rwname bold up-m-t-20 up-m-b-20">{{item.title}}</view>
						<view class="rwcon">
							{{item.content}}
						</view>
						<view class="updateImg up-flex u-flex-wrap">
							<block v-for="(item,index) in item.attachmentList">
								<image src="/static/fillImg.png" class="up-m-l-20 up-m-t-20"></image>
							</block>
						</view>
						<!-- <view class="rightIcon" style="background: #FEAC49;">待处理</view> -->
						<!-- <view class="rightIcon" style="background: #FE4949;">驳回</view> -->
						<!-- <view class="rightIcon" style="background: #3C82FE;">待确认</view> -->
						<view class="rightIcon" style="background: #1CAA42;">已通过</view>
					</view>
				</block>
			</block>
			<view class="qued btn" style="position:absolute;bottom:50rpx;" @click="submitTap">完成</view>
		</view>
	</view>
</template>

<script setup>
	import {
		API_taskReplyDetail,
		API_taskReplyComplete
	} from "../../../api/task.js"
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const data = ref()
	const taskReplyId = ref()
	const taskId = ref()
	onLoad((e) => {
		console.log(e)
		// typeIndex.value = e.typeIndex
		taskReplyId.value = e.taskReplyId
		taskId.value = e.id
		detileData();
	})
	const detileData = () => {
		API_taskReplyDetail(taskReplyId.value).then(res => {
			console.log(res)
			data.value = res.data
		})
	}
	const submitTap = () => {
		console.log("0000", )
		if (data.value.taskDetail.type == 1) {
			// let taskReplyId = taskReplyId.value
			API_taskReplyComplete(
				taskReplyId.value
			).then(res => {
				uni.$u.toast('成功')
				uni.navigateBack()
			})
		} else {
			console.log("11111", )
			uni.navigateTo({
				url: '/pages/work/task/tdAdd?taskId=' + taskId.value
			})
		}
	}
</script>


<style scoped lang="scss">
	page {
		background: #F6F8FA;
	}

	.const {
		padding: 30rpx;
	}

	.updateImg image {
		width: 125rpx;
		height: 125rpx;
	}

	.xtitle {
		font-size: 36rpx;
		color: #092D5C;
		margin: 30rpx 0 20rpx 0;
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
<!-- 提交记录 -->
<template>
	<view>
		<up-navbar title="提交记录" :placeholder="true" :autoBack="true" />
		<view class="const">
			<view class="xtitle bold">提交记录</view>
			<block v-if="listData" v-for="(item,index) in listData" :key="index">
				<view class="detileItem up-m-t-20">
					<view class="itemTime up-flex u-col-center">
						<view class="timeLeft up-m-r-10" v-if="taskDetail.type==1">通知</view>
						<view class="timeLeft up-m-r-10" v-if="taskDetail.type==0">任务</view>
						<view class="timeright">{{item.replyTime}}提交</view>
					</view>
					<view class="rwname bold up-m-t-20 up-m-b-20">{{taskDetail.title}}</view>
					<view class="rwcon">
						{{taskDetail.content}}
					</view>
					<!-- <view class="rightIcon" style="background: #FEAC49;">待处理</view> -->
					<!-- <view class="rightIcon" style="background: #FE4949;">驳回</view> -->
					<!-- <view class="rightIcon" style="background: #3C82FE;">待确认</view> -->
					<view class="rightIcon" style="background: #1CAA42;">已通过</view>


					<view class="rightIcon" v-if="taskDetail.status == 0" style="background:#3C82FE">进行中</view>
					<view class="rightIcon" v-if="taskDetail.status == 1" style="background:#1CAA42">已完成</view>
					<view class="rightIcon" v-if="taskDetail.status == 2" style="background:#FE4949">已超期</view>
					<view class="rightIcon" v-if="taskDetail.status == 3">终止</view>

					<view class="updateImg up-flex u-flex-wrap">
						<block v-for="(item,index) in taskDetail.attachmentList" :key="index">
							<image src="/static/fillImg.png" class="up-m-l-20 up-m-t-20"></image>
						</block>
					</view>

				</view>
			</block>
			<up-empty v-else class="up-m-t-50" mode="list" icon="/static/ques.png"></up-empty>
			<view v-if="listData" class="btnbox u-flex u-col-center">
				<view class="btnleft" @click="sub(1)">退回</view>
				<view class="btnright" @click="sub(0)">通过</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		API_taskReplyDetail,
		API_taskReplyAudit
	} from '/api/task.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const taskReplyId = ref()
	const taskDetail = ref()
	const listData = ref([])
	onLoad((e) => {
		taskReplyId.value = e.taskReplyId
		taskReplyDetail()
	});
	const sub = (status) => {
		uni.showModal({
			title: '提示',
			content: '是否确认操作',
			success: function(res) {
				if (res.confirm) {
					API_taskReplyAudit({
						taskReplyId: taskReplyId.value,
						status: status
					}).then(res => {
						uni.$u.toast('操作成功')
						setTimeout(() => {
							uni.navigateBack()
						}, 500)
					})
				}
			}
		});

	}
	const taskReplyDetail = () => {
		API_taskReplyDetail(taskReplyId.value).then(res => {
			console.log(res)
			listData.value = res.data.submitList
			taskDetail.value = res.data.taskDetail
		})
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

	.btnbox {
		position: absolute;
		bottom: 5vw;
		left: 9vw;

		.btnleft {
			padding: 25rpx 115rpx;
			font-size: 36rpx;
			color: #3C82FE;
			background: #ECF1FF;
			border-radius: 59rpx;
		}

		.btnright {
			padding: 25rpx 115rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			background: #3C82FE;
			border-radius: 59rpx;
			margin-left: 20rpx;
		}
	}
</style>
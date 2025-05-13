<template>
	<view>
		<up-navbar title="事项详情" :placeholder="true" :autoBack="true" />
		<view class="const">
			<view class="detileItem">
				<view class="itemTime up-flex u-col-center">
					<view class="timeLeft up-m-r-10">通知</view>
					<view class="timeright">{{data.taskInfo.endTime}}截止</view>
				</view>
				<view class="up-flex u-col-center up-m-t-15">
					<image :src="data.userInfo.avatar" class="infoLeft up-m-r-10">通知</image>
					<view class="inforight">{{data.userInfo.name}}：{{data.taskInfo.endTime}}下发</view>
				</view>
				<view class="up-flex up-m-t-10 up-m-b-10 u-col-center">
					<view class="wancLeft up-m-r-10">完成进度</view>
					<u-line-progress :percentage="(data.completedCount/data.totalCount)
					*100" activeColor="#19be6b"></u-line-progress>
				</view>
				<view class="wancLeft up-m-r-10">完成情况：{{data.completedCount}}/{{data.totalCount}} ></view>
				<view class="rwname bold up-m-t-20 up-m-b-20">{{data.title}}</view>
				<view class="rwcon">
					{{data.content}}
				</view>
				<view class="updateImg up-flex u-flex-wrap">
					<block v-for="(item,index) in data.taskInfo.attachmentList" :key="index">
						<image src="/static/fillImg.png" class="up-m-l-20 up-m-t-20"></image>
					</block>
				</view>
				<view class="rightIcon" v-if="data.taskInfo.status == 0" style="background:#3C82FE">进行中</view>
				<view class="rightIcon" v-if="data.taskInfo.status == 1" style="background:#1CAA42">已完成</view>
				<view class="rightIcon" v-if="data.taskInfo.status == 2" style="background:#FE4949">已超期</view>
				<view class="rightIcon" v-if="data.taskInfo.status == 3">终止</view>
			</view>
			<view class="btnbox u-flex u-col-center" v-if="typeIndex==2">
				<view class="btnleft" @click="zhongzTap()">中止</view>
				<view class="btnright" @click="edit()">变更</view>
			</view>
			<!-- <view class="qued btn" style="position:absolute;bottom:50rpx;">完成</view> -->
		</view>
	</view>
</template>

<script setup>
	import {
		API_taskDetail,
		API_taskStop,
		API_getProcessDetail
	} from '/api/task.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useCounterStore
	} from '/store/counter';
	const store = useCounterStore();
	const typeIndex = ref()
	const taskId = ref()
	const data = ref({})
	const jindData = ref({})
	onLoad((e) => {
		console.log(e)
		typeIndex.value = e.typeIndex
		taskId.value = e.id
		detileData();
	})
	const detileData = () => {
		console.log(taskId.value)
		// return
		// API_taskDetail(taskId.value).then(res => {
		// 	console.log(res)
		// 	data.value = res.data
		// })
		API_getProcessDetail(taskId.value).then(res => {
			data.value = res.data
		})
	}
	const edit = () => {
		uni.navigateTo({
			url: '/pages/work/task/addtask?edit=1&taskId=' + taskId.value
		})
	}
	const zhongzTap = () => {
		uni.showModal({
			title: '提示：',
			content: '请确认是否中止',
			success: function(res) {
				if (res.confirm) {
					API_taskStop(taskId.value).then(res => {
						uni.$u.toast('中止成功')
						uni.navigateBack()
					})
				}
			}
		});
	}
</script>


<style scoped lang="scss">
	page {
		background: #F6F8FA;
	}

	.const {
		padding: 30rpx;
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


	.wancLeft {
		font-size: 28rpx;
		color: #092D5C;
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
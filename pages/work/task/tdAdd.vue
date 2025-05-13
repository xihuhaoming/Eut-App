<template>
	<view>
		<!-- 提交 -->
		<up-navbar title="事项详情" :placeholder="true" :autoBack="true" />
		<view class="const">
			<view class="detileItem">
				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入文字内容" border="surround" v-model="textValue"></textarea>
				</view>
				<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
					<view class="attLeft">
						附件：<text style="color: #B7C4D7;">请添加图片或文件</text>
					</view>
					<up-icon @click="uploadClick" name="plus-circle" size="22px" color="#5A78A0"></up-icon>
				</view>
				<block v-for="(item,index) in fillList" :key="index">
					<view class="u-flex up-m-t-30 u-row-between ">
						<view class="updataLeft u-flex u-col-center">
							<image src="/static/logo.png"></image>
							<!-- <image :src="item.url"></image> -->
							<view class="up-m-l-10 name">{{item.name}}</view>
						</view>
						<up-icon @click="delefill(index)" name="close-circle-fill" size="22px" color="#B7C4D7"></up-icon>

					</view>
				</block>
			</view>
			<view class="qued btn" style="position:absolute;bottom:50rpx;" @click="SubmitTap">提交</view>
		</view>
	</view>
</template>

<script setup>
	import {
		API_taskReplySubmit
	} from '../../../api/task.js'
	import {
		uploadFileFn
	} from '/util/request/request';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const fillList = ref([])
	const taskId = ref()
	const textValue = ref()
	onLoad((e) => {
		console.log(e.taskId)
		taskId.value = e.taskId
	})
	const SubmitTap = () => {
		API_taskReplySubmit({
			taskId: taskId.value,
			content: textValue.value,
			attachmentList: fillList.value
		}).then(res => {
			uni.$u.toast("提交成功")
			setTimeout(() => {
				uni.navigateTo({
					url:'/pages/work/task/task'
				})
			}, 500)

		})
	}
	// 上传
	const uploadClick = () => {
		uni.chooseFile({
			count: 1, // 最多选择 1 个文件
			type: 'all', // 选择所有类型的文件
			success: function(res) {
				console.log(res)
				console.log('选择的文件路径：', res.tempFiles[0].path);
				let fillPath = res.tempFilePaths[0];
				console.log(fillList.value)
				uni.showLoading({})
				uploadFileFn(fillPath).then(res => {
					console.log(res)
					fillList.value.push(res)
					uni.hideLoading()
				})
			},
			fail: function(err) {
				console.error('选择文件失败：', err);
			}
			// fillList.value.push(...obj)
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

	.btn {
		position: absolute;
		bottom: 50rpx;
		left: 50%;
		margin-left: -319rpx;
	}

	.detileItem {
		padding: 30rpx 35rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
	}

	.textClass {
		width: 618rpx;
		height: 160rpx;
		background: #F6F8FC;
		border-radius: 8rpx;
		padding: 10rpx 0 0 10rpx;
	}

	.attachmentTitle {
		.attLeft {
			font-size: 28rpx;
			color: #5A78A0;
		}
	}

	.updataLeft {
		image {
			width: 68rpx;
			height: 68rpx;
		}

		.name {
			font-size: 22rpx;
			color: #092D5C;
		}
	}
</style>
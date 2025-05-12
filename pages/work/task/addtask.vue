<template>
	<view>
		<up-navbar title="新增任务&通知" :placeholder="true" :autoBack="true" />
		<view class="content">
			<view class="typeTop up-flex u-row-center">
				<hy-btn-group :list="typeList" v-model="typeValue" @itemClick="itemClick" :cancelSelectItem="false"
					:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F6F8FC',borderRadius:'30rpx'}"
					:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF',borderRadius:'30rpx'}"></hy-btn-group>
			</view>
			<view class="xtitle bold">
				信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="截止日期" :value="endTime" :isLink="true" arrow-direction="right" :required="true"
						@click="timeTan(1)"></up-cell>
					<up-cell title="事项名称" isLink :required="true">
						<template #value>
							<input v-model="title" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
				</up-cell-group>
				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入文字内容" border="surround" v-model="content"></textarea>
				</view>
				<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
					<view class="attLeft">
						附件：<text style="color: #B7C4D7;">请添加图片或文件</text>
					</view>
					<up-icon @click="uploadClick" name="plus-circle" size="22px" color="#5A78A0"></up-icon>
				</view>
				<view class="u-flex up-m-t-30 u-row-between ">
					<view class="updataLeft u-flex u-col-center">
						<image src="/static/logo.png"></image>
						<view class="up-m-l-10 name">文件名称</view>
					</view>
					<up-icon name="close-circle-fill" size="22px" color="#B7C4D7"></up-icon>
				</view>
			</view>
			<view class="xtitle bold">
				流程
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="任务人" value="已选 15 人" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="抄送人" value="已选 1 人" :isLink="true" arrow-direction="right" :required="true"></up-cell>
				</up-cell-group>
			</view>
			<view class="qued up-m-t-70">确定</view>
		</view>
		<!-- 选择时间 -->
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow1"
			v-model="endTime" mode="date" placeholder="开始时间" @confirm="confirm1"
			@cancel="timeshow1 = false"></up-datetime-picker>
	</view>
</template>

<script setup>
	import {
		upload
	} from "/util/request/request.js"
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const typeValue = ref(1)
	const timeshow1 = ref(false)
	const endTime = ref('请选择')
	const title = ref('')
	const content = ref('')
	const typeList = reactive([{
		label: '任务',
		value: 1
	}, {
		label: '通知',
		value: 2
	}]);
	const name = ref('')
	const textValue = ref('')
	// 上传
	const uploadClick = () => {
		upload().then(res=>{
			console.log(res)
		})
	}
	// 选择类型Z
	const itemClick = (e) => {
		console.log(e)
	}
	// 选择时间
	const timeTan = (e) => {
		timeshow1.value = true
	}
	const confirm1 = (e) => {
		endTime.value = formatTimestamp(e.value)
		timeshow1.value = false;
	}
	// 转换时间戳
	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
</script>

<style setup lang="scss">
	page {
		background: #F6F8FA;
	}

	::v-deep .u-cell__body {
		padding: 25rpx 0 !important;
	}

	::v-deep .u-cell__title-text,
	.u-cell__value {
		color: #5A78A0 !important;
	}

	::v-deep .u-cell__value {
		color: #092D5C !important;
	}

	.content {
		padding: 30rpx;

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

		.attachmentTitle {
			.attLeft {
				font-size: 28rpx;
				color: #5A78A0;
			}
		}

		.textClass {
			width: 618rpx;
			height: 160rpx;
			background: #F6F8FC;
			border-radius: 8rpx;
			padding: 10rpx 0 0 10rpx;
		}

		.card {
			padding: 30rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
			border-radius: 10rpx;
		}

		.xtitle {
			font-size: 36rpx;
			color: #092D5C;
			padding: 30rpx 0 20rpx 0;
		}

		.typeTop {
			width: 100%;
			padding: 30rpx;
			background: #fff;
		}

		::v-deep .btn-group {
			justify-content: center !important;
			display: flex !important;
		}
	}
</style>
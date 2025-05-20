<template>
	<view>
		<block v-for="(item,index) in list">
			<view class="liucItem u-flex" v-if="item.activityType=='startEvent'">
				<image :src="item.avatar"></image>
				<view class="liucRight u-flex up-m-l-20 u-row-between">
					<view class="">
						<view class="lrleft">发起流程</view>
						<view class="lrlbot">{{item.assigneeName}}</view>
					</view>
					<view class="lrleft">{{item.createTime}}</view>
				</view>
			</view>
			<view class="liucItem u-flex" v-if="item.activityType=='userTask'">
				<image :src="item.avatar"></image>
				<view class="liucRight u-flex up-m-l-20 u-row-between">
					<view class="">
						<view class="lrleft">{{item.activityName}}</view>
						<view class="lrlbot">{{item.assigneeName}}</view>
					</view>
					<view class="lrleft">{{item.createTime}}</view>
				</view>
			</view>
			<view class="liucItem u-flex" v-if="item.activityType=='endEvent'">
				<image :src="item.avatar"></image>
				<view class="liucRight u-flex up-m-l-20 u-row-between">
					<view class="">
						<view class="lrleft">结束流程</view>
						<view class="lrlbot">{{item.assigneeName}}</view>
					</view>
					<view class="lrleft">{{item.createTime}}</view>
				</view>
			</view>
			<view v-if="index!==(list.length-1)" class="shux up-m-l-50 up-m-t-20"></view>
		</block>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits,
		ref,
		onMounted
	} from 'vue';
	// 定义 props
	const props = defineProps({
		list: {
			type: Array,
			require: ""
		}
	})
	// 生命周期钩子
	onMounted(() => {
		console.log('MyButton 组件已挂载');
	});
</script>

<style lang="scss" scoped>
	.liucItem {
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			display: block;
		}

		.liucRight {
			width: 70vw;

			.lrleft {
				font-size: 26rpx;
				color: #B7C4D7;
			}

			.lrlbot {
				font-size: 28rpx;
				color: #092D5C;
			}
		}
	}

	.shux {
		width: 1rpx;
		height: 60rpx;
		border: 3rpx solid #B7C4D7;
	}
</style>
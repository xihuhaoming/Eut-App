<template>
	<view>
		<up-navbar :title="type===chooseMaterial? '物资管理':'选择实物产品'" :placeholder="true" :autoBack="true" />

		<up-search class="up-m-b-20 up-m-t-20" placeholder="请输入查找内容" v-model="keyword" :showAction="false" bgColor="#F6F8FC"
			height="40"></up-search>
		<up-dropdown>
			<up-dropdown-item v-model="value1" title="一级" :options="options1"></up-dropdown-item>
			<up-dropdown-item v-if="value1" v-model="value2" title="温度" :options="options2"></up-dropdown-item>
		</up-dropdown>
		<view class="content">
			<view class="mateItem u-flex">
				<image src="/static/logo.png"></image>
				<view class="up-m-l-20">
					<view class="meTop">实物产品名称实物产品名称实物产</view>
					<view class="meTop2 up-m-t-10">793493749</view>
					<view class="meBot up-m-t-30">单价：739250.00</view>
					<view class="meBot2 up-m-t-10">总价值：739250.00</view>
				</view>
				<view class="up-m-l-20">
					<up-button type="primary" size="mini" class="select-btn">选择</up-button>
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
	import { getMaterialList } from '@/api/material'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const type = ref('')
	onLoad((e) => {
		type.value = e.type
		console.log(type.value)
		getMaterialListData()
	})
	
	// 获取物资列表
	const getMaterialListData = async () => {
		const res = await getMaterialList({
			page: 1,
			pageSize: 10
		})
		console.log(res)
	}
	
	
	const options1 = reactive([{
			label: '默认排序',
			value: 1,
		},
		{
			label: '距离优先',
			value: 2,
		},
		{
			label: '价格优先',
			value: 3,
		}
	])
	const options2 = reactive([{
			label: '默认排序',
			value: 1,
		},
		{
			label: '距离优先',
			value: 2,
		},
		{
			label: '价格优先',
			value: 3,
		}
	])
	const value1 = ref('')
	const value2 = ref('')
	const keyword = ref('')
</script>

<style lang='scss' scoped>
	.content {
		padding: 30rpx;
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
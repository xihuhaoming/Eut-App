<template>
	<view>
		<up-navbar :title="type==='chooseMaterial'? '选择实物产品':'物资管理'" :placeholder="true" :autoBack="true" />

		<up-search class="up-m-b-20 up-m-t-20" placeholder="请输入查找内容" v-model="keyword" :showAction="false" bgColor="#F6F8FC"
			height="40"></up-search>
		<up-dropdown>
			<up-dropdown-item v-model="value1" title="一级" :options="options1"></up-dropdown-item>
			<up-dropdown-item v-model="value1" title="一级" :options="options1"></up-dropdown-item>
			<up-dropdown-item v-model="value1" title="一级" :options="options1"></up-dropdown-item>
		</up-dropdown>
		<view class="content">
			<view class="mateItem u-flex" v-for="(item,index) in inventoryList" :key="index">
				<view class="img-box">
					<image class="img" src="/static/logo.png"></image>
					<view class="yellow-block">库存：{{ item.inNumber }}</view>
				</view>
				<view class="up-m-l-20">
					<view class="meTop">{{ item.entityName }}</view>
					<view class="meTop2 up-m-t-10">793493749</view>
					<view class="meBot up-m-t-30">单价：{{ item.entityPrice }}</view>
					<view class="meBot2 up-m-t-10">总价值：{{ item.entityPrice * item.inNumber }}</view>
				</view>
				<view class="up-m-l-20" v-if="type === 'chooseMaterial'">
					<up-button type="primary" size="mini" class="select-btn" @click="chooseMaterial(item)">选择</up-button>
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
	import { getMaterialList, getInventoryList } from '@/api/material'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const type = ref('')
	onLoad((e) => {
		type.value = e.type
		getMaterialListData()
		getInventoryListData()
	})

	
	// 获取物资列表
	const getMaterialListData = async () => {
		const params = {
			inSuperiorSysNo: 0
		}
		const res = await getMaterialList(params)
		console.log(res)
		options1.value = res.data.map(item => ({
			label: item.label,
			value: item.label
		}))
		console.log(options1.value)
	}
	const inventoryList = ref([])
	// 获取库存列表
	const getInventoryListData = async () => {
		const params = {
			pageIndex: 1,
			pageSize: 5
		}
		const res = await getInventoryList(params)
		inventoryList.value = res.data.records
		console.log("库存列表_+++++",inventoryList.value)
	}

	const chooseMaterial = (selectedProduct) => {
		uni.$emit('confirmProduct', selectedProduct)
		uni.navigateBack({
			delta: 0
		})
	}
	
	const options1 = reactive([])
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
	const value1 = ref('123')
	const value2 = ref('')
	const keyword = ref('')
</script>

<style lang='scss' scoped>
	.content {
		padding: 30rpx;
	}
	.select-btn{
		margin-top: 30rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		padding: 20rpx 30rpx;
	}
	.yellow-block{
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: #f1aa67;
		padding: 10rpx 20rpx;
		border-radius: 0 0 10rpx 10rpx;
		color: #fff;
		width: 100%;
		font-size: 20rpx;
		text-align: center;
	}
	.mateItem {
		
		margin-bottom: 20rpx;
		display: flex;
		align-items: top;
		image {
			width: 150rpx;
			height: 150rpx;
			position: relative;
		}
		.img-box{
			position: relative;
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
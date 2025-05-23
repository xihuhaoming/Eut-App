<template>
	<view>
		<up-navbar title="请选择联系人" :placeholder="true" :autoBack="true" />
		<view class="card up-p-t-20" style="background:#ffffff;">
			<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="keyword" :showAction="false" bgColor="#F6F8FC"
				height="40"></up-search>
			<view class="tongxl">通讯录</view>
		</view>
		<view class="card">
			<view style="background:#ffffff; padding:30rpx">
				<up-radio-group v-model="radioValue" placement="column" @change="radioChange" shape="circle">
					<view v-for="(item, index) in checkboxList1" :key="index" class="item u-flex u-col-center u-row-between">
						<up-radio :customStyle="{marginBottom: '8px'}" :label="item.name" :name="item.name" :checked="index === 0">
						</up-radio>
						<view class="xiaj">
							<image src="/static/logo.png"></image>
							下级
						</view>
					</view>
				</up-radio-group>
			</view>
		</view>
		<view class="card">
			<view style="background:#ffffff; padding:30rpx">
				<up-radio-group v-model="checkboxValue1" placement="column" @change="checkboxChange" shape="circle">
					<view v-for="(item, index) in checkboxList1" :key="index" class="item u-flex u-col-center u-row-between">
						<up-radio :customStyle="{marginBottom: '8px'}" :label="item.name" :name="item.name">
						</up-radio>
					</view>
				</up-radio-group>
			</view>
		</view>
		<view class="botFixd u-flex u-col-center u-row-between">
			<view class="lefttext">已选择1人</view>
			<view class="btn">确定</view>
		</view>
	</view>
</template>

<script setup>
	import {
		userGetDepartList,
	} from '/api/user.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive
	} from 'vue';
	const keyword = ref('')
	const checkboxValue1 = reactive([]);

	// 基本案列数据
	const checkboxList1 = reactive([{
			name: '易尤特集团(100 人)',
			disabled: false,
		},
		{
			name: '易尤特集团(100 人)',
			disabled: false,
		},
		{
			name: '易尤特集团(100 人)',
			disabled: false,
		},
	]);
	import {
		useCounterStore
	} from '/store/counter';
	const store = useCounterStore();
	onLoad(() => {
		DepartList()
	})
	const DepartList = () => {
		userGetDepartList({
			departSysNo: "0"
		}).then(res => {
			console.log(res)
			checkboxList1.splice(0, checkboxList1.length, ...res.data.deptList)
		})
	}
	const checkboxChange = (n) => {
		console.log('change', n);
	};
</script>

<style scoped lang="scss">
	page {
		background: #F6F8FA;
	}

	.botFixd {
		width: 100%;
		padding: 50rpx 30rpx;
		background: #fff;
		position: absolute;
		bottom: 0;

		.lefttext {
			font-size: 28rpx;
			color: #092D5C;
		}

		.btn {
			background: #3C82FE;
			box-shadow: 0px 8px 20px 0px rgba(60, 130, 254, 0.3);
			border-radius: 49px;
			padding: 15rpx 60rpx;
			color: #fff;
			font-size: 28rpx;
		}
	}

	.card {
		padding: 30rpx;

		.tongxl {
			font-size: 28rpx;
			color: #5A78A0;
		}

		.item {
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #F5F5F5;
		}

		.xiaj {
			font-size: 28rpx;
			color: #3C82FE;

			image {
				width: 23rpx;
				height: 26rpx;
			}
		}
	}
</style>
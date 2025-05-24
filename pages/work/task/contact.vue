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
				<up-radio-group v-model="radioValue1" placement="column" @change="radioChange1" shape="circle">
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
				<up-radio-group v-model="radioValueSysNo" placement="column" @change="groupChange" shape="circle">
					<view v-for="(item, index) in checkboxList2" :key="index" class="item u-flex u-col-center u-row-between">
						<up-radio :customStyle="{marginBottom: '8px'}" :label="item.name" :name="item.sysNo" @change="radioChangeUser(item.sysNo)">
						</up-radio>
					</view>
				</up-radio-group>
			</view>
		</view>
		<view class="botFixd u-flex u-col-center u-row-between">
			<view class="lefttext">已选择1人</view>
			<view class="btn" @click="confirm">确定</view>
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
	const checkboxList1 = reactive([]);
	const checkboxList2 = reactive([]);
	const radioValueSysNo = ref('');
	const selectedUserObject = ref(null);
	import {
		useCounterStore
	} from '/store/counter';

	const radioValue1 = ref('');
	const radioValueUser = ref('');

	const store = useCounterStore();
	onLoad(() => {
		DepartList()
	})
	const DepartList = async () => {
		const res = await userGetDepartList({
			departSysNo: "0"
		})
		checkboxList1.splice(0, checkboxList1.length, ...res.data.deptList)
		checkboxList2.splice(0, checkboxList2.length, ...res.data.userList)
	}
	const radioChangeUser = (item) => {
		radioValueUser.value = item;
		console.log('单个 radio change, 选中的 item:', item);
	};

	
	const groupChange = (name) => { // up-radio-group 的 @change 事件，name 是选中的 radio 的 :name 值 (即 sysNo)
		console.log('radio group change, 选中的 sysNo:', name);
		// radioValueSysNo.value 已经被 v-model 自动更新为 name (即 sysNo)
		// 如果 selectedUserObject 还没有因为单个 radioChange 更新，可以在这里补充查找逻辑
		if (!selectedUserObject.value || selectedUserObject.value.sysNo !== name) {
			const foundUser = checkboxList2.find(user => user.sysNo === name);
			if (foundUser) {
				selectedUserObject.value = foundUser;
				console.log('通过 groupChange 找到并更新了 selectedUserObject:', selectedUserObject.value);
			}
		}
	};

	const confirm = () => {
		if (!selectedUserObject.value || !selectedUserObject.value.sysNo || !selectedUserObject.value.name) {
			uni.showToast({ title: '请先选择一位有效的负责人', icon: 'none' });
			console.warn('确认时：未选择有效用户或用户信息不完整:', selectedUserObject.value);
			return;
		}
		const dataToSend = {
			name: selectedUserObject.value.name,
			sysNo: selectedUserObject.value.sysNo
		}
		
		uni.$emit('receiveUser', dataToSend)

		console.log('数据已通过事件发送', dataToSend);

		// 将radioValue1的值传给父级
		uni.navigateBack({
			delta: 0
		})
	}
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
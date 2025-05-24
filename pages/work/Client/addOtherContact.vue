<template>
	<view>
		<up-navbar title="添加联系人" :placeholder="true" :autoBack="true" />
		<view class="content" style="padding:30rpx">
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="姓名" :isLink="false" :required="true">
						<template #value>
							<input v-model="form.name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="手机号" :isLink="false" :required="true">
						<template #value>
							<input v-model="form.mobile" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="部门" :isLink="false" :required="false">
						<template #value>
							<input v-model="form.department" placeholder="部门名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="职位" :isLink="false" :required="false">
						<template #value>
							<input v-model="form.position" placeholder="职位" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="邮箱" :isLink="false" :required="false">
						<template #value>
							<input v-model="form.email" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
				</up-cell-group>
			</view>
		</view>
		<view class="qued up-m-t-50" @click="submitForm">
			添加
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	
	// 表单数据
	const form = reactive({
		name: '小三四五六',        // 姓名
		mobile: '13800138000',      // 手机号
		department: '销售部',  // 部门
		position: '销售经理',    // 职位
		email: 'zhangsan@163.com'        // 邮箱
	});
	
	// 删除原有的 name ref
	const fileList1 = ref([]);

	// 删除图片
	const deletePic = (event) => {
		fileList1.value.splice(event.index, 1);
	};
	
	// 提交表单
	const submitForm = () => {
		// 表单验证
		if (!form.name) {
			uni.showToast({
				title: '请输入姓名',
				icon: 'none'
			});
			return;
		}
		
		if (!form.mobile) {
			uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			});
			return;
		}
		
		// 简单的手机号验证
		if (!/^1\d{10}$/.test(form.mobile)) {
			uni.showToast({
				title: '手机号格式不正确',
				icon: 'none'
			});
			return;
		}
		
		// 如果填写了邮箱，进行简单验证
		if (form.email && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(form.email)) {
			uni.showToast({
				title: '邮箱格式不正确',
				icon: 'none'
			});
			return;
		}
		
		// 构造要返回的联系人数据
		const contactData = {
			name: form.name,
			mobile: form.mobile,
			department: form.department,
			position: form.position,
			email: form.email
		};
		
		// 使用简单的事件通信方式
		uni.$emit('otherContactAdded', contactData);
		console.log('数据已通过事件发送', contactData);
		
		
		// 直接返回，不使用Toast延迟
		uni.navigateBack({
			delta: 0
		});
	};
	
	// 添加跟进记录的方法保留
	const addFlow = () => {
		uni.navigateTo({
			url: '/pages/work/Client/addFollow'
		})
	}
	
</script>


<style lang="scss" scoped>
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

	.card {
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		position: relative;
		padding: 30rpx;
	}

	.qued {
		width: 690rpx;
		height: 100rpx;
		background: #3C82FE;
		border-radius: 50rpx;
		margin: 0 auto;
		text-align: center;
		line-height: 100rpx;
		color: #FFFFFF;
		font-size: 36rpx;
	}
</style>
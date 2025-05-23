<template>
	<view>
		<up-navbar title="添加联系人" :placeholder="true" :autoBack="true" />
		<view class="content" style="padding:30rpx">
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="客户" :isLink="true" :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> <up-cell title="意向" :isLink="true" :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="注册地址" value="请选择" :isLink="true" :required="false"></up-cell>
					<up-cell title="下次联系日期" value="请选择" :isLink="true" :required="false"></up-cell>
				</up-cell-group>
				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="textValue"></textarea>
				</view>
				<view class="uppic up-m-t-20 up-m-b-20">照片</view>
				<up-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="10"></up-upload>
			</view>
		</view>
		<view class="qued up-m-t-50">
			提交
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const name = ref('')
	const fileList1 = ref([]);

	// 删除图片
	const deletePic = (event) => {
		fileList1.value.splice(event.index, 1);
	};
	const addFlow = () => {
		uni.navigateTo({
			url: '/pages/work/Client/addFollow'
		})
	}
	// 新增图片
	const afterRead = async (event) => {
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file);
		let fileListLen = fileList1.value.length;
		lists.map((item) => {
			fileList1.value.push({
				...item,
				status: 'uploading',
				message: '上传中',
			});
		});
		for (let i = 0; i < lists.length; i++) {
			const result = await uploadFilePromise(lists[i].url);
			let item = fileList1.value[fileListLen];
			fileList1.value.splice(fileListLen, 1, {
				...item,
				status: 'success',
				message: '',
				url: result,
			});
			fileListLen++;
		}
	};

	const uploadFilePromise = (url) => {
		return new Promise((resolve, reject) => {
			let a = uni.uploadFile({
				url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
				filePath: url,
				name: 'file',
				formData: {
					user: 'test',
				},
				success: (res) => {
					setTimeout(() => {
						resolve(res.data.data);
					}, 1000);
				},
			});
		});
	};
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

	.textClass {
		width: 618rpx;
		height: 160rpx;
		background: #F6F8FC;
		border-radius: 8rpx;
		padding: 10rpx 0 0 10rpx;
	}

	.uppic {
		font-size: 28rpx;
		color: #5A78A0;
	}
</style>
<template>
	<view>
		<up-navbar title="客户" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
	</view>
</template>

<script steup>
	import {
		ref,
		reactive,
		onMounted,
	} from 'vue';
	const list = reactive([{
			name: '企业客户'
		},
		{
			name: '个人客户'
		}
	]);
	const typeIndex = ref(0)

	// tab切换
	const tabclick = (e) => {
		console.log(e)
		typeIndex.value = e.index
		tasklistData()
	}
</script>

<style>

</style>
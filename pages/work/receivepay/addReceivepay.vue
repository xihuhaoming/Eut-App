<template>
	<view>
		<up-navbar title="收款申请" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :current="tabIndex" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="content" v-if="tabIndex == 0">
			<view class="xtitle bold">
				申请信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="申请部门" @click="departshow = true" :value="formData.entDeptName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="合同编号" @click="goToContract" :value="formData.code" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="客户名称" :value="formData.csrCustomerName" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="企业税号" :value="formData.csrCustomerCode" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="合同金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#FE4949">{{formData.allPrice}}</view>
						</template>
					</up-cell> <up-cell title="已交款金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#FE4949">{{formData.putPrice }}</view>
						</template>
					</up-cell> <up-cell title="考核金确认金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#FE4949">{{ formData.rPrice }}</view>
						</template>
					</up-cell> <up-cell title="待确认金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#FE4949">{{formData.waitApproveAmount}}</view>
						</template>
					</up-cell>


					<!-- 	<up-cell title="事项名称" isLink :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> -->
				</up-cell-group>
					<!-- 申请部门选择 -->
					<up-picker :show="departshow" keyName="name" :columns="departList" @cancel="departshow = false" @confirm="departConfirm"></up-picker>
				<!-- 收款合同选择 -->
					<up-picker :show="contractshow" keyName="csrCustomerName" :columns="contractList" @cancel="contractshow = false" @confirm="contractConfirm"></up-picker>
				<view class="u-flex u-row-between u-col-center">
					<view class="xtitle bold">*产品及服务</view>
					<view class="u-flex u-col-center">
						<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加收款产品</view>
						<up-icon name="plus-circle" size="20px" color="#5A78A0" @click="addProduct"></up-icon>
					</view>
				</view>
				<view class="card">
					<up-cell-group :border="false" v-for="(item,index) in formData.projReceivableSubs" :key="index">
						<up-cell title="产品" @click="openProduct(item,index)" :value="item.projServerName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="收款金额" :value="item.quAllPrice" :isLink="true"  :required="false"></up-cell>
						<up-cell title="已交款金额" :isLink="false" arrow-direction="right" :required="false">
							<template #right-icon>
								<view style="color:#FE4949">{{item.price}}</view>
							</template>
						</up-cell> <up-cell title="待确认金额" :isLink="false" arrow-direction="right" :required="false">
							<template #right-icon>
								<view style="color:#FE4949">{{item.invoicePrice}}</view>
							</template>
						</up-cell>
						<up-cell title="本次交款金额" :isLink="false" :required="true">
							<template #value>
								<input v-model="item.recPrice" placeholder="请输入事项名称" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<view class="up-m-t-20 up-m-t-20 u-text-center" style="color:red" @click="deleteProduct(index)">删除</view>
					</up-cell-group>
					<!-- 产品 -->
					<up-picker :show="contractProductshow" keyName="proServeName" :columns="proServerList" @cancel="contractProductshow = false" @confirm="contractProductConfirm"></up-picker>
				</view>
				<view class="xtitle bold">
					收款信息
				</view>
				<view class="card">
					<up-cell-group :border="false">
						<up-cell title="收款类型" @click="lxshow = true" :value="formData.type" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="收款账户" @click="zhanghushow = true" :value="formData.accountName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="收款金额" :isLink="false" :required="true">
							<template #value>
								<input v-model="formData.recPrice" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="支付单位" @click="payUnitshow = true" :value="formData.gsName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					</up-cell-group>
					<!-- 收款类型选择 -->
					<up-picker :show="lxshow" keyName="dictLabel" :columns="lxList" @cancel="lxshow = false" @confirm="lxConfirm"></up-picker>
					<!-- 收款账户选择 -->
					<up-picker :show="zhanghushow" keyName="name" :columns="zhanghuList" @cancel="zhanghushow = false" @confirm="zhanghuConfirm"></up-picker>
					<!-- 支付单位选择 -->
					<up-picker :show="payUnitshow" keyName="name" :columns="payUnitList" @cancel="payUnitshow = false" @confirm="payUnitConfirm"></up-picker>
				</view>
				<view class="textClass up-m-t-20">
					<textarea type="textarea" class="textarea_remark" placeholder="收款备注" border="surround" v-model="textValue"></textarea>
				</view>
			</view>
			<view class="qued up-m-t-70" @click="submitClick">提交</view>

		</view>
		<view class="content1" v-if="tabIndex == 1">
		<view class="up-p-t-20" style="background:#ffffff;">
				<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="searchData.search" :showAction="false" bgColor="#F6F8FC"
					height="40" @search="SubmitTime"></up-search>
				<view class="u-flex filter u-col-center u-row-around">
					<!-- 时间 -->
					<up-dropdown ref="uDropdownRef" border-radius="20">
						<up-dropdown-item title="时间">
							<view class="slot-content">
								<view class="slotCon up-flex up-text-center up-content-color u-row-around up-p-t-40 up-p-b-40">
									<view class="timeView" @click="timeTan(1)">{{searchData.stTime || '开始时间'}}</view>
									<view class="timeView" @click="timeTan(2)">{{searchData.edTime || '结束时间'}}</view>
								</view>
								<view class="slotCon up-flex up-text-center u-row-around up-p-t-40 up-p-b-40">
									<view class="timeBtn" @click="chongzTime">重置</view>
									<view class="timeBtn2" @click="SubmitTime">确认</view>
								</view>
								<!-- <up-button type="primary" @click="closeDropdown">时间</up-button> -->
							</view>
						</up-dropdown-item>
						<!-- 类型 -->
						<up-dropdown-item title="类型">
							<view class="slot-content up-p-l-25 up-p-r-25">
								<view class="slotCon up-text-center up-content-color up-p-t-40 up-p-b-40">
									<!-- 任务 -->
									<view class="typeTitle u-flex u-col-center ">
										<view class="ttleft up-m-r-20"></view>
										<view class="ttright">状态</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="statusList" v-model="searchData.useStatusList"
										@itemClick="itemClick1" :multiple="false"
										:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
									</view>
								<view class="slotCon up-flex up-text-center u-row-around up-p-t-40 up-p-b-40">
									<view class="timeBtn" @click="chongzTime">重置</view>
									<view class="timeBtn2" @click="SubmitTime">确认</view>
								</view>
								<!-- <up-button type="primary" @click="closeDropdown">时间</up-button> -->
							</view>
						</up-dropdown-item>
					</up-dropdown>
				</view>
			</view>
				<up-list
				class="taskbox"
			@scrolltolower="scrolltolower"
		>
			<up-list-item
				v-for="(item, index) in indexList"
				:key="index"
				class="taskItem"
				@click="goReceivepayDetail(item)"
			>
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>{{item.createInDate || '--'}}</view>
						</view>
						<view class="ttright">{{getLabelByValue(item.useStatus) || '--'}}</view>
						<!-- 	<view class="ttright" style="color:#FE4949">待确认</view>
						<view class="ttright" style="color:#1CAA42">待确认</view>
						<view class="ttright" style="color:#092D5C">已作废</view> -->
					</view>
					<view class="task-title up-m-t-20 bold">
						{{item.csrCustomerName || '--'}}
					</view>
					<view class="tasktext up-m-b-10" style="color:#3C82FE">{{item.code || '--'}}</view>
					<view class="tasktext">企业名称：{{item.csrCustomerName || '--'}}</view>
					<view class="tasktext">税号：{{item.csrCustomerCode || '--'}}</view>
					<view class="tasktext">部门：{{item.entDeptName || '--'}}</view>
					<view class="tasktext">负责人：{{item.createUserName || '--'}}</view>
					<view class="tasktext">收款类型：{{item.type || '--'}}</view>
					<view class="tasktext">金额：<text style="color:red">{{item.recPrice || '--'}}</text></view>
			</up-list-item>
		</up-list>
		</view>
		<!-- 选择时间 -->
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow1"
			v-model="startTime" mode="date" placeholder="开始时间" @confirm="confirm1"
			@cancel="timeshow1 = false"></up-datetime-picker>
		<up-datetime-picker :minDate="minEndTime" :hasInput="false" class="timeView" hasInput :show="timeshow2"
			v-model="endTime" mode="date" placeholder="结束时间" @confirm="confirm2"
			@cancel="timeshow2 = false"></up-datetime-picker>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
import {
	API_finApiPerformanceList,
	API_getUnionContractList,
		API_finApiReceivepayAdd,
		API_finApiReceivepayList,
		API_getContractProductList,
		API_contracthDetail,
		API_finApiInvoiceCompanyList,
		API_finApiReceivepayAccountList
	} from '@/api/task.js'
	import {
		useCounterStore
	} from '/store/counter';
	import {
		API_getDictType
	} from '/api/client.js'
import {
		formatTimestamp
	} from '/util/formatTimestamp.js'
	import { getLabelByValue, statusList } from '@/util/dict.js'
	import { onShow } from '@dcloudio/uni-app'
	
	const store = useCounterStore();

	const formData = ref({
		entDeptName: '',
		entDeptSysNo: '',
		contractName: '',
		contractSysNo: '',
		projContractSysNo: '', //合同流水号
		code: '', //合同编码
		recPrice: '', //收款金额
		type: '', //收款类型
		account: '', //收款账户
		accountSysNo: '', //收款账户流水号
		remarks: '', //备注
		projReceivableSubs: []
	})
	const searchData = ref({
		search: '',
		useStatusList: '',
		stTime: '',
		edTime: '',
		type: 1,
	})
	// 部门列表

	const departList = ref([])
	const departshow = ref(false)	

	const processList = ref([])	
	const processshow = ref(false)

	// 收款合同列表
	const contractList = ref([])
	const contractshow = ref(false)
	const contractData = ref({})
	const proServerList = ref([]) //产品服务
	
	// 合同下产品服务列表
	const contractProductList = ref([])
	const contractProductshow = ref(false)
	const chooseIndex = ref(0)
	// 收款类型列表
	const lxList = ref([])
	const lxshow = ref(false)
	// 收款账户列表
	const zhanghuList = ref([])
	const zhanghushow = ref(false)
	// 收款列表
	const receivepayList = ref([])
	const indexList = ref([])
	// 支付单位列表
	const payUnitList = ref([])
	const payUnitshow = ref(false)
	const columns = reactive([
		['油卡', '办公用品']
	]);
	const lxValue = ref("")
	const tabIndex = ref(0)
	const keyword = ref("")
	const list = reactive([{
			name: '发起提交'
		},
		{
			name: '提交记录'
		}
	]);
	const typeValue = ref(1)
	const typeList = reactive([{
		label: '增值税普通发票',
		value: 1
	}, {
		label: '增值税专用发票',
		value: 2
	}]);
	const workList0 = reactive([{
		label: '任务',
		value: 1
	}, {
		label: '通知',
		value: 2
	}]);
	const name = ref('')
	const textValue = ref('')
	const workList = reactive([{
			label: '采购流程',
			value: 1
		}, {
			label: '入库流程',
			value: 2
		},
		{
			label: '合同流程',
			value: 3
		},
		{
			label: '工作流流程',
			value: 4
		},
	]);
	const workList2 = reactive([{
			label: '采购流程',
			value: 1
		}, {
			label: '入库流程',
			value: 2
		},
		{
			label: '合同流程',
			value: 3
		}
	]);
	const workValue0 = reactive([])
	const workValue = reactive([])
	const workValue2 = reactive([])
	const uDropdownRef = ref(null)
	const startTime = ref(Date.now())
	const endTime = ref(Date.now())
	const minEndTime = ref(Date.now())
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);
	const timeshow = ref(false);
	const selectTime = ref(Date.now())
	formData.value.endTime = formatTimestamp(selectTime.value)
	onMounted(() => {
		resetFormData()
		getDepartList()
		getContractList()
		getLxType()
		getPayUnit()
		getAccountList()
	})
	onShow(() => {
		let contractSysNo = uni.getStorageSync('contractSysNo')
		if (contractSysNo) {
			console.log(contractSysNo)
			formData.value.projContractSysNo = contractSysNo
			contractDetile(contractSysNo)
			// contractData.value = JSON.parse(e.item)
		}			
	})
	function goReceivepayDetail(item) {
		uni.navigateTo({
			url: `/pages/work/receivepay/receDetile?sysNo=${item.sysNo}`
		})
	}
	function goToContract() {
		uni.navigateTo({
			url: '/pages/work/contract/OptionContract?sourcePage=addReceivepay',
		})
	}
	// 添加产品
	const addProduct = () => {
		if(!formData.value.projReceivableSubs) {
			formData.value.projReceivableSubs = []
		}
		formData.value.projReceivableSubs.push({
			projServerName: '',
			projServerSysNo: '',
		})
	}
	// 删除产品
	const deleteProduct = (index) => {
		formData.value.projReceivableSubs.splice(index, 1)
	}
	// 打开产品
	const openProduct = (item,index) => {
		chooseIndex.value = index
		contractProductshow.value = true
	}
		// 合同详情
	const contractDetile = (sysNo) => {
		API_contracthDetail({
			sysNo: sysNo
		}).then(res => {
			contractData.value = res.data
			console.log(contractData.value,'详情数据')
			formData.value.projContractSysNo = res.data.sysNo || '' //合同流水号
			formData.value.code = res.data.code || '' //合同编码
			formData.value.csrCustomerName = res.data.csrCustomerName || '' //客户名称
			formData.value.csrCustomerCode = res.data.csrCustomerCode || '' //客户税号
			formData.value.allPrice = res.data.allPrice || '' //合同总金额
			formData.value.putPrice = res.data.putPrice || '' //已支付履约金
			formData.value.rPrice = res.data.assPrice || '' //考核金额
			formData.value.waitApproveAmount = res.data.waitApproveAmount || '' //待确认金额
			proServerList.value[0] = contractData.value.projContractServer || [] //产品服务
		})
	}
	// 获取收款列表
	function getReceivepayList() {
		let params = {
			useStatus: searchData.value.useStatusList,
			stTime: searchData.value.stTime,
			edTime: searchData.value.edTime,
			search: searchData.value.search,
			type: 1,
		}
		API_finApiReceivepayList(params).then(res => {
			console.log(res,'收款列表')
			if(res.code == 200) {
				let result = res.data
				receivepayList.value = result
				console.log(receivepayList.value)
				indexList.value = result.slice(0, 10)
			}
		})
	}
	// 获取收款账户列表
	function getAccountList() {
		API_finApiReceivepayAccountList().then(res => {
			console.log(res,'收款账户列表')
			if(res.code == 200) {
				let result = res.data
				zhanghuList.value[0] = result
			}
		})
	}
	// 获取部门列表
	function getDepartList() {
		console.log(store.userInfo,'userinfo')
		let result = store.userInfo?.deptList
		departList.value[0] = result
		console.log(departList.value)
	}
		// 获取支付单位
	function getPayUnit() {
		API_finApiInvoiceCompanyList().then(res => {
			console.log(res,'开票公司')
			if(res.code == 200) {
				let result = res.data
				payUnitList.value[0] = result
			}
		})
	}
	
	// 获取收款合同列表
	function getContractList() {
		API_getUnionContractList().then(res => {
			console.log(res,'收款合同列表')
			if(res.code == 200) {
				let result = res.data
				contractList.value[0] = result
				console.log(contractList.value)
			}
		})
	}
	
		// 获取收款类型
	function getLxType() {
		API_getDictType({dictType: 'receive_payment_type'}).then(res => {
			console.log(res,'收款类型')
			if(res.code == 200) {
				let result = res.data
				lxList.value[0] = result
				console.log(lxList.value)
			}
		})
	}

	// 申请部门选择
	const departConfirm = (e) => {
		console.log(e)
		formData.value.entDeptName = e.value[0].name
		formData.value.entDeptSysNo = e.value[0].sysNo
		departshow.value = false
	}
	// 收款合同选择
	const contractConfirm = (e) => {
		console.log(e,'履约金合同选择')
		formData.value.code = e.value[0].code //合同编码
		formData.value.allPrice = e.value[0].allPrice //合同总金额
		formData.value.recPrice = e.value[0].invoicePrice //履约金额
		formData.value.putPrice = e.value[0].putPrice //已支付履约金
		formData.value.projContract = {
			...e.value[0]
		}
		contractshow.value = false
	}
		// 合同下产品服务选择
	const contractProductConfirm = (e) => {
		console.log(e,'合同下产品服务选择')
		formData.value.projReceivableSubs[chooseIndex.value].projContractSysNo = e.value[0].projContractSysNo
		formData.value.projReceivableSubs[chooseIndex.value].projServerName = e.value[0].proServeName
		formData.value.projReceivableSubs[chooseIndex.value].projServerSysNo = e.value[0].proServeSysNo
		formData.value.projReceivableSubs[chooseIndex.value].quAllPrice = e.value[0].quAllPrice
		formData.value.projReceivableSubs[chooseIndex.value].price = e.value[0].price
		formData.value.projReceivableSubs[chooseIndex.value].invoicePrice = e.value[0].invoicePrice
		contractProductshow.value = false
	}
	// 支付单位选择
	const payUnitConfirm = (e) => {
		console.log(e,'支付单位选择')
		formData.value.gsName = e.value[0].name
		payUnitshow.value = false
	}
	// 收款账户选择
	const zhanghuConfirm = (e) => {
		console.log(e,'收款账户选择')
		formData.value.accountName = e.value[0].name
		formData.value.account = e.value[0].account
		formData.value.accountSysNo = e.value[0].sysNo
		zhanghushow.value = false
	}
	// 收款类型选择
	const lxConfirm = (e) => {
		console.log(e)
		formData.value.type = e.value[0].dictLabel
		lxshow.value = false
	}

	const scrolltolower = () => {
  loadmore();
};

const loadmore = () => {
 let start = indexList.value.length
	if(start >= receivepayList.value.length) {
		return
	}
  let newList = receivepayList.value.slice(start, start + 10)
  indexList.value = [...indexList.value, ...newList]
};
	function submitClick() {
		console.log(formData.value)
		if(verifyForm()) {
			uni.showLoading({
				title: '提交中...',
				mask: true
			})
			try {
				API_finApiReceivepayAdd(formData.value).then(res => {
					console.log(res)
					if(res.code == 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					})
					tabIndex.value = 1
					resetFormData()
					getReceivepayList()
					uni.hideLoading()
				}
			}).catch(err => {
				uni.hideLoading()
				uni.showToast({
					title: err.message || '提交失败',
						icon: 'none'
					})
				})
			} catch (err) {
				uni.hideLoading()
				uni.showToast({
					title: err.message || '提交失败',
					icon: 'none'
				})
			}
		}
	}
	function verifyForm() {
		if(formData.value.entDeptSysNo == '') {
			uni.showToast({
				title: '请选择部门',
				icon: 'none'
			})
			return false
		}
		let projReceivableSubs = formData.value.projReceivableSubs
		if(projReceivableSubs.length == 0) {
			uni.showToast({
				title: '请添加产品',
				icon: 'none'
			})
			return false
		}
		for(let i = 0; i < projReceivableSubs.length; i++) {
			if(projReceivableSubs[i].projServerName == '') {
				uni.showToast({
					title: '请选择产品',
					icon: 'none'
				})
				return false
			}
			if(projReceivableSubs[i].recPrice == '') {
				uni.showToast({
					title: '请输入本次交款金额',
					icon: 'none'
				})
				return false
			}
		}
		if(formData.value.type == '') {
			uni.showToast({
				title: '请选择收款类型',
				icon: 'none'
			})
			return false
		}
		if(formData.value.account == '') {
			uni.showToast({
				title: '请选择收款账户',
				icon: 'none'
			})
			return false
		}
		if(formData.value.recPrice == '') {
			uni.showToast({
				title: '请输入收款金额',
				icon: 'none'
			})
			return false
		}
		if(formData.value.gsName == '') {
			uni.showToast({
				title: '请选择支付单位',
				icon: 'none'
			})
			return false
		}
		return true
	}	
	function resetFormData() {
		formData.value = {}
		uni.removeStorageSync('contractSysNo')
	}
	// 时间确定
	const timeConfirm = (e) => {
		formData.value.endTime = formatTimestamp(e.value)
		timeshow.value = false;
	}
	// 选择类型Z 
	const itemClick = (e) => {
		console.log(e)
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
		if(e.index == 1) {
			getReceivepayList()
		}
	}
	// 关闭筛选框
	const closeDropdown = () => {
		// this.$refs.uDropdownRef.close();
		uDropdownRef.value.close()
	}
	// 选择类型
	const itemClick1 = (e) => {
		console.log(e)
	}
	// 选择时间
	const timeTan = (e) => {
		console.log(e)
		if (e == 1) {
			timeshow1.value = true
		} else {
			timeshow2.value = true
		}
	}
	const confirm1 = (e) => {
		searchData.value.stTime = formatTimestamp(e.value)
		minEndTime.value = e.value
		timeshow1.value = false;
	}
	const confirm2 = (e) => {
		searchData.value.edTime = formatTimestamp(e.value)
		timeshow2.value = false;
	}
	// 时间重置
	const chongzTime = () => {
		uDropdownRef.value.close()
		searchData.value.stTime = ''
		searchData.value.edTime = ''
		searchData.value.search = ''
		searchData.value.useStatusList = ''
		minEndTime.value = 1735660800000
		getReceivepayList()
	}
	// 时间确定
	const SubmitTime = () => {
		uDropdownRef.value.close()
		indexList.value = []
		getReceivepayList()
	}
</script>

<style setup lang="scss">
	page {
		background: #F6F8FA;
	}

	::v-deep .u-dropdown-item {
		background: #fff;
	}

	::v-deep .u-tabs {
		background: #fff;
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
			.textarea_remark {
				height: 160rpx;
			}
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

	.slot-content {
		background: #fff;

		.timeView {
			height: 68rpx;
			padding: 18rpx 85rpx;
			background: #F5F7FB;
			font-size: 24rpx;
			color: #5A78A0;
			border-radius: 34rpx;
		}

		.timeBtn {
			font-size: 28rpx;
			color: #3C82FE;
			padding: 24rpx 120rpx;
			background: #F6F8FC;
			border-radius: 49rpx;
		}

		.timeBtn2 {
			font-size: 28rpx;
			color: #fff;
			padding: 24rpx 120rpx;
			background: #3C82FE;
			border-radius: 49rpx;
		}

		.typeTitle {
			font-size: 30rpx;
			color: #092D5C;

			.ttleft {
				width: 12rpx;
				height: 12rpx;
				background: linear-gradient(53deg, #FFC46F 0%, #FEAC49 100%);
				box-shadow: 0rpx 2rpx 6rpx 0rpx #FEAC49;
			}

			.ttleft1 {
				width: 12rpx;
				height: 12rpx;
				background: linear-gradient(53deg, #6FB8FF 0%, #3C82FE 100%);
				box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(60, 130, 254, 0.3);
			}
		}

	}

	.taskbox {
		padding: 30rpx;
	}

	.taskItem {
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		padding: 30rpx;

		.titemTop {
			border-bottom: 1rpx solid #F5F5F5;

			.ttleft {
				font-size: 26rpx;
				color: #B7C4D7;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}

			.ttright {
				font-size: 26rpx;
				color: #3C82FE;
			}
		}

		.task-title {
			font-size: 36rpx;
			color: #092D5C;
		}

		.tasktext {
			font-size: 26rpx;
			color: #5A78A0;
			line-height: 50rpx;
		}
	}
</style>
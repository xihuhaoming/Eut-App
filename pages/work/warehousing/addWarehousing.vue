<template>
	<view>
		<up-navbar title="入库" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :list="list" @click="tabclick" 
			style="position: fixed; top: 44px; left: 0; right: 0; z-index: 1000; background-color: #fff; width: auto; display: flex; justify-content: center; align-items: center; height: auto;"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="content" v-if="tabIndex==0">
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="申请人" :value="form.user" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="入库流程" :value="form.workFlowName || '选择的流程'" :isLink="true" @click="getStartProcessListClick" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="仓库类型" :value="form.cklx || '选择的仓库类型'" :isLink="true" @click="showWarehouseTypePickerClick" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="核验人" :value="form.acceptanceUserName || '选择核验人'" :isLink="true" @click="showAcceptanceUserPickerClick" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="采购单号" :value="form.proPurchaseSysNo || '选择的采购单'" :isLink="true" @click="showmyPurchasePickerClick" arrow-direction="right" :required="false"></up-cell>

				</up-cell-group>
				<!-- 					<view class="textClass up-m-t-20">
						<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="textValue"></textarea>
					</view> -->
			</view>


			<view class="u-flex u-row-between u-col-center">
				<view class="xtitle bold">实物产品</view>
				<view class="u-flex u-col-center" @click="addProductClick">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加产品</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>
				<view class="up-m-t-20" v-for="(item, index) in form.proPurchaseEntities" :key="index">
					<view class="card" >
						<up-cell-group :border="false" class="up-m-t-20">
							<up-cell title="产品" :value="item.entityName" :isLink="false" arrow-direction="right" :required="false"></up-cell>
							<up-cell title="编码" :value="item.entityCode" :isLink="false" arrow-direction="right" :required="false"></up-cell>
							<up-cell title="品牌" :value="item.brand || '无'" :isLink="false" arrow-direction="right" :required="false"></up-cell>
							<up-cell title="型号" value="20" :isLink="false" arrow-direction="right" :required="false"></up-cell>
							<up-cell title="单价" :required="true" :isLink="false">
								<template #value>
									<input v-model="item.entityPrice" placeholder="请输入" type="text" style="text-align:right;font-size:26rpx;" />
								</template>
							</up-cell>
							<up-cell title="数量" :required="false" :isLink="false">
								<template #value>
									<view class="u-flex">

										<up-icon name="minus-circle-fill" v-if="isOverNumber ? {color: '#2979ff' } : {color: '#B7C4D7'}" size="16" @click="decreaseQuantity(index)"></up-icon>
										<view class="up-m-l-10 up-m-r-10">{{ item.number || 1 }}</view>
										<up-icon name="plus-circle-fill" color="#2979ff" size="16" @click="increaseQuantity(index)"></up-icon>
									</view>
								</template>
							</up-cell>
							<up-cell title="总金额" :value="calculateTotalPrice(item)" :isLink="false" arrow-direction="right" :required="false"></up-cell>

							<view class="up-m-t-20 up-m-t-20 u-text-center" @click="deleteProductClick(index)" style="color:red">删除</view>
						</up-cell-group>
					</view>
				</view>
			
			<view class="card up-m-t-20">
				<view class="zhoLf">备注</view>
				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="form.remarks"></textarea>
				</view>
			</view>


			<view class="qued up-m-t-70" @click="submitWarehousing">提交</view>
			<!-- <view class="qued up-m-t-70">提交</view> -->
		</view>
		<view v-if="tabIndex==1">
			<view class="up-p-t-20" style="background:#ffffff;">
				<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="keyword" :showAction="false" bgColor="#F6F8FC"
					height="40"></up-search>
				<view class="u-flex filter u-col-center u-row-around">
					<!-- 时间 -->
					<up-dropdown ref="uDropdownRef" border-radius="20">
						<up-dropdown-item title="时间">
							<view class="slot-content">
								<view class="slotCon up-flex up-text-center up-content-color u-row-around up-p-t-40 up-p-b-40">
									<view class="timeView" @click="timeTan(1)">{{startTime}}</view>
									<view class="timeView" @click="timeTan(2)">{{endTime}}</view>
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
										<view class="ttright">任务&通知</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList0" v-model="workValue0"
										@itemClick="itemClick1" multiple
										:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
									<!-- 工作组名称 -->
									<view class="typeTitle u-flex u-col-center up-m-t-30">
										<view class="ttleft1 up-m-r-20"></view>
										<view class="ttright">工作组名称</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList" v-model="workValue" @itemClick="itemClick1"
										multiple :unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
									<!-- 工作组名称 -->
									<view class="typeTitle u-flex u-col-center up-m-t-30">
										<view class="ttleft1 up-m-r-20"></view>
										<view class="ttright">工作组名称</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList2" v-model="workValue2"
										@itemClick="itemClick1" multiple
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
			<view class="taskbox">
				<view class="taskItem">
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>2023.03.05 16:00</view>
						</view>
						<view class="ttright">待确认</view>
						<!-- 	<view class="ttright" style="color:#FE4949">待确认</view>
						<view class="ttright" style="color:#1CAA42">待确认</view>
						<view class="ttright" style="color:#092D5C">已作废</view> -->
					</view>
					<view class="task-title up-m-t-20 bold">
						入库名称
					</view>
					<view class="tasktext up-m-b-10" style="color:#B7C4D7">TU-UI69-7329589 </view>
					<view class="tasktext">仓库类型：1 号仓库</view>
					<view class="tasktext">供应商：易尤特集团</view>
					<view class="tasktext">跟单员：葫芦娃</view>
					<view class="tasktext">采购金额：<text style="color:#FE4949">20</text></view>
					<view class="u-flex u-row-between">
						<view class="tasktext">产品：<text style="font-size:26rpx;color:#3C82FE;">#3C82FE</text></view>
						<view class="tasktext">数量：<text style="color:#FE4949">20</text></view>
					</view>
				</view>
			</view>





		</view>

		<!-- 选择时间 -->
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow1"
			v-model="startTime" mode="date" placeholder="开始时间" @confirm="confirm1"
			@cancel="timeshow1 = false"></up-datetime-picker>
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow2"
			v-model="endTime" mode="date" placeholder="结束时间" @confirm="confirm2"
			@cancel="timeshow2 = false"></up-datetime-picker>
		<!-- 流程选择弹窗 -->

		<up-picker
			:show="showProcessPicker"
			:columns="processOptions"
			keyName="name" 
			@confirm="confirmProcess"
			@cancel="showProcessPicker = false"
			title="选择流程"
		></up-picker>

		<!-- 仓库类型选择弹窗 -->
		<up-picker
			:show="showWarehouseTypePicker"
			:columns="warehouseTypeOptions"
			@confirm="confirmWarehouseType"
			@cancel="showWarehouseTypePicker = false"
			title="选择仓库类型"
		></up-picker>


		<!-- 核验人选择弹窗 -->
		<!-- <up-picker
			:show="showAcceptanceUserPicker"
			:columns="acceptanceUserOptions"
			@confirm="confirmAcceptanceUser"
			@cancel="showAcceptanceUserPicker = false"
			title="选择核验人"
			keyName="name"
		></up-picker> -->
		<!-- 采购单选择弹窗 -->
		<up-picker
			:show="showmyPurchasePicker"
			:columns="[myPurchaseOptions]"
			keyName="label"
			@confirm="confirmmyPurchase"
			@cancel="showmyPurchasePicker = false"
			title="选择采购单"
		></up-picker>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onUnmounted
	} from 'vue';

	import { onLoad } from '@dcloudio/uni-app'; // 用于获取页面参数
	import { getStartProcessList } from '@/api/inbound.js'; // 引入API函数，注意路径是否正确
	import { getPurchaseOrderNumber } from '@/api/inbound.js'; // 引入API函数，注意路径是否正确
	import { addInboundOrder } from '@/api/inbound.js'; // 引入API函数，注意路径是否正确
	const tabIndex = ref(0)
	const keyword = ref("")
	const typeValue = ref(1)

	const list = reactive([{
			name: '发起提交'
		},
		{
			name: '提交记录'
		}
	]);
	

	const uFormRef = ref(null); // 表单引用
	const selectedProduct = ref(null);
	// --- 新增用于流程选择的数据 ---
	const showProcessPicker = ref(false);
	const processOptions = ref([]); // 将由 API 调用填充
	const selectedProcess = ref(null); 

	const isOverNumber = ref(0);
	// 表单数据模型
	const form = reactive({
		user: '', // 办理人
		proPurchaseSysNo: '',    // 采购单流水号
		acceptanceUserSysNo: '', // 验收员流水号
		acceptanceUserName: '', // 验收员姓名
		remarks: '',         // 备注
		// --- 工作流相关字段 ---
		workFlowSysNo: '', // 工作流流水号
		// 产品列表
		proPurchaseEntities: [],
		cklx: '',            // 仓库类型
		inUserSysNo: '',     // 跟单员
		inUserName: '',      // 跟单员
	});

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
	const startTime = ref('开始时间')
	const endTime = ref('结束时间')
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);


	// 选择类型Z 
	const itemClick = (e) => {
		console.log(e)
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
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
		startTime.value = formatTimestamp(e.value)
		timeshow1.value = false;
	}
	const confirm2 = (e) => {
		endTime.value = formatTimestamp(e.value)
		timeshow2.value = false;
	}
	// 时间重置
	const chongzTime = () => {
		startTime.value = "开始时间"
		endTime.value = "结束时间"
		workValue0.length = 0;
		workValue.length = 0;
		workValue2.length = 0;
	}
	// 时间确定
	const SubmitTime = () => {
		uDropdownRef.value.close()
		workValue0.length = 0;
		workValue.length = 0;
		workValue2.length = 0;
		startTime.value = "开始时间";
		endTime.value = "结束时间";

	}
	// 转换时间戳
	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}



	// 页面加载时，可以尝试获取当前登录用户信息
	onLoad(async (options) => {
		// 假设从本地存储获取用户信息
		const currentUser = uni.getStorageSync('userInfo'); // 假设用户信息存储在 'userInfo'
		if (currentUser) {
			form.sysNo = currentUser.sysNo; // 根据实际用户对象字段调整
			form.user = currentUser.name;
			form.inUserSysNo = currentUser.sysNo;
			form.inUserName = currentUser.name;
		}
		// 监听从产品选择页面返回的数据
		uni.$on('confirmProduct', handleConfirmProduct);

		if (options && options.id) {
           console.log('需要加载入库单详情:', options.id);
           // TODO: 根据 options.id 获取入库单详情并填充表单
       }

	   uni.$on('receiveUser', handleReceiveUser);
	});

	// 组件卸载时移除事件监听
	onUnmounted(() => {
       uni.$off('confirmProduct', handleConfirmProduct);
	   uni.$off('receiveUser', handleReceiveUser);
   });

   

   const handleReceiveUser = (data) => {
	   console.log('接收到的用户:', data);
	   form.acceptanceUserName = data.name;
	   form.acceptanceUserSysNo = data.sysNo;
   }

   // 接收产品选择页面返回的数据
   const handleConfirmProduct = (selectedProduct) => {
       	console.log('接收到的产品:', selectedProduct);
		// 确保产品对象有number字段，默认为1
		if (!selectedProduct.number) {
			selectedProduct.number = 1;
		}
	   	form.proPurchaseEntities.push(selectedProduct)
   };

   // 删除产品
   const deleteProductClick = (index) => {
	   form.proPurchaseEntities.splice(index, 1);
   }

   

   // 增加数量
	const increaseQuantity = (index) => {
		isOverNumber.value = true;
		if (form.proPurchaseEntities[index]) {
			if (!form.proPurchaseEntities[index].number) {
				form.proPurchaseEntities[index].number = 1;
			} else {
				form.proPurchaseEntities[index].number++;
			}
		}
	}

	// 减少数量
	const decreaseQuantity = (index) => {
		if (form.proPurchaseEntities[index] && form.proPurchaseEntities[index].number > 1) {
			form.proPurchaseEntities[index].number--;
		}
	}
	// 计算单个产品的总价
	const calculateTotalPrice = (item) => {
		const price = parseFloat(item.entityPrice) || 0;
		const number = parseInt(item.number) || 1;
		return (price * number).toFixed(2);
	}
	
	// 跳转到产品选择页面
	const addProductClick = () => {
		uni.navigateTo({
			url: '/pages/work/material/material?type=chooseMaterial'
		})
	}

	// 获取流程列表
	const getStartProcessListClick = async () => {
		const res = await getStartProcessList()
		processOptions.value = [res.data.map(p => ({name: p.processName, sysNo: p.deploymentId}))];

		// uni.hideLoading();
		showProcessPicker.value = true;
	}

	
	const confirmProcess = (e) => {
		if (e.value && e.value.length > 0) {
			const SProcess = e.value[0]; // SProcess 是选中的完整流程对象，例如 { name: '标准入库流程', sysNo: 'PROC001', ... }
			selectedProcess.value = SProcess;
			
			console.log("选中的流程：", SProcess)

			// 更新表单中的流程ID和流程名称 (根据您的form结构调整)
			// 假设您在 form 中有 workFlowSysNo 和 workFlowName
			if (form && typeof form === 'object') { // 确保 form 存在且是对象
				form.workFlowSysNo = SProcess.sysNo; // 将流程ID存入表单
				form.workFlowName = SProcess.name;   // 将流程名称存入表单 (用于显示)
			}
		}
		showProcessPicker.value = false; // 关闭选择器
	}

	// 仓库类型选择器相关
	const showWarehouseTypePicker = ref(false);
	const warehouseTypeOptions = ref([
		["行政劳保仓库", "1号仓库", "2号仓库", "3号仓库", "优诺仓库", "物联仓库"]
	]);

	// 仓库类型选择点击事件
	const showWarehouseTypePickerClick = () => {
		showWarehouseTypePicker.value = true;
	}
	
	// 仓库类型确认选择事件
	const confirmWarehouseType = (e) => {
		form.cklx = e.value[0];
		showWarehouseTypePicker.value = false;
	}

	// 核验人选择器相关
	const showAcceptanceUserPicker = ref(false);
	const acceptanceUserOptions = ref([
		["张三", "里斯", "王五", "赵六", "孙七", "周八"]
	]);

	// 核验人选择点击事件
	const showAcceptanceUserPickerClick = async () => {
		// 先跳转到联系人选择页面
		uni.navigateTo({
			url: '/pages/work/task/contact?type=acceptanceUser'
		})
		acceptanceUserOptions.value = [["张三", "里斯", "王五", "赵六", "孙七", "周八"]];

		showAcceptanceUserPicker.value = true;
	}
	
	// 核验人确认选择事件
	// const confirmAcceptanceUser = (e) => {
	// 	form.acceptanceUserName = e.value[0];
	// 	showAcceptanceUserPicker.value = false;
	// }

	// 采购单选择器相关
	const showmyPurchasePicker = ref(false);
	const myPurchaseOptions = ref([]);
	
	// 采购单选择点击事件	
	const showmyPurchasePickerClick = async () => {
		const res = await getPurchaseOrderNumber()
		console.log(res.data)
		myPurchaseOptions.value = res.data.map(item => ({
			label: item.name || item.code  || `${item.sysNo}`, // 显示采购单名称或编号
			value: item.sysNo // 采购单流水号
		}));
		console.log(myPurchaseOptions.value)
		showmyPurchasePicker.value = true;
	}
	
	// 采购单确认选择事件
	const confirmmyPurchase = (e) => {
		form.proPurchaseSysNo = e.value[0].value;
		showmyPurchasePicker.value = false;
	}


	// 提交之前校验所有form表单数据，并打印
	// 表单校验函数
	const validateForm = () => {
		// 校验申请人
		if (!form.user) {
			uni.showToast({
				title: '请填写申请人',
				icon: 'none'
			});
			return false;
		}
		
		// 校验入库流程
		if (!form.workFlowSysNo) {
			uni.showToast({
				title: '请选择入库流程',
				icon: 'none'
			});
			return false;
		}
		
		// 校验仓库类型
		if (!form.cklx) {
			uni.showToast({
				title: '请选择仓库类型',
				icon: 'none'
			});
			return false;
		}
		
		// 校验核验人
		if (!form.acceptanceUserName) {
			uni.showToast({
				title: '请选择核验人',
				icon: 'none'
			});
			return false;
		}
		
		// 校验产品列表
		if (!form.proPurchaseEntities || form.proPurchaseEntities.length === 0) {
			uni.showToast({
				title: '请添加产品',
				icon: 'none'
			});
			return false;
		}
		
		// 校验每个产品的必填信息
		for (let i = 0; i < form.proPurchaseEntities.length; i++) {
			const item = form.proPurchaseEntities[i];
			
			// 校验产品名称
			if (!item.entityName) {
				uni.showToast({
					title: `第${i+1}个产品名称不能为空`,
					icon: 'none'
				});
				return false;
			}
			
			// 校验产品单价
			if (!item.entityPrice) {
				uni.showToast({
					title: `第${i+1}个产品单价不能为空`,
					icon: 'none'
				});
				return false;
			}
			
			// 校验产品数量
			if (!item.number || parseInt(item.number) <= 0) {
				uni.showToast({
					title: `第${i+1}个产品数量必须大于0`,
					icon: 'none'
				});
				return false;
			}
		}
		
		// 所有校验通过
		return true;
	}

	// 提交所有数据到后端进行入库
	const submitWarehousing = async () => {
		 // 校验表单数据
		 if (!validateForm()) {
			return; // 如果校验失败，终止提交
		}
		// 给form.proPurchaseEntities赋值然后打包给后端
		form.proPurchaseEntities = form.proPurchaseEntities.map(item => {
        	// 计算单个产品的总价
			const price = parseFloat(item.entityPrice) || 0;
			const number = parseInt(item.number) || 1;
			const itemAllPrice = price * number;
			
			return {
				proEntitySysNo: item.sysNo,
				proEntityName: item.entityName,
				price: price,
				code: item.entityCode,
				number: number,
				allPrice: itemAllPrice // 每个产品的小计（单价×数量）
			};
		});

		// 计算所有产品的总价（可选，如果后端需要）
		const totalPrice = form.proPurchaseEntities.reduce((acc, item) => acc + item.allPrice, 0);
		form.proPurchaseEntities.allPrice = totalPrice; 
		console.log(form.proPurchaseEntities)
		// 表单数据打印出来
		console.log('提交的表单数据：', form)
		try {
			const res = await addInboundOrder(form)
			console.log(res)
			// form.proPurchaseEntities = []
		} catch (error) {
			console.log(error)
		}
		
		// const res = await addWarehousing(form)
		// console.log(res)
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

	::v-deep .u-tabs-item {
		color: #092D5C !important;
	}

	.content {
		padding: 30rpx;
		padding-top: 130rpx;

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

	.slot-content {
		background: #fff;

		.timeView {
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

	.btnbox {
		// position: absolute;
		// bottom: 5vw;
		// left: 9vw;
		margin-top: 30rpx;

		.btnleft {
			padding: 25rpx 100rpx;
			font-size: 34rpx;
			color: #3C82FE;
			background: #ECF1FF;
			border-radius: 59rpx;
		}

		.btnright {
			padding: 25rpx 100rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			background: #3C82FE;
			border-radius: 59rpx;
			margin-left: 20rpx;
		}
	}

	.textClass {
		width: 618rpx;
		height: 160rpx;
		background: #F6F8FC;
		border-radius: 8rpx;
		padding: 10rpx 0 0 10rpx;
		font-size: 28rpx;
		color: #B7C4D7;
	}
</style>
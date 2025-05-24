// @ts-nocheck
<template>
	<view>
		<up-navbar title="客户" :placeholder="true" :autoBack="true" />
		<view style="background:#fff;">
			<up-tabs :scrollable="false" :list="list" @click="tabclick"
				style="position: fixed; top: 30px; left: 0; right: 0; z-index: 1000; background: #fff;"
				itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
				activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		</view>
		<view class="content">
			<view class="card" v-if="tabIndex==0">
				<up-cell-group :border="false">
					<up-cell title="企业名称" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="currentActiveForm.name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> 
					<up-cell title="社会统一信用码" :isLink="false" :required="false">
						<template #value>
							<input v-model="form.code" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="主联系人" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="form.contacts" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="联系人电话" value="客户名称" :required="true" arrow-direction="right">
						<template #value>
							<input v-model="form.phone" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="坐标" :value="form.coordinate || '选择坐标'" @click="selectCoordinate"  :isLink="true" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="地区" :value="form.region || '选择地区'" @click="showPickerClick" :isLink="true" arrow-direction="right" :required="true"></up-cell>
				</up-cell-group>

				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入文字内容" border="surround" v-model="form.address"></textarea>
				</view>
			</view>
			<view class="card" v-if="tabIndex==1">
				<up-cell-group :border="false">
					<up-cell title="姓名" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="currentActiveForm.name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="联系人电话" value="客户名称" :required="true" arrow-direction="right">
						<template #value>
							<input v-model="form.phone" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="身份证号" value="客户名称" :required="true" arrow-direction="right">
						<template #value>
							<input v-model="form.idCard" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
				</up-cell-group>
			</view>
			<view class="card up-m-t-20">
				<view class="zhoLf">客户标签</view>
				<view class="bqclass u-flex u-flex-wrap up-m-t-20">
					<!-- 已添加的标签 -->
					<view v-for="(tag, index) in form.label" :key="index" class="bq up-m-l-10" @click="() => CilckTag(tag,index)">
						{{ tag }}
						<!-- uView Plus 的 up-icon 可能不直接支持 style 属性中的定位，我们用 wrapper view 来辅助定位 -->
						<view class="close-icon-wrapper" @click.stop="removeClientTag(index)">
							<up-icon name="close-circle-fill" color="#b7c4d7" size="16"></up-icon> <!-- 减小了size，调整了颜色 -->
						</view>
					</view>

					<!-- 添加标签的输入框或按钮 -->
					<view class="tag-input-wrapper" v-if="form.label.length < maxClientTags">
						<input
							v-if="showClientTagInput"
							v-model="clientTagInputValue"
							:focus="showClientTagInput"
							@blur="confirmAddClientTagOnBlur"
							@confirm="confirmAddClientTagOnEnter"
							placeholder="输入标签"
							class="bqadd-input"
							maxlength="20"
							@keyboardheightchange="onKeyboardHeightChange"
						/>
						<view v-else class="bqadd" @click="showClientTagInput = true">
							添加标签
						</view>
					</view>
				</view>
				<up-cell-group :border="false">
					<up-cell title="负责人" :value="currentActiveForm.inUserName" :isLink="false" arrow-direction="right"
						:required="true">
					</up-cell>
					<up-cell title="客户来源" :value="currentActiveForm.customerSourceText || '选择客户来源'" :isLink="false" @click="showCustomerSourcePickerClick('intention_source')" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="客户类型" :value="currentActiveForm.customerTypeText || '选择客户类型'" :isLink="false" arrow-direction="right" @click="showCustomerTypePickerClick('customer_type')" :required="true">
					</up-cell>
					<up-cell title="客户等级" :value="currentActiveForm.levelText || '选择客户等级'" :isLink="false" arrow-direction="right" @click="showLevelPickerClick('customer_level')" :required="true">
					</up-cell>
				</up-cell-group>
			</view>
			<view class="u-flex u-row-between u-col-center  up-m-t-20">
				<view class="xtitle bold">已做项目</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;" @click="addProject" >添加项目</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>
			<view class="card up-m-t-20" v-for="(project, index) in form.projectList" :key="index">
				<up-cell-group :border="false" >
					<up-cell title="项目" :value="project.projectName || '根据选择的产品显示名称'" :isLink="false" arrow-direction="right" :required="false">
						<template #value>
							<input v-model="project.projectName" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="到期时间" :value="project.expireDateText || '选择到期时间'" @click="showDatePicker = true" :isLink="true" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="金额" value="" :required="false" arrow-direction="right">
						<template #value>
							<input v-model="project.projectAmount" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="发证机构" :value="project.issuingAgency || '请输入'" :required="false" arrow-direction="right">
						<template #value>
							<input v-model="project.issuingAgency" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<!-- 删除按钮 -->
					<view class="delete-btn" @click="deleteProject">
						删除
					</view>

					<up-datetime-picker
						:show="showDatePicker"
						v-model="DateValue"
						@confirm="confirmDate"
						@cancel="showDatePicker = false"
						mode="date"
					></up-datetime-picker>
				</up-cell-group>
			</view>


			<view class="u-flex u-row-between u-col-center  up-m-t-20" v-if="tabIndex==0">
				<view class="xtitle bold">其他联系人</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;" @click="addOtherContact">添加</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>

			<view v-if="form.otherUser.length > 0">
				<view class="card up-m-t-20" v-for="(contact, index) in form.otherUser" :key="index" >
					<view class="zhoItem u-flex u-col-center" >
					<view class="zhoLf">联系人名称</view>
						<view class="zhoRi up-m-l-30">{{ form.otherUser[0].name }}</view>
				</view>
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">电话：</view>
						<view class="zhoRi up-m-l-30">{{ form.otherUser[0].phone }}</view>
				</view>
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">邮箱：</view>
						<view class="zhoRi up-m-l-30">{{ form.otherUser[0].email }}</view>
					</view>
					<!-- 添加删除按钮 -->
					<view class="delete-contact" @click="removeContact(index)">
						<up-icon name="minus-circle-fill" size="16px" color="#FF5252"></up-icon>
					</view>
				</view>
			</view>
			

			<view class="xtitle bold">公司信息</view>
			<view class="card up-m-t-20">
				<up-cell title="法人" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.legal" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="法人电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.legalPhone" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="公司电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.tel" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="传真" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.fax" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
			</view>

			<view class="xtitle bold" v-if="tabIndex==0">账户信息</view>
			<view class="card up-m-t-20" v-if="tabIndex==0">
				<up-cell title="银行账号" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.bankAccount" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="开户行" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.bankType" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="邮箱" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.email" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="开票电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.invoiceTel" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell> <up-cell title="开票联系电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.invoicePhone" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell> <up-cell title="注册地址" :isLink="false" :required="false">
					<template #value>
						<input v-model="form.registeredAddress" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
			</view>
		</view>
		<view class="btnbox u-flex u-col-center u-row-center up-m-b-20">
			<view class="btnleft" @click="addClientToPool">放入公共池</view>
			<view class="btnright" @click="saveClientData">保存</view>
		</view>

		<!-- Pickers -->
		<up-picker :show="showRegionPicker" ref="regionPickerRef" keyName="label" :columns="regionColumns" @confirm="confirmRegion" @change="changeRegion" @cancel="showRegionPicker = false" title="选择地区"></up-picker>
		<up-picker :show="showLevelPicker" :columns="levelOptions" keyName="label" @confirm="confirmLevel" @cancel="showLevelPicker = false" title="选择客户等级"></up-picker>
		<up-picker :show="showCustomerTypePicker" :columns="customerTypeOptions" keyName="label" @confirm="confirmCustomerType" @cancel="showCustomerTypePicker = false" title="选择客户类型"></up-picker>
		<up-picker :show="showCompanyTypePicker" :columns="companyTypeOptions" @confirm="confirmCompanyType" @cancel="showCompanyTypePicker = false" title="选择公司类型"></up-picker>
		<!-- Mock Pickers for fields not in API, can be removed if not needed -->
		<up-picker :show="showCustomerSourcePicker" :columns="customerSourceOptions" keyName="label" @confirm="confirmCustomerSource" @cancel="showCustomerSourcePicker = false" title="选择客户来源"></up-picker>
		<up-picker :show="showProjectCategoryPicker" :columns="projectCategoryOptions" @confirm="confirmProjectCategory" @cancel="showProjectCategoryPicker = false" title="选择意向项目类别"></up-picker>
		

		
	
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onUnmounted,
		computed
	} from 'vue';
	import { onLoad } from '@dcloudio/uni-app'; 
	import * as areaData from 'china-area-data'; // 修改导入方式
	import { API_addEnterpriseClient } from '@/api/client';
	const tabIndex = ref(0)
	const list = reactive([{
			name: '企业客户'
		},
		{
			name: '个人客户'
		}
	]);
	const typeValue = ref(1)
	const showDatePicker = ref(false);
	const DateValue = ref(Date.now());

	const currentActiveForm = computed(() => {
      return tabIndex.value === 0 ? form : personalForm;
    });

	// 然后模板中可以直接使用 currentActiveForm.label, currentActiveForm.name 等。
    // 同样，客户标签列表也可以用计算属性：
    const currentLabels = computed(() => {
        return tabIndex.value === 0 ? form.label : personalForm.label;
    });

	const initialFormState = () => ({
		inUserName: '',  // 负责人姓名
		inUserSysNo: '', // 负责人sysNo
		name: '', // 企业名称 (Required)
		code: '', // 社会统一信用码
		contacts: '', // 主联系人 (Required)
		phone: '', // 主联系手机 (Required)
		coordinate: '', // 坐标
		label: [], // 客户标签 (Array of strings)
		labelName: '', // 客户标签-冗余 (Backend might fill this based on label)
		region: '', // 地区
		address: '', // 详细地址
		registeredAddress: '', // 注册地址
		legal: '', // 法人
		legalPhone: '', // 法人手机
		tel: '', // 公司电话
		fax: '', // 传真
		bankAccount: '', // 银行账号
		bankType: '', // (开户行)
		email: '', // 邮箱
		website: '', // 网址
		invoiceTel: '', // 开票电话
		invoicePhone: '', // 开票联系方式
		level: '', // 级别 (0.vip、1.钻卡客户、2.金卡客户、3.银卡客户)
		companyType: '', // 公司类型（0.企业侧;1.政府侧）
		customerType: '', // 客户类型(0.新客户、1.老客户、2.激活客户)
		publicPool: 0, // 是否公共池 1：是 0：否
		otherUser: [], // 其他联系人 (Array of objects: {name, phone, email, position})
		// Fields from UI but not directly in API root for client:
		customerSource: '', // 客户来源 - For UI example
		projectList: [
			{
				projectName: '', // 项目名称
				projectAmount: '', // 意向项目类别
				issuingAgency: '', // 发证机构
				expireDate: '', // 到期时间
			}
		], // 项目列表
		
	});

	const initialPersonalFormState = () => ({
		name: '',
		phone: '',
		idCard: '',
		email: '',
		address: '',
		label: [],
		labelName: '',

		// 项目字段
		projectName: '',
		expireDate: '',
		expireDateText: '',
		amount: '',
		certificateAgency: '',

		// 负责人信息
		inUserSysNo: '',
		inUserName: '',
		
		// 客户来源
		customerSource: '',      // 存储选择的 value
		customerSourceText: '',  // 存储选择的 label (用于显示)

		// 客户类型
		customerType: '',
		customerTypeText: '',

		// 客户等级
		level: '',
		levelText: '',
		// ... 其他字段
	});


	const chooseUserClick = () => {
		uni.navigateTo({
			url: '/pages/work/task/contact'
		})
	}

	
	
	

	const form = reactive(initialFormState());
	const personalForm = reactive(initialPersonalFormState());

	// 必填字段虚拟数据
	form.name = '企业的名称';
	form.code = '1234567890';
	form.contacts = '我添加的是这个';
	form.phone = '13800138000';
	form.region = '北京市/北京市/东城区';
	

	form.legal = '这是第二个添加的';
	form.legalPhone = '13800138000';
	form.tel = '13800138000';
	form.fax = '13800138000';
	form.bankAccount = '1234567890';
	form.bankType = '银行';
	form.email = '1234567890@qq.com';
	form.invoiceTel = '13800138000';
	form.invoicePhone = '13800138000';
	form.registeredAddress = '北京市/北京市/东城区';
	form.address = '多了屯区';
	form.companyType = '0';

	

	// --- Picker States and Options ---
	
	const showUserPicker = ref(false);
	const userOptions = ref([[{name:'当前用户张三', sysNo:'USER001'},{name:'李四', sysNo:'USER002'}]]); // Mock, use keyName="name" in picker

	const showLevelPicker = ref(false);
	const levelOptions = ref([
		[
			{ label: 'VIP', value: '0' }, 
			{ label: '钻卡客户', value: '1' },
			{ label: '金卡客户', value: '2' },
			{ label: '银卡客户', value: '3' }
		]
	]);
	const showCustomerTypePicker = ref(false);
	const customerTypeOptions = ref([
		[
			{ label: '新客户', value: '0' },
			{ label: '老客户', value: '1' },
			{ label: '激活客户', value: '2' }
		]
	]);
	const showCompanyTypePicker = ref(false);
	const companyTypeOptions = ref([
		[
			{ label: '企业侧', value: '0' },
			{ label: '政府侧', value: '1' }
		]
	]);


	// 客户来源
	import { API_getDictType } from '@/api/client';
	const showCustomerSourcePicker = ref(false);
    const customerSourceOptions = ref([[]]);

	const showCustomerSourcePickerClick = async (type) => {
		showCustomerSourcePicker.value = true;
		showCustomerTypePicker.value = false;
		showLevelPicker.value = false;
		const params = {
			dictType: type,
		};
		const res = await API_getDictType(params)
		customerSourceOptions.value = [res.data.map(item => ({
			label: item.dictLabel,
			value: item.dictValue
		}))];
	}

	const showCustomerTypePickerClick = async (type) => {
		showCustomerSourcePicker.value = false;
		showCustomerTypePicker.value = true;
		showLevelPicker.value = false;
		const params = {
			dictType: type,
		};
		const res = await API_getDictType(params)
		customerTypeOptions.value = [res.data.map(item => ({
			label: item.dictLabel,
			value: item.dictValue
		}))];
	}
	
	const showLevelPickerClick = async (type) => {
		showCustomerSourcePicker.value = false;
		showCustomerTypePicker.value = false;
		showLevelPicker.value = true;
		const params = {
			dictType: type,
		};
		const res = await API_getDictType(params)
		levelOptions.value = [res.data.map(item => ({
			label: item.dictLabel,
			value: item.dictValue
		}))];
	}

    
	
    const showProjectCategoryPicker = ref(false);
    const projectCategoryOptions = ref([[{label: '项目X', value: 'PROJ_X'}, {label: '项目Y', value: 'PROJ_Y'}]]);

	// 客户标签输入相关
	const showClientTagInput = ref(false);
	const clientTagInputValue = ref('');
	const maxClientTags = ref(5); // 最多允许5个标签

	onMounted(() => {
		uni.$on('otherContactAdded', receiveOtherContact);
		uni.$on('receiveUser', receiveUserValue);
	});
	onUnmounted(() => {
		uni.$off('otherContactAdded', receiveOtherContact);
		uni.$off('receiveUser', receiveUserValue);
	});

	// 处理接收到的联系人数据
	const receiveOtherContact = (contactData) => {
		console.log('收到联系人数据:', contactData);
		// 确保 otherUser 数组已初始化
		if (!form.otherUser) {
			form.otherUser = [];
		}
		
		// 添加新联系人到数组
		form.otherUser.push({
			name: contactData.name,
			phone: contactData.mobile,
			email: contactData.email || '',
			department: contactData.department || '',
			position: contactData.position || ''
		});
	};

	// 添加项目
	const addProject = () => {
		form.projectList.push({
			projectName: '',
			projectAmount: '',
			issuingAgency: '',
			expireDate: ''
		});
	}

	// 接收传过来的负责人
	const receiveUserValue = (user) => {
		console.log('接收到的负责人:', user);
		form.inUserName = user.name;
		form.inUserSysNo = user.sysNo;
	}



	// 删除联系人
	const removeContact = (index) => {
	if (form.otherUser && index >= 0 && index < form.otherUser.length) {
		uni.showModal({
		title: '提示',
		content: '确定要删除此联系人吗？',
		success: function(res) {
			if (res.confirm) {
			form.otherUser.splice(index, 1);
			uni.showToast({
				title: '已删除',
				icon: 'success'
			});
			}
		}
		});
	}
	};

	const addOtherContact = () => {
		uni.navigateTo({
			url: '/pages/work/Client/addOtherContact'
		})
	}

	const deleteProject = (index) => {
		uni.showModal({
			title: '提示',
			content: '确定要删除此项目吗？',
			success: function(res) {
				if (res.confirm) {
					form.projectList.splice(index, 1);
				}
			}
		});
	}

	// --- Tag Management --- (Revised)
	const processTagInput = () => {
		const newTag = clientTagInputValue.value.trim();
		if (newTag) {
			if (newTag.length < 2) {
				uni.showToast({ title: '标签至少2字符', icon: 'none' });
				// 可选: 不隐藏输入框，让用户继续编辑
				// showClientTagInput.value = true; 
				// clientTagInputValue.value = newTag; // 保留输入内容
				return false;
			}
			if (form.label.includes(newTag)) {
				uni.showToast({ title: '标签已存在', icon: 'none' });
				// clientTagInputValue.value = ''; // 清空重复的输入
				// showClientTagInput.value = true; // 保持输入状态
				return false;
			}
			if (form.label.length < maxClientTags.value) {
				form.label.push(newTag);
				updateLabelName(); 
			} else {
				uni.showToast({ title: `最多添加 ${maxClientTags.value} 个标签`, icon: 'none' });
				return false; // 阻止进一步操作，因为已达上限
			}
			clientTagInputValue.value = ''; // 成功添加后清空
			return true; // 表示成功处理
		}
		return false; // 没有有效输入
	};

	const confirmAddClientTagOnEnter = () => {
		if(processTagInput()){
			// 键盘确认后通常希望继续输入或隐藏，这里先保持隐藏逻辑
			// 如果希望连续添加，可以考虑不隐藏输入框，或者在processTagInput返回true时重新focus
			 showClientTagInput.value = false; 
		}
	};

	const confirmAddClientTagOnBlur = () => {
		processTagInput();
		// 失去焦点时总是隐藏输入框
		showClientTagInput.value = false;
	};
	
	const removeClientTag = (index) => {
		form.label.splice(index, 1);
		updateLabelName();
	};

	const updateLabelName = () => {
		form.labelName = form.label.join(','); 
	};

	const onKeyboardHeightChange = (e) => {
		// console.log('键盘高度变化:', e);
	};

	const CilckTag = (tag, index) => {
		//   console.log('点击的标签：', tag, '索引：', index)
	}

	const confirmDate = (e, index) => {
		// 时间戳转换
		const date = new Date(e.value);	
		form.projectList[0].expireDate = date.toISOString();
		// 仅用于显示的格式化日期
		form.projectList[0].expireDateText = date.toLocaleDateString();
		showDatePicker.value = false;
	};

	const confirmLevel = (e) => {
		if (e.value && e.value.length > 0) {
			currentActiveForm.value.level = e.value[0].value; // 存储值
        	currentActiveForm.value.levelText = e.value[0].label; // 存储显示文本
		}
		showLevelPicker.value = false;
	};
	const confirmCustomerType = (e) => {
		if (e.value && e.value.length > 0) {
			currentActiveForm.value.customerType = e.value[0].value; // 存储值
        	currentActiveForm.value.customerTypeText = e.value[0].label; // 存储显示文本
		}
		showCustomerTypePicker.value = false;
	};
	const confirmCompanyType = (e) => {
		if (e.value && e.value.length > 0) {
			form.companyType = e.value[0].value; // 存储值
        	form.companyTypeText = e.value[0].label; // 存储显示文本
		}
		showCompanyTypePicker.value = false;
	};
    const confirmCustomerSource = (e) => {
		if (e.value && e.value.length > 0) {
			currentActiveForm.value.customerSource = e.value[0].value; // 存储值
        	currentActiveForm.value.customerSourceText = e.value[0].label; // 存储显示文本
		}
        showCustomerSourcePicker.value = false;
    };
    const confirmProjectCategory = (e) => {
        form.projectCategoryInterest = e.value[0].label; // Or value
        showProjectCategoryPicker.value = false;
    };

	// --- Picker Value Display Helpers ---
	// const getCustomerLevelName = (value) => levelOptions.value[0].find(opt => opt.value === value)?.label;
	// const getCustomerTypeName = (value) => customerTypeOptions.value[0].find(opt => opt.value === value)?.label;
	// const getCompanyTypeName = (value) => companyTypeOptions.value[0].find(opt => opt.value === value)?.label;
	// --- Coordinate Selection (Placeholder) ---
	const selectCoordinate = () => {
		// 不指定 type 参数，使用默认值
		uni.getLocation({
			success: function (res) {
				form.coordinate = `${res.longitude},${res.latitude}`;
				uni.showToast({ title: '获取坐标成功', icon: 'success' });
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
			},
			fail: function (err) {
				console.error('定位失败：', err);
				
				// 提供更明确的错误信息
				let errorMsg = '获取坐标失败';
				if (err.errMsg.includes('permission')) {
					errorMsg = '没有定位权限，请检查设置';
				} else if (err.errMsg.includes('Network')) {
					errorMsg = '网络错误，可能需要使用国内地图服务';
				}
				
				uni.showToast({ 
					title: errorMsg, 
					icon: 'none',
					duration: 2000
				});
				
				// 可以提供手动输入坐标的选项
				uni.showModal({
					title: '提示',
					content: '无法自动获取位置，是否手动输入坐标？',
					success: function (res) {
						if (res.confirm) {
							// 这里可以打开一个输入坐标的弹窗或页面
							console.log('用户选择手动输入坐标');
							// 示例：可以跳转到地图选点页面
							// uni.navigateTo({ url: '/pages/map/select-location' });
						}
					}
				});
			}
		});
	};

	

	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
	}


	/**
	 * 地区选择
	 * 
	 */

	 // --- 地区选择器相关 ---
	const showRegionPicker = ref(false);
	const regionPickerRef = ref(null); // 用于 up-picker 的 ref

	// regionColumns 用于驱动 up-picker 的列数据
	// 它是一个包含三个数组的数组，分别代表省、市、区
	const regionColumns = ref([[], [], []]);

	// allProvinces 将持有从 china-area-data 转换后的完整省市区数据
	// 结构： [{ label, value, children: [{ label, value, children: [...] }] }, ...]
	const allProvinces = ref([]);

	// 初始化并转换地区数据
	const initializeRegionData = () => {
		const provinces = [];
		if (areaData && areaData['86']) {
			for (const provinceCode in areaData['86']) {
				const provinceName = areaData['86'][provinceCode];
				const provinceNode = { label: provinceName, value: provinceCode, children: [] };

				if (areaData[provinceCode]) {
					for (const cityCode in areaData[provinceCode]) {
						const cityName = areaData[provinceCode][cityCode];
						const cityNode = { label: cityName, value: cityCode, children: [] };

						if (areaData[cityCode]) {
							for (const districtCode in areaData[cityCode]) {
								const districtName = areaData[cityCode][districtCode];
								cityNode.children.push({ label: districtName, value: districtCode });
							}
						}
						provinceNode.children.push(cityNode);
					}
				}
				provinces.push(provinceNode);
			}
		}
		allProvinces.value = provinces;
	};

	// 初始化Picker的列 (通常在 onMounted 和点击打开Picker时调用)
	const initPickerColumns = () => {
		if (allProvinces.value.length === 0) {
			initializeRegionData(); // 确保数据已加载和转换
		}

		const p = allProvinces.value.map(prov => ({ label: prov.label, value: prov.value }));
		let c = [];
		let a = [];

		if (p.length > 0 && allProvinces.value[0].children) {
			c = allProvinces.value[0].children.map(city => ({ label: city.label, value: city.value }));
			if (c.length > 0 && allProvinces.value[0].children[0].children) {
				a = allProvinces.value[0].children[0].children.map(area => ({ label: area.label, value: area.value }));
			}
		}
		regionColumns.value = [p, c, a];
	};

	// 打开地区选择器
	const showPickerClick = () => {
		if (regionColumns.value[0].length === 0 || regionColumns.value[1].length === 0) {
			// 如果picker列是空的，或者市级数据是空的（可能之前只选了省就关了），重新初始化
			initPickerColumns();
		}
		showRegionPicker.value = true;
	};

	// 当选择器的列发生改变时 (滚动选择时)
	const changeRegion = (e) => {
		const { columnIndex, value: selectedValues } = e; // selectedValues 是 e.value

		let p = [...regionColumns.value[0]]; // 省份列通常保持不变
		let c = []; // 默认清空城市列，后续根据省份重新填充
		let a = []; // 默认清空区域列，后续根据城市重新填充

		if (columnIndex === 0) { // 省份改变
			const currentSelectedProvinceValue = selectedValues?.[0].value; // 使用 e.value[0] 获取省份的编码值
			console.log('当前选中的省份编码：', currentSelectedProvinceValue)
			if (currentSelectedProvinceValue) {
				const provinceData = allProvinces.value.find(prov => prov.value === currentSelectedProvinceValue);
				if (provinceData && provinceData.children) {
					c = provinceData.children.map(city => ({ label: city.label, value: city.value }));
					if (c.length > 0 && provinceData.children[0].children) {
						// 默认加载第一个城市的区域
						a = provinceData.children[0].children.map(area => ({ label: area.label, value: area.value }));
					}
				}
			}
			// 当省份改变时， picker 会自动调整后续列的选中到第一项，我们只需要提供数据
		} else if (columnIndex === 1) { // 城市改变
			const currentSelectedProvinceValue = selectedValues?.[0].value;     // 当前选中的省份编码
			const currentSelectedCityValue = selectedValues?.[1].value;         // 当前选中的城市编码

			if (currentSelectedProvinceValue) {
				const provinceData = allProvinces.value.find(prov => prov.value === currentSelectedProvinceValue);
			if (provinceData && provinceData.children) {
					// 城市列数据源应基于当前省份
					c = provinceData.children.map(city => ({ label: city.label, value: city.value }));
					if (currentSelectedCityValue) {
						const cityData = provinceData.children.find(city => city.value === currentSelectedCityValue);
				if (cityData && cityData.children) {
							a = cityData.children.map(area => ({ label: area.label, value: area.value }));
						}
					} else if (c.length > 0 && provinceData.children[0].children) {
						// 如果城市改变了，但新的城市列表有数据，也默认显示第一个城市的区
						a = provinceData.children[0].children.map(area => ({ label: area.label, value: area.value }));
					}
				}
			}
		} else if (columnIndex === 2) { // 区县改变
			// 区县改变时，通常省份和城市列的数据源不需要变化，picker内部会处理选中
			// 但为了确保数据一致性，我们还是根据当前选中的省市来填充c和a
			const currentSelectedProvinceValue = selectedValues?.[0].value;
			const currentSelectedCityValue = selectedValues?.[1].value;
			
			if (currentSelectedProvinceValue) {
				const provinceData = allProvinces.value.find(prov => prov.value === currentSelectedProvinceValue);
			if (provinceData && provinceData.children) {
					c = provinceData.children.map(city => ({ label: city.label, value: city.value }));
					if (currentSelectedCityValue) {
						const cityData = provinceData.children.find(city => city.value === currentSelectedCityValue);
			if (cityData && cityData.children) {
							a = cityData.children.map(area => ({ label: area.label, value: area.value }));
						}
					}
				}
			}
		}

		// 重点：赋一个全新的数组给 regionColumns.value 来触发更新
		regionColumns.value = [p, c, a];
	};

	// 当点击确定按钮时
	const confirmRegion = (e) => {
		console.log('确认地区选择事件：', e.value[0].value);
		if (e.value && e.value.length > 0) {
			// 如果需要存储编码，可以这样获取:
			// const codes = selectedOptions.map(opt => opt.value);
			// form.provinceCode = codes[0] || '';
			// form.cityCode = codes[1] || '';
			// form.areaCode = codes[2] || '';
			const selectedLabels = [];
			const selectedValues = [];
			// 遍历每一列的选中项
			for (let i = 0; i < e.value.length; i++) {
				console.log('当前列索引：', regionColumns.value)
				// 根据当前列索引找到对应列的数据
				if (i === 0 && regionColumns.value[0].length > 0) {
					// 省份
					const provinceItem = regionColumns.value[0].find(item => item.value === e.value[i].value);
					console.log('省份：', provinceItem)
					if (provinceItem) {
						selectedLabels.push(provinceItem.label);
						selectedValues.push(provinceItem.value);
					}
				} else if (i === 1 && regionColumns.value[1].length > 0) {
					// 城市
					const cityItem = regionColumns.value[1].find(item => item.value === e.value[i].value);
					console.log('城市：', cityItem)
					if (cityItem) {
						selectedLabels.push(cityItem.label);
						selectedValues.push(cityItem.value);
					}
				} else if (i === 2 && regionColumns.value[2].length > 0) {
					// 区县
					const areaItem = regionColumns.value[2].find(item => item.value === e.value[i].value);
					if (areaItem) {
						selectedLabels.push(areaItem.label);
						selectedValues.push(areaItem.value);
					}
				}
			}
			
			// 更新表单中的地区值
			form.region = selectedLabels.join('/');
			console.log('设置地区为：', form.region);
		}
		showRegionPicker.value = false;
	};

	// --- End 地区选择器相关 ---

	// 需要在 onMounted 中初始化地区数据
	onMounted(() => {
		initializeRegionData(); // 加载并转换原始地区数据
		const userInfo = uni.getStorageSync('userInfo');
		console.log('用户信息：', userInfo.sysNo)
		form.inUserSysNo = userInfo.sysNo;
		form.inUserName = userInfo.name;
	});

	// 保存客户数据
	const saveClientData = () => {
		// 1. 根据当前选中的标签页判断是企业用户还是个人客户
		const isEnterprise = tabIndex.value === 0;
		const clientType = isEnterprise ? '企业客户' : '个人客户'; // 用于日志或可能的API参数
		const currentFormToSubmit = isEnterprise ? form : personalForm; // 获取正确的表单对象
		
		// 验证必填字段
		const requiredFields = [];
		
		if (isEnterprise) {
        if (!currentFormToSubmit.name) requiredFields.push('企业名称');
        if (!currentFormToSubmit.contacts) requiredFields.push('主联系人');
        if (!currentFormToSubmit.phone) requiredFields.push('联系人电话');
        if (!currentFormToSubmit.region) requiredFields.push('地区');
        if (!currentFormToSubmit.customerSource) requiredFields.push('客户来源'); // 注意是 customerSource (value) 而非 customerSourceText
        if (!currentFormToSubmit.customerType) requiredFields.push('客户类型');
        if (!currentFormToSubmit.level) requiredFields.push('客户等级');
		if (!currentFormToSubmit.inUserSysNo) requiredFields.push('负责人编号');
        // ... 其他企业客户必填字段
		} else { // 个人客户
			if (!currentFormToSubmit.name) requiredFields.push('姓名');
			if (!currentFormToSubmit.phone) requiredFields.push('联系人电话');
			if (!currentFormToSubmit.idCard) requiredFields.push('身份证号');
			// 个人客户也可能有来源、类型、等级等必填项，需要从 currentFormToSubmit 中判断
			if (!currentFormToSubmit.customerSource) requiredFields.push('客户来源');
			if (!currentFormToSubmit.customerType) requiredFields.push('客户类型');
			if (!currentFormToSubmit.level) requiredFields.push('客户等级');
			// ... 其他个人客户必填字段
		}
		
		// 如果有必填字段未填，提示用户
		if (requiredFields.length > 0) {
			uni.showToast({
			title: `请填写${requiredFields.join('、')}`,
			icon: 'none',
			duration: 2000
			});
			return;
		}

		
		// 准备提交的数据
		const submitData = { ...currentFormToSubmit }; // 深拷贝当前表单数据
		
		// 根据客户类型添加额外字段
		submitData.clientType = clientType;
		submitData.submitTime = new Date().toISOString();


		// 处理标签字段 - 如果是数组，转换为逗号分隔的字符串
		if (Array.isArray(submitData.label)) {
			submitData.label = submitData.label.join(',');
		}
		if(	isEnterprise ){
			// 处理地区字段 - 如果是数组，转换为字符串
			console.log('转换字符串转换字符串转换字符串转换字符串转换字符串')
			if (Array.isArray(submitData.region)) {
				submitData.region = submitData.region.join('/'); // 例如: "广东省/深圳市/南山区"
			}
			// 处理其他联系人 - 如果是数组，转换为 JSON 字符串
			if (Array.isArray(submitData.otherUser)) {
				submitData.otherUser = JSON.stringify(submitData.otherUser);
			}
		}
		
		// 打印表单数据
		console.log('====================');
		console.log(`提交的${clientType}数据：`);
		console.log('====================');
		
		// 格式化打印，按字段分类
		const printFormattedData = () => {
			// 基本信息
			console.log('【基本信息】');
			if (tabIndex.value === 0) {
			console.log('企业名称:', submitData.name);
			console.log('社会统一信用码:', submitData.code);
			console.log('主联系人:', submitData.contacts);
			console.log('联系人电话:', submitData.phone);
			} else {
			console.log('姓名:', submitData.name);
			console.log('联系人电话:', submitData.phone);
			console.log('身份证号:', submitData.idCard);
			}
			console.log('坐标:', submitData.coordinate);
			console.log('地区:', submitData.region);
			console.log('详细地址:', submitData.address);
			
			// 客户标签
			if (submitData.label && submitData.label.length > 0) {
				console.log('【客户标签】', submitData.label);
			}
			
			// 客户信息
			console.log('【客户信息】');
			console.log('负责人:', submitData.inUserName);
			console.log('客户来源:', submitData.customerSource);
			console.log('客户类型:', submitData.customerType);
			console.log('客户等级:', submitData.level);
			
			console.log('otherUser', submitData.otherUser)
			
			// 企业客户特有信息
			if (tabIndex.value === 0) {
			console.log('【公司信息】');
			console.log('法人:', submitData.legal);
			console.log('法人电话:', submitData.legalPhone);
			console.log('公司电话:', submitData.tel);
			console.log('传真:', submitData.fax);
			
			console.log('【账户信息】');
			console.log('银行账号:', submitData.bankAccount);
			console.log('开户行:', submitData.bankType);
			console.log('邮箱:', submitData.email);
			console.log('开票电话:', submitData.invoiceTel);
			console.log('开票联系电话:', submitData.invoicePhone);
			console.log('注册地址:', submitData.registeredAddress);
			}
			
			// 完整数据对象
			console.log('【完整数据对象】');
			console.log(JSON.stringify(submitData, null, 2));
	};
	
	// 执行格式化打印
	printFormattedData();
	
	
	// 6. 根据客户类型调用不同的API接口
    if (isEnterprise) {
		// 如果需要实际提交到后端，可以在这里添加API调用代码
	API_addEnterpriseClient(submitData).then(res => {
		if (res.code === 200) {
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			});
			// 可以在这里添加保存成功后的操作，如返回列表页
			// setTimeout(() => {
			// 	uni.navigateBack();
			// }, 1500);
			} else {
				uni.showToast({
					title: res.message || '保存失败',
					icon: 'none'
				});
				}
			}).catch(err => {
				console.error('保存失败:', err);
				uni.showToast({
				title: '网络错误，请重试',
				icon: 'none'
				});
			});
		}else {
			// 调用保存个人客户的 API (假设您有一个 API_addPersonalClient)
			console.log('尝试提交个人客户数据:', submitData);
		}
	};



	

</script>

<style setup lang="scss">
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

	.content {
		padding: 30rpx;
		padding-top: 120rpx;
	}

	.card {
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		position: relative;

		.zhoLf {
			font-size: 28rpx;
			color: #5A78A0;
		}

		.zhoRi {
			font-size: 28rpx;
			color: #092D5C;
		}

		.bqadd {
			width: 172rpx;
			height: 68rpx;
			border-radius: 6rpx;
			border: 2rpx dashed #3C82FE;
			text-align: center;
			line-height: 68rpx;
			font-size: 28rpx;
			color: #3C82FE;
		}

		.bq {
			height: 68rpx;
			border-radius: 6rpx;
			border: 2rpx solid #3C82FE;
			text-align: center;
			line-height: 68rpx;
			font-size: 28rpx;
			background: #E1ECFF;
			color: #3C82FE;
			position: relative;
			padding-right: 30rpx;
			box-sizing: border-box;
		}
	}

	.textClass {
		width: 618rpx;
		height: 160rpx;
		background: #F6F8FC;
		border-radius: 8rpx;
		padding: 10rpx 0 0 10rpx;

		textarea {
			width: 100%;
			height: 100%;
			font-size: 26rpx;
			color: #092D5C;
		}
	}
	.empty-contact {
		min-height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.delete-btn {
		font-size: 28rpx;
		color: #FF5252;
		text-align: center;
		margin-top: 10rpx;

	}
	.delete-contact {
		position: absolute;
		top: 40rpx;
		right: 20rpx;
		width: 80rpx;
		height: 80rpx;
		display: flex;
		font-size: 30rpx;
		align-items: center;
		justify-content: center;
	}
	.xtitle {
		font-size: 36rpx;
		color: #092D5C;
		padding: 30rpx 0 20rpx 0;
	}

	.btnbox {
		// position: absolute;
		// bottom: 5vw;
		// left: 9vw;

		.btnleft {
			padding: 25rpx 115rpx;
			font-size: 36rpx;
			color: #3C82FE;
			background: #ECF1FF;
			border-radius: 59rpx;
		}

		.btnright {
			padding: 25rpx 115rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			background: #3C82FE;
			border-radius: 59rpx;
			margin-left: 20rpx;
		}
	}

	.cell-item { // 用于模拟 up-cell 的基本布局
	  display: flex;
	  align-items: center;
	  padding: 20rpx 0; // 调整以适应card内边距
	  border-bottom: 1px solid #f0f0f0; 
	}

	.cell-title {
	  font-size: 28rpx; 
	  color: #5A78A0;  // 与其他 zhoLf 颜色统一
	  margin-right: 20rpx;
	  min-width: 150rpx; 
	}

	.tag-input-container {
	  // 可以保持之前的样式，或者根据页面整体风格调整
	  border-bottom: 1px solid #f0f0f0;	
	  padding-bottom: 20rpx;
	}

	.tag-list {
	  display: flex;
	  flex-wrap: wrap;
	  align-items: center;
	  flex-grow: 1; 
	}
	.bq {
		padding: 0 20rpx;
		margin-bottom: 9px;
	}
	.tag-item {
	  margin-right: 10rpx;
	  margin-bottom: 10rpx; 
	  padding: 0 10rpx;
	  margin-bottom: 5px;
	}

	.tag-input-wrapper {
	  display: inline-flex; // 使得input和button在同一行
	  // align-items: center; // 垂直居中（如果需要）
	  min-width: 150rpx; // 尝试保持最小宽度与按钮一致
	  padding: 0 10rpx;
	}

	.bqadd-input {
	  height: 66rpx; // 保持和 .bqadd 一样的高度
	  line-height: 66rpx;
	  padding: 0 20rpx;
	  border-radius: 6rpx;
	  border: 2rpx dashed #3C82FE; // 保持和 .bqadd 一样的边框
	  font-size: 28rpx;
	  color: #3C82FE;
	  background-color: #fff; // 通常输入框背景为白色
	  text-align: center; // 保持和 .bqadd 一样的文本对齐
	  width: 130rpx;
	}

	.close-icon-wrapper {
		position: absolute;
		top: -7px;
		right: -5px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		background-color: rgba(255,255,255,1); //调试时打开，查看点击区域
	}
</style>
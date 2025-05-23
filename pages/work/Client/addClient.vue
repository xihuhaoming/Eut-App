<template>
	<view>
		<up-navbar title="客户" :placeholder="true" :autoBack="true" />
		<view style="background:#fff;">
			<up-tabs :scrollable="false" :list="list" @click="tabclick"
				itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
				activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		</view>
		<view class="content">
			<view class="card" v-if="tabIndex==0">
				<up-cell-group :border="false">
					<up-cell title="企业名称" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="form.name" placeholder="请输入事项名称" type="text"
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
					<up-cell title="地区" :value="form.region || '选择地区'" @click="showRegionPicker = true" :isLink="true" arrow-direction="right" :required="true"></up-cell>
				</up-cell-group>

				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入文字内容" border="surround" v-model="form.address"></textarea>
				</view>
			</view>
			<view class="card" v-if="tabIndex==1">
				<up-cell-group :border="false">
					<up-cell title="姓名" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="联系人电话" value="客户名称" :required="true" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="身份证号" value="客户名称" :required="true" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
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
				<up-cell-group :border="false"><up-cell title="负责人" value="默认自己" :isLink="false" arrow-direction="right"
						:required="true">
					</up-cell>
					<up-cell title="客户来源" value="默认自己" :isLink="false" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="意向项目类别" value="默认自己" :isLink="false" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="客户类型" value="默认自己" :isLink="false" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="客户等级" value="默认自己" :isLink="false" arrow-direction="right" :required="true">
					</up-cell>
				</up-cell-group>
			</view>
			<view class="u-flex u-row-between u-col-center  up-m-t-20">
				<view class="xtitle bold">已做项目</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加发票</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>
			<view class="card up-m-t-20">
				<up-cell-group :border="false">
					<up-cell title="项目" value="根据选择的产品显示名称" :isLink="false" arrow-direction="right" :required="false">
					</up-cell>
					<up-cell title="到期时间" value="2023.01.23" :isLink="true" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="金额" value="" :required="false" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="发证机构" value="" :required="false" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
				</up-cell-group>
			</view>


			<view class="u-flex u-row-between u-col-center  up-m-t-20" v-if="tabIndex==0">
				<view class="xtitle bold">其他联系人</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;" @click="addOtherContact">添加</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>

			<view class="card up-m-t-20" v-if="tabIndex==0">
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">联系人名称</view>
					<view class="zhoRi up-m-l-30">开发部/UI 设计师</view>
				</view>
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">电话：</view>
					<view class="zhoRi up-m-l-30">7395932</view>
				</view>
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">邮箱：</view>
					<view class="zhoRi up-m-l-30">27439590436@qq.co</view>
				</view>
			</view>

			<view class="xtitle bold">公司信息</view>
			<view class="card up-m-t-20">
				<up-cell title="法人" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="法人电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="公司电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="传真" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
			</view>

			<view class="xtitle bold" v-if="tabIndex==0">账户信息</view>
			<view class="card up-m-t-20" v-if="tabIndex==0">
				<up-cell title="银行账号" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="开户行" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="邮箱" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="开票电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell> <up-cell title="开票联系电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell> <up-cell title="注册地址" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
			</view>
		</view>
		<view class="btnbox u-flex u-col-center u-row-center up-m-b-20">
			<view class="btnleft">放入公共池</view>
			<view class="btnright">保存</view>
		</view>

		<!-- Pickers -->
		<up-picker :show="showRegionPicker" :columns="regionOptions" @confirm="confirmRegion" @cancel="showRegionPicker = false" title="选择地区"></up-picker>
		<up-picker :show="showUserPicker" :columns="userOptions" keyName="name" @confirm="confirmUser" @cancel="showUserPicker = false" title="选择负责人"></up-picker>
		<up-picker :show="showLevelPicker" :columns="levelOptions" @confirm="confirmLevel" @cancel="showLevelPicker = false" title="选择客户等级"></up-picker>
		<up-picker :show="showCustomerTypePicker" :columns="customerTypeOptions" @confirm="confirmCustomerType" @cancel="showCustomerTypePicker = false" title="选择客户类型"></up-picker>
		<up-picker :show="showCompanyTypePicker" :columns="companyTypeOptions" @confirm="confirmCompanyType" @cancel="showCompanyTypePicker = false" title="选择公司类型"></up-picker>
		<!-- Mock Pickers for fields not in API, can be removed if not needed -->
		<up-picker :show="showCustomerSourcePicker" :columns="customerSourceOptions" @confirm="confirmCustomerSource" @cancel="showCustomerSourcePicker = false" title="选择客户来源"></up-picker>
		<up-picker :show="showProjectCategoryPicker" :columns="projectCategoryOptions" @confirm="confirmProjectCategory" @cancel="showProjectCategoryPicker = false" title="选择意向项目类别"></up-picker>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import { onLoad } from '@dcloudio/uni-app'; 

	const tabIndex = ref(0)
	const list = reactive([{
			name: '企业客户'
		},
		{
			name: '个人客户'
		}
	]);
	const typeValue = ref(1)


	const initialFormState = () => ({
		createUserSysNo: '',
		createUserName: '',
		createInDate: '',
		sysNo: '', // Usually backend generated
		inUserSysNo: '', // 负责人流水号 (Required)
		inUserName: '',  // 负责人姓名
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
		bankType: '', // 银行类型 (开户行)
		email: '', // 邮箱
		website: '', // 网址
		invoiceTel: '', // 开票电话
		invoicePhone: '', // 开票联系方式
		level: '', // 级别 (0.vip、1.钻卡客户、2.金卡客户、3.银卡客户)
		companyType: '', // 公司类型（0.企业侧;1.政府侧）
		customerType: '', // 客户类型(0.新客户、1.老客户、2.激活客户)
		inEntSysNo: '', // 企业流水号 (Often from global state/user info)
		publicPool: 0, // 是否公共池 1：是 0：否
		otherUser: [], // 其他联系人 (Array of objects: {name, phone, email, position})
		// Fields from UI but not directly in API root for client:
		customerSource: '', // 客户来源 - For UI example
		projectCategoryInterest: '', // 意向项目类别 - For UI example
		labels: [], // 用于存储客户标签
	});

	const form = reactive(initialFormState());

	

	// --- Picker States and Options ---
	const showRegionPicker = ref(false);
	const regionOptions = ref([]); // 初始化为空数组
	
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
    // Mock pickers for UI consistency, can be removed if not mapping to API
    const showCustomerSourcePicker = ref(false);
    const customerSourceOptions = ref([[{label: '来源A', value: 'SRC_A'}, {label: '来源B', value: 'SRC_B'}]]);
    const showProjectCategoryPicker = ref(false);
    const projectCategoryOptions = ref([[{label: '项目X', value: 'PROJ_X'}, {label: '项目Y', value: 'PROJ_Y'}]]);

	// 客户标签输入相关
	const showClientTagInput = ref(false);
	const clientTagInputValue = ref('');
	const maxClientTags = ref(5); // 最多允许5个标签

	onMounted(() => {
		// Simulate fetching current user info
		const currentUser = { sysNo: 'USER_CURRENT_SYSNO', name: '当前操作员', entSysNo: 'ENT001' }; // Mock current user
		form.createUserSysNo = currentUser.sysNo;
		form.createUserName = currentUser.name;
		form.createInDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
		form.inUserSysNo = currentUser.sysNo; // Default 负责人 to current user
		form.inUserName = currentUser.name;
		form.inEntSysNo = currentUser.entSysNo;

		// Fetch actual options for pickers if needed
		// fetchRegionOptions();
		// fetchUserOptions();
	});

	const addOtherContact = () => {
		console.log('添加其他联系人')
		uni.navigateTo({
			url: '/pages/work/client/addOtherContact'
		})
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
			if (form.labels.includes(newTag)) {
				uni.showToast({ title: '标签已存在', icon: 'none' });
				// clientTagInputValue.value = ''; // 清空重复的输入
				// showClientTagInput.value = true; // 保持输入状态
				return false;
			}
			if (form.labels.length < maxClientTags.value) {
				form.labels.push(newTag);
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
		form.labels.splice(index, 1);
		updateLabelName();
	};

	const updateLabelName = () => {
		form.labelName = form.labels.join(','); 
	};

	const onKeyboardHeightChange = (e) => {
		// console.log('键盘高度变化:', e);
	};

	const CilckTag = (tag, index) => {
		//   console.log('点击的标签：', tag, '索引：', index)
	}

	// --- Picker Confirm Handlers ---
	const confirmRegion = (e) => {
		// 对于单列选择器，它可能是类似 ['区域A']
		if (e.value && e.value.length > 0) {
        form.region = e.value[0]; //直接取第一个元素
    }
    showRegionPicker.value = false;
	};
	const confirmUser = (e) => {
		form.inUserSysNo = e.value[0].sysNo;
		form.inUserName = e.value[0].name;
		showUserPicker.value = false;
	};
	const confirmLevel = (e) => {
		form.level = e.value[0].value;
		showLevelPicker.value = false;
	};
	const confirmCustomerType = (e) => {
		form.customerType = e.value[0].value;
		showCustomerTypePicker.value = false;
	};
	const confirmCompanyType = (e) => {
		form.companyType = e.value[0].value;
		showCompanyTypePicker.value = false;
	};
    const confirmCustomerSource = (e) => {
        form.customerSource = e.value[0].label; // Or value, depending on needs
        showCustomerSourcePicker.value = false;
    };
    const confirmProjectCategory = (e) => {
        form.projectCategoryInterest = e.value[0].label; // Or value
        showProjectCategoryPicker.value = false;
    };

	// --- Picker Value Display Helpers ---
	const getCustomerLevelName = (value) => levelOptions.value[0].find(opt => opt.value === value)?.label;
	const getCustomerTypeName = (value) => customerTypeOptions.value[0].find(opt => opt.value === value)?.label;
	const getCompanyTypeName = (value) => companyTypeOptions.value[0].find(opt => opt.value === value)?.label;
	// --- Coordinate Selection (Placeholder) ---
	const selectCoordinate = () => {
		uni.getLocation({
			type: 'gcj02', // or 'wgs84'
			success: function (res) {
				form.coordinate = `${res.longitude},${res.latitude}`;
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
			},
			fail: function (err) {
				uni.showToast({ title: '获取坐标失败', icon: 'none' });
				console.log(err)
			}
		});
	};
	


	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
	}

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
	}

	.card {
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;

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
	}

	.tag-list {
	  display: flex;
	  flex-wrap: wrap;
	  align-items: center;
	  flex-grow: 1; 
	}
	.bq {
		padding: 0 20rpx;
	}
	.tag-item {
	  margin-right: 10rpx;
	  margin-bottom: 10rpx; 
	  padding: 0 10rpx;
	}

	.tag-input-wrapper {
	  display: inline-flex; // 使得input和button在同一行
	  // align-items: center; // 垂直居中（如果需要）
	  min-width: 172rpx; // 尝试保持最小宽度与按钮一致
	  padding: 0 10rpx;
	}

	.bqadd-input {
	  height: 68rpx; // 保持和 .bqadd 一样的高度
	  line-height: 68rpx;
	  padding: 0 20rpx;
	  border-radius: 6rpx;
	  border: 2rpx dashed #3C82FE; // 保持和 .bqadd 一样的边框
	  font-size: 28rpx;
	  color: #3C82FE;
	  background-color: #fff; // 通常输入框背景为白色
	  text-align: center; // 保持和 .bqadd 一样的文本对齐
	  width: 150rpx;
	}

	.close-icon-wrapper {
		position: absolute;
		top: -7px;
		right: -5px;
		width: 30rpx; // 可点击区域宽度
		height: 30rpx; // 与标签同高，方便垂直居中
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		background-color: rgba(255,255,255,1); //调试时打开，查看点击区域
	}
</style>
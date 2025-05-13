<template>
	<view>
		<!-- <xiaolu-tree  :bigParentName="bigParentName" :checkList="checkList" v-if="tree.length>0" :props="prop" @sendValue="confirm" :isCheck="true" :trees="tree" /> -->
		<view class="search" style='position: fixed;top: 0;'>
			<input v-on:input="serchCofirm"  type="text" placeholder="搜索" placeholder-style="color:#ccc;font-size:18rpx" v-model.trim='kwd'
				style='width: 500rpx;height: 80rpx;line-height: 100rpx;border-radius: 20rpx;padding-left: 20rpx;' />
			<text class='fdj' v-if='kwd' @click='deleteKwd'>x</text>
		</view>
		<!-- 面包屑 -->
		<view class="bread" v-if='isShow' style='margin-top: 80rpx;height: 100rpx;flex-direction: row;width: 750rpx;'>
			<view class="" style='margin-right:5rpx ;' @click='goBigBread()'>
				{{breadName}}
			</view>
			<view v-for='(it,i) in breadList' @click='goBread(it,i)' :key='i'
				style='flex-direction: row;height: 100rpx;margin-top: 45rpx;'>
				<text style='margin-left: 5px;margin-right: 5px;'>></text>
				<text style='margin-left: 5px;margin-right: 5px;' :style='{color:breadId==it.id?"#0066CC":"#000"}'>{{it.name}}</text>
			</view>
		</view>
		<view v-if='isShow' class="" style='width: 750rpx;height: 15rpx;background-color:#f1f0f5;'>
			
		</view>
		<view class="" style='padding-bottom: 160rpx;width: 750rpx;' :style='{marginTop:isShow?"0px":"80rpx"}'>
			<view class="list" v-if='deptIdTree.length'>
				<view
					style="flex-direction: row;justify-content: space-between;margin-left: 40rpx;margin-right: 40rpx;height: 110rpx;border-bottom-width: 1px;border-bottom-color: #f0f0f0;"
					v-for="(it,i) in deptIdTree" :key='i' @click='godept(it)'>
					<view v-if='it.oname' style='height: 110rpx;flex-direction: row;'>
						<text style='font-size: 36rpx;line-height: 110rpx;'>{{it.oname}} </text>
						<text style='color:#ccc;line-height: 110rpx;'>({{it.children.length||it.userList.length}})</text>
					</view>
					<!-- <view class="" v-else-if='it.name' style='height: 100rpx;line-height: 100rpx;'>
						
					</view> -->
					<view class="" v-if='(it.children&&it.children.length)||(it.userList&&it.userList.length)'
						style='padding-top: 40rpx;'>
						<text style='color: #ccc;'>></text>
					</view>
					
				</view>
			</view>
			<view class="" v-if='userList.length'>
				<view class="" v-for='(it,i) in userList' @click='goApp(it)' :key='it.uid' style='flex-direction: row;height: 110rpx;margin-left: 5px;border-bottom-width: 1px;border-bottom-color: #f0f0f0;padding-top: 20px;padding-left: 10px;position: relative;'>
						<label class="radio" v-if='selectType' @click="isChecked($event,i,it)">
							<radio :value='it.uid' :checked="it.checked" />
						</label>
						<text class="avatar" style='position: absolute;top:12px;left:40px' :style='{left:selectType?"40px":"10px"}'>{{it.uname.length>2?it.uname.substr(it.uname.length-2):it.uname}}</text>
						<view style='margin-left: 90rpx;'>
							<text style='font-size: 36rpx;'>{{it.uname}}</text>
						</view>
				</view>
			</view>
			<text class="" v-if="!userList.length&&kwd" style='width: 750rpx;text-align: center;padding-top: 100rpx;'>
				抱歉,"{{kwd}}"暂未找到
			</text>
		</view>
		
		<view class="list-bottom" style=''>
			<view class="list-bottom-lianxi" @click='open'>
				<text>已选择</text>
				<text class="list-bottom-queding" v-if='checkList.length'>{{checkList.length}}个</text>
				<text>联系人</text>
			</view>
			<view @click="determine" v-if='checkList.length'>
				<text class="list-bottom-queding">确定</text>
			</view>
			<view v-else>
				<text class="list-bottom-queding" style="color: #8F8F94;">确定</text>
			</view>
		</view>
		
		<!-- 底部弹框 -->
		<uni-popup id="popup" ref="popup" type="bottom" :animation="false" @change="change">
			<view class="popup-content" :style='{height:checkList.length>3?"auto":"500rpx"}' style='padding-bottom: 100rpx;'>
				<view class="" style='flex-direction: row;justify-content: space-between;height: 100rpx;'>
					<view class="" style='flex-direction: row;margin-top: 20rpx;margin-left: 40rpx;'>
						<text style='color: #333;'>已选择</text>
						<text style='color:#007AFF;font-size: 36rpx;'>{{checkList.length}}</text>人
					</view>
					<view class="" style='margin-right: 20rpx;margin-top: 20rpx;' @click='submit'>
						<text style='margin-right:10px;color:#007AFF;font-size: 36rpx;line-height: 50rpx;'>关闭</text>
					</view>
				</view>
				<view class="" v-for='(it,i) in checkList' :key='i'  style='flex-direction: row;border-bottom-width: 1px;border-bottom-color: #f0f0f0;width: 750rpx;justify-content: space-between;height: 100rpx;'>
					<view class="" style='position: relative;'>
						<text class="avatar" v-if='it.uname' style='position: absolute;top:8px;left:20px'>{{it.uname.length>2?it.uname.substr(it.uname.length-2):it.uname}}</text>
						<text style='margin-left: 130rpx;margin-top: 15px;color: #333;font-size: 36rpx;'>{{it.uname}}</text>
					</view>
					<view  class="" style='margin-right: 20px;padding-top: 35rpx;' >
						<text style='color:#C9C9C9;font-size: 30rpx;text-align: center;border-radius: 10rpx;width: 100rpx;height: 50rpx;line-height: 50rpx;border-width: 1px;border-color: #C9C9C9;' @click='deleteUser(it)'>删除</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var ismp = true;
	import resource from './data.js';
	import uniPopup from './uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				kwd: '',
				deptIdTree: [],
				userList: [],
				breadList: [],
				breadName: '',
				selectType: true,
				active: null,
				checkList: [],
				breadId:null,
				isShow:true,//是否显示面包屑
				token:'',
				url:'',
				screenHeight:0,
			}
		},
		components:{
			uniPopup
		},
		onLoad() {
			this.listDept()
		},
		onShow() {
			if (uni.getStorageSync('isChange')) {
				let checkList = JSON.parse(uni.getStorageSync('isChange'));
				if (checkList.length > 0) {
					this.checkList = checkList;
					this.userList.forEach(its=>{
						this.checkList.forEach(r=>{
							if(its.uid==r.uid){
								its.checked=true
							}
						})
						
					})
				} else {
					this.isChange = [];
		
				}
			}
		
		},
		onBackPress: function(envent) {
			uni.setStorageSync('checkList',JSON.stringify(this.checkList))
		},
		methods: {
			deleteKwd(){
				this.kwd=''
				this.goBigBread()
			},
			// 关键字搜索
			serchCofirm(){
				if(!this.kwd.length){
					console.log('dddd',)
					this.goBigBread()
					return
				}
				this.listDept({keyword:this.kwd})
			},
			// 弹窗确认
			submit(){
				this.$refs.popup.close()
			},
			deleteUser(it){
				this.userList.forEach(its=>{
					if(its.uid==it.uid){
						its.checked=false
					}
				})
				this.checkList=this.checkList.filter(item => { return !it.uid.includes(item.uid); })
			},
			change(){
			},
			open(){
				let that = this;
				that.$refs.popup.open();
			},
			goBread(it, i) {
				if(it.it.children.length){
					this.deptIdTree=it.it.children
				}else{
					this.deptIdTree=[]
				}
				if(it.it.userList.length){
					this.userList=it.it.userList
				}else{
					this.userList=[]
				}
				this.breadId=it
				this.breadList = this.breadList.slice(0, i + 1)
			},
			goBigBread() {
				this.isShow=true
				let tree=uni.getStorageSync('tree')
				if(tree){
					this.deptIdTree=JSON.parse(tree)
				}
				let user=uni.getStorageSync('user')
				if(user){
					this.userList=JSON.parse(user)
				}
				this.breadList=[]
			},
			isChecked(e, i, it) {
				this.active = i;
				console.log("12")
				// #ifdef APP-NVUE
				console.log("123")
				e.stopPropagation()
				// #endif
				this.userList[i].checked = !this.userList[i].checked
				if (this.selectType) {
					if (this.userList[i].checked) {
						console.log('push进去', this.checkList)
						this.checkList.push(it)
					} else {
						this.checkList.splice(this.checkList.indexOf(it), 1);
					}
				} else {

				}
			},
			godept(it) {
				if(!it.children.length&&!it.userList.length){
					return
				}
				console.log('人员', it)
				if (it.oname) {
					this.breadId=it.oid
					this.breadList.push({
						name: it.oname,
						id: it.oid,
						it:it,
						color:'#0066CC'
					})
				}
				if(it.children.length){
					this.deptIdTree=it.children
				}else{
					this.deptIdTree=[]
				}
				if(it.userList.length){
					this.userList=it.userList
				}else{
					this.userList=[]
				}
			
			},
			listDept(param) {
				// this.url = uni.getStorageSync('baseurl');
				if(this.kwd){
					// 按名称搜索
					console.log('@#@#@#@#@#@#!@!@!@!@!',this.kwd);
					console.log('@#@#@#@#@#@#!@!@!@!@!',filterresourcelist);
						
				}else{
					//抓取示例数据
					if(resource.chooseUserNew[0]&&resource.chooseUserNew[0].children&&resource.chooseUserNew[0].oid=='1'){		
						this.deptIdTree =resource.chooseUserNew[0].children[0].children;
						this.breadName=resource.chooseUserNew[0].children[0].oname
						this.breadId=resource.chooseUserNew[0].children[0].oid
						console.log('breadName111',this.breadName)
					}else{
						this.deptIdTree=resource.chooseUserNew[0].children
						this.breadName=resource.chooseUserNew[0].oname
						this.breadId=resource.chooseUserNew[0].oid
						console.log('breadName',resource.chooseUserNew[0])
					}
					if(resource.chooseUserNew[0]&&resource.chooseUserNew[0].children&&resource.chooseUserNew[0].oid=='1'){
						this.userList = resource.chooseUserNew[0].children[0].userList;
						
					}else{
						this.userList = resource.chooseUserNew[0].userList
					}
					
					this.userList.map((it) => {
						it.checked = false
						return
					})
					uni.setStorageSync('tree',JSON.stringify(this.deptIdTree))
					uni.setStorageSync('user',JSON.stringify(this.userList))
				}
			},					
			// 确认
			determine(){
				// this.sendMessageToAndroid(this.checkList);
				uni.navigateTo({
					url:'index?list='+ JSON.stringify(this.checkList)
				})
			},
			goApp(it){
				console.log('this.selectType',this.selectType)
				if(!this.selectType){
					console.log('sssss',it)
					let arr=[];
					arr.push({id:it.uid
					})
					this.sendMessageToAndroid(arr);
				}else{
					return
				}
				
				// console.log('arr',arr)
				
			},
			sendMessageToAndroid(e) {
				try {
					console.log('callback', this.callBackFunc)
					uni.sendNativeEvent(this.callBackFunc, e, ret => {
						//this.nativeMsg = '宿主App回传的数据：' + ret;
					});
				} catch (e) {
					//TODO handle the exception
				}
			},
		}
	}
</script>
<style>
</style>
<style lang="less">
	.avatar{
		width: 70rpx;
		height: 70rpx;
		background: #3489ff;
		text-align: center;
		line-height: 70rpx;
		border-radius: 15rpx;
		font-size: 26rpx;
		color: #fff;
	}
	 
	.popup-content{
		width: 750rpx;
		height: 500rpx;
		z-index:99999;
		background-color:#fff
	}
	.list-bottom {
		position: fixed;
		height: 150rpx;
		background-color: #FFFFFF;
		width: 760rpx;
		bottom: 0;
		left: 0;
		flex-direction: row;
		flex-wrap: nowrap;
		font-size: 20rpx;
		justify-content: space-between;
		padding: 50rpx 30rpx;
	}

	.list-bottom-queding {
		color: #007AFF;

	}

	.list-bottom-lianxi {
		flex-direction: row;
	}

	.search {
		position: relative;
		width: 700rpx;
		height: 80rpx;
		box-sizing: border-box;
		line-height: 80rpx;
		background: #f1f0f5;
		border-radius: 26rpx;
		margin-left:15%;
	
		
	}

	.fdj {
		position: absolute;
		top: 35rpx;
		transform: translateY(-50%);
		right: 70rpx;
		color: #999;
		font-size: 40rpx;
	}

	.list {
		width: 750rpx;
	}

	.btn {
		position: fixed;
		bottom: 0;
		padding: 10px;
		background-color: #fff;
		width: 100%;


	}

	.sureBtn {
		background-color: #3774EE;
		color: #fff;
	}

</style>

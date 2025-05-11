// import config from "./config.js"
import {
	APIURL,
	basePath
} from '@/config';
import {
	http,
	toast
} from '@/uni_modules/uview-plus'
// 1.检查网络是否可用
function isNetworkError() {
	return new Promise(resolve => {
		uni.getNetworkType({
			success: function(res) {
				resolve(res.networkType === 'none')
			},
			fail: function(err) {
				resolve(false)
			}
		})
	})
}
// 2.请求统一配置
export function post(url, params, resolveType, type = 'post') {
	return new Promise((resolve, reject) => {
		uni.showLoading({})
		http[type](APIURL + url, params).then(res => {
			// 3.根据自己的接口响应状态码来配置，我这里配置后台给的code大于0代表请求成功
			let data = res.data;
			if (data.code == 200) {
				uni.hideLoading()
				resolve(data)
			} else if (data.code == 500) {
				uni.hideLoading()
				toast(res.data.msg)
			} else if (data.code == 401) {
				uni.hideLoading()
				// reject('请重新登录');
				toast('请重新登录')
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 1000)
			} else {
				uni.hideLoading()
				toast('网络错误')
				reject(data);
			}
		}).catch(err => {
			// 4.检查网络是否可用，返回自己需要抛出的错误
			isNetworkError().then(isNone => {
				toast(isNone ? '当前无网络，请检查后重试' : '网络错误')
				reject({
					msg: isNone ? '当前无网络，请检查后重试' : '网络错误'
				});

			})

		})
	})
};
export function get(url, params, resolveType, type = 'get') {
	return new Promise((resolve, reject) => {
		uni.showLoading({})
		http[type](APIURL + url, params).then(res => {
			// console.log(res.data.code)
			let data = res.data;
			if (data.code == 200) {
				uni.hideLoading()
				resolve(data)
			} else if (data.code == 500) {
				uni.hideLoading()
				toast(res.data.msg)
			} else if (data.code == 401) {
				uni.hideLoading()
				reject('请重新登录');
				toast('请重新登录')
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 1000)
			} else {
				uni.hideLoading()
				toast('网络错误')
				reject(data);
			}
		}).catch(err => {
			uni.hideLoading()
			// 4.检查网络是否可用，返回自己需要抛出的错误
			isNetworkError().then(isNone => {
				toast(isNone ? '当前无网络，请检查后重试' : '网络错误')
				reject({
					msg: isNone ? '当前无网络，请检查后重试' : '网络错误'
				});

			})
		})
	})
};
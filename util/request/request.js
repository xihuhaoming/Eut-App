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
// 2.请求统一配置, 我这里接口统一都是post请求，如果你的接口有get或其他等请求需自己改一下
export function api(url, params, resolveType, type = 'post') {
	return new Promise((resolve, reject) => {
		http[type](APIURL + url, params).then(res => {
			// 3.根据自己的接口响应状态码来配置，我这里配置后台给的code大于0代表请求成功
			if (Number(res.data.code) > 0) {
				resolve(res.data)
			} else {
				reject(res.data);
			}
		}).catch(err => {
			// 4.检查网络是否可用，返回自己需要抛出的错误
			isNetworkError().then(isNone => {
				reject({
					msg: isNone ? '当前无网络，请检查后重试' : '网络请求失败，请检查后重试'
				});
			})
		})
	})
};
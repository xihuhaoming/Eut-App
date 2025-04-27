import {
	APIURL,
	basePath
} from '@/config';
// import store from '@/store';


// 引入拦截器配置
import {
	requestInterceptors,
	responseInterceptors
} from './interceptors.js'
// 引入luch-request
import {
	http
} from '@/uni_modules/uview-plus'
//  初始化请求配置
const initRequest = (vm) => {
	http.setConfig((defaultConfig) => {
		/* defaultConfig 为默认全局配置 */
		/* config 为默认全局配置*/
		defaultConfig.header['Content-Type'] = 'application/json;charset=utf-8';
		defaultConfig.baseURL = `${APIURL}${basePath}`; /* 根域名 */
		defaultConfig.method = 'POST';
		defaultConfig.showLoading = false; //请求加载效果
		defaultConfig.isToken = true; //请求是否需要token
		defaultConfig.timeout = 8000;
		return defaultConfig
	})
	requestInterceptors()
	responseInterceptors()
}
export {
	initRequest
}
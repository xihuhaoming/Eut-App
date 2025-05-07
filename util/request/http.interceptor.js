import {
	http,
	toast
} from '@/uni_modules/uview-plus'
import {
	APIURL,
	basePath
} from '@/config';
import {
	setToken,
	getToken
} from '/util/auth.js'
// 1.请求超时，加载等配置
http.setConfig((config) => {
	config.header['Content-Type'] = 'application/json;charset=utf-8';
	config.baseURL = `${APIURL}${basePath}`; /* 根域名 */
	config.method = 'POST';
	config.showLoading = false; //请求加载效果
	config.isToken = true; //请求是否需要token
	config.timeout = 8000;
	return config;
})
// 2.请求拦截
http.interceptors.request.use(config => {

	// if (config.showLoading) {
	// 	this.vm.$showLoading();
	// };
	// 是否需要设置 token
	// 是否需要设置 token
	const isToken = config.isToken || false;
	// 是否需要防止数据重复提交
	// // const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
	console.log(config)
	if (getToken() && !isToken) {
		config.header['Authorization'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	console.log("处理config", config)
	return config
}, config => {
	return Promise.reject(config)
})
import App from './App'



// #ifndef VUE3
import Vue from 'vue'

import appApi from './api/index';
import uviewPlus from '@/uni_modules/uview-plus'
// 引入请求封装，将app参数传递到配置中
import {
	initRequest
} from './util/request/index'

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})


app.$mount()
uni.$u.setConfig({
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
});

// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	// 引入请求封装
	initRequest(app)

	app.mixin(appApi);
	app.use(uviewPlus)
	return {
		app
	}
}
// #endif
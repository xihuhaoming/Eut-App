import App from './App'


// import appApi from './api/index';
import uviewPlus from '@/uni_modules/uview-plus'
import '/util/request/http.interceptor.js'
// #ifndef VUE3
import Vue from 'vue'


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
import { createPinia } from 'pinia'

export function createApp() {
	const app = createSSRApp(App)
	
	// 实例化pina
	const pinia = createPinia()
	console.log(pinia)
	app.use(pinia)
	app.use(uviewPlus)
	return {
		app
	}
}
// #endif
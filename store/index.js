import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common';
import dict from './modules/dict';


import {
  APIURL,
  basePath
} from '@/config';

const userInfo = uni.getStorageSync('userInfo'),
  apps = uni.getStorageSync('apps'),
  userApps = uni.getStorageSync('userApps');

Vue.use(Vuex);




const store = new Vuex.Store({
  modules: {
    common,
    dict
  },

  state: {
    appid: '__UNI__8A80F98',
    aMapKey: '01b2d382f96f5a2eb8f4b88b26c46ede',
    versionCode: 100003,
    // #ifdef APP-PLUS
    version: `${plus.runtime.version}`,
    // #endif
    userCode: undefined,
    loginName: undefined,
    userInfo: Object.prototype.toString.call(userInfo) == '[object Object]' ? userInfo : {},
    userName: '',
    pageSize: 10,
    showTabbar: true,
    DOWNLOADURL: `${APIURL}${basePath}/a/sftp/sysAttachement/downLoad`, //下载地址
    UPLOADURL: `${APIURL}${basePath}/file/upload`, //上传地址


   
  },
  mutations: {
   
    setUserInfo(state, val) {
      // state.userInfo = val;
      if (!val) {
        state.userInfo = {};
        return;
      }
      let tmp = {};
      for (const key in val) {
        if (val.hasOwnProperty(key)) {
          const el = val[key];
          if (el == null || el == 'null') {
            tmp[key] = '';
          } else {
            tmp[key] = el;
          }
        }
        if (key == 'avatar' && val[key]) {
          if(!val[key].includes("http")){
            console.log("不包含")
            tmp[key] = require(`@/static/avatar/${val[key]}.jpg`);
          }
        };
      };
      state.userInfo = uni.$u.deepMerge(state.userInfo, tmp);
      console.log("在这里",state.userInfo);
      uni.setStorageSync('userInfo', state.userInfo);
    },
    clearUserData(state) {
      state.userInfo = {};
      uni.removeStorageSync('userInfo');
    },
  
    setApps(state, val) {
      state.apps = val;
      uni.setStorageSync('apps', val);
    },
    setUserApps(state, val) {
      state.userApps = val;
      uni.setStorageSync('userApps', val);
    },
    clearUserApps(state) {
      state.userApps = [];
      uni.removeStorageSync('userApps');
    },
    setUrlAuth(state, val) {
      state.urlAuth = val;
    },
    setUrlObj(state, val) {
      state.urlObj = val;
    },
    setAppVersion(state, {
      appid,
      version
    }) {
      console.log(appid, version);
      state.modeList.forEach(el => {
        if (el.appid == appid) {
          el.version = version;
        }
      });
    }
  },
  actions: {
    updateRequestTimeout(context, value) {
      context.commit('setRequestTimeout', value);
    }
  },
});
export default store;
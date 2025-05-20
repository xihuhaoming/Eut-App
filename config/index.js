let env = process.env.NODE_ENV,
	platform = process.env.VUE_APP_PLATFORM,
	basePath = 'citizen-card-gateway',
	APIURL,
	appid = '',
	aMapKey = '';
if (platform === 'h5') {
	if (env === 'production') {
		APIURL = 'https://erp.eut.prd4.weiniaokeji.cn/front';
	} else {
		APIURL = 'https://erp.eut.prd4.weiniaokeji.cn/front';
		// APIURL = 'http://erp.frp.xiaojinyu.fun';
	}
} else {
	if (env === 'production') {
		APIURL = 'https://erp.eut.prd4.weiniaokeji.cn/front';
	} else {
		APIURL = 'https://app.smkzz.com:8012/';
	}
};
export {
	env,
	platform,
	basePath,
	APIURL,
	appid,
	aMapKey
};
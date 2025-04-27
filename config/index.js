let env = process.env.NODE_ENV,
	platform = process.env.VUE_APP_PLATFORM,
	basePath = 'citizen-card-gateway',
	// basePath = '',
	APIURL,
	appid = '',
	aMapKey = '';
if (platform === 'h5') {
	if (env === 'production') {
		APIURL = 'https://app.smkzz.com:8012/';
	} else {
		APIURL = 'https://testapp.smkzz.com:8013/';
	}
} else {
	if (env === 'production') {
		APIURL = 'https://app.smkzz.com:8012/';
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
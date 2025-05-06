<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-plus/index.scss";
	/*每个页面公共css */
	view{
		box-sizing: border-box;
	}
	.qued {
		width: 638rpx;
		height: 98rpx;
		background: #3C82FE;
		box-shadow: 0rpx 8rpx 21rpx 0rpx rgba(60, 130, 254, 0.3);
		border-radius: 59rpx;
		text-align:center;
		line-height: 98rpx;
		color:#fff;
		font-size: 36rpx;
		margin:0 auto;
	}
</style>


	let firstBackTime = 0
	const __sfc__ = defineApp({
		onLaunch: function () {
			
		},
		onShow: function () {
			
		},
		onHide: function () {
			
		},

		onLastPageBackPress: function () {
			console.log('App LastPageBackPress', " at App.uvue:15")
			if (firstBackTime == 0) {
				uni.showToast({
					title: '再按一次退出应用',
					position: 'bottom',
				})
				firstBackTime = Date.now()
				setTimeout(() => {
					firstBackTime = 0
				}, 2000)
			} else if (Date.now() - firstBackTime < 2000) {
				firstBackTime = Date.now()
				uni.exit()
			}
		},

		onExit: function () {
			console.log('App Exit', " at App.uvue:32")
		},
	})

export default __sfc__
const GenAppStyles = [utsMapOf([["tips", padStyleMapOf(utsMapOf([["fontSize", "26rpx"], ["color", "#666666"]]))]])]

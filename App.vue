<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: (res) => {
					this.$store.commit('editStatusBarHeight', res.statusBarHeight)
					this.$store.commit('editSafeAreaInsetsBottom', res.safeAreaInsets.bottom)
				}
			})
			if (uni.getStorageSync('language')) {
				this.$i18n.locale = uni.getStorageSync('language');
				this.$store.commit('editLanguage', {
					value: uni.getStorageSync('language')
				})
			} else {
				this.$i18n.locale = 'zh';
				this.$store.commit('editLanguage', {
					value: 'tc'
				})
			}

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
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";

	/* #ifndef APP-PLUS-NVUE*/
	::v-deep uni-modal {
		.uni-mask {
			z-index: 100790;
		}

		.uni-modal {
			z-index: 100791;
		}
	}

	uni-page-body,
	html,
	body {
		height: 100%;
		font-size: 28rpx;
		color: #212121;
	}

	view {
		box-sizing: border-box;
	}

	image {
		vertical-align: text-top;
	}

	/* #endif */
</style>
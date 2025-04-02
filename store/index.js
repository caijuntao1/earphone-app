import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '@/utils/i18n';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		statusBarHeight: 0,
		safeAreaInsetsBottom: 0,
		language: uni.getStorageSync('language') ? uni.getStorageSync('language') : 'tc',
		token: uni.getStorageSync('token') ?? '',
		userInfo: uni.getStorageSync('userInfo') ?? '',
	},
	mutations: {

		editStatusBarHeight(state, data) {
			state.statusBarHeight = data
		},
		editSafeAreaInsetsBottom(state, data) {
			this.safeAreaInsetsBottom = data
		},
		setToken(state, data) {
			uni.setStorageSync('token', data)
			state.token = data
		},
		editLanguage(state, data) {
			state.language = data.value
			if (state.language === 'en') {
				i18n.locale = 'en';
			} else if (state.language === 'tc') {
				i18n.locale = 'zh';
			} else if (state.language === 'sc') {
				i18n.locale = 'sc';
			}
			uni.setStorageSync('language', data.value)
			if (data.url) {
				uni.redirectTo({
					url: '/' + data.url
				});
			}
		}
	},
	actions: {

	},
	modules: {}
})
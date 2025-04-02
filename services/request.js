import {
	responseCode
} from "./response.js";
import i18n from '@/utils/i18n';
// const baseUrl = 'https://laravels.materialcost.cn';
// const baseUrl = 'https://kerrylogistics.imtsl.com';
// const baseUrl = 'https://backend.vms2k.com';
// const baseUrl = 'https://dev-backend.iconicbeautyltd.com/api'
// const baseUrl = 'http://192.168.3.107:4052/api'
const baseUrl = 'https://backend.cashphonetrade.com/api'
// const baseUrl = 'https://backend.fencinghall.net/api'
// 不带token请求
const httpRequest = (opts, data) => {
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showModal({
				title: i18n.t('fail'),
				content: i18n.t('network_connection_unavailable'),
				showCancel: false,
				confirmText: 'OK'
			})
		}
		return false
	});
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res.data)
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	});
	return promise
};
//带Token请求
const httpTokenRequest = (opts, data) => {
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let token = uni.getStorageSync('token_name');
	// hadToken()
	if (token == '' || token == undefined || token == null) {
		uni.clearStorageSync();
		uni.showToast({
			title: '帐号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		});
	} else {
		let httpDefaultOpts = {
			url: baseUrl + opts.url,
			data: data,
			method: opts.method,
			header: opts.method == 'get' ? {
				// 'X-Access-Token': token,
				'Authorization': `Bearer ${token}`,
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			} : {
				// 'X-Access-Token': token,
				'Authorization': `Bearer ${token}`,
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			dataType: 'json',
		}
		let promise = new Promise(function(resolve, reject) {
			uni.request(httpDefaultOpts).then(
				(res) => {
					responseCode(res['data'].code, res['data'].msg)
					resolve(res['data'])
					// if (res[1].data.code == 200) {
					// 	resolve(res[1])
					// } else {
					// 	if (res[1].data.code == 5000) {
					// 		uni.reLaunch({
					// 			url: '/pages/login/index'
					// 		});
					// 		uni.clearStorageSync();
					// 	} else {
					// 		resolve(res[1])
					// 	}
					// }
				}
			).catch(
				(response) => {
					reject(response)
				}
			)
		})
		return promise
	}
	// let token = uni.getStorageSync('token_name')
	//此token是登录成功后后台返回保存在storage中的

};
const hadToken = () => {
	let token = uni.getStorageSync('token_name');

	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '帐号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		});
		return false;
	}
	return true
}
export {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	hadToken
}
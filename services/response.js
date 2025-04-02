// 响应code全局处理
import store from '../store'
const responseCode = (code, errMsg) => {
	console.log('code:' + code);
	switch (code) {
		case '401':
			uni.showToast({
				title: '登錄失效，請稍後重試',
				icon: 'none'
			});
			//跳转到登录页
			store.commit('setToken', '')
			uni.clearStorageSync();
			setTimeout(function() {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}, 1000);
			break;
		case '404':
			uni.showToast({
				title: '無法訪問該頁面！',
				icon: 'none'
			});
			break;
		case '500':
			uni.showToast({
				title: '當前使用人數過多，請稍後重試！',
				icon: 'none'
			});
			break;
		case '400':
			uni.showToast({
				title: errMsg,
				icon: 'none'
			});
			break;
		default:
			// console.log('responseCode 默认事件');
			// uni.showToast({
			// 	title: '訪問失敗，請稍後重試！',
			// 	icon: 'none'
			// });
	}
};

export {
	responseCode,
}
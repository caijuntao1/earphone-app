<template>
	<view class="main" :style="{'padding-top':`${statusBarHeight}px`}">
		<view class="main-header" :style="{height:`calc(${content_height - statusBarHeight}px - 310rpx)`}">
			<view class="header-video">
				<block v-if="currentPlay.type=='video'">
					<video class="video" :style="{height:`calc(${content_height - statusBarHeight}px - 310rpx)`}"
						:src="currentPlay.src" loop page-gesture autoplay show-mute-btn></video>
				</block>
				<block v-else>
					<view class="header-music">
						<view class="musice-img">
							<image src="/static/image/1.png" mode="widthFix"></image>
						</view>
						<view class="music-widget">
							<view class="music-btns">
								<view class="btn" @tap="changeMusic('minus')">
									<u-icon name="rewind-left-fill" color="#fff" size="28"></u-icon>
								</view>
								<view class="btn play" @tap="musicTypeFn">
									<block v-if="innerAudioContext.paused">
										<u-icon name="play-right-fill" color="#8F98A1" size="28"></u-icon>
									</block>
									<block v-else>
										<u-icon name="pause" color="#fff" size="28"></u-icon>
									</block>
								</view>
								<view class="btn" @tap="changeMusic('add')">
									<u-icon name="rewind-right-fill" color="#fff" size="28"></u-icon>
								</view>
							</view>
							<view class="slider">
								<u-slider v-model="currentDuration" :step="1" :min="0" @change="changeDuration"
									@changing="changingDuration" :max="Number(currentTolalDuration)"></u-slider>
								<view>{{formTime(currentDuration)}}/{{formTime(currentTolalDuration)}}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="header-list">
				<view class="header-frame">
					<view class="header-title">
						<view class="header-img">
							<image src="/static/image/1.png" mode="heightFix"></image>
						</view>
						<!-- <view class="meun-icon">
							<image src="/static/image/meun.png" mode="widthFix"></image>
						</view> -->
					</view>
					<view class="play-list" :style="{height:`calc(${content_height - statusBarHeight}px - 310rpx - 170rpx)`}">
						<block v-for="(item,index) in musicList" :key="index">
							<view class="play-item" :class="{activePlay:index==currentIndex}" @tap="changePlay(item,index)">
								<view class="item-icon">
									<block v-if="index==currentIndex">
										<u-icon name="pause" color="#8F98A1" size="28"></u-icon>
									</block>
									<block v-else>
										<u-icon name="play-right-fill" color="#8F98A1" size="28"></u-icon>
									</block>
								</view>
								<view class="item-box">
									<view class="item-name">{{item.name}}</view>
									<view class="item-tip">{{item.singer}}</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="main-footer">
			<swiper class="swiper" :current="currentSwiper" :duration="500">
				<block v-for="(item,index) in Math.ceil(list.length / 6)" :key="index">
					<swiper-item>
						<view class="swiper-list">
							<block v-for="(itm,indx) in list" :key="index+''+indx">
								<view class="swiper-box" @tap="openBluetooth(itm)" v-if="indx+1 > (index*6) && indx+1 <= (index+1)*6">
									<view class="swiper-image">
										<image :src="itm.img" mode="widthFix"></image>
									</view>
									<view class="slider-name">{{itm.name}}</view>
								</view>
							</block>
						</view>
					</swiper-item>

				</block>
			</swiper>
			<view class="footer-btn left-btn" @tap="changeSwiper('minus')"><u-icon name="arrow-left" color="#fff"
					size="40"></u-icon></view>
			<view class="footer-btn right-btn" @tap="changeSwiper('add')"><u-icon name="arrow-right" color="#fff"
					size="40"></u-icon></view>
		</view>
		<view class="popup">
			<u-popup :show="show" @close="close" @open="open" round="40rpx">
				<view class="popup-content">
					<view class="popup-frame">
						<view class="popup-image">
							<image src="/static/image/6.jpg" mode="widthFix"></image>
						</view>
						<view class="popup-info">
							<view class="popup-item">
								<view class="popup-tip">藍牙名稱：</view>
								<view class="popup-name">Remix</view>
							</view>
							<view class="popup-item">
								<view class="popup-tip">藍牙型號：</view>
								<view class="popup-name">Sunjom</view>
							</view>
							<view class="popup-item">
								<view class="popup-tip">藍牙尺寸：</view>
								<view class="popup-name">13mm</view>
							</view>
							<view class="popup-item">
								<view class="popup-tip">續航時長：</view>
								<view class="popup-name">1-2 hours</view>
							</view>
							<view class="popup-item">
								<view class="popup-tip">充电端口类型：</view>
								<view class="popup-name">Type C</view>
							</view>
							<view class="popup-item">
								<view class="popup-tip">藍牙版本：</view>
								<view class="popup-name">5.3</view>
							</view>
						</view>
					</view>
					<view class="bluetooth-btn">
						<view class="btn">連接藍牙</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import httpApi from '@/services/api.js';
	import NavBar from '@/components/nav-bar/nav-bar.vue'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				isDrag: true,
				show: false,
				bluetooth: {},
				musicList: [{
					id: 1,
					name: '熱鐵皮房頂的夏天',
					singer: '王赫野',
					src: '/static/music/1.mp3',
					type: ''
				}, {
					id: 2,
					name: '陽光開朗大男孩',
					singer: '草莓醬紫',
					src: '/static/music/2.mp3',
					type: ''
				}, {
					id: 3,
					name: '冠世一戰',
					singer: '江南大野花',
					src: '/static/music/3.mkv',
					type: 'video'
				}, {
					id: 4,
					name: '熱鐵皮房頂的夏天',
					singer: '王赫野',
					src: '/static/music/1.mp3',
					type: ''
				}, {
					id: 5,
					name: '陽光開朗大男孩',
					singer: '草莓醬紫',
					src: '/static/music/2.mp3',
					type: ''
				}, {
					id: 6,
					name: '冠世一戰',
					singer: '江南大野花',
					src: '/static/music/3.mkv',
					type: 'video'
				}, {
					id: 7,
					name: '冠世一戰',
					singer: '江南大野花',
					src: '/static/music/3.mkv',
					type: 'video'
				}],
				currentPlay: {

				},
				currentIndex: -1,
				currentTolalDuration: 0,
				currentDuration: 0,
				currentSlider: 0,
				list: [{
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}, {
					name: 'Remix',
					img: '/static/image/2.png'
				}],
				currentSwiper: 0,
				content_height: 0,
				currentDevice: {},
				innerAudioContext: null,
				timeId: null
			}
		},
		computed: {
			...mapState(['statusBarHeight', 'isShowMore', 'token', 'language']),
			languageTypeName() {
				return (name) => {
					if (name) {
						return name + this.language
					} else {
						return '-'
					}
				}
			},
			formTime() {
				return (time) => {
					let date = new Date(time * 1000); // 秒转换为毫秒
					let minutes = date.getUTCMinutes();
					let secondsInMinutes = date.getUTCSeconds();
					minutes = minutes < 10 ? '0' + minutes : minutes;
					secondsInMinutes = secondsInMinutes < 10 ? '0' + secondsInMinutes : secondsInMinutes;
					return `${minutes}:${secondsInMinutes}`;
				}
			}
		},
		onLoad() {
			// this.searchBle()
			uni.getSystemInfo({
				success: (res) => {
					this.content_height = res.screenHeight
				}
			})
			if (!this.innerAudioContext) {
				this.innerAudioContext = uni.createInnerAudioContext();
			}
			if (this.currentPlay.src) {
				this.playMusic()
			}
		},
		methods: {
			openBluetooth(item) {
				this.bluetooth = {
					...item
				}

				// #ifdef APP-PLUS
				const subNVue = uni.getSubNVueById('popups');
				subNVue.show('slide-in-bottom', 300, () => {
					console.log('subNVue 原生子窗体显示成功');
				})
				// #endif
				// #ifdef H5
				this.show = true
				// #endif
			},
			open() {

			},
			close() {
				this.show = false
			},
			changeSwiper(type) {
				if (type == 'minus') {
					if (this.currentSwiper > 0) {
						this.currentSwiper = this.currentSwiper - 1
					}
				} else if (type == 'add') {
					if (this.currentSwiper < Math.ceil(this.list.length / 6) - 1) {
						this.currentSwiper = this.currentSwiper + 1
					}
				}
			},
			changePlay(item, index) {
				this.currentIndex = index
				this.currentPlay = {
					...item
				}
				if (this.currentPlay.type != 'video') {
					this.playMusic()
				}
			},
			//開始播放
			playMusic() {
				if (this.timeId) {
					clearInterval(this.timeId)
				}
				this.innerAudioContext.src = this.currentPlay.src
				// this.innerAudioContext.play()
				this.innerAudioContext.autoplay = true
				this.isDrag = true
				this.currentDuration = 0
				this.timeId = setInterval(() => {
					// 获取当前播放时间（秒）
					if (this.isDrag) {
						this.currentDuration = this.innerAudioContext.currentTime
					}
					// this.currentDuration = this.innerAudioContext.currentTime
					// console.log('当前播放进度:', this.currentDuration, '秒');
				}, 1000);
				this.innerAudioContext.onCanplay((e) => {
					this.currentTolalDuration = this.innerAudioContext.duration
					// console.log(this.innerAudioContext, this.currentTolalDuration);
				})
				this.innerAudioContext.onEnded((e) => {
					console.log('onEnded', e);
					if (this.timeId) {
						clearInterval(this.timeId)
					}
					this.currentDuration = this.currentTolalDuration
					this.innerAudioContext.pause()
					this.playMusic()
				})
			},
			changeDuration(e) {
				this.innerAudioContext.seek(e)
				this.isDrag = true
			},
			changingDuration(e) {
				this.isDrag = false
			},
			musicTypeFn() {
				if (this.innerAudioContext.paused) {
					this.innerAudioContext.play()
					if (this.currentDuration == this.currentTolalDuration) {
						this.playMusic()
					}
				} else {
					this.innerAudioContext.pause()
				}
			},
			changeMusic(type) {
				if (type == 'minus') {
					if (this.currentIndex <= 0) {
						this.currentIndex = this.musicList.length - 1
					} else {
						this.currentIndex = this.currentIndex - 1
					}
				} else if (type == 'add') {
					if (this.currentIndex >= this.musicList.length - 1) {
						this.currentIndex = 0
					} else {
						this.currentIndex = this.currentIndex + 1
					}
				}
				this.currentPlay = {
					...this.musicList[this.currentIndex]
				}
				if (this.currentPlay.type != 'video') {
					this.playMusic()
				}
			},
			//搜索蓝牙设备
			searchBle() {
				let that = this;
				uni.showToast({
					title: "藍牙搜索中...",
					duration: 3000
				})
				uni.openBluetoothAdapter({ //初始化蓝牙模块
					success: () => {
						console.log("藍牙模塊初始化成功")
						that.onDevice() //监听寻找到新设备的事件
						uni.getBluetoothAdapterState({ //获取本机蓝牙适配器状态
							success: function(res) {
								console.log(res)
								if (res.available) { //蓝牙适配器是否可用
									if (res.discovering) { //是否正在搜索设备
										that.stopFindBule() //如果之前处于搜索状态,停止搜索
									}
									//这里重新开始搜索蓝牙
									//开始搜寻附近的蓝牙外围设备
									console.log("開始搜索附近的藍牙設備")
									uni.startBluetoothDevicesDiscovery({
										success(res) {
											console.log(res)
										}
									})
								} else {
									console.log('藍牙不可用,請檢查藍牙是否開啟')
								}
							},
						})
					},
					fail: err => {
						setTimeout(function() {
							uni.showToast({
								title: "請打開藍牙及定位功能",
								icon: "none"
							})
						}, 1000);
					},
				})
			},
			//监听寻找到新设备的事件
			onDevice() {
				console.log("监听寻找到新设备的事件---------------")
				//监听寻找到新设备的事件
				let timeId = null;
				let that = this;
				// uni.showLoading({
				// 	title: "正在搜索藍牙或設備...",
				// 	mask: true
				// })
				uni.onBluetoothDeviceFound(function(devices) {
					var rez = JSON.parse(JSON.stringify(devices))
					console.log('发现新设备:' + rez.devices[0].name + "(" + rez.devices[0].deviceId + ")")
					console.log(rez, rez.devices);
					let name = rez.devices[0].name
					// if (name != "未知设备" && name == 'Printer001') {
					// if (name == "Printer001") {
					// if (name == '80HB6' || name == "Printer001") {
					// 	clearTimeout(timeId)
					// 	timeId = null
					// 	uni.hideLoading()
					// 	let deviceId = rez.devices[0].deviceId
					// 	//连接指定设备
					// 	that.stopFindBule()
					// 	uni.showLoading({
					// 		title: "正在連接藍牙設備...",
					// 		mask: true
					// 	})
					// 	uni.createBLEConnection({ //连接低功耗蓝牙设备
					// 		deviceId: deviceId,
					// 		timeout: 20000,
					// 		success: (create_res) => {
					// 			console.log("連接藍牙-[ ]--成功")
					// 			setTimeout(function() {
					// 				uni.getBLEDeviceServices({
					// 					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					// 					deviceId: deviceId,
					// 					success(res) {
					// 						console.log(res, 'res')
					// 						for (var s = 0; s < res.services.length; s++) {
					// 							console.log('服務是否主服務' + res.services[s].isPrimary)
					// 							if (!res.services[s].isPrimary) return

					// 							let serviceId = res.services[s].uuid
					// 							uni.getBLEDeviceCharacteristics({ //获取蓝牙设备某个服务中所有特征值(characteristic)
					// 								// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					// 								deviceId: deviceId,
					// 								// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					// 								serviceId: serviceId,
					// 								success(res) {
					// 									var re = JSON.parse(JSON.stringify(res))
					// 									//console.log('deviceId = [' + deviceId + ']  serviceId = [' + serviceId + ']')
					// 									let services = []
					// 									for (var c = 0; c < re.characteristics.length; c++) {
					// 										if (re.characteristics[c].properties.write == true) {
					// 											let uuid = re.characteristics[c].uuid
					// 											//将当前连接设备的可用服务特征值,记录下来
					// 											services.push({
					// 												name,
					// 												serviceId: serviceId,
					// 												characteristicId: uuid
					// 											})
					// 										}
					// 									}
					// 									let currDev = {}
					// 									if (services.length) {
					// 										currDev.deviceId = deviceId
					// 										currDev.serviceId = services[0].serviceId
					// 										currDev.characteristicId = services[0].characteristicId
					// 										//缓存获取到设备的可用信息,方便其他页面重新连接
					// 										uni.setStorageSync('bluetooth_device', currDev);
					// 										uni.showToast({
					// 											title: "藍牙設備連接成功!",
					// 											icon: "none"
					// 										})
					// 									}
					// 									uni.hideLoading()
					// 								},
					// 								fail(err) {
					// 									console.log(err);
					// 									uni.hideLoading()
					// 									uni.showToast({
					// 										title: "藍牙設備連接失敗,請重試!",
					// 										icon: "none"
					// 									})
					// 								}
					// 							})
					// 						}
					// 					},
					// 					fail(res) {
					// 						console.log(res)
					// 						uni.hideLoading()
					// 						uni.showToast({
					// 							title: "藍牙設備連接失敗,請重試!",
					// 							icon: "none"
					// 						})
					// 					},
					// 				})
					// 			}, 2000)

					// 			//连接成功 关闭搜索
					// 			// stopFindBule()
					// 		},
					// 		fail: err => {
					// 			console.log(err, '------')
					// 			uni.hideLoading()
					// 			uni.showToast({
					// 				title: "藍牙設備連接失敗,請重試!",
					// 				icon: "none"
					// 			})
					// 		}
					// 	})
					// 	// setTimeout(() => {
					// 	// 	uni.hideLoading()
					// 	// }, 20000)
					// } else {
					// 	if (!timeId) {
					// 		timeId = setTimeout(() => {
					// 			uni.hideLoading()
					// 			uni.showToast({
					// 				title: "未能搜索到藍牙或設備...",
					// 				icon: 'error',
					// 				mask: true
					// 			})
					// 			that.stopFindBule()
					// 			timeId = null
					// 		}, 20000)
					// 	}
					// }
				})
			},
			//关闭搜索
			stopFindBule() {
				console.log("停止搜寻附近的蓝牙外围设备---------------")
				uni.stopBluetoothDevicesDiscovery({
					success(res) {
						console.log(res)
					}
				})
			},
			// 断开当前连接的蓝牙设备
			disconnectCurrentDevice() {
				if (currentDevice) {
					uni.closeBLEConnection({
						deviceId: currentDevice.deviceId,
						success: function(res) {
							console.log('Disconnected from current device', res);
							currentDevice = null;
						},
						fail: function(err) {
							console.error('Failed to disconnect from current device', err);
						}
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.main {
		.main-header {
			display: flex;

			.header-video {
				flex: 1;

				.video {
					width: 100%;
				}

				.header-music {
					position: relative;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					// background: #000;

					.musice-img {
						width: 300rpx;

						image {
							width: 100%;
						}
					}

					.music-widget {
						position: absolute;
						bottom: 0;
						width: 100%;
						height: 100rpx;
						display: flex;
						align-items: center;
						padding: 0 30rpx;
						background: #000;


						.music-btns {
							display: flex;
							align-items: center;
							margin-right: 30rpx;

							.btn {
								width: 60rpx;
								height: 60rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								border-radius: 50%;
								border: 1px solid #fff;
							}

							.play {
								width: 70rpx;
								height: 70rpx;
								margin: 0 20rpx;
							}
						}

						.slider {
							width: 100%;
							display: flex;
							align-items: center;
							color: #fff;

							::v-deep .u-slider {
								flex: 1;

								.uni-slider-thumb {
									left: 0%;
								}
							}
						}
					}
				}

			}

			.header-list {
				width: 600rpx;
				height: 100%;
				padding: 10rpx 10rpx 0;

				.header-frame {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;
					background: #EDF2F5;
				}

				.header-title {
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;

					.header-img {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 120rpx;

						image {
							height: 100%;
						}
					}

					.meun-icon {
						width: 60rpx;
						padding: 10rpx;
						border-radius: 12rpx;
						background: #4C3EC9;

						image {
							width: 100%;
						}
					}



				}

				.play-list {
					overflow-y: auto;

					.play-item {
						display: flex;
						align-items: center;
						padding: 20rpx 30rpx;
						margin-bottom: 20rpx;
						border-radius: 100rpx 16rpx 16rpx 100rpx;
						background: #F4F8FB;

						.item-icon {
							width: 60rpx;
							height: 60rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 30rpx;
							border-radius: 50%;
							background: #fff;
							border: 1px solid #ccc
						}

						.item-box {
							.item-name {}

							.item-tip {}
						}
					}

					.activePlay {
						background: #DEA3D4;
					}
				}


			}
		}

		.main-footer {
			position: relative;
			height: 300rpx;
			padding: 0 100rpx;

			.swiper-list {
				display: flex;

				.swiper-box {
					width: 16.66%;
					min-width: 220rpx;
					padding: 0 10rpx;

					.swiper-image {
						display: flex;
						justify-content: center;
						margin-bottom: 20rpx;

						image {
							width: 220rpx;
						}
					}

					.slider-name {
						font-size: 42rpx;
						text-align: center;
						color: #DEA3D4;
					}
				}
			}

			.footer-btn {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 70rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				background: #848484;
			}

			.left-btn {
				left: 15rpx;
			}

			.right-btn {
				right: 15rpx;
			}
		}

		.popup {
			::v-deep .u-transition {
				z-index: 999 !important;
			}

			.popup-content {
				position: relative;
				height: 780rpx;
				padding: 40rpx 80rpx;

				.popup-frame {
					display: flex;

					.popup-image {
						width: 600rpx;
						margin-right: 60rpx;

						image {
							width: 100%;
						}
					}

					.popup-info {
						max-height: 600rpx;
						overflow-y: auto;

						.popup-item {
							display: flex;
							margin-bottom: 10rpx;
							font-size: 32rpx;

							.popup-tip {
								width: 240rpx;
							}

							.popup-name {}
						}
					}
				}

				.bluetooth-btn {
					margin-top: 20rpx;
					display: flex;
					justify-content: flex-end;

					.btn {
						padding: 20rpx 40rpx;
						border-radius: 16rpx;
						color: #fff;
						background: #4C3EC9;
					}
				}
			}
		}
	}
</style>
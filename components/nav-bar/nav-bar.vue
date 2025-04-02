<template>
	<view class="nav-bar">
		<view :style="{height: statusBarHeight+'px',background:'#53ba47'}"></view>
		<view class="nav-box">
			<view class="bars" v-if="isShowMenuBtn" @tap="changeMore"><uni-icons type="bars" size="48rpx"></uni-icons></view>
			<view class="bars" v-else>
				<block v-if="isShowBackBtn">
					<uni-icons @tap="goBack" color="#000" type="left" size="40rpx"></uni-icons>
				</block>
			</view>
			<slot name="content">
				<view class="nav-title">{{title}}</view>
				<view class="search" v-if="isShowSearch">
					<image style="width: 40rpx;" @tap="goSearch" src="../../static/image/search.png" mode="widthFix"></image>
				</view>
			</slot>
		</view>
		<!-- <view class="drawer" v-show="" @tap="changeMore">
			
		</view> -->
		<view class="popup">
			<u-popup :show="isShowMore" mode="left" @close="close" @open="open" round="40rpx">
				<view class="drawer-content" :style="{paddingTop:statusBarHeight + 'px'}" @tap.stop="">
					<view class="drawer-nav">
						<view class="drawer-title" @tap="back">{{$t('return_to_homepage')}} <u-icon name="arrow-right"
								color="#68C5D6" size="32"></u-icon>
						</view>
					</view>
					<view class="drawer-sub" @tap="goPage('/pages/edit-langurage/edit-langurage')">
						<view class="image-icon">
							<image src="../../static/langurage.png" mode="widthFix"></image>
						</view> {{$t('languages')}}
					</view>
					<view class="drawer-sub" @tap="goPage('/pages/privacy-policy/privacy-policy')">
						<view class="image-icon">
							<image src="../../static/privacy_policy.png" mode="widthFix"></image>
						</view>{{$t('privacy_policy')}}
					</view>
					<view class="drawer-sub" @tap="goPage('/pages/contact-us/contact-us')">
						<view class="image-icon">
							<image src="../../static/contact_us.png" mode="widthFix"></image>
						</view>{{$t('contact_us')}}
					</view>
					<view class="drawer-sub" @tap="goPage('/pages/enterprise-users/enterprise-users')">
						<view class="image-icon">
							<image src="../../static/enterprise_users.png" mode="widthFix"></image>
						</view>{{$t('enterprise_user')}}
					</view>
					<view class="drawer-sub" @tap="goPage('/pages/environmental-protection/environmental-protection')">
						<view class="image-icon">
							<image src="../../static/environmental_protection.png" mode="widthFix"></image>
						</view>{{$t('save_the_environment')}}
					</view>
					<view class="drawer-sub" @tap="goPage('/pages/screen-inspection/screen-inspection')">
						<view class="image-icon">
							<image src="../../static/icon_onlive.png" mode="widthFix"></image>
						</view>{{$t('monitor_checking')}}
					</view>
					<view class="drawer-sub" @tap="goPage('/pages/qrcode/qrcode')">
						<view class="image-icon">
							<image src="../../static/qrcode.png" mode="widthFix"></image>
						</view>QRCODE({{$t('hk_only')}})
					</view>

					<view class="nav-logo">
						<image src="../../static/image/logo.png" mode="widthFix"></image>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "nav-bar",
		props: {
			title: {
				type: String,
				default: ''
			},
			isShowMenuBtn: {
				type: Boolean,
				default: true
			},
			isEmitBack: {
				type: Boolean,
				default: false
			},
			isShowSearch: {
				type: Boolean,
				default: false
			},
			isShowBackBtn: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false,
				navList: [],
			};
		},
		computed: {
			...mapState(['statusBarHeight', 'isShowMore', 'token']),
		},
		methods: {
			...mapMutations(['editShowMore']),
			open() {

			},
			close() {
				this.editShowMore(false)
			},
			changeMore() {
				this.editShowMore(true)
			},
			back() {
				this.editShowMore(false)
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			goBack() {
				if (this.isEmitBack) {
					this.$emit('gotoBack')
				} else {
					uni.navigateBack()
				}
			},
			goPage(url) {
				this.editShowMore(false)
				uni.navigateTo({
					url
				})
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		color: #212121;
		background: #F6FBF5;
		z-index: 100;

		.nav-box {
			display: flex;
			align-items: center;
			height: 100rpx;
			padding: 0 20rpx;
			font-size: 36rpx;

			.bars {
				position: relative;
				top: 4rpx;
				flex-shrink: 0;

				::v-deep .uniui-bars,
				.uniui-left,
				.uniui-closeempty {
					color: #68C5D6 !important;
				}

			}

			.nav-title {
				padding: 0 15rpx;
				flex: 1;
			}

			.search {
				text-align: right;
				width: 80rpx;
				flex-shrink: 0;

				image {
					width: 100%;
				}
			}
		}
	}

	.popup {
		::v-deep .u-transition {
			z-index: 999 !important;
		}
	}

	// .drawer {
	// 	position: fixed;
	// 	top: 0;
	// 	right: 0;
	// 	left: 0;
	// 	bottom: 0;
	// 	background: rgba(0, 0, 0, .7);
	// 	z-index: 999;

	.drawer-content {
		position: relative;
		// width: 60%;
		width: 450rpx;
		height: 100%;
		background: #fff;

		.drawer-nav {
			.drawer-title {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding: 10rpx;
				color: #ff0000;
			}
		}

		.drawer-sub {
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			height: 80rpx;
			font-size: 30rpx;
			border-bottom: 2rpx solid #f2f2f2;

			.image-icon {
				flex-shrink: 0;
				width: 40rpx;
				margin-right: 20rpx;

				image {
					width: 100%;
				}
			}
		}

		.nav-logo {
			position: absolute;
			left: 50%;
			bottom: 100px;
			transform: translateX(-50%);

			image {
				width: 200rpx;
			}
		}
	}

	// }
</style>
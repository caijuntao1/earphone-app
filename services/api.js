import {
	httpRequest,
	httpTokenRequest
} from "./request.js";

export default {
	// httpTokenRequest
	// httpRequest

	//創建訂單
	createTradeSubmissionOrder: data => httpRequest({
		url: '/v1/TradeSubmission/createOrder',
		method: 'POST'
	}, data),
	//綁定訂單
	bindingOrder: data => httpRequest({
		url: '/v1/TradeSubmission/bindingOrder',
		method: 'POST'
	}, data),
	//獲取報價
	getEstimatedPrice: data => httpRequest({
		url: '/v1/TradeSubmission/estimatedPrice',
		method: 'POST'
	}, data),

	//獲取列表
	getDevicesList: params => httpRequest({
		url: '/v1/Devices/getList',
		method: 'GET'
	}, params),
	//獲取品牌列表
	getDevicesBrandList: params => httpRequest({
		url: '/v1/DevicesBrand/getList',
		method: 'GET'
	}, params),
	//獲取類別列表
	getDevicesCategoryList: params => httpRequest({
		url: '/v1/DevicesCategory/getList',
		method: 'GET'
	}, params),
	//獲取型號列表
	getModelList: params => httpRequest({
		url: '/v1/Devices/getModelList',
		method: 'GET'
	}, params),
	//獲取設備問題列表
	getQuestionList: params => httpRequest({
		url: '/v1/Devices/getQuestionList',
		method: 'GET'
	}, params),
	//獲取送貨地區列表(按國家)
	getShippingAreaList: params => httpRequest({
		url: '/v1/Order/getShippingAreaList',
		method: 'GET'
	}, params),
	//獲取驗證碼(綁定訂單)
	getVerificationCode: params => httpRequest({
		url: '/v1/TradeSubmission/getVerificationCode',
		method: 'GET'
	}, params),
	//獲取驗證碼(驗證訂單)
	getOrderVerificationCode: params => httpRequest({
		url: '/v1/TradeSubmission/getOrderVerificationCode',
		method: 'GET'
	}, params),
	//獲取門店詳情(掃碼)
	searchDetail: params => httpRequest({
		url: '/v1/Branch/searchDetail',
		method: 'GET'
	}, params),
	//獲取Banner(根據id)
	getWebsiteBannerDetail: params => httpRequest({
		url: '/v1/Website/getWebsiteBannerDetail',
		method: 'GET'
	}, params),

	//獲取走馬燈內容
	getAppCarouselContent: params => httpRequest({
		url: '/v1/AppCarouselContent/getDetail/' + params.id,
		method: 'GET'
	}, params),
	getArticleTerms: params => httpRequest({
		url: '/v1/Article/getDetail/' + params.id,
		method: 'GET'
	}, params),


	//獲取價格預覽
	getPriceSummary: data => httpRequest({
		url: '/v1/Order/getPriceSummary',
		method: 'POST'
	}, data),
	//獲取分类
	// /Product/categoryList
	getCategoryList: params => httpRequest({
		url: '/v1/Product/categoryGroupList',
		method: 'GET'
	}, params),
	//獲取品牌
	getBrandList: params => httpRequest({
		url: '/v1/Product/brandList',
		method: 'GET'
	}, params),
	//獲取商品
	getList: params => httpRequest({
		url: '/v1/Product/list',
		method: 'GET'
	}, params),
	// 獲取商品詳情
	getProductDetail: params => httpRequest({
		url: `/v1/Product/detail/${params.id}`,
		method: 'GET'
	}),
	// 獲取商品規格價格
	getItemDetails: data => httpRequest({
		url: `/v1/Product/itemDetail/${data.id}`,
		method: 'POST'
	}, data),
	//獲取地區列表
	getNationList: params => httpRequest({
		url: '/v1/Nation/getList',
		method: 'GET'
	}, params),
	//獲取地區列表
	getBranchList: params => httpRequest({
		url: '/v1/Branch/getList',
		method: 'GET'
	}, params),
	//獲取Banner列表
	getWebsiteBanner: params => httpRequest({
		url: '/v1/Website/getWebsiteBanner',
		method: 'GET'
	}, params),
	// 创建订单
	createOrder: data => httpRequest({
		url: '/v1/Order/createOrder',
		method: 'POST'
	}, data),
	//獲取订单詳情
	getOrderDetail: params => httpRequest({
		url: '/v1/Order/getDetail',
		method: 'GET'
	}, params),
	//查找訂單詳情
	searchOrderDetail: params => httpRequest({
		url: '/v1/Order/searchDetail',
		method: 'GET'
	}, params),

}
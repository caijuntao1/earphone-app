import Vue from 'vue';
import VueI18n from 'vue-i18n'
import en from '../langurage/en'
import zh from '../langurage/zh'
import sc from '../langurage/sc'

Vue.use(VueI18n)

// 组合语言包对象
const messages = {
	en,
	zh,
	sc
}

// 创建实例对象
const i18n = new VueI18n({
	messages,
	locale: 'zh'
})

export default i18n;
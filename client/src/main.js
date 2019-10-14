import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyFilter from '@/common/filter'


Vue.config.productionTip = false

for (let key in MyFilter) {
  Vue.filter(key, MyFilter[key])
}

// css样式还是需要全部引入
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'
Vue.use(element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

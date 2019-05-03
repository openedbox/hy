import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueMqtt from 'vue-mqtt'
import VeLine from 'v-charts/lib/line.common'

Vue.use(VueMqtt, 'wss://m16.cloudmqtt.com', 
                {
                  clientId: 'IOT-' + parseInt(Math.random() * 100000),
                  username:'amgedtgs',
                  password:'mXKADFpMY1EM',
                  port: 38958
                })

Vue.config.productionTip = false
Vue.use(Antd)
Vue.component(VeLine.name, VeLine)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)if(new RegExp("("+ k +")").test(format))
 format = format.replace(RegExp.$1,
 RegExp.$1.length==1 ? o[k] :
 ("00"+ o[k]).substr((""+ o[k]).length));
 return format;
}
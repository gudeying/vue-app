// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'
import AppServerCof from './appServerConfig'

import axios from 'axios'
axios.interceptors.request.use(
  config => {
    /** 给所有的请求都添加token信息
     * token和key虽然存储在localStorage，但是存在过期问题，在程序启动时这样绑定不好
     * 把token信息保存在vuex中，老老实实每次调用附上token
     */
    config.headers.accessKey = AppServerCof.appKey;
    config.headers.accessToken = AppServerCof.appSecret;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)
Vue.prototype.$axios = axios

Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueCookies)
Vue.prototype.checkLogin = (showToast) => {
  // localStorage.setItem()不会把json转为string，存储的时候最好使用JSON.stringefy()将对象转为string存储。
  let LoginInfo = localStorage.getItem('geeklemon-login-info');
  try {
    if (Boolean(LoginInfo)) {
      let isLogin = true;
      LoginInfo = JSON.parse(LoginInfo);
      let {
        user,
        openId,
        timestamp,
        msg
      } = LoginInfo;

      let now = new Date().getTime;
      let timeDiff = now - timestamp;
      let day = Math.floor(timeDiff / (24 * 3600 * 1000)); //天数

      if (day > 30) {
        localStorage.setItem('geeklemon-login-info', null);
        isLogin = false;
        msg = "登陆信息过期";
        user = null;
        openId = '';
      }
      return {
        "isLogin": isLogin,
        "user": user,
        "openId": openId,
        "timestamp": '',
        "msg": msg
      }
    }
  } catch (e) {

  }
  if (showToast) {
    // 提示未登录
  }
  return {
    "isLogin": false,
    "user": "",
    "openId": ""
  };
}
router.beforeEach((to, from, next) => {
  // 不需要
  console.log("拦截登陆");
  next();
});
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created() {
    this.checklogin();
    this.getAppTheme();
  },
  methods: {
    /**
     * 初始化登陆状态，在主组建中初始化就行了，vuex刷新会改变，但是vue之间的跳转是不会改变的。
     */
    checklogin() {
      let {
        isLogin,
        use,
        openId
      } = this.checkLogin();
      if (Boolean(islogin)) {
        let loginState = {
          isLogin: true,
          openId: openId,
          user: user
        }
        this.$store.commit('changeLoginState', loginState);
        console.log("已登录:" + loginState.user);
        return;
      }
      console.log("未登陆");
    },
    /**
     * 获取浏览器cookie的主题颜色。
     */
    getAppTheme() {
      let theme = this.$cookies.get('geeklemon-app-theme');
      if (Boolean(theme)) {
        let index = 2;
        try {
          index = parseInt(theme);
        } catch (e) {
          index = 2;
        }
        if (index) {
          this.$store.commit('changeTheme', index);
        }
      }
    },
    checkAccessInfo() {
      let info = localStorage.getItem("geeklemon-ascessInfo");
      try {
        if (info) {
          let {
            accessKey,
            accessToken,
            timestamp
          } = JSON.parse(info);
          let now = new Date().getTime();
          let diff = now - timestamp;
          if (diff / (24 * 3600 * 1000) > 1) {
            // 后台控制1天过期
            getAccessInfo();
          }else{
            this.$store.commit('vauleAccessInfo', accessInfo);
          }

          return;
        }
      } catch (e) {
        console.log("checkAccess err:" + JSON.stringify(e));
      }
      getAccessInfo()
    },
    getAccessInfo() {
      // 获取accessKey和accessToken
      let appKeyAndSecret = new URLSearchParams();
      appKeyAndSecret.append("appKey",AppServerCof.appKey);
      appKeyAndSecret.append("appSecret",AppServerCof.appSecret);
      let accessInfo = await this.$axios.post('/app/api/accessToken',appKeyAndSecret);
      this.$store.commit('vauleAccessInfo', accessInfo);
      let accessInfoStr = JSON.stringify(accessInfo);
      localStorage.setItem(accessInfoStr);
    }

  },
})

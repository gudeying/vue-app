
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default  new Vuex.Store({
    state:{
        theme:{color:'cyan'},
        themeColors:['primary','pink','cyan','indigo','lime','gary'],//提供几种主题色
        loginState:{
            isLogin:false,
            openId:"",
            user:""
        },
        title:"geeklemon",
        accessInfo:{"accessKey":null,"accessToken":null,"timestamp":null}
    },
    mutations:{
        changeTheme(state,index){
            state.theme.color=state.themeColors[index];
        },
        changeLoginState(state,newState){
            state.loginState=newState;
        },
        changeTitle(msg){
            state.title=msg;
        },
        valueAccessInfo(accessInfo){
            state.accessInfo=accessInfo;
        }
    }

})
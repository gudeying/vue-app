
<template>
  <v-navigation-drawer id="appDrawer" :mini-variant.sync="mini" fixed dakr app v-model="drawer">
    <v-toolbar :color="theme.color" dark>
      <!-- <img src="@/assets/logo.png" width="24" height="24"/> -->
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down white--text">geeklemon</span>
      </v-toolbar-title>
    </v-toolbar>
    <template>
      <v-list>
        <v-list-tile to="/index">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Home
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="toogleLoginMudal">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>登陆</v-list-tile-title>
        </v-list-tile>

        <v-list-tile to="/article/list">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            articles
          </v-list-tile-title>
        </v-list-tile>

        <v-list-group prepend-icon="account_circle" value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Users</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-group no-action sub-group value="true">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Admin</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile v-for="(admin, i) in admins" :key="i" @click>
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group sub-group no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Actions</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(crud, i) in cruds" :key="i" @click>
              <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </template>

    <!-- login mudal -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">登陆</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="userName"  prepend-icon="account_circle" :counter="10" label="userName" hint="输入登录名"></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="password"  prepend-icon="lock" label="Password*" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small v-show="loginErrShow">error message</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="login">login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "drawer",
  data() {
    return {
      mini: false, //侧边栏最小化
      drawer: true, //
      Index: "/index", //主页跳转
      dialog: false, //登陆模态框
      userName: "", //登录名
      password: "", //登陆密码
      loginErrShow:false,
      loginErrMsg: "", //登陆出错信息
      theme: this.$store.state.theme, //app主题
      admins: [["Management", "people_outline"], ["Settings", "settings"]],
      cruds: [
        ["Create", "add"],
        ["Read", "insert_drive_file"],
        ["Update", "update"],
        ["Delete", "delete"]
      ]
    };
  },
  created() {
    window.getVue.$on("DRAWER_TOGGLED", () => {
      this.drawer = !this.drawer;
    });
  },
  methods: {
    toogleLoginMudal() {
      this.dialog = !this.dialog;
    },
    login() {
      this.toogleLoginMudal();
      //todo 后台登陆获取用户信息
      let loginInfo = "2"+":"+this.userName;
      this.$cookies.set("geeklemon-login-user", loginInfo, 60 * 60 * 2); //一小时有效
      let loginState = { isLogin: false, openId: "2", user: userName };
      this.$store.commit("changeLoginState", loginState);
    }
  }
};
</script>
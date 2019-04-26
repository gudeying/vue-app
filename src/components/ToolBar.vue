<template>
  <v-toolbar dark :color="theme.color" fixed app>
    <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-text-field
      v-show="showSearchBool"
      flat
      hide-details
      solo-inverted
      prepend-inner-icon="search"
      class="hidden-sm-and-down"
      v-model="searchKey"
      @keyup.enter="submit"
    ></v-text-field>
    <v-btn icon>
      <v-icon @click="toogleSearch">search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon @click="refresh">refresh</v-icon>
    </v-btn>
    <!-- 主题选择 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">主题</v-btn>
      </template>
      <v-list>
        <v-list-tile  @click="darkTheme">
          <v-list-tile-content><v-list-tile-title >夜间切换</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <div v-for="(item, index) in themeColors" :key="index" @click='changeTheme(index)'>
        <v-list-tile  :class=item >
          <v-list-tile-content><v-list-tile-title >{{ item }}</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        </div>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
export default {
  name: "toolbar",
  methods: {
    refresh() {
      alert("刷新");
    },
    search() {
      alert("搜索");
    },
    submit(value) {
      alert();
    },
    darkTheme(){
       window.getVue.$emit("THEME-DARK");
       //this.changeTheme(5);
    },
    handleDrawerToggle() {
      window.getVue.$emit("DRAWER_TOGGLED"); //触发侧边栏菜单，事件注册在 NavgationDrawer
    },
    toogleSearch() {
      this.showSearchBool = !this.showSearchBool;
    },
    changeTheme(index){
      console.log(index)
      this.$cookies.set('geeklemon-app-theme',index,60 * 60 * 24 * 30);
      this.$store.commit('changeTheme', index);
    }
  },
  data() {
    return {
      title: "文章标题",
      showSearchBool: false,
      searchKey: "",
      theme: this.$store.state.theme,
      themeColors: this.$store.state.themeColors
    };
  }
};
</script>
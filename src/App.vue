<template>
  <v-app :dark="themeDark">
    <drawer></drawer>
    <toolbar></toolbar>
    <v-content>
      <v-touch v-on:swiperight="swiperleft" class="wrapper">
      <router-view/>
      </v-touch>
    </v-content>
    <footer></footer>
  </v-app>
</template>

<script>
import Drawer from "@/components/NavgationDrawer";
import ToolBar from "@/components/ToolBar";
import Footer from "@/components/Footer";

export default {
  components: {
    Drawer,
    toolbar: ToolBar,
    Footer
  },
  data() {
    return {
      themeDark: false
    };
  },
  created() {
    window.getVue = this;
    window.getVue.$on("THEME-DARK", () => {
      this.themeDark = !this.themeDark;
    });
    // checklogin();
  },
  methods:{
    swiperleft(){
      this.$router.back()
    }
  },
  name: "App"
};
</script>

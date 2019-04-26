<template>
  <v-container grid-list-xl fluid id="detail">
    <v-layout row wrap></v-layout>
    
    <div v-html="content"></div>
    <div>评论</div>
    <v-card>
      <v-card-title>
        时间某人回复某人
      </v-card-title>
      <v-card-text>评论内容</v-card-text>
    </v-card>
    <v-flex  offset-(xs5 | md2 | lg5)>
    <v-btn  offset-3 fab
        fixed
        bottom
        left color="primary">
      <v-icon dark @click="pageBack">arrow_back</v-icon>
    </v-btn>
    </v-flex>
    <v-speed-dial
  
        fixed
        bottom=true
        left=true
        direction="top"
        open-on-hover=true
       
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
            @click="starArticle"
          >
            <v-icon>account_circle</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
         
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-speed-dial>
  </v-container>
</template>
<script>
export default {
    name:'detail',
    data(){
        return {
            articleList:[],
            // content:this.$route.params.id,
            content:'<p style="text-align: center;"><br/></p><p style="text-align: center;"><span style="font-family: 黑体, SimHei;">今天分享的是日本“花团”（FLOWER）的秋风のアンサー </span>。</p><p><br/></p><p style="text-align: center;"><iframe frameborder="no" width="330" height="86" src="//music.163.com/outchain/player?type=2&id=447926819&auto=0&height=66"></iframe><br/></p><blockquote><h4 style="text-align: center; margin-top: 5px;"><span style="font-family: 楷体, 楷体_GB2312, SimKai;">秋天的风真是不可思议啊，让我变得坦率。已经回不去了。<br/></span></h4><h4 style="text-align: center; margin-top: 5px;"><span style="font-family: 楷体, 楷体_GB2312, SimKai;">在你还不知道的时候，紧紧拥抱你，这样才能永远看到你的背。<br/></span></h4><p style="text-align: center;"><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><img src="/image/20171004/1507098998463049870.png" title="1507098998463049870.png" alt="1507098998463049870.png" width="300" height="160" style="width: 300px; height: 160px;"/></span></p><h4 style="text-align: center; margin-top: 5px;"><span style="font-family: 楷体, 楷体_GB2312, SimKai;">呐，好想哭，蔚蓝的天空像要燃烧一样，到处蔓延着红色的晚霞。<br/></span></h4><h4 style="text-align: center; margin-top: 5px;"><span style="font-family: 楷体, 楷体_GB2312, SimKai;">喂，我们约定吧，在那失眠的慢慢长夜里，在我入睡之前，请你一直陪伴在我的身边。</span><br/></h4><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><br/></span></p><p><span style="font-family: 楷体, 楷体_GB2312, SimKai;"></span></p><section style="background-color: rgb(255, 255, 255); box-sizing: border-box;"><section class="Powered-by-XIUMI V5" style="position: static; box-sizing: border-box;"><section class="" style="margin-top: 10px; margin-bottom: 10px; position: static; box-sizing: border-box;"><section class="" style="margin-bottom: -12px; text-align: center; box-sizing: border-box;"><section style="display: inline-block; vertical-align: bottom; width: 6px; box-sizing: border-box;"><section style="width: 2px; margin: auto; height: 16px; background-color: rgb(17, 19, 22); box-sizing: border-box;"></section><section style="width: 6px; height: 6px; border-radius: 50%; background-color: rgb(17, 19, 22); box-sizing: border-box;"></section></section><section style="display: inline-block; vertical-align: bottom; width: 60%; box-sizing: border-box;"></section><section style="display: inline-block; vertical-align: bottom; width: 6px; box-sizing: border-box;"><section style="width: 2px; margin: auto; height: 16px; background-color: rgb(17, 19, 22); box-sizing: border-box;"></section><section style="width: 6px; height: 6px; border-radius: 50%; background-color: rgb(17, 19, 22); box-sizing: border-box;"></section></section></section><section class="" style=" transform: rotate(0deg); -webkit-transform: rotate(0deg); -moz-transform: rotate(0deg); -o-transform: rotate(0deg); margin-bottom: -5px; width: 5px; height: 5px; background-color: rgb(254, 255, 255); box-sizing: border-box;"></section><section class="" style="border-left: 5px solid rgb(255, 222, 3); border-bottom: 5px solid rgb(255, 222, 3); border-top-color: rgb(255, 222, 3); border-right-color: rgb(255, 222, 3); box-sizing: border-box;"><section class="" style="background-color: rgb(214, 240, 252); padding: 10px; box-sizing: border-box;"><section class="Powered-by-XIUMI V5" style="box-sizing: border-box;"><section class="" style="position: static; box-sizing: border-box;"><section class="" style="text-align: center; box-sizing: border-box;"><section style="box-sizing: border-box;"><br/></section></section></section></section></section></section><section class="" style="margin-left: auto; margin-top: -5px; width: 5px; height: 5px; background-color: rgb(254, 255, 255); box-sizing: border-box;"><br/></section></section></section></section></blockquote>',
            articleId:this.$route.params.id
        }
    },
    computed(){
// 使用promise获取文章内容
    let articleId = this.$route.params.id;
    },
    mounted(){
        let articleId = this.$route.params.id;
        //获取数据给articleList
        this.getArticleDetail();
    },
    created(){

    },
    methods:{
      pageBack(){
        this.$router.go(-1);
      },
      getArticleDetail(){
        let params = new URLSearchParams();
        params.append('id',this.articleId);
        this.$axios.post('',params).then(result=>{
          
        })
      },
      starArticle(){
        /**收藏文章*/
      }
    }
}
</script>

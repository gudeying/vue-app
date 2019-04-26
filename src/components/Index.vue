<template>
<v-container grid-list-xl fluid>
    
  <v-layout row wrap>
    <v-flex v-for="(item) in articles" xs12 sm4 md4 lg4>
          <v-card>
            <v-img :src=item.src aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                <div>{{ card_text }}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="orange">{{item.title}}</v-btn>
              <v-btn flat color="orange">{{item.subject}}</v-btn>
            </v-card-actions>
          </v-card>
    
    </v-flex>
  </v-layout>
       
</v-container>
</template>
<script>
export default {
    name:'index',
      data () {
      return {
        card_text:'清代女诗人张芬的《虞美人》，题为《寄怀素窗陈妹》，顺读为词，倒读是一首七言律诗。顺读词云：秋声几阵连飞雁，梦断随肠断。欲将愁怨赋歌诗，叠叠竹梧移影、月迟迟。楼高倚望长离别，叶落寒阴结。冷风留得未残灯，静夜幽庭小掩、半窗明。倒读诗云：明窗半掩小庭幽，夜静灯残未得留。风冷结阴寒落叶，别离长望倚高楼。迟迟月影移梧竹，叠叠诗歌赋怨愁。将欲断肠随断梦，雁飞连阵几声秋。',
        articles:[
            {src:"https://cdn.vuetifyjs.com/images/cards/desert.jpg",title:"标题",subject:"分类"},
            {src:"https://cdn.vuetifyjs.com/images/cards/desert.jpg",title:"标题",subject:"分类"},
            {src:"https://cdn.vuetifyjs.com/images/cards/desert.jpg",title:"标题",subject:"分类"},
            {src:"https://cdn.vuetifyjs.com/images/cards/desert.jpg",title:"标题",subject:"分类"}       
        ]
    }
    }
}
</script>
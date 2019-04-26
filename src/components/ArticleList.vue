<template>
  <div class="container">
    <!-- 自定义搜索项 -->
    <v-card>
      <v-card-title>
        <span class="headline">
          <button @click="toggleShowSearch">
            <v-icon>notes</v-icon>
          </button>
        </span>
      </v-card-title>
      <v-card-text v-show="showSearch">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="title" label="title" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="author" label="author"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-select :items="subject" label="分类" required v-model="subjectSelected"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-select :items="sort" label="排序方式" v-model="sortBy"></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-btn flat @click="getDataFromApi">
                <v-icon>search</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <!-- 自定义搜素结束 -->
    <!-- 表头上方的操作项 -->
    <v-card>
      <v-card-title>
        标题
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-show="selected.length" small fab :color="theme.color" v-on="on">
              <v-icon>remove</v-icon>
            </v-btn>
          </template>
          <span>删除已选</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-show="selected.length" small fab :color="theme.color" v-on="on">
              <v-icon>save</v-icon>
            </v-btn>
          </template>
          <span>导出已选</span>
        </v-tooltip>

        <v-spacer></v-spacer>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small fab :color="theme.color" @click="showEditorLab=true" v-on="on">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <span>添加数据</span>
        </v-tooltip>
      </v-card-title>
      <!-- data table -->
      <v-data-table
        v-model="selected"
        item-key="calories"
        select-all
        :headers="headers"
        :items="desserts"
        :pagination.sync="pagination"
        :total-items="totalDesserts"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>

          <td class="justify-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon small class="mr-2" v-on="on" @click="getDetail(props.item)">duo</v-icon>
              </template>
              <v-icon small>delete</v-icon>
              <span>查看详情</span>
            </v-tooltip>
            <v-tooltip left>
              <template v-slot:activator="{on}">
                <v-icon small v-on="on" @click="edit(props.item)">edit</v-icon>
              </template>
              <span>编辑</span>
            </v-tooltip>
          </td>

          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>

          <!-- 没有数据时显示的提示信息 -->
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
        </template>
      </v-data-table>
      <v-footer></v-footer>
      <!-- 编辑mudal -->
      <v-layout row justify-center>
        <v-dialog v-model="showEditorLab" persistent max-width="600px">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="cTitle"
                      :counter="15"
                      :error-messages="nullErrors"
                      required
                      @input="$v.cTitle.$touch()"
                      @blur="$v.cTitle.$touch()"
                      label="标题"
                      hint
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="cAuthor" :counter="15" label="作者" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select v-model="cSubject" :items="subject" label="分类" required></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="cDes" :counter="150" label="描述" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="showEditorLab = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="save">save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  validations: {
    cTitle: { required, maxLength: maxLength(15) },
    email: { required, email },
    select: { required }
  },
  computed: {
    nullErrors() {
      const errors = [];
      if (!this.$v.cTitle.$dirty) return errors;
      !this.$v.cTitle.maxLength && errors.push("请注意字符串长度");
      !this.$v.cTitle.required && errors.push("必填项");
      return errors;
    }
  },
  data() {
    return {
      // 自定义搜索项
      subject: ["a", "b", "c", "d"],
      sort: ["desc", "asc"],
      title: "",
      author: "",
      sortBy: "",
      subjectSelected: "",
      showSearch: false,
      // 编辑详情mudal
      cTitle: "",
      cAuthor: "",
      cDes: "",
      cSubject: "",
      showEditorLab: false,

      selected: [],

      theme: this.$store.state.theme,

      // 数据
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {},

      headers: [
        { text: "Actions", value: "iron", sortable: false, value: "" },
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ],
      articleHeaders: [
        { text: "Actions", value: "id", sortable: false },
        { text: "ID", align: "left", sortable: true, value: "id" },
        { text: "Title", value: "title" },
        { text: "Author", value: "author" },
        { text: "Subject", value: "aubject" }
      ]
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    let axiosHeaders = this.$store.state.accessInfo;
    let params = new URLSearchParams();
    params.append("num", 1);
    // params不能直接写json，否则spring的@requestParam接收不到参数
    // ：记录：将相对路径的图片转为具体绝对路径
    // 'src="/a.jpg'.replace(/src=\"\//g,"src=\"http://www.domain.com/")
    this.$axios.post("/app/api/article/list", params,{
      headers:{
        axiosHeaders
      }
    }).then(result => {
      let articleLists = [];
      articleLists = result.data.list;

      console.log("lists" + result.data.list[0].title);
    });
    this.getDataFromApi().then(data => {
      this.desserts = data.items;
      this.totalDesserts = data.total;
    });
  },
  methods: {
    getDataFromApi() {
      this.showSearch = false;
      console.log(Boolean(this.subjectSelected));
      console.log(Boolean(this.title.trim()));
      console.log(Boolean(this.author.trim()));
      console.log(Boolean(this.sortBy)); //
      console.log(this.pagination.rowsPerPage); //每页多少行
      console.log(this.pagination.sortBy); //排序的字段
      console.log(this.pagination.descending); //是否降序bool
      console.log(this.pagination.page); //当前页面，第一次进入是1，表格下方的下一页按钮会改变值
      console.log(this.pagination);
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        let items = this.getDesserts();
        const total = items.length;

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }

        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 1000);
      });
    },
    getDesserts() {
      return [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ];
    },
    getDetail(param) {
      this.$router.push({ name: "detail", params: { id: param } });
    },
    toggleShowSearch() {
      this.showSearch = !this.showSearch;
    },
    edit(item) {
      console.log(item);
      let { name, calories, fat, carbs } = item;
      this.cTitle = name;
      this.cAuthor = calories;
      this.cDes = fat;
      this.cSubject = "c";
      this.showEditorLab = true;
    },
    save() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        console.log(this.$v.$invalid);
        return;
      }
      //提交表单
      //这个示例里面编辑和添加都用的一个mudal，后台判断有没有传入id判断是修改还是新增数据
      this.showEditorLab = false;
      alert("已保存");
    }
  }
};
</script>
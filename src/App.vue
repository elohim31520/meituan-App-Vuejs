<template>
  <div id="app">
    <Head :poiInfo='poiInfo'></Head>
    <Nav :commentNum='commentNum'></Nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import Nav from "./components/Nav/Nav";
import Head from "./components/Header/Header";

export default {
  name: "app",
  components: {
    Nav,
    Head
  },
  data() {
    //header組件的資料
    return {
      poiInfo: {},
      commentNum: 0
    };
  },
  mounted() {
    //發起異步請求獲取數據
    var that = this;

    this.axios
      .get("/api/goods")
      .then(res => {
        let dataSource = res.data;
        // console.log(dataSource)
        if (dataSource.code == 0) {
          that.poiInfo = dataSource.data.poi_info;
        }
      })
      .catch(err => {
        console.log(err + "失敗");
      });

      // 獲取rating個數數據
    this.axios
      .get("/api/ratings")
      .then(res => {
        let dataSource = res.data;
        // console.log(dataSource)
        if (dataSource.code == 0) {
          that.commentNum = dataSource.data.comment_num
        }
      })
      .catch(err => {
        console.log(err + "失敗");
      });
  }
};
</script>

<style lang='sass'>
*
  font-family: "微軟正黑體"
</style>

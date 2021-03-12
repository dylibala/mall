<template>
  <div id="home">
    <navbar id="home-navbar"><div slot="center">购物街</div></navbar>
    <!-- 狸猫换太子 -->
    <tab-control
        ref='fakeTabControl'
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class='fake-tab-control'
        v-show='tabControlActive'
      ></tab-control>

    <scroll  
      class='wrapper' 
      ref='scroll' 
      :probeType='3'
      @scroll='scroll'
      :pullUpLoad='true'
      @pullingUp='loadMore'
    >
      <home-swiper :banners="banners" @swiperLoad='supSwiperLoad'></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-popular></home-popular>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref='tabControl'
      ></tab-control>
      <goods-list :goodsList="goodsShow"></goods-list>
    </scroll>

    <back-top 
      @click.native='btClick' 
      v-show='btShow'
    />
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script>
<script>
import Navbar from "components/common/navbar/navbar";
import HomeSwiper from "./subcomps/HomeSwiper";
import HomeRecommends from "./subcomps/HomeRecommends";
import HomePopular from "./subcomps/HomePopular";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/Goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/common/backtop/BackTop"

import { getHomeMultiData, getHomeGoodsData } from "network/home";

export default {
  name: "Home",
  components: {
    Navbar,
    HomeSwiper,
    HomeRecommends,
    HomePopular,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: null,
      recommends: null,
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentTitle: "pop",
      btShow: false,
      tabControlActive: false,
      swiperOffset: 0
    };
  },
  created() {
    //请求多个数据
    this.getHomeMultiData();

    //请求商品数据
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },
  mounted() {
    //图片加载完成的事件监听
    let refresh = this.debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('itemImgLoad',() => {
      refresh()
    })
  },
  computed: {
    //展示['流行', '新款', '精选']中的哪一个
    goodsShow() {
      return this.goods[this.currentTitle].list;
    },
  },
  methods: {
    /* 
      防抖函数    
    */
    debounce(func, delay) {
      let timer = null
      return function(...args) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args)
        },delay)
      }
    }, 

    /* 
      请求数据相关方法
    */
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        console.log(res);
        this.banners = res.data.data.banner.list; //this是created函数中的this，指向当前组件
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoodsData(type) {
      let page = this.goods[type].page + 1;
      getHomeGoodsData(type, page).then(res => {
        //console.log(res);
        //console.log(this.$refs.scroll.bscroll.scrollerHeight);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page++;

        this.$refs.scroll.bscroll.finishPullUp()
      });
    },

    /*  
      事件监听相关方法
    */
    tabClick(index) {
      //console.log(index);
      switch (index) {
        case 0:
          this.currentTitle = "pop";
          break;
        case 1:
          this.currentTitle = "new";
          break;
        case 2:
          this.currentTitle = "sell";
          break;  
      }
      this.$refs.fakeTabControl.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },

    //点击backTop回顶部
    btClick() {
      this.$refs.scroll.bscroll.scrollTo(0, 0, 500)
    },

    //滚动到一定位置显示backTop
    scroll(position) {
      //判断backtop是否显示
      this.btShow = position.y < -1000

      //判断tab-control是否吸顶
      this.tabControlActive = position.y < -this.swiperOffset ? true : false

    },

    //监听上拉加载更多
    loadMore() {
      this.getHomeGoodsData(this.currentTitle);
      //this.$refs.scroll.bscroll.refresh()

    },

    //监听swiper图片加载是否完成
    supSwiperLoad() {
      this.swiperOffset = this.$refs.tabControl.$el.offsetTop
    }
  },
};
</script>

<style scoped>
#home {
  height: 618px;
  padding-top: 44px;
  position: relative
}
#home-navbar {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.fake-tab-control {
  position: relative;
  z-index: 9;
}

.wrapper {
  overflow: hidden;
  position:absolute;
  top:44px;
  bottom: 0
} 
</style>
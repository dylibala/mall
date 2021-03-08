<template>
  <div id='home'> 
    <navbar id='home-navbar'><div slot='center'>购物街</div></navbar>
    <home-swiper :banners='banners'></home-swiper>
    <home-recommends :recommends='recommends'></home-recommends>
    <home-popular></home-popular>
    <tab-control :titles="['流行','新款','精选']" class='tab-control' @tabClick='tabClick'></tab-control>
    <goods-list :goodsList="goodsShow"></goods-list>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/navbar'
import HomeSwiper from './subcomps/HomeSwiper'
import HomeRecommends from './subcomps/HomeRecommends'
import HomePopular from './subcomps/HomePopular'
import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/Goods/GoodsList'

import {getHomeMultiData, getHomeGoodsData} from 'network/home'

export default {
  name: 'Home',
  components: {
    Navbar,
    HomeSwiper, 
    HomeRecommends,
    HomePopular,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banners: null,
      recommends: null,
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentTitle: 'pop'
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultiData()

    //请求商品数据
    this.getHomeGoodsData('pop')
    this.getHomeGoodsData('new')
    this.getHomeGoodsData('sell')
  },
  computed: {
    goodsShow() {
      return this.goods[this.currentTitle].list
    }
  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(res => {
      console.log(res);
      this.banners = res.data.data.banner.list //this是created函数中的this，指向当前组件
      this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoodsData(type) {
      let page = this.goods[type].page + 1
      getHomeGoodsData(type, page).then(res => {  
      console.log(res);
      this.goods[type].list.push(...res.data.data.list)
      this.goods[type].page++
    })
    },
    tabClick(index) {
      //console.log(index);
      switch(index) {
        case 0:
          this.currentTitle = 'pop'
          break
        case 1:
          this.currentTitle = 'new'
          break
        case 2:
          this.currentTitle = 'sell'
          break
      }
    }
  }    
}
</script>

<style scoped>
#home {
  padding:44px 0
}
#home-navbar {
  background-color: var(--color-tint);
  color:white;
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position:sticky;
  top: 44px;
}
</style>
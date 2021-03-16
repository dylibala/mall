<template>
  <div class='detail'>
    <detail-nav-bar></detail-nav-bar>
    <scroll class="wrapper" ref='scroll'>
      <detail-swiper :topImages='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop :shop='shop'></detail-shop>
      <detail-inf :detailInfo='detailInfo' @imgLoad='imgLoad'></detail-inf>
      <detail-params-info ref='params' :itemParams='itemParams'></detail-params-info>
      <goods-list ref='recommends' :goodsList='recommends'></goods-list>
    </scroll>    
  </div>
</template>

<script>
import DetailNavBar from './subcomps/DetailNavBar'
import DetailSwiper from './subcomps/DetailSwiper'
import DetailBaseInfo from './subcomps/DetailBaseInfo'
import DetailShop from './subcomps/DetailShop'
import Scroll from 'components/common/scroll/Scroll'
import DetailInf from './subcomps/DetailInfo'
import DetailParamsInfo from './subcomps/DetailParamsInfo'
import GoodsList from 'components/content/Goods/GoodsList'

import {getDetail, getCommends, Goods, Shop, DetailInfo} from 'network/detail.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailInf,
    DetailParamsInfo,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      recommends: [],
      offsetY: []
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res => {
      console.log(res);
      const result = res.data.result
      //获取轮播图图片
      this.topImages = result.itemInfo.topImages
      //console.log(res);

      //获取商品栏信息
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo)
      //console.log(this.goods);

      //获取商店信息
      this.shop = new Shop(result.shopInfo)
      //console.log(this.shop)

      //获取商品详情数据
      this.detailInfo = new DetailInfo(result.detailInfo)

      //获取商品参数数据
      this.itemParams = result.itemParams 
    }) 

    //获取推荐信息
    getCommends().then(res => {
      this.recommends = res.data.data.list 
    })
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
    imgLoad(){
      this.$refs.scroll.refresh()

      //获取各区域高度
      this.offsetY = []
      this.offsetY.push(0)
      this.offsetY.push(this.$refs.params.$el.offsetTop)
      this.offsetY.push(this.$refs.recommends.$el.offsetTop)
      //console.log(this.offsetY);
    }
  },
    
  mounted() {
    this.$bus.$on('detailImgLoad',() => {
      this.$refs.scroll.refresh()
    }) 
    /* let refresh = this.debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('detailImgLoad', () => {
      refresh()
    }) */
  } 

/*   destroyed() {
    console.log('destroyed');
  } */
}
</script>

<style scoped>
.detail{
  height: 618px;
  position: relative
}
.wrapper {
  overflow: hidden;
  position:absolute;
  top:44px;
  bottom: 0
} 
</style>
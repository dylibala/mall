<template>
  <div class='detail'>
    <detail-nav-bar></detail-nav-bar>
    <scroll class="wrapper" ref='scroll'>
      <detail-swiper :topImages='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop :shop='shop'></detail-shop>
      <detail-inf :detailInfo='detailInfo' @imgLoad='imgLoad'></detail-inf>
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

import {getDetail, Goods, Shop, DetailInfo} from 'network/detail.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailInf
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {}
    }
  },
  created() {
    //console.log(this.$route.params);
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      console.log(res);
      const result = res.data.result
      //获取轮播图图片
      this.topImages = result.itemInfo.topImages
      console.log(res);

      //获取商品栏信息
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo)
      console.log(this.goods);

      //获取商店信息
      this.shop = new Shop(result.shopInfo)
      console.log(this.shop)

      //获取商品详情数据
      this.detailInfo = new DetailInfo(result.detailInfo)
    }) 
  },
  methods: {
    imgLoad(){
      this.$refs.scroll.refresh()
    }
  }
  /* destroyed() {
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
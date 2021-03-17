<template>
  <div class='detail'>
    <detail-nav-bar ref='detailNavBar' @titleClick='navbarClick'></detail-nav-bar>
    <scroll class="wrapper" ref='scroll' :probeType='3' @scroll='detailScroll'>
      <detail-swiper :topImages='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop :shop='shop'></detail-shop>
      <detail-inf :detailInfo='detailInfo' @imgLoad='detailImgLoad'></detail-inf>
      <detail-params-info ref='params' :itemParams='itemParams'></detail-params-info>
      <comment-info ref='commentInfo' :commentInfo='commentInfo'></comment-info>
      <goods-list ref='recommends' :goodsList='recommends'></goods-list>
    </scroll>    
  </div>
</template>

<script>
//引入组件
import DetailNavBar from './subcomps/DetailNavBar'
import DetailSwiper from './subcomps/DetailSwiper'
import DetailBaseInfo from './subcomps/DetailBaseInfo'
import DetailShop from './subcomps/DetailShop'
import Scroll from 'components/common/scroll/Scroll'
import DetailInf from './subcomps/DetailInfo'
import DetailParamsInfo from './subcomps/DetailParamsInfo'
import GoodsList from 'components/content/Goods/GoodsList'
import CommentInfo from './subcomps/Detailcomment'

//引入网络请求
import {getDetail, getCommends, Goods, Shop, DetailInfo} from 'network/detail.js'

//引入公用函数
import debounce from 'common/debounce'

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
    CommentInfo,
    GoodsList,  
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
      commentInfo: {},
      offsetY: [],
      refreshOffsetY: null,
    }
  },
  created() {
    //获取detail信息
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

      //获取商品评论数据
      if(result.rate.list) this.commentInfo = result.rate.list[0]
    }) 

    //获取推荐信息
    getCommends().then(res => {
      this.recommends = res.data.data.list 
    })

    //获取各title页面高度函数进行防抖处理
      this.refreshOffsetY = debounce(() => {
      //获取各区域高度
      this.offsetY = []
      this.offsetY.push(0)
      this.offsetY.push(-this.$refs.params.$el.offsetTop)
      this.offsetY.push(-this.$refs.commentInfo.$el.offsetTop)
      this.offsetY.push(-this.$refs.recommends.$el.offsetTop)
      this.offsetY.push(-Number.MAX_VALUE)
      console.log('refreshOffsetY调用次数');
    }, 500)
  },
  methods: {
    detailImgLoad(){
      this.$refs.scroll.refresh()
      this.refreshOffsetY()  
    },
    navbarClick(index) {
      console.log(this.offsetY);
      switch(index){
        case 0: this.$refs.scroll.scrollTo(0, this.offsetY[0], 100)
        break;
        case 1: this.$refs.scroll.scrollTo(0, this.offsetY[1], 100)
        break;
        case 2: this.$refs.scroll.scrollTo(0, this.offsetY[2], 100)
        break;
        case 3: this.$refs.scroll.scrollTo(0, this.offsetY[3], 100)
        break;
      }
    },
    detailScroll(position) {
      /* switch(true) {
        case position.y > this.offsetY[1] && position.y <= this.offsetY[0] :
          this.$refs.detailNavBar.currentIndex = 0
          break
        case position.y > this.offsetY[2] && position.y <= this.offsetY[1] :
          this.$refs.detailNavBar.currentIndex = 1
          break
        case position.y > this.offsetY[3] && position.y <= this.offsetY[2] :
          this.$refs.detailNavBar.currentIndex = 2
          break
        case position.y <= this.offsetY[3] :
          this.$refs.detailNavBar.currentIndex = 3
          break
      } */
      for(let i = 0; i < this.offsetY.length - 1; i++) {
        if(position.y > this.offsetY[i + 1] && position.y <= this.offsetY[i])
        this.$refs.detailNavBar.currentIndex = i
      }
    }
  },
    
  mounted() {
    this.$bus.$on('detailImgLoad',() => {
      if(this.$refs.scroll) {
        this.$refs.scroll.refresh()
      }  
    }) 
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
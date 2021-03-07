<template>
  <div>
    <navbar id='home-navbar'><div slot='center'>购物街</div></navbar>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key='index'>
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/navbar'
import {Swiper, SwiperItem} from 'components/common/swiper'

import {getHomeMultiData} from 'network/home'

export default {
  name: 'Home',
  components: {
    Navbar,
    Swiper,
    SwiperItem  
  },
  data() {
    return {
      banners: null,
      recommends: null
    }
  },

  created() {
    //请求多个数据
    getHomeMultiData().then((res) => {
      console.log(res);
      this.banners = res.data.data.banner.list //this是created函数中的this，指向当前组件
      this.recommends = res.data.data.recommend.list
    })
  }  
}
</script>

<style scoped>
#home-navbar {
  background-color: var(--color-tint);
  color:white
}
</style>
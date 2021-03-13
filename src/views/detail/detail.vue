<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages='topImages'></detail-swiper>
    <h2>{{iid}}</h2>
  </div>
</template>

<script>
import DetailNavBar from './subcomps/DetailNavBar'
import DetailSwiper from './subcomps/DetailSwiper'

import {getDetail} from 'network/detail.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {
    //console.log(this.$route.params);
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.data.result.itemInfo.topImages
      console.log(this.topImages);
    }) 
  },
  /* destroyed() {
    console.log('destroyed');
  } */
}
</script>

<style scoped>
</style>
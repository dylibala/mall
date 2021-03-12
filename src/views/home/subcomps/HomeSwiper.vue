<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key='index'>
        <a :href="item.link">
          <img :src="item.image" alt="" @load='swiperLoad'>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name:'HomeSwiper',
  components: {
    Swiper,
    SwiperItem 
  },
  props:{
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    swiperLoad() {
      this.$emit('swiperLoad')
    }
  } 
  
}
</script>

<style scoped>
</style>
<template>
  <div v-if="Object.keys(detailInfo).length !==0">
    <div class='info-list'>
      <div>{{detailInfo.desc}}</div>
      <div>{{detailInfo.key}}</div>
      <img v-for="(item, index) in detailInfo.images" :key="index"
      :src='item'
      @load='imgLoad'>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    imgLoad() {
      if(++this.counter == this.detailInfo.images.length) {
        this.$emit('imgLoad')
      }
    }
  }
}
</script>

<style scoped>
.info-list img{
  width: 100%;
}
</style>
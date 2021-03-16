<template>
  <div v-if="Object.keys(detailInfo).length !==0">
    <div class='info-list'>
      <div class='desc'>
        <div class='desc-start'></div>
        <div class='desc-content'>{{detailInfo.desc}}</div>
        <div class='desc-end'></div>
      </div>
      <div v-for='(item, index) in detailInfo.images' :key='index'>
        <div class='info-key'>{{item.key}}</div>
        <img v-for="(img, index) in item.list" :key="index"
        :src='img'
        @load='imgLoad'>
      </div>
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
        this.$emit('imgLoad')
    }
  }
}
</script>

<style scoped>
.desc {
  padding: 10px
}
.desc-start, .desc-end{
  position:relative;
  width: 90px;
  height: 1px;
  background-color:#a3a3a5;
}
.desc-start{
  float:left
}
.desc-end{
  float: right
}
.desc-start::before, 
.desc-end::after{
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.desc-end::after{
  right: 0
}
.desc-content {
  padding: 10px
}

.info-list img{
  width: 100%;
}

.info-key{
  padding: 10px;
  font-size: 16px;
  font-weight: bold
}
</style>
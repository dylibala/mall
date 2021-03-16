<template>
  <div class='goods-list' v-if="Object.keys(goodsList).length !== 0">
      <goods-item v-for='(item,index) in goodsList' :key='index' :item='item'>
      </goods-item>
  </div>

</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: 'GoodsList',
  props: {
    goodsList:{
      type: Array,
      default() {
        return []
      }
    },
  },
  components: {
    GoodsItem
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
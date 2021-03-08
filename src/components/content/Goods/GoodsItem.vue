<template>
  <div class="goods-item">
    <a :href="item.link">
      <img :src="item.show.img" alt="" />
      <div class="goods-info">
        <p>{{ item.title }}</p>
        <span class="price">{{ item.price }}</span>
        <span class="cfav">{{ item.cfav }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "GoodItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.goods-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
  /* border: 10px solid red */

}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center 
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
  padding: 0 5px
}
.goods-info .price {
  color: var(--color-high-text);
  /* position: relative;
  left: -8px; */
  margin-right: 20px;
}
.goods-info .cfav {
  position: relative;
  /* left: 8px; */
}
.goods-info .cfav::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
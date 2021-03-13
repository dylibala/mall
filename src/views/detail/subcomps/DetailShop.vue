<template>
  <div class='detail-shop'>
    <div class='shop-logo'>
      <img :src="shop.logo" alt="">
      {{shop.name}}
    </div>
    <div class='shop-info'>
      <div class='shop-info-1'>
        <span>{{shop.fans}}<br>总销量</span>
        <span>{{shop.goodsCount}}<br>全部宝贝</span> 
      </div>        
      <div class='shop-info-2'>
        <table class='shop-info-2-table'>
          <tr v-for='(item, index) in shop.sells' :key='index'>
            <td>{{item.name}}</td>
            <td :class='{scoreIsBetter:item.isBetter, scoreNotBetter:!item.isBetter}'>{{item.score}}</td>
            <td><span :class='{textIsBetter:item.isBetter, textNotBetter:!item.isBetter}'>{{item.isBetter? '高' : '低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShop",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-shop{
  padding: 20px;
  border-bottom:5px solid #f5f4f5
}
.shop-logo{
  margin-bottom:30px;
  font-size:16px; 
}
.shop-logo img{
  width: 60px;
  vertical-align: middle;
}
/* 商品评价信息 */
.shop-info{
  display: flex;
  font-size: 16px;
}
.shop-info div{
  flex: 1
}
.shop-info-1{
  display:flex; 
  text-align: center;
  padding:10px 0;
  border-right:2px solid #f5f4f5
}
.shop-info-1 span{
  padding:20px 0;
  flex:1
}
.shop-info-2{
  padding:0 10px;
}
.shop-info-2 span{
  margin:2px
}
.shop-info-2-table{
  border-spacing:5px 10px
}
.scoreIsBetter{
  color: var(--color-high-text)
}
.textIsBetter{
  padding:2px;
  background-color: var(--color-high-text);
  color:white
}
.scoreNotBetter{
  color:green
}
.textNotBetter{
  padding:2px;
  background-color: green;
  color:white
}
</style>
<template>
  <div v-if="Object.keys(goods).length !== 0" class='info'>
    <div class='info-title'>{{goods.title}}</div>
    <div class='info-price'>
      <span class='n-price'>{{goods.newPrice}}</span>
      <span class='o-price'>{{goods.oldPrice}}</span>
      <span class='discount' v-if='goods.discount'>{{goods.discount}}</span>
    </div>
    <div class='info-columns'>
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class='info-services'>
      <span class='info-services-item' v-for='index in goods.services.length - 1' :key='index'>
        <img :src="goods.services[index - 1].icon">
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'detailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.info{
  padding:10px
}
/* 价格栏 */
.info-title {
  padding: 10px;
  padding-top: 20px;
  text-align: center;
  font-family: arial;
  font-weight: bold;
}

.info-price{
  padding:10px;
}
.n-price {
  color: var(--color-high-text);
  font-weight: bold;
  font-size:25px;
  
}
.o-price{
  margin: 0 5px;
  text-decoration: line-through;
  font-size:14px;
}
.discount{
  padding:3px;
  background-color: var(--color-high-text);
  color:white;
  font-size:14px;
  border-radius:3px;
  /* position:relative;
  top: -5px */
  vertical-align: top;
  
}
/* 信息栏 */
.info-columns{
  display: flex;
  padding: 10px;
  border-bottom: 2px solid #f5f4f5;
}
.info-columns span {
  flex: 1;
  text-align: center;
  font-size:12px;
}
.info-columns span:nth-child(2){
  flex-grow: 3
}
/* 服务栏 */
.info-services {
  padding: 10px;
  display: flex;
  flex-wrap:wrap;
  font-size: 12px;
  border-bottom: 5px solid #f5f4f5;
}
.info-services-item {
  width: 110px;
  height: 20px;
  text-align: center;
}

.info-services img{
  width: 12px;
}
</style>
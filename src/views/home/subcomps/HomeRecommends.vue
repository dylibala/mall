<template>
  <div id='home-recommends'> 
      <a :href="item.link" v-for='(item, index) in recommends' :key='index'>
        <img :src="item.image" alt="">
      <div>{{item.title}}</div>
      </a>  
 </div>

</template>

<script>

export default {
  name:'HomeCommends',
  props: {
    recommends: {
      type: Array
    }
  }
}
</script>

<style scoped>
#home-recommends {
  display: flex;
  text-align: center;
  font-size: 14px;
  padding: 15px;
  border-bottom: 5px solid #edeced
}
#home-recommends a{
  flex: 1;
}
#home-recommends img{
  width: 80px;
  margin-bottom: 5px;
}
</style>
<template>
  <div>
    <navbar></navbar>
    <div class='content'>
      <h1>购物车</h1>
    </div>
    
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/navbar'
export default {
  name: 'cart',
  components: {
    Navbar
  }
}
</script>

<style scoped>
.content {
  /* top:50px;
  position:absolute */
}
</style>
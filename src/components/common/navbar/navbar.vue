<template>
  <div class='navbar'>
    <div class='left'><slot name='left'></slot></div>
    <div class='center'><slot name='center'></slot></div>
    <div class='right'><slot name='right'></slot></div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'

}
</script>

<style scoped>
.navbar {
  display: flex;
  height: 44px;
  line-height: 44px; /*设置line-height可以将元素撑起来，就不用再设置height了，前提是有内容*/
  /* position:fixed;
  left: 0;
  right: 0;
  top: 0; */
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
  text-align: center;
}

</style>
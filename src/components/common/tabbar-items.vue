<template>
      <div class="tarbar-item" @click='itemClick'>
        <div v-if='isActive'><slot name='icon_active'></slot></div>
        <div v-else ><slot name='icon'></slot></div>
        <div :style='activeColor'><slot name='text'></slot></div>
      </div>
</template>

<script>
export default {
  name: 'tabber-items',
  props:{
    path: String,
    color: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      //isActive: false
    }
  },
  computed: {
    isActive() {
      //return this.$route.path == this.path
      return this.$route.path.indexOf(this.path) != -1//indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果没有找到匹配的字符串则返回 -1。
    },
    activeColor() {
      return this.isActive ? {color: this.color} : {}
    }
  },
  methods: {
    itemClick() {
      //this.isActive = !this.isActive
      this.$router.replace(this.path)
    }
  }
} 
</script>

<style scoped>
.tarbar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  background-color: #f5f4f6;
  font-size: 14px
}

.tarbar-item img {
  width: 25px;
  height: 25px;
  vertical-align: middle; /* 设置元素垂直对齐的方式（可以解决图片底部空白的问题） */
}

/* .active {
  color: red
} */
</style>
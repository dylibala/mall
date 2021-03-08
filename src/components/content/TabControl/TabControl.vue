<template>
  <div class='tab-control' >
    <div v-for='(item, index) in titles' :key='index' @click='tabActive(index)' :class='{active: index == currentIndex}'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabActive(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  background-color: #fff;
  z-index: 9;
}
.tab-control div {
flex: 1;
}
.active {
  color: var(--color-tint); 
}
.active span {
  padding: 5px;
  border-bottom: 2px solid var(--color-high-text)
}

</style>
<template>
  <div ref='wrapper'>
    <div class='content'>
      <slot></slot>
    </div>
  </div>    
</template>
 
<script>
import BScroll from 'better-scroll' 

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bscroll: {}
    }
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper,{ 
      probeType: this.probeType, 
      // wheel: true,
      pullUpLoad: this.pullUpLoad,
      click: true //如果想要scroll内的div等元素可以点击，需要设置该属性
    })

    this.bscroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    this.bscroll.on('pullingUp', () => {
      console.log('上拉')
      this.$emit('pullingUp')
    })
  },
  methods: {
    refresh() {
      //console.log(this);
      this.bscroll && this.bscroll.refresh()
      console.log('------');
    }
  }

}
</script>

<style scoped>
</style>
<template>
    <nav-bar class="detail-nav-bar">
      <div slot='left' class='back' @click='backClick'>
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class='titles'>
        <div 
        v-for="(item, index) in titles" 
        :key="item" 
        class="title"
        :class='{active: index == currentIndex}'
        @click='titleClick(index)'
        >{{item}}</div>
      </div>
    </nav-bar> 
</template>

<script>
import NavBar from "components/common/navbar/navbar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  props:{
    titleIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      //this.$router.replace('/home')
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.back{
  margin-top: 5px;
  margin-left: 15px
  

}
.titles {
  display: flex
}
.title {
  flex: 1
}
.active{
  color: var(--color-high-text)
}

</style>
<template>
  <div class="param-info" v-if="Object.keys(itemParams).length !== 0">
    <table class='info-rule' v-for='(item, index) in itemParams.rule.tables' :key='index'>
      <tr v-for='(tr, index2) in item' :key='index2'>
        <td v-for='(td, index3) in tr' :key='index3'>{{td}}</td>
      </tr>
    </table>

    <table class='info-info'> 
      <tr v-for='(tr, index) in itemParams.info.set' :key='index'>
        <td class='info-key'>{{tr.key}}</td>
        <td class='info-value'>{{tr.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    itemParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.param-info{
  border-top: 4px solid rgba(100, 100, 100, .1);
  padding:0 20px
}
.param-info table{
  width: 100%;
  border-collapse: collapse;
}
.info-rule{
  margin: 20px 0
}
.info-rule tr td {
  height: 40px;
  border-bottom: 2px solid rgba(100, 100, 100, .1)
}

.info-value{
  color: var(--color-high-text)
}
.info-info tr td {
  height: 40px;
  border-bottom: 2px solid rgba(100, 100, 100, .1)
}
</style>
<template>
  <div class="cloudcontent">
    <div class="main">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="评估项" name="1">
          <evaluation-item></evaluation-item>
        </el-tab-pane>
        <el-tab-pane label="评估模板" name="2">
          <evaluation-template></evaluation-template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import EvaluationTemplate from './template'
import EvaluationItem from './item'

export default {
  name: '',
  components: {
    // 预约管理
    EvaluationTemplate,
    EvaluationItem
  },
  data () {
    return {
      activeTab: '1'
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>

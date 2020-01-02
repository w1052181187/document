<template>
  <el-dialog
    title="选择中标人"
    :before-close="cancel"
    :visible.sync="showVisible"
    width="30%">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="投标人名称">
      </el-table-column>
    </el-table>
    <div class="bottom-btn">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  props: ['showVisible'],
  watch: {
    showVisible (value) {
      if (!value) {
        this.multipleSelection = []
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    submit () {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一个中标人'
        })
        return
      }
      this.$emit('selected', Object.assign({}, this.multipleSelection))
      this.cancel()
    },
    // 关闭
    cancel () {
      this.$emit('showDialog')
    }
  }
}
</script>
<style scoped>
  .bottom-btn{
    text-align: center;
    margin-top: 30px;
  }
</style>

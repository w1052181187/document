<template>
  <div>
    <el-dialog title="评估记录" width="50%" :before-close="cancel" :visible.sync="showVisible">
      <ul class="other" v-loading="loading">
        <li v-for="(item, index) in recordList" :key="item.objectId">
          <div class="evaluator">
            <i>{{index + 1}}</i>  <span><b>{{item.auditorName}}</b></span> <span class="time">{{item.createDate | formatDate}}</span>  <em>是否继续跟进该项目:  {{item.auditStatus === 1 ? '是' : '否'}}</em>
          </div>
          <div class="assessment">
            {{item.opinion}}
          </div>
        </li>
        <li v-show="initialRecord.createDate">
          <div class="evaluator">
            <i>{{recordList.length + 1}}</i>  <span><b>{{initialRecord.auditorName}}</b></span> <span class="time">{{initialRecord.createDate | formatDate}}</span>  <em>是否继续跟进该项目:  {{initialRecord.auditStatus === 1 ? '是' : '否'}}</em>
          </div>
          <div class="assessment">
            {{initialRecord.opinion}}
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import {approvalRecord} from '@/api/todoList'
import {dateFormat} from '@/assets/js/common'

export default {
  data () {
    return {
      loading: false,
      recordList: []
    }
  },
  props: ['showVisible', 'subjectCode', 'initialRecord'],
  watch: {
    subjectCode (value) {
      if (value) {
        this.approveRecord()
      }
    }
  },
  methods: {
    // 查询审批记录
    approveRecord () {
      let query = {
        subjectCode: this.subjectCode
      }
      this.loading = true
      approvalRecord.approvalRecordList(query).then((res) => {
        this.loading = false
        if (res.data.resCode === '0000') {
          this.recordList = res.data.recordOfApprovalList
        }
      })
    },
    // 关闭
    cancel () {
      this.$emit('showDialog')
    }
  },
  filters: {
    // 格式化时间
    formatDate (value) {
      return value ? dateFormat(value, 'yyyy-MM-dd') : '---'
    }
  }
}
</script>
<style scoped>
  ul.other{
    overflow: hidden;
  }
  ul.other li{
    width: 100%;
    height: 160px;
    border: 1px solid #dcdfe6;
    margin-bottom: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
  }
  ul.other li .evaluator{
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    font-style: normal;
    font-size: 14px;
  }
  ul.other li .evaluator i{
    font-style: normal;
    margin: 0 10px;
  }
  ul.other li .evaluator span{
    margin: 0 3%;
    color: #999999;
  }
  ul.other li .evaluator span.time{
    font-size: 13px;
    margin-left: 100px;
  }
  ul.other li .evaluator span b{
    margin-left: 10px;
    color: #666666;
    font-weight: normal;
  }
  ul.other li .evaluator em{
    font-style: normal;
    float: right;
    color: #999999;
  }
  ul.other li .assessment{
    width: 96%;
    padding: 12px 2%;
    height: 93px;
    line-height: 32px;
    overflow-y: auto;
    border-top: 1px solid #dcdfe6;
    background: #f9f9f9;
  }
</style>

<template>
  <div class="handle-box">
    <div class="handle">
      <template v-if="Number(isApproved) === 1">
        <el-button type="primary" class="submitBtn" @click="showDialog('agree')">同意</el-button>
        <el-button type="primary" class="back" @click="showDialog('back')">退回</el-button>
        <el-button type="primary" @click="showUserDialog">转交</el-button>
      </template>
      <template v-if="Number(isApproved) === 3">
        <el-button v-if="Number($route.query.auditStatus) === 0" type="primary" @click="handleUrge">催办</el-button>
        <el-button v-if="Number($route.query.auditStatus) === 0 && returnBtnFlag" type="primary" class="back" @click="handleRecall">撤回</el-button>
      </template>
      <el-button class="cancal" @click="handleCancle">返回</el-button>
    </div>
    <el-dialog
      title="录入审批意见"
      :visible.sync="dialogVisable"
      @closed="close"
      width="30%">
      <el-form :model="opinionForm" ref="opinionForm" label-width="82px">
        <el-form-item label="审批结果:">
          <el-select v-model="opinionForm.auditStatus" disabled>
            <el-option
              v-for="item in results"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="审批意见:"
          prop="opinion"
          :rules="opinionForm.auditStatus === 2 ? rules : [{required: false}]">
          <el-input type="textarea" v-model="opinionForm.opinion" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-box">
        <el-button type="primary" @click="submitOpinion('opinionForm')" :loading="loading">确 定</el-button>
        <el-button @click="dialogVisable = false">取 消</el-button>
      </div>
    </el-dialog>
    <select-user-dialog :showVisible="showUserVisible" @selected="selectedUser" @showDialog="showUserDialog"></select-user-dialog>
  </div>
</template>
<script>
import {approvalRecord, approvalTask} from '@/api/todoList'
import selectUserDialog from '@/pages/system/users/search_user_radio'
export default {
  name: 'approveHandle',
  // isApproved（0:详情 1：审批 2：审批详情 3：我发起的详情）
  props: ['isApproved', 'approvalTaskCode', 'relatedCode', 'flowStatus'],
  components: {
    selectUserDialog
  },
  data () {
    return {
      loading: false,
      dialogVisable: false,
      results: [
        {
          value: 1,
          label: '通过'
        },
        {
          value: 2,
          label: '不通过'
        }
      ],
      opinionForm: {
        auditStatus: 1,
        opinion: ''
      },
      rules: [
        {required: true, message: '请输入审批意见', trigger: ['blur', 'change']}
      ],
      showUserVisible: false,
      returnBtnFlag: true
    }
  },
  watch: {
    '$route': 'init',
    approvalTaskCode: {
      handler () {
        this.checkedReturnBtn()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    checkedReturnBtn () {
      if (!this.approvalTaskCode) {
        return
      }
      approvalTask.checkedReturnFlag(this.approvalTaskCode).then((res) => {
        this.returnBtnFlag = res.data.returnFlag
      })
    },
    showDialog (val) {
      switch (val) {
        case 'agree':
          this.opinionForm.auditStatus = 1
          break
        case 'back':
          this.opinionForm.auditStatus = 2
          break
      }
      this.dialogVisable = true
    },
    submitOpinion (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.opinionForm.relatedCode = this.approvalTaskCode
          if (this.$route.params.code) {
            this.opinionForm.subjectCode = this.$route.params.code
          } else {
            this.opinionForm.subjectCode = this.relatedCode
          }
          if (Number(this.flowStatus) === 1 || Number(this.flowStatus) === 0) {
            this.opinionForm.flowStatus = this.flowStatus
          }
          approvalRecord.approvalRecordSave(this.opinionForm).then((res) => {
            this.loading = false
            if (res.data.resCode === '0000') {
              this.handleCancle()
            }
          })
        } else {
          return false
        }
      })
    },
    close () {
      this.opinion = {
        auditStatus: 1,
        opinion: ''
      }
      this.$refs['opinionForm'].resetFields()
    },
    showUserDialog () {
      this.showUserVisible = !this.showUserVisible
    },
    selectedUser (obj) {
      this.$confirm('确定要转交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 转交
        approvalTask.deliverTask(obj.objectId, this.approvalTaskCode).then((res) => {
          if (res.data.resCode === '0000') {
            this.handleCancle()
          }
        })
      }).catch(() => {
        return false
      })
    },
    // 催办
    handleUrge () {
      this.$confirm('确定要发起催办吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.approvalTaskCode) {
          approvalTask.urgeApprovalByTaskCode(this.approvalTaskCode).then((res) => {
            if (res.data.resCode === '0000') {
              this.handleCancle()
            }
          })
        } else if (this.relatedCode) {
          approvalTask.urgeApprovalByRelatedCode(this.relatedCode).then((res) => {
            if (res.data.resCode === '0000') {
              this.handleCancle()
            }
          })
        }
      }).catch(() => {
        return false
      })
    },
    // 撤回
    handleRecall () {
      this.$confirm('确认要撤回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        if (this.approvalTaskCode) {
          approvalTask.recallMyTask(this.approvalTaskCode).then((res) => {
            this.isSubmiting = false
            if (res.data.resCode === '0000') {
              this.handleCancle()
            }
          })
        }
        if (this.relatedCode) {
          approvalTask.withDrawByRelatedCode(this.relatedCode).then((res) => {
            this.isSubmiting = false
            if (res.data.resCode === '0000') {
              this.handleCancle()
            }
          })
        }
      }).catch(() => {
        return false
      })
    },
    handleCancle () {
      this.$store.commit('delete_tabs', this.$route.fullPath)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .handle-box {
    padding: 16px 20px;
    box-sizing: border-box;
  }
  .handle {
    text-align: center;
    margin-top: 30px;
  }
  .back{
    background-color: #ff5722;
    border-color: #ff5722;
  }
  .back:hover{
    background-color: #ff8427;
    border-color: #ff8427;
  }
  .footer-box{
    text-align: center;
    margin-top: 30px;
  }
</style>

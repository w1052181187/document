<template>
  <div class="tender-fee cloudcontent" id="tenderFee">
    <div class="main">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="缴费单位：" prop="company">
          <el-input v-model="ruleForm.bidderName" readonly></el-input>
        </el-form-item>
        <!--<el-form-item v-if="pageText === '保证金'" label="应缴金额（元）：" prop="amountPayable">-->
          <!--<el-input v-model="ruleForm.amountPayable" readonly></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="缴纳金额（元）：" prop="premiumReceived">
          <el-input v-model="ruleForm.amount" readonly></el-input>
        </el-form-item>
        <el-form-item label="缴费方式：" prop="paymentType">
          <el-input v-if="ruleForm.paymentMethod === 1" value="支付宝" readonly></el-input>
          <el-input v-if="ruleForm.paymentMethod === 2" value="微信" readonly></el-input>
          <el-input v-if="ruleForm.paymentMethod === 3" value="现金" readonly></el-input>
          <el-input v-if="ruleForm.paymentMethod === 4" value="银联" readonly></el-input>
          <el-input v-if="ruleForm.paymentMethod === 5" value="支票" readonly></el-input>
          <el-input v-if="ruleForm.paymentMethod === 6" value="保函" readonly></el-input>
          <el-input v-if="ruleForm.paymentMethod === 9" value="其他" readonly></el-input>
        </el-form-item>
        <el-form-item label="缴费时间：" prop="paymentTime">
          <el-date-picker v-model="ruleForm.paymentTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd HH:mm:ss" readonly>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="缴费标段：">
          <el-table :data="paymentTendersTable" border tooltip-effect="dark" class="" header-cell-class-name="tableheader">
              <el-table-column fixed type="index" width="60" label="序号"></el-table-column>
              <el-table-column prop="bidSectionCode" label="标段编号"></el-table-column>
              <el-table-column prop="bidSectionName" label="标段名称"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="退还金额（元）：">
          <el-input v-model="ruleForm.returnAmount" readonly></el-input>
        </el-form-item>
        <el-form-item label="退还方式：" prop="returnMethod">
          <el-select v-model="ruleForm.returnMethod" placeholder="请选择">
            <el-option v-for="item in paymentList" :key="item.value" :label="item.text" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退还时间：" prop="returnTime">
          <el-date-picker v-model="ruleForm.returnTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" prop="remarks">
          <el-input v-model="ruleForm.remarks"></el-input>
        </el-form-item>
        <el-form-item class="submit-radio">
          <el-button type="primary" @click="submitReturnMtd">提交</el-button>
          <el-button class="cancal" @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {validateMoney} from '@/assets/js/validate'
import {settlementItem} from '@/api/project'
const validMoney = (rule, value, callback) => {
  if (!validateMoney(value)) {
    callback(new Error('请输入正确的金额'))
  } else {
    callback()
  }
}
export default {
  components: {
  },
  data () {
    return {
      pageText: '', // 哪种收支项目退还
      ruleForm: {
        company: '',
        amountPayable: '',
        premiumReceived: '',
        paymentType: '',
        paymentTime: '',
        returnAmount: '',
        returnType: '',
        returnTime: '',
        remarks: '',
        returnMethod: ''
      },
      rules: {
        returnAmount: [{ required: true, message: '请输入退还金额', trigger: 'change' },
          { required: true, trigger: 'change', validator: validMoney }],
        returnMethod: [{ required: true, message: '请选择退还方式', trigger: 'change' }],
        returnTime: [{ required: true, message: '请选择退还时间', trigger: 'change' }]
      },
      paymentList: [
        {value: 1, text: '支付宝'},
        {value: 2, text: '微信'},
        {value: 3, text: '现金'},
        {value: 4, text: '银联'},
        {value: 5, text: '支票'},
        {value: 6, text: '保函'},
        {value: 9, text: '其他'}
      ], // 缴费方式
      paymentTendersTable: []
    }
  },
  watch: {
  },
  created () {
    this.pageText = this.$route.query.text
    this.loadRuleFormData()
  },
  methods: {
    // 获取初始数据
    loadRuleFormData () {
      settlementItem.getSettlementItem(this.$route.params.objectId).then((res) => {
        if (res.data.resCode === '0000') {
          this.ruleForm = res.data.settlementItem
          this.paymentTendersTable = res.data.settlementItem.bidSectionList
          this.ruleForm.paymentTenders = this.paymentTendersTable
          if (!this.ruleForm.returnMethod) {
            this.ruleForm.returnAmount = this.ruleForm.amount
            this.ruleForm.returnMethod = ''
            this.ruleForm.returnTime = ''
          }
        }
      })
    },
    // 提交
    submitReturnMtd () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm('提交后数据将锁定，不允许修改，确认要提交吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              done()
            }
          }).then(() => {
            this.ruleForm.status = 2
            settlementItem.updateSettlementItem(this.ruleForm).then((res) => {
              if (res.data.resCode === '0000') {
                this.$router.go(-1)
              }
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
</style>
<style lang="less">
</style>

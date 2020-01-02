<template>
  <div class="viewdetails">
    <div class="basic-info-title">档案基本信息</div>
    <el-form :model="info" label-width="84px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称：">
            <span>{{info.tenderProjectName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="档案编号：">
            <span>{{info.archivesCode}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目编号：">
            <span>{{info.tenderProjectCode}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="档案管理员：">
            <span>{{info.adminName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="招标人：">
            <span>{{info.bidderName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归档状态：">
            <span v-if="Number(info.archivesStatus) === 0">待归档</span>
            <span v-if="Number(info.archivesStatus) === 1">部分归档</span>
            <span v-if="Number(info.archivesStatus) === 2">全部归档</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="移交人：">
            <span>{{info.lastTransferName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归档时间：">
            <span>{{info.filingTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="档案状态：">
            <span>正常</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="basic-info-title">实物档案信息</div>
    <el-form :model="info" label-width="70px">
      <el-form-item label="档案位置：">
        <span>{{info.detailedLocation}}</span>
      </el-form-item>
      <el-form-item label="档案编号：">
        <span>{{info.physicalNumber}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  props: {
    info: Object,
    isShowTransferRecord: Boolean
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  watch: {
  },
  mounted () {
  }
}
</script>
<style lang="less">
  #file-end {
  }
</style>

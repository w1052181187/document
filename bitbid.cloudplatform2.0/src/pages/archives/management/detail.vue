<template>
  <div class="cloudcontent" id="archives-detail">
    <div class="main">
      <div class="detail-title">{{info.tenderProjectName ? info.tenderProjectName : ''}}</div>
      <el-tabs v-model="activeTab" >
        <el-tab-pane label="档案信息" name="1">
          <archives-info :info="info" :isShowTransferRecord="!isQuery"></archives-info>
        </el-tab-pane>
        <template v-if="isQuery">
          <el-tab-pane label="标段信息" name="2">
            <section-info  :archivesProject="info"></section-info>
          </el-tab-pane>
          <el-tab-pane label="归档文件" name="3">
            <file-pack-download :info="info" :isQuery="true"></file-pack-download>
          </el-tab-pane>
        </template>
        <template v-else>
          <el-tab-pane label="移交记录" name="3">
            <transfer-record :archivesProject="info" :isFormAdd="false"></transfer-record>
          </el-tab-pane>
          <el-tab-pane label="归档文件" name="2">
            <file-pack-download :info="info" :isQuery="isQuery"></file-pack-download>
          </el-tab-pane>
          <el-tab-pane label="查阅记录" name="4">
            <look-record :info="info"></look-record>
          </el-tab-pane>
          <el-tab-pane label="借阅记录" name="5">
            <borrow-record :info="info"></borrow-record>
          </el-tab-pane>
          <el-tab-pane label="清点记录" name="6">
            <inventory-record :info="info"></inventory-record>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {archivesProject} from '@/api/archives'
export default {
  components: {
    transferRecord: resolve => require(['./transferRecord'], resolve),
    archivesInfo: resolve => require(['./archivesInfo.vue'], resolve),
    sectionInfo: resolve => require(['./sectionInfo.vue'], resolve),
    filePackDownload: resolve => require(['./filePackDownload.vue'], resolve),
    lookRecord: resolve => require(['./lookRecord.vue'], resolve),
    borrowRecord: resolve => require(['./borrowRecord.vue'], resolve),
    inventoryRecord: resolve => require(['./inventoryRecord.vue'], resolve)
  },
  data () {
    return {
      isQuery: false,
      title: '',
      activeTab: '1',
      info: {}
    }
  },
  watch: {
    '$route': 'init'
  },
  methods: {
    /**
     * 标段切换
     * @param item
     * @param index
     */
    handleBidClick (item, index) {
      this.activeBid = index
    },
    init () {
      this.isQuery = this.$route.meta.type === 'query'
      // if (this.activeTab === '3') {
      //   this.activeTab = '2'
      // }
      this.activeTab = '1'
      this.getData()
    },
    getData () {
      let isSetRecord = 0
      if (Number(this.$route.query.status) === 1) {
        isSetRecord = 1
      }
      archivesProject.getArchivesInfo(this.$route.params.objectId, isSetRecord).then((res) => {
        if (res.data.resCode === '0000') {
          this.info = res.data.archivesProject
          if (this.isQuery) {
            this.info.archivesInfoList = this.info.archivesInfoList.filter(archivesInfo => Number(archivesInfo.status) === 1)
          } else {
            this.info.archivesInfoList = this.info.archivesInfoList.filter(archivesInfo => Number(archivesInfo.transferStatus) !== 0)
          }
          this.isShow = this.isShow && Number(this.info.status) === 1
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less">
  #archives-detail{
  }
</style>

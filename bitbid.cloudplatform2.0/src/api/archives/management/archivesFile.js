import request from '@/utils/axios/components-axios'

export const archivesFile = {
  /** 查询 */
  getArchivesFileList (params) {
    return request({
      url: `/archives-files`,
      method: 'get',
      params: params
    })
  },
  /** 修改 */
  updateArchivesFile (data) {
    return request({
      url: '/archives-files',
      method: 'put',
      data: data
    })
  },
  /** 删除文件目录 */
  deleteArchivesFile (objectId) {
    return request({
      url: '/archives-files/' + objectId,
      method: 'delete'
    })
  },
  /** 增加 */
  addArchivesFile (data) {
    return request({
      url: '/archives-files',
      method: 'post',
      data: data
    })
  },
  /** 删除归档文件中的附件 */
  deleteEnclosure (fileId) {
    return request({
      url: '/archives-files/deleteEnclosure/' + fileId,
      method: 'delete'
    })
  },
  /** 添加归档文件中的附件 */
  addOrUpdateEnclosure (data) {
    return request({
      url: '/archives-files/addOrUpdateEnclosure',
      method: 'post',
      data: data
    })
  },
  /** 新增或修改公告 */
  savaOrUpdateNotice (data) {
    return request({
      url: '/archives-files/savaOrUpdateNotice',
      method: 'post',
      data: data
    })
  },
  /** 删除 公告 */
  deleteNotice (objectId) {
    return request({
      url: '/archives-files/deleteNotice/' + objectId,
      method: 'delete'
    })
  },
  /** 新增或修改投标人 */
  savaOrUpdateBidder (data) {
    return request({
      url: '/archives-files/savaOrUpdateBidder',
      method: 'post',
      data: data
    })
  },
  /** 删除 投标人 */
  deleteBidder (objectId) {
    return request({
      url: '/archives-files/deleteBidder/' + objectId,
      method: 'delete'
    })
  },
  /** 新增或修改扩展信息 */
  savaOrUpdateArchivesProjectExpands (data) {
    return request({
      url: '/archives-files/savaOrUpdateArchivesProjectExpands',
      method: 'post',
      data: data
    })
  },
  /** 删除 扩展信息 */
  deleteArchivesProjectExpands (objectId) {
    return request({
      url: '/archives-files/deleteArchivesProjectExpands/' + objectId,
      method: 'delete'
    })
  },
  /** 文件打包下载 */
  downloadArchivesFile (data) {
    return request({
      url: '/archives-files/downloadArchivesFile',
      method: 'get',
      data: data
    })
  }
}

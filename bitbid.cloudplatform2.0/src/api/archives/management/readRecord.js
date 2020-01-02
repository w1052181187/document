import request from '@/utils/axios/components-axios'

export const readRecord = {
  /** 查询 */
  getRecordList (params) {
    return request({
      url: `/read-records`,
      method: 'get',
      params: params
    })
  },
  /** 删除 */
  deleteRecord (objectId) {
    return request({
      url: '/read-records/' + objectId,
      method: 'delete'
    })
  },
  /** 修改|更新 */
  saveOrUpdateRecord (data) {
    return request({
      url: '/read-records/',
      method: 'post',
      data: data
    })
  },
  updateToRead (type, userId) {
    return request({
      url: '/read-records/toRead/' + type + '/' + userId,
      method: 'put'
    })
  }
}

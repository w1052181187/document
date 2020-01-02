import request from '@/utils/axios/components-axios'

export const archivesRoom = {
  /** 查询 */
  getArchivesRoomList (params) {
    return request({
      url: `/archives-rooms`,
      method: 'get',
      params: params
    })
  },
  /** 删除 */
  deleteRoom (objectId) {
    return request({
      url: '/archives-rooms/' + objectId,
      method: 'delete'
    })
  },
  /** 修改|更新 */
  saveOrUpdateRoom (data) {
    return request({
      url: '/archives-rooms/',
      method: 'post',
      data: data
    })
  },
  /** 获取管理员 */
  getAdminList () {
    return request({
      url: '/archives-rooms/getAdminList',
      method: 'get'
    })
  },
  /** 获取管理员 */
  getAdminUserList (query) {
    return request({
      url: '/archives-rooms/getAdminUserList',
      method: 'get',
      params: query
    })
  }
}

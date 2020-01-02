import request from '@/utils/axios/components-axios'

export const enterpriseRelationship = {
  /** 全部查询，不分页 */
  queryList (params) {
    return request({
      url: `/enterprise-relationships`,
      method: 'get',
      params
    })
  },
  /** 保存/修改 */
  saveBatch (data) {
    return request({
      url: '/enterprise-relationships/saveBatch',
      method: 'post',
      data
    })
  },
  /** 验证重复 */
  isNoRepeated (params) {
    return request({
      url: `/enterprise-relationships/isNoRepeated`,
      method: 'get',
      params
    })
  }
}

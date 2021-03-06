import request from '@/utils/axios/components-axios'

export const template = {
  /** 查询列表 */
  queryList (params) {
    return request({
      url: `/evaluation-templates`,
      method: 'get',
      params
    })
  },
  /** 根据主键查询 */
  queryOne (params) {
    return request({
      url: `/evaluation-templates/${params}`,
      method: 'get'
    })
  },
  /** 保存/修改 */
  update (data) {
    return request({
      url: '/evaluation-templates',
      method: 'post',
      data
    })
  },
  /** 删除 */
  logoff (params) {
    return request({
      url: `/evaluation-templates/${params}`,
      method: 'delete'
    })
  },
  /** 查询企业下的所有启用的模板 */
  queryAllByEnterId (params) {
    return request({
      url: `/evaluation-templates/queryAllByEnterId`,
      method: 'get',
      params
    })
  },
  /** 验证重复 */
  isNoRepeated (params) {
    return request({
      url: `/evaluation-templates/isNoRepeated`,
      method: 'get',
      params
    })
  }
}

import request from '@/utils/axios/projectflow-axios'

export const winCandidate = {
  /**
   * 列表查询
   * @param {*} query [查询信息]
   */
  getList (query) {
    return request({
      url: '/win-candidate-info',
      method: 'get',
      params: query
    })
  }
}

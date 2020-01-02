import request from '@/utils/axios/projectflow-axios'

export const resultInfo = {
  /**
   * 结果信息列表查询
   * @param {*} query [查询信息]
   */
  getList (query) {
    return request({
      url: '/result-info',
      method: 'get',
      params: query
    })
  },
  /**
   * 没有投标报名信息时查询1.资格预审文件递交信息；2.投标文件递交信息
   * @param {*} query [查询信息]
   */
  bidderList (query) {
    return request({
      url: '/result-info/bidderList',
      method: 'get',
      params: query
    })
  },
  /**
   * 结果信息详情查询
   * @param {[long]} id [主键Id]
   */
  getById (id) {
    return request({
      url: '/result-info/' + id,
      method: 'get'
    })
  },
  /**
   * 新增/修改结果信息
   * @param {*} data [主体数据]
   */
  update (data) {
    return request({
      url: '/result-info',
      method: 'put',
      data
    })
  },
  /**
   * 删除结果信息
   * @param {[long]} id [主键]
   */
  deleteById (id) {
    return request({
      url: '/result-info/' + id,
      method: 'delete'
    })
  },
  /**
   * 发出
   * @param {[long]} id [主键]
   */
  gdIssue (id) {
    return request({
      url: '/result-info/gdIssue/' + id,
      method: 'put'
    })
  }
}

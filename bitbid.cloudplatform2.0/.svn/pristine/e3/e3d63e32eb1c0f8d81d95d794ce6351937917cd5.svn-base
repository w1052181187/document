import request from '@/utils/axios/projectflow-axios'

export const winBiddingConfirmationLetter = {

  /**
   * 查询接口
   */
  getList (query) {
    return request({
      url: '/winBiddingConfirmationLetter-infos',
      method: 'get',
      params: query
    })
  },
  /**
   * 新增接口
   * @param {*} data [主体数据]
   */
  save (data) {
    return request({
      url: '/winBiddingConfirmationLetter-infos',
      method: 'post',
      data: data
    })
  },
  /**
   * 删除接口
   * @param {[long]} id [主键]
   */
  delete (id) {
    return request({
      url: '/winBiddingConfirmationLetter-infos/' + id,
      method: 'delete'
    })
  },
  /**
   * 查询单条公告接口
   */
  getOne (code) {
    return request({
      url: '/winBiddingConfirmationLetter-infos/' + code,
      method: 'get'
    })
  },
  /**
   * 获取中标人信息
   */
  getWinCandidateList (query) {
    return request({
      url: '/winBiddingConfirmationLetter-infos/queryWinCandidateList',
      method: 'get',
      params: query
    })
  }
}

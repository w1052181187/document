import request from '@/utils/axios/up-axios'

export const base = {
  // 注册用户
  regist (data) {
    return request({
      url: '/regist',
      method: 'post',
      data: data
    })
  },
  // 登录
  login (data) {
    return request({
      url: '/login',
      method: 'post',
      data: data
    })
  },
  getLoginInfo: (data) => {
    return request({
      url: '/getLoginInfo',
      method: 'get',
      data: data
    })
  },
  // 退出
  logout () {
    return request({
      url: '/logout',
      method: 'post'
    })
  },
  // 发送短信验证码
  sendVerCode (data) {
    return request({
      url: '/sendVerCode',
      method: 'post',
      data
    })
  },
  // 找回(重置)密码
  resetPwd (data) {
    return request({
      url: `/resetPwd`,
      method: 'post',
      data
    })
  },
  // 验证验证码是否正确
  authCode (data) {
    return request({
      url: '/authCode',
      method: 'post',
      data
    })
  },
  // 修改密码
  updatePwd (data) {
    return request({
      url: '/updatePwd',
      method: 'post',
      data
    })
  }
}

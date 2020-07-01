import request from '@/utils/request'

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function findGeneralCoupon(data) {
  return request({
    url: '/wash/findGeneralCoupon',
    method: 'post',
    data: data
  })
}

export function batchCouponImport(data) {
    return request({
      url: '/wash/batchCouponImport',
      method: 'post',
      data: data
    })
}

export function findCompanyInfos(data) {
  return request({
    url: '/wash/findCompanyInfos',
    method: 'post',
    data: data
  })
}

export function delGeneralCouponById(data) {
  return request({
    url: '/wash/delGeneralCouponById',
    method: 'post',
    data: data
  })
}

export function saveGeneralCoupon(data) {
  return request({
    url: '/wash/saveGeneralCoupon',
    method: 'post',
    data: data
  })
}

export function modifyGeneralCouponById(data) {
  return request({
    url: '/wash/modifyGeneralCouponById',
    method: 'post',
    data: data
  })
}

export function findCarwashType(data) {
  return request({
    url: '/wash/findCarwashType',
    method: 'post',
    data: data
  })
}

export function generateGeneralCouponcode(data) {
  return request({
    url: '/wash/generateGeneralCouponcode',
    method: 'post',
    data: data
  })
}
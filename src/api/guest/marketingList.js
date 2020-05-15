import request from '@/utils/request'

export function findYuyueCoupons(data) {
  return request({
    url: '/coupon/findYuyueCoupons',
    method: 'post',
    data
  })
}

export function deleteYuyueCouponsById(data) {
    return request({
      url: 'coupon/deleteYuyueCouponsById',
      method: 'post',
      data
    })
}
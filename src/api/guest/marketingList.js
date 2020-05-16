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
      url: '/coupon/deleteYuyueCouponsById',
      method: 'post',
      data
    })
}

export function saveYuyueCoupons(data) {
  return request({
    url: '/coupon/saveYuyueCoupons',
    method: 'post',
    data
  })
}

export function updateYuyueCoupons(data) {
  return request({
    url: '/coupon/updateYuyueCoupons',
    method: 'post',
    data
  })
}

export function saveYuyueCouponscode(data) {
  return request({
    url: '/coupon/saveYuyueCouponscode',
    method: 'post',
    data
  })
}

export function getYuyueCouponscodeByCid(data) {
  return request({
    url: '/coupon/getYuyueCouponscodeByCid',
    method: 'post',
    data
  })
}

export function deleteYuyueCouponscode(data) {
  return request({
    url: '/coupon/deleteYuyueCouponscode',
    method: 'post',
    data
  })
}
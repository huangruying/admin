import request from '@/utils/request'

export function findYyProductBearercardor(data) {
  return request({
    url: '/wash/bearercard/findYyProductBearercardor',
    method: 'post',
    data
  })
}

export function findYyBearercardByPid(data) {
    return request({
      url: '/wash/bearercard/findYyBearercardByPid',
      method: 'post',
      data
    })
}

export function delYyBearercardById(data) {
    return request({
      url: '/wash/bearercard/delYyBearercardById',
      method: 'post',
      data
    })
}

export function updateYyBearercardByState(data) {
  return request({
    url: '/wash/bearercard/updateYyBearercardByState',
    method: 'post',
    data
  })
}
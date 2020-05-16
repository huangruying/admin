import request from '@/utils/request'

export function findYyBearercardorderInfos(data) {
  return request({
    url: '/bearercard/findYyBearercardorderInfos',
    method: 'post',
    data
  })
}

export function delYyBearercardorderById(data) {
    return request({
      url: '/bearercard/delYyBearercardorderById',
      method: 'post',
      data
    })
}
import request from '@/utils/request'

export function findYyExchangelogInfos(data) {
  return request({
    url: '/wash/bearercard/findYyExchangelogInfos',
    method: 'post',
    data
  })
}

export function delYyExchangelog(data) {
    return request({
      url: '/wash/bearercard/delYyExchangelog',
      method: 'post',
      data
    })
}
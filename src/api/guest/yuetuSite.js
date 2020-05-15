import request from '@/utils/request'

export function listStationsNameInfos(data) {
  return request({
    url: '/station/listStationsNameInfos',
    method: 'post',
    data
  })
}

export function delStationsNameInfo(data) {
    return request({
      url: '/station/delStationsNameInfo',
      method: 'post',
      data
    })
}

export function findYuyueProvinces(data) {
    return request({
      url: '/wash/findYuyueProvinces',
      method: 'get',
      params: data
    })
}

export function findYuyueCityByProvinceid(data) {
    return request({
      url: '/wash/findYuyueCityByProvinceid',
      method: 'get',
      params: data
    })
}

export function updateYuyueStationInfo(data) {
    return request({
      url: '/station/updateYuyueStationInfo',
      method: 'post',
      data: data
    })
}

export function saveYuyueStationInfo(data) {
    return request({
      url: '/station/saveYuyueStationInfo',
      method: 'post',
      data: data
    })
}
import { get } from '@utils/request'

export async function getIcons(params) {
  const result = await get(`/json/query`, params)

  return {
    count: result.count,
    data: result.icons,
  }
}

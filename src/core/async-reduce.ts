/*
 * @Author: saber2pr
 * @Date: 2019-06-19 13:00:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 13:01:18
 */
export const async_reduce = async <T, R>(
  items: T[],
  reducer: (receiver: R, value: T) => Promise<R>,
  initValue: R
) => {
  for (const item of items) initValue = await reducer(initValue, item)

  return initValue
}

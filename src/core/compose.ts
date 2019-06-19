/*
 * @Author: saber2pr
 * @Date: 2019-06-19 11:16:35
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-06-19 11:16:35
 */
export const compose = <T>(...fns: ((v: T) => T)[]) => (v: T) =>
  fns.reduce((a, b) => b(a), v)

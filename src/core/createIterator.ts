/*
 * @Author: saber2pr
 * @Date: 2019-06-19 11:24:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 11:25:07
 */
export const createIterator = (reg: RegExp) =>
  function*(text: string) {
    let current: RegExpExecArray
    while ((current = reg.exec(text))) {
      yield current[0]
    }
  }

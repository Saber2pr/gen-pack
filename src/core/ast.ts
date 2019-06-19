/*
 * @Author: saber2pr
 * @Date: 2019-06-18 22:15:57
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 10:59:31
 */
export interface FileNode {
  path: string
  text: string
  deps: string[]
  mapping?: {
    [name: string]: number
  }
}

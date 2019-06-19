/*
 * @Author: saber2pr
 * @Date: 2019-06-19 10:19:29
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 13:04:43
 */
import { FS } from '@saber2pr/node'
import { join, dirname, extname } from 'path'

export async function resolve_node(pkg: string) {
  const pkg_path = join(`node_modules/${pkg}`, 'package.json')
  const buffer = await FS.readFile(pkg_path)
  const pkg_infor = JSON.parse(buffer.toString())

  const pkg_entry: string = pkg_infor.main

  return join(dirname(pkg_path), pkg_entry.replace(extname(pkg_entry), ''))
}

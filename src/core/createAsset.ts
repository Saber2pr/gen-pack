/*
 * @Author: saber2pr
 * @Date: 2019-06-19 10:19:40
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 12:57:20
 */
import { FS } from '@saber2pr/node'
import { FileNode } from './ast'
import { getImports } from './getImports'
import { dirname, join, extname } from 'path'
import { resolve_node } from './resolve-node'
import { compose } from './compose'
import { async_reduce } from './async-reduce'

export async function createAsset(path: string): Promise<FileNode> {
  const buffer = await FS.readFile(path)

  const absolutify = (dep: string) =>
    dep.startsWith('.') ? join(dirname(path), dep) : dep

  const setExt = (s: string) => s + extname(path)
  const verifyName = compose(
    absolutify,
    setExt
  )

  const text = buffer.toString()

  const imports = getImports(text)

  const deps = await Promise.all(imports.map(dep => resolveDep(dep))).then(
    deps => deps.map(verifyName)
  )

  const mapping = await async_reduce(
    imports,
    async (receiver, dep) => ({
      ...receiver,
      [dep]: verifyName(await resolveDep(dep))
    }),
    {}
  )

  return {
    path,
    text,
    deps,
    mapping
  }
}

const resolveDep = (s: string) => (!s.startsWith('.') ? resolve_node(s) : s)

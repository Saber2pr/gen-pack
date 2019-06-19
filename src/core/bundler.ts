/*
 * @Author: saber2pr
 * @Date: 2019-06-19 10:19:45
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-19 11:21:03
 */
import { FileNode } from './ast'

export function bundle(graph: FileNode[]) {
  let modules = graph.reduce(
    (receiver, mod) =>
      receiver.concat(`"${mod.path}": [
    function (require, module, exports){
      ${mod.text}
    },
    ${JSON.stringify(mod.mapping)},
  ],`),
    ''
  )

  return `
  ;(function(modules){
    function require(id){
      const [fn, mapping] = modules[id];
      function localRequire(relativePath){
        return require(mapping[relativePath]);
      }
      const module = {exports:{}};
      fn(localRequire,module,module.exports);
      return module.exports;
    }
    require("${graph[0].path}");
  })({${modules}});`
}

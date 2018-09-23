import * as essentials from 'witness-essentials-package'
import * as dsteem from 'dsteem'
const _g = require('./_g')
const config = _g.config

export let update_witness = async (key: string, node: string = '', retries = 0) => {
  try {
    let client = _g.client
    if(node) client = new dsteem.Client(node, { timeout: 8 * 1000 })

    await essentials.update_witness(client, key, _g.witness_data, process.env.ACTIVE_KEY)
  } catch (error) {
    console.error(error)
    if (retries < 2) {
      await essentials.timeout(1)
      await update_witness(key, node, retries += 1)
    } else {
      failover()
      await update_witness(key, node, 0)
    }
  }
}

export let get_witness = async (node: string = '', retries = 0) => {
  try {
    let client = _g.client
    if(node) client = new dsteem.Client(node, { timeout: 8 * 1000 })

    return await essentials.get_witness_by_account(client, _g.witness_data.witness)
  } catch (error) {
    console.error(error)
    if (retries < 2) {
      await essentials.timeout(1)
      await get_witness(node, retries += 1)
    } else {
      failover()
      await get_witness(node, 0)
    }
  }
}

export let failover = async () => {
  _g.current_node = essentials.failover_node(_g.config.RPC_NODES, _g.current_node)
  essentials.log(`Switched Node: ${_g.current_node}`)
  _g.client = new dsteem.Client(_g.current_node, { timeout: 8 * 1000 })
}
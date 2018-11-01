import * as essentials from 'witness-essentials-package'
import * as dsteem from 'dsteem'
const _g = require('./_g')

interface Options {
  node?: string,
  retries?: number,
  set_properties?: boolean
}

export let update_witness = async (current_signing_key: string, transaction_signing_key: string, props: dsteem.utils.WitnessProps, options: Options = {}) => {
  try {
    if (!options.retries) options.retries = 0

    let client = _g.client
    if (options.node) client = new dsteem.Client(options.node, { timeout: 8 * 1000 })

    if (options.set_properties) {
      await essentials.witness_set_properties(client, _g.witness_data.witness, current_signing_key, props, transaction_signing_key)
    } else {
      await essentials.update_witness(client, props.new_signing_key.toString(), _g.witness_data, transaction_signing_key)
    }

  } catch (error) {
    console.error(error)
    if (options.retries < 2) {
      await essentials.timeout(1)
      options.retries += 1
      await update_witness(current_signing_key, transaction_signing_key, props, options)
    } else {
      failover()
      options.retries = 0
      await update_witness(current_signing_key, transaction_signing_key, props, options)
    }
  }
}

export let get_witness = async (options: Options = { retries: 0 }) => {
  try {
    if (!options.retries) options.retries = 0

    let client = _g.client
    if (options.node) client = new dsteem.Client(options.node, { timeout: 8 * 1000 })

    let witness = await essentials.get_witness_by_account(client, _g.witness_data.witness)
    return witness
  } catch (error) {
    console.error(error)
    if (options.retries < 2) {
      await essentials.timeout(1)
      options.retries += 1
      await get_witness(options)
    } else {
      failover()
      options.retries = 0
      await get_witness(options)
    }
  }
}

export let failover = async () => {
  _g.current_node = essentials.failover_node(_g.config.RPC_NODES, _g.current_node)
  essentials.log(`Switched Node: ${_g.current_node}`)
  _g.client = new dsteem.Client(_g.current_node, { timeout: 8 * 1000 })
}
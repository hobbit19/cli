import { update_witness, get_witness } from '../helpers'
const _g = require('../_g')

export let cmd_update_key = async (key: string, node: string) => {
  let res = await get_witness(node)
  _g.witness_data.props = res.props
  _g.witness_data.url = res.url
  _g.ORIG_KEY = res.signing_key

  if(!key.startsWith('STM')) return console.log('Invalid Key')

  await update_witness(key, node)
}
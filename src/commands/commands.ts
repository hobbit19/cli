import { update_witness, get_witness } from '../helpers'
import * as essentials from 'witness-essentials-package'
const _g = require('../_g')

export let cmd_update_key = async (key: string, node: string) => {
  let set_properties = false

  let res = await get_witness({ node })
  _g.witness_data.props = res.props
  _g.witness_data.url = res.url
  _g.CURRENT_SIGNING_KEY =  res.signing_key

  if (!key || !key.startsWith('ST')) return console.log('Invalid Key')

  let transaction_signing_key = essentials.choose_transaction_key(res.signing_key, _g.config.SIGNING_KEYS)

  if(!transaction_signing_key || res.signing_key.slice(-39) === '1111111111111111111111111111111114T1Anm') {
    if(!process.env.ACTIVE_KEY) {
      console.error(`Invalid Signing Key Pairs in config. Or witness is disabled, which requires your private active key.`)
      return
    }
    transaction_signing_key = process.env.ACTIVE_KEY
  } else {
    set_properties = true
  }

  let props:any = { new_signing_key: key }
  await update_witness(_g.CURRENT_SIGNING_KEY, transaction_signing_key, props, { set_properties } )
}
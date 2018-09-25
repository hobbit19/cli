const convict = require('convict')

let config = convict({
  RPC_NODES: {
    doc: 'Array of RPC-Nodes',
    format: '*',
    default: [
      "https://api.steemitstage.com",
      "https://steemd.privex.io",
      "https://gtg.steem.house:8090",
      "https://rpc.buildteam.io",
      "https://steemd.minnowsupportproject.org"
    ],
    arg: "rpc"
  },
  WITNESS: {
    doc: 'Witness Name',
    format: String,
    default: 'witness-name',
    arg: 'witness'
  },
  SIGNING_KEYS: {
    doc: 'Signing key pairs based on public and private',
    format: Array,
    default: [ { public: '', private: '' }]
  }
})

config.loadFile('./configs/config.json')
config.validate({ allowed: 'strict' })

module.exports = config
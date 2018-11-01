"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dsteem = require("dsteem");
exports.NULL_KEY = 'STM1111111111111111111111111111111114T1Anm';
exports.CURRENT_SIGNING_KEY = '';
exports.ACTIVE_KEY = '';
exports.USED_SIGNING_KEYS = [];
exports.CURRENT_BACKUP_KEY = '';
exports.config = require('../configs/config.js').get();
exports.current_node = exports.config.RPC_NODES[0];
exports.client = new dsteem.Client(exports.current_node, { timeout: 8 * 1000 }); //TESTNET: dsteem.Client.testnet({ timeout: 8 * 1000 })
exports.witness_data = {
    witness: exports.config.WITNESS,
    props: exports.config.PROPS || {
        key: '', account_creation_fee: '3.000 STEEM', maximum_block_size: 65536, sbd_interest_rate: 0
    },
    url: 'https://steemit.com'
};
//# sourceMappingURL=_g.js.map
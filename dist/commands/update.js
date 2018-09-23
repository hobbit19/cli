"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const readline = require("readline-sync");
const helpers_1 = require("../helpers");
const _g = require('../_g');
let start = () => __awaiter(this, void 0, void 0, function* () {
    let node = process.argv[2];
    let res = yield helpers_1.get_witness(node);
    _g.witness_data.props = res.props;
    _g.witness_data.url = res.url;
    _g.ORIG_KEY = res.signing_key;
    if (!read())
        return;
    yield helpers_1.update_witness(_g.ORIG_KEY, node);
    console.log(`Update was sucessful. Exiting now.`);
});
let read = () => {
    let witness_url = readline.question(`What should be the witness URL? [${_g.witness_data.url}] : `);
    let account_creation_fee = Number(readline.question(`How high should be the account creation fee? (number only - without STEEM) [${_g.witness_data.props.account_creation_fee}] : `));
    let maximum_block_size = Number(readline.question(`How big should be the maximum block size? [${_g.witness_data.props.maximum_block_size}] : `));
    let sbd_interest_rate = Number(readline.question(`How high should be the SBD interest rate? [${_g.witness_data.props.sbd_interest_rate}] : `));
    if (witness_url)
        _g.witness_data.url = witness_url;
    if (account_creation_fee && !isNaN(account_creation_fee))
        _g.witness_data.props.account_creation_fee = `${account_creation_fee.toFixed(3)} STEEM`;
    if (maximum_block_size && !isNaN(maximum_block_size))
        _g.witness_data.props.maximum_block_size = maximum_block_size;
    if (sbd_interest_rate >= 0 && !isNaN(sbd_interest_rate))
        _g.witness_data.props.sbd_interest_rate = sbd_interest_rate;
    console.log('\nConfiguration:\n----------------');
    console.log(_g.witness_data);
    let b = readline.keyInYN(`\nDo you want to update your witness now?`);
    return b;
};
start();
//# sourceMappingURL=update.js.map
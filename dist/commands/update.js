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
const essentials = require("witness-essentials-package");
const helpers_1 = require("../helpers");
const _g = require('../_g');
let set_properties = false;
let props = {};
let start = () => __awaiter(this, void 0, void 0, function* () {
    let node = process.argv[2];
    let res = yield helpers_1.get_witness({ node });
    _g.witness_data.props = res.props;
    _g.witness_data.url = res.url;
    _g.CURRENT_SIGNING_KEY = res.signing_key;
    if (!read())
        return;
    let transaction_signing_key = essentials.choose_transaction_key(res.signing_key, _g.config.ACTIVE_KEY, _g.config.SIGNING_KEYS);
    if (!transaction_signing_key) {
        if (set_properties) {
            return console.error(`Invalid Signing Key Pairs in config. Or witness is disabled, which requires your private active key.`);
        }
        else {
            return console.error(`Invalid Signing Key Pairs in config AND no Private Key in .env`);
        }
    }
    else {
        set_properties = transaction_signing_key !== _g.config.ACTIVE_KEY;
    }
    yield helpers_1.update_witness(res.signing_key, transaction_signing_key, props, { set_properties });
    console.log(`Update was sucessful. Exiting now.`);
});
let read = () => {
    let witness_url = readline.question(`witness_url? [${_g.witness_data.url}] : `);
    let account_creation_fee = readline.question(`account_creation_fee? (number only - without STEEM) [${_g.witness_data.props.account_creation_fee}] : `);
    let maximum_block_size = readline.question(`maximum_block_size? [${_g.witness_data.props.maximum_block_size}] : `);
    let sbd_interest_rate = readline.question(`sbd_interest_rate? [${_g.witness_data.props.sbd_interest_rate}] : `);
    let account_subsidy_budget = Number(readline.question(`account_subsidy_budget? [${_g.witness_data.props.account_subsidy_budget}] : `));
    let account_subsidy_decay = Number(readline.question(`account_subsidy_decay? [${_g.witness_data.props.account_subsidy_decay}] : `));
    let new_signing_key = readline.question(`new_signing_key? [${_g.CURRENT_SIGNING_KEY}] : `);
    if (witness_url) {
        props.url = _g.witness_data.url = witness_url;
    }
    if (account_creation_fee && !isNaN(Number(account_creation_fee))) {
        props.account_creation_fee = _g.witness_data.props.account_creation_fee = `${Number(account_creation_fee).toFixed(3)} STEEM`;
    }
    if (maximum_block_size && !isNaN(Number(maximum_block_size))) {
        props.maximum_block_size = _g.witness_data.props.maximum_block_size = Number(maximum_block_size);
    }
    if (sbd_interest_rate !== '' && sbd_interest_rate >= 0 && sbd_interest_rate !== _g.witness_data.props.sbd_interest_rate && !isNaN(Number(sbd_interest_rate))) {
        props.sbd_interest_rate = _g.witness_data.props.sbd_interest_rate = Number(sbd_interest_rate);
    }
    if (account_subsidy_budget && !isNaN(Number(account_subsidy_budget))) {
        props.account_subsidy_budget = Number(account_subsidy_budget);
        set_properties = true;
    }
    if (account_subsidy_decay && !isNaN(Number(account_subsidy_decay))) {
        props.account_subsidy_decay = Number(account_subsidy_decay);
        set_properties = true;
    }
    if (new_signing_key) {
        props.new_signing_key = new_signing_key;
        set_properties = true;
    }
    if (Object.keys(props).length <= 0) {
        console.log(`\nNothing to be updated`);
        process.exit();
    }
    console.log('\Changes:\n----------------');
    console.log(props);
    let b = readline.keyInYN(`\nDo you want to update your witness now?`);
    return b;
};
start();
//# sourceMappingURL=update.js.map
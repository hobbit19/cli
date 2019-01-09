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
const helpers_1 = require("../helpers");
const essentials = require("witness-essentials-package");
const _g = require("../_g");
exports.cmd_update_key = (key, node, rotate = false) => __awaiter(this, void 0, void 0, function* () {
    let set_properties = false;
    // Get Initial Witness Object
    let res = yield helpers_1.get_witness({ node });
    _g.witness_data.props = res.props;
    _g.witness_data.url = res.url;
    _g.CURRENT_SIGNING_KEY = res.signing_key;
    // If key should be rotated
    if (!key && rotate) {
        let next_key = essentials.get_next_key(_g.config.SIGNING_KEYS, _g.CURRENT_SIGNING_KEY, true);
        key = next_key.public;
    }
    // If not key has been given without wanting to rotate
    if (!key || !key.startsWith('ST'))
        return console.log('Invalid Key');
    // Get the private key from either the signing keys or the active key
    let transaction_signing_key = essentials.choose_transaction_key(res.signing_key, _g.config.ACTIVE_KEY, _g.config.SIGNING_KEYS);
    if (!transaction_signing_key) {
        // Request input of active key from user
        transaction_signing_key = helpers_1.request_active_key(transaction_signing_key);
        if (!transaction_signing_key)
            return console.error(`Invalid Signing Key Pairs in config. Or witness is disabled, which requires your private active key.`);
    }
    else {
        set_properties = transaction_signing_key !== _g.config.ACTIVE_KEY;
    }
    // Update witness
    let props = { new_signing_key: key };
    yield helpers_1.update_witness(_g.CURRENT_SIGNING_KEY, transaction_signing_key, props, { set_properties });
    return key;
});
//# sourceMappingURL=commands.js.map
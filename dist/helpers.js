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
const essentials = require("witness-essentials-package");
const dsteem = require("dsteem");
const _g = require('./_g');
exports.update_witness = (current_signing_key, transaction_signing_key, props, options = {}) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!options.retries)
            options.retries = 0;
        let client = _g.client;
        if (options.node)
            client = new dsteem.Client(options.node, { timeout: 8 * 1000 });
        if (options.set_properties) {
            yield essentials.witness_set_properties(client, _g.witness_data.witness, current_signing_key, props, transaction_signing_key);
        }
        else {
            yield essentials.update_witness(client, props.new_signing_key.toString(), _g.witness_data, transaction_signing_key);
        }
    }
    catch (error) {
        console.error(error);
        if (options.retries < 2) {
            yield essentials.timeout(1);
            options.retries += 1;
            yield exports.update_witness(current_signing_key, transaction_signing_key, props, options);
        }
        else {
            exports.failover();
            options.retries = 0;
            yield exports.update_witness(current_signing_key, transaction_signing_key, props, options);
        }
    }
});
exports.get_witness = (options = { retries: 0 }) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!options.retries)
            options.retries = 0;
        let client = _g.client;
        if (options.node)
            client = new dsteem.Client(options.node, { timeout: 8 * 1000 });
        let witness = yield essentials.get_witness_by_account(client, _g.witness_data.witness);
        return witness;
    }
    catch (error) {
        console.error(error);
        if (options.retries < 2) {
            yield essentials.timeout(1);
            options.retries += 1;
            yield exports.get_witness(options);
        }
        else {
            exports.failover();
            options.retries = 0;
            yield exports.get_witness(options);
        }
    }
});
exports.failover = () => __awaiter(this, void 0, void 0, function* () {
    _g.current_node = essentials.failover_node(_g.config.RPC_NODES, _g.current_node);
    essentials.log(`Switched Node: ${_g.current_node}`);
    _g.client = new dsteem.Client(_g.current_node, { timeout: 8 * 1000 });
});
//# sourceMappingURL=helpers.js.map
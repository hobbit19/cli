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
const config = _g.config;
exports.update_witness = (key, node = '', retries = 0) => __awaiter(this, void 0, void 0, function* () {
    try {
        let client = _g.client;
        if (node)
            client = new dsteem.Client(node, { timeout: 8 * 1000 });
        yield essentials.update_witness(client, key, _g.witness_data, process.env.ACTIVE_KEY);
    }
    catch (error) {
        console.error(error);
        if (retries < 2) {
            yield essentials.timeout(1);
            yield exports.update_witness(key, node, retries += 1);
        }
        else {
            exports.failover();
            yield exports.update_witness(key, node, 0);
        }
    }
});
exports.get_witness = (node = '', retries = 0) => __awaiter(this, void 0, void 0, function* () {
    try {
        let client = _g.client;
        if (node)
            client = new dsteem.Client(node, { timeout: 8 * 1000 });
        return yield essentials.get_witness_by_account(client, _g.witness_data.witness);
    }
    catch (error) {
        console.error(error);
        if (retries < 2) {
            yield essentials.timeout(1);
            yield exports.get_witness(node, retries += 1);
        }
        else {
            exports.failover();
            yield exports.get_witness(node, 0);
        }
    }
});
exports.failover = () => __awaiter(this, void 0, void 0, function* () {
    _g.current_node = essentials.failover_node(_g.config.RPC_NODES, _g.current_node);
    essentials.log(`Switched Node: ${_g.current_node}`);
    _g.client = new dsteem.Client(_g.current_node, { timeout: 8 * 1000 });
});
//# sourceMappingURL=helpers.js.map
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
const _g = require('../_g');
exports.cmd_update_key = (key, node) => __awaiter(this, void 0, void 0, function* () {
    let res = yield helpers_1.get_witness(node);
    _g.witness_data.props = res.props;
    _g.witness_data.url = res.url;
    _g.ORIG_KEY = res.signing_key;
    if (!key.startsWith('STM'))
        return console.log('Invalid Key');
    yield helpers_1.update_witness(key, node);
});
//# sourceMappingURL=commands.js.map
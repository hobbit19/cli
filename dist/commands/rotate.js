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
const witness_essentials_package_1 = require("witness-essentials-package");
const commands = require("./commands");
exports.start = () => __awaiter(this, void 0, void 0, function* () {
    let node = process.argv[2];
    let key = yield commands.cmd_update_key('', node, true);
    if (key)
        witness_essentials_package_1.log(`Changed key to ${key}`);
});
exports.start();
//# sourceMappingURL=rotate.js.map
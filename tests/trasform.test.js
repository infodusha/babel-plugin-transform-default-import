const {default: pluginTester} = require('babel-plugin-tester');
const plugin = require('../src/index.js');

pluginTester({
    plugin,
    tests: {
        'skip with no lib': 'import df from "./module.js";',
        'skip with named export': 'import { named } from "module";',
        'skip with namespace export': 'import * as namespace from "module";',
        'skip with default & named export': 'import df, { named } from "module";',
        'changes default import': {
            code: 'import df from "module";',
            snapshot: true,
        },
        'changes default with namespace': {
            code: 'import df, * as namespace from "module";',
            snapshot: true,
        },
        'changes default import with custom options': {
            code: 'import df from "module";',
            snapshot: true,
            pluginOptions: {
                default: 'DF',
                namespace: 'NS',
            },
        },
        'changes default with namespace and custom options': {
            code: 'import df, * as namespace from "module";',
            snapshot: true,
            pluginOptions: {
                default: 'DF',
                namespace: 'NS',
            },
        },
    },
});
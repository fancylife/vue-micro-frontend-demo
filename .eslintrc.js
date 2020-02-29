module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
        "$": true,
        "$t":true,
        "define": true,
        "FSOpen": true
    },
    "plugins": [],
    "extends": ["eslint:recommended","plugin:vue/base"],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "no-mixed-spaces-and-tabs": 0,
        "no-danger": 0,
        "no-debugger": 0
    }
}
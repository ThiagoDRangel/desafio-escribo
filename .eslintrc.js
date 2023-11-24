module.exports = {
    "env": {
        "browser": true,   // Suporte para variáveis globais do navegador
        "commonjs": true,  // Suporte para CommonJS (usado no Node.js)
        "es2021": true,    // Suporte para as funcionalidades mais recentes do ECMAScript
        "node": true       // Adiciona suporte para variáveis globais do Node.js
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest" // Suporte para a versão mais recente do ECMAScript
    },
    "rules": {
        // Aqui você pode adicionar ou sobrescrever regras específicas
    }
};

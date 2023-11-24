# Desafio Backend Escribo

Objetivo:

Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up),
autenticação (sign in) e recuperação de informações do usuário.

### Como utilizar a API `Postman`

1 - Cadastrando um novo usuário `POST http://3.145.41.31:3000/signup`

#### Entrada
```bash
{
  "nome": "Thiago Rangel",
  "email": "thiagorangel@escribo.com",
  "senha": "devescribo",
  "telefones": [
      {
        "numero": "998720889",
        "ddd": "22"
      }
    ]
}
```

![Texto Alternativo](./src/images/signup.png)

2 - Realizando Login `POST http://3.145.41.31:3000/signin`

#### Entrada
```bash
{
  "email": "thiago@escribo.com",
  "senha": "mecontrata"
}
```
![Texto Alternativo](./src/images/signin.png)

3 - Buscando usuário pelo token `GET http://3.145.41.31:3000/user`

> Atenção! É necessário copiar o token do login `signin` e adicionar no `Headers`
> Key: `Authorization` Value: `Bearer token`

![Texto Alternativo](./src/images/user.png)


## Executando a API `localmente`
```bash
git clone git@github.com:ThiagoDRangel/desafio-escribo.git
```

### Acesse a pasta
```bash
cd desafio-escribo
```

### Instale as dependências
```bash
npm install
```

### Utilize o ORM Sequelize para criar o `DB`

#### Crie o banco de dados e a tabela
```bash
npm run prestart
```
#### Popule a tabela com dados iniciais `teste`
```bash
npm run seed
```

#### `Caso precise reiniciar o banco de dados do zero`
```bash
npm run drop
```

### Coloque o servidor no ar `localhost:3000`
```bash
npm start
```

### Execute os testes a qualquer momento
```bash
npm test
```
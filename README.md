# CQRS - Teste Arch

<p>🚀 Aplicação voltada para criação de transação e consulta saldo</p>

# Status da Aplicação
<p>🔥 Aplicação Finalizada</p>

# Features
- Criação de Transação
- Consulta de Saldo

# Tecnologias
- Typescript
- Node
- MongoDB
- Redis
- Jest

# Clonagem

Para executar a aplicação, você precisa instalar o Docker em sua máquina, após isso rode o seguinte comando:
```sh
  git clone https://github.com/JPedro910/test-arch.git
```
# Execução

Após clonar a aplicação, entre em sua pasta e rode o seguinte comando:
```sh
  docker-compose up
```

# Testes

- A aplicação conta com testes unitários, de integração e E2E

Para rodar os testes do api de transanção rode o seguinte comando:
```sh
  docker exec -i transaction-api-container-joao-pedro-mns yarn test --watchAll
```

Para rodar os testes do api de saldo rode o seguinte comando:
```sh
  docker exec -i balance-api-container-joao-pedro-mns yarn test --watchAll
```

# Observações

- A pasta balance contém a api de consulta de saldo e a pasta transaction contém a api de criação de transação
- O cache na memória está configurado para 300 milessegundos (5 minutos), com isso se forem feitas duas transações em seguida o valor só se atualizará depois de
cinco minutos, para mudar esse valor vá até a pasta balance/src/classes/Facade/Factory.ts e na função "this.cache.set(`account-${accountId}`, totalBalance, 300);",
mude o último argumento para 1, você tem que mudar as duas vezes em que essa função é declarada.
- Se os testes forem feitos sem a flag --watchAll ocorrerá um aviso do jest, pois a conexão do redis não pode ser encerrada, por conta dela estar em um container,
esse aviso não acarreta em nenhum problema ou bug na aplicação.

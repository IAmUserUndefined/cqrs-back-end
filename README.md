# CQRS - Back-end

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

# Critérios de Aceite - Cadastro de Usuário

## 1. Campos Obrigatórios

### Critério 1.1 - Validar mensagem de erro para Nome Completo vazio

Dado que estou na página de cadastro
Quando deixo o campo "Nome Completo" vazio
E clico em validar ou enviar o formulário
Então devo ver a mensagem "Nome completo é obrigatório"

### Critério 1.2 - Validar mensagem de erro para Email vazio

Dado que estou na página de cadastro
Quando deixo o campo "Email" vazio
E clico em validar ou enviar o formulário
Então devo ver a mensagem "Email é obrigatório"

### Critério 1.3 - Validar mensagem de erro para Senha vazia

Dado que estou na página de cadastro
Quando deixo o campo "Senha" vazio
E clico em validar ou enviar o formulário
Então devo ver a mensagem "Senha é obrigatória"

### Critério 1.4 - Validar mensagem de erro para Confirmação de Senha vazia

Dado que estou na página de cadastro
Quando deixo o campo "Confirmação de Senha" vazio
E clico em validar ou enviar o formulário
Então devo ver a mensagem "Confirmação de senha é obrigatória"

---

## 2. Validação de Email

### Critério 2.1 - Email inválido: formato sem domínio

Dado que estou no campo de email
Quando digito "test"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Formato de email inválido"

### Critério 2.2 - Email inválido: falta o domínio

Dado que estou no campo de email
Quando digito "test@"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Formato de email inválido"

### Critério 2.3 - Email inválido: falta a extensão

Dado que estou no campo de email
Quando digito "test@domain"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Formato de email inválido"

### Critério 2.4 - Email inválido: falta o usuário

Dado que estou no campo de email
Quando digito "@domain.com"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Formato de email inválido"

### Critério 2.5 - Email inválido: pontos duplos no usuário

Dado que estou no campo de email
Quando digito "test..email@domain.com"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Formato de email inválido"

### Critério 2.6 - Email inválido: pontos duplos no domínio

Dado que estou no campo de email
Quando digito "test@domain..com"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Formato de email inválido"

### Critério 2.7 - Email inválido: domínio vazio

Dado que estou no campo de email
Quando digito "test@.com"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Formato de email inválido"

### Critério 2.8 - Email válido é aceito

Dado que estou no campo de email
Quando digito um email válido como "joao.silva@test.com"
E saio do campo
Então nenhuma mensagem de erro deve aparecer

---

## 3. Validação de Nome Completo

### Critério 3.1 - Nome vazio

Dado que estou no campo de nome completo
Quando deixo o campo vazio
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Nome completo é obrigatório"

### Critério 3.2 - Nome com apenas espaços

Dado que estou no campo de nome completo
Quando digito apenas espaços " "
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Nome completo é obrigatório"

### Critério 3.3 - Nome com 2 caracteres

Dado que estou no campo de nome completo
Quando digito "Jo"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Nome deve ter no mínimo 3 caracteres"

### Critério 3.4 - Nome com 1 caractere

Dado que estou no campo de nome completo
Quando digito "J"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Nome deve ter no mínimo 3 caracteres"

### Critério 3.5 - Nome com 101+ caracteres

Dado que estou no campo de nome completo
Quando digito um nome com mais de 100 caracteres
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Nome deve ter no máximo 100 caracteres"

### Critério 3.6 - Nome com apenas números

Dado que estou no campo de nome completo
Quando digito "12345"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Nome deve conter apenas letras"

### Critério 3.7 - Nome com letras e números

Dado que estou no campo de nome completo
Quando digito "João123"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Nome deve conter apenas letras"

### Critério 3.8 - Nome com caracteres especiais não permitidos

Dado que estou no campo de nome completo
Quando digito "João@#$"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Nome deve conter apenas letras e espaços"

### Critério 3.9 - Nome válido é aceito

Dado que estou no campo de nome completo
Quando digito um nome válido como "João Silva"
E saio do campo
Então nenhuma mensagem de erro deve aparecer

---

## 4. Validação de Senha

### Critério 4.1 - Senha vazia

Dado que estou no campo de senha
Quando deixo o campo vazio
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senha é obrigatória"

### Critério 4.2 - Senha com apenas espaços

Dado que estou no campo de senha
Quando digito apenas espaços " "
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senha é obrigatória"

### Critério 4.3 - Senha com 3 caracteres

Dado que estou no campo de senha
Quando digito "123"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senha deve ter no mínimo 6 caracteres"

### Critério 4.4 - Senha com 5 caracteres

Dado que estou no campo de senha
Quando digito "12345"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senha deve ter no mínimo 6 caracteres"

### Critério 4.5 - Senha com apenas letras

Dado que estou no campo de senha
Quando digito "password"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senha deve conter letras e números"

### Critério 4.6 - Senha com apenas números

Dado que estou no campo de senha
Quando digito "123456"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senha deve conter letras e números"

### Critério 4.7 - Senha com apenas maiúsculas

Dado que estou no campo de senha
Quando digito "PASSWORD"
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senha deve conter letras e números"

### Critério 4.8 - Senha válida é aceita

Dado que estou no campo de senha
Quando digito uma senha válida como "Teste@123"
E saio do campo
Então nenhuma mensagem de erro deve aparecer

---

## 5. Validação de Confirmação de Senha

### Critério 5.1 - Confirmação de senha vazia

Dado que preenchi o campo de senha com "Teste@123"
Quando deixo o campo "Confirmação de Senha" vazio
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Confirmação de senha é obrigatória"

### Critério 5.2 - Senhas não conferem: caractere diferente

Dado que preenchi o campo de senha com "Teste@123"
Quando digito "Teste@124" no campo de confirmação
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senhas não conferem"

### Critério 5.3 - Senhas não conferem: diferença de case

Dado que preenchi o campo de senha com "Teste@123"
Quando digito "teste@123" no campo de confirmação
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senhas não conferem"

### Critério 5.4 - Senhas não conferem: espaço extra

Dado que preenchi o campo de senha com "Teste@123"
Quando digito "Teste@123 " no campo de confirmação
E saio do campo ou submeto o formulário
Então devo ver a mensagem "Senhas não conferem"

### Critério 5.5 - Confirmação de senha válida

Dado que preenchi o campo de senha com "Teste@123"
Quando digito "Teste@123" no campo de confirmação
E saio do campo
Então nenhuma mensagem de erro deve aparecer

---

## 6. Validação de Email Duplicado

### Critério 6.1 - Email já cadastrado no sistema

Dado que existe um usuário cadastrado com email "admin@qatest.com"
Quando preencho o campo de email com "admin@qatest.com"
E submeto o formulário
Então devo ver a mensagem "Email já cadastrado. Use outro email ou faça login."

### Critério 6.2 - Email duplicado (genérico)

Dado que existe um usuário cadastrado com um email no banco de dados
Quando tento cadastrar com o mesmo email
E submeto o formulário
Então devo ver a mensagem "Email já cadastrado. Use outro email ou faça login."

---

## 7. Cenários de Sucesso

### Critério 7.1 - Cadastro realizado com sucesso

Dado que estou na página de cadastro
Quando preencho todos os campos corretamente:

- Nome Completo: "João Silva"
- Email: "joao.silva@test.com"
- Senha: "Teste@123"
- Confirmação de Senha: "Teste@123"
  E clico em "Criar Conta"
  Então devo ver a mensagem "Cadastro realizado com sucesso! Redirecionando..."
  E ser redirecionado para a página de login após 2 segundos

### Critério 7.2 - Cadastro com dados diferentes

Dado que estou na página de cadastro
Quando preencho todos os campos com dados válidos e diferentes
E clico em "Criar Conta"
Então o cadastro deve ser realizado com sucesso
E ser redirecionado para a página de login

---

## 8. Validação em Tempo Real

### Critério 8.1 - Mensagem de erro desaparece ao corrigir campo

Dado que um campo tem mensagem de erro
Quando começo a digitar uma entrada válida
Então a mensagem de erro deve desaparecer imediatamente

### Critério 8.2 - Formatação visual restaurada ao corrigir erro

Dado que um campo tem formatação de erro (borda vermelha)
Quando corrijo o erro no campo
Então a borda deve voltar ao normal (verde ou cinza)

### Critério 8.3 - Campo obrigatório sem mensagem ao preencher

Dado que um campo obrigatório tem mensagem de erro
Quando preencho o campo com valor válido
Então a mensagem de erro obrigatório deve desaparecer

---

## 9. Performance

### Critério 9.1 - Validação de campo é rápida

Dado que estou digitando em um campo
Quando uma validação ocorre
Então a resposta deve aparecer em menos de 100ms

### Critério 9.2 - Exibição de mensagem de erro é rápida

Dado que detecto um erro no campo
Quando a mensagem de erro deve ser exibida
Então deve aparecer em menos de 50ms

### Critério 9.3 - Remoção de mensagem de erro é rápida

Dado que uma mensagem de erro está exibida
Quando corrijo o campo
Então a mensagem deve desaparecer em menos de 50ms

### Critério 9.4 - Submissão do formulário é rápida

Dado que todos os campos estão preenchidos corretamente
Quando clico em "Criar Conta"
Então a submissão deve ser processada em menos de 200ms

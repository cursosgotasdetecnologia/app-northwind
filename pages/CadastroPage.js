class CadastroPage {
  constructor(page) {
    this.page = page;

    //Seletores
    this.campoNome = page.getByTestId("full-name-input");
    this.campoEmail = page.getByTestId("email-input");
    this.campoSenha = page.getByTestId("password-input");
    this.campoConfirmaSenha = page.getByTestId("confirm-password-input");
    this.botaoCadastrar = page.getByRole("button", { name: "Criar Conta" });
    this.mensagemSucesso = page.getByText(
      "Cadastro realizado com sucesso! Redirecionando...",
    );

}

  async preencherFormulario(dados) {
    await this.campoNome.fill(dados.nome);
    await this.campoEmail.fill(dados.email);
    await this.campoSenha.fill(dados.senha);
    await this.campoConfirmaSenha.fill(dados.senhaConfirmacao);
  }

  getBotaoCadastrar() {
    return this.botaoCadastrar;
  }

  getMensagemErro(texto) {
    return this.page.getByText(texto);
  }
}
module.exports = CadastroPage;

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
    this.mensagemNomeCurto = page.locator('text=Nome deve ter no mínimo 3 caracteres');    
    this.mensagemNomeComNumero = page.getByText('Nome deve conter apenas letras e espaços')
    this.mensagemEmailSemArroba = page.getByText('E-mail inválido')
    this.mensagemEmailSemDominio = page.getByText('E-mail inválido')
    this.mensagemEmailSemIdentificacao = page.getByText('E-mail inválido')
    this.mensagemSenhaSemMaiuscula = page.getByText('E-mail inválido')
  }

  //Métodos de ação

  async preencherNome(nome) {
    await this.campoNome.fill(nome);
    // await this.campoNome.blur();
  }

  async preencherEmail(email) {
    await this.campoEmail.fill(email);
  }

  async preencherSenha(senha) {
    await this.campoSenha.fill(senha);
  }
  async preencherConfirmarSenha(senha) {
    await this.campoConfirmaSenha.fill(senha);
  }

  async clicarCadastrar() {
    await this.botaoCadastrar.click();
  }
}
module.exports = CadastroPage;

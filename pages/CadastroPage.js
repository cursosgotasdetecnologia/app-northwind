class CadastroPage {
  constructor(page) {
    this.page = page;

    //Seletores
    this.campoNome = page.getByTestId("full-name-input");
    this.campoEmail = page.getByTestId("email-input");
    this.campoSenha = page.getByTestId("password-input");
    this.campoConfirmaSenha = page.getByTestId("confirm-password-input");
    this.botaoCadastrar = page.getByRole("button", { name: "Criar Conta" });
    this.mensagemSucesso = page.getByText("Cadastro realizado com sucesso! Redirecionando...");    
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

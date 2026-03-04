class DeleteConfirmationDialog {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Confirmação" });
    this.bodyText = page.getByText(
      "Tem certeza que deseja excluir este produto?",
    );
    this.confirmButton = page.getByRole("button", { name: "OK" });
    this.cancelButton = page.getByRole("button", { name: "Cancelar" });
  }

  async confirm() {
    await this.confirmButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}

module.exports =  DeleteConfirmationDialog;
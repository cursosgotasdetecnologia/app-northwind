class LoginPage {
  constructor(page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'QA Automation Shop' });
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.dashboardRow = page.getByRole('row', { name: /Camiseta Básica Preta/ });
  }

  async navigate() {
    await this.page.goto('https://northwind-test-platform.vercel.app/');
  }

  async validateHomeLoaded() {
    await this.heading.waitFor();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async validateLoginSuccess() {
    await this.dashboardRow.waitFor();
  }
}

module.exports = LoginPage;
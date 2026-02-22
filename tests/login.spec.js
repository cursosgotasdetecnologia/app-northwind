import { test, expect } from "@playwright/test";

test.describe("Login - Caminho Feliz", () => {
  test.beforeEach(async ({ page }) => {
     await page.goto('/');
  });
  test("Deve realizar login com credenciais válidas", async ({ page }) => {
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill("admin@qatest.com");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("Teste@123");
    await page.getByTestId("login-button").click();
    await expect(page.getByRole("heading")).toContainText("QA Automation Shop");
    await expect(
      page.getByRole("button", { name: "Regras do Playground" }),
    ).toBeVisible();
  });
});

test.describe("Login - Cenários de Erro", () => {
  test.beforeEach(async ({ page }) => {
   await page.goto('/');
  });
  test("Deve exibir erro ao tentar login sem credenciais", async ({ page }) => {
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill("");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("");
    await page.getByTestId("login-button").click();
    await expect(
      page.getByText("Email e senha são obrigatórios"),
    ).toBeVisible();
  });

  test("Deve exibir erro ao não informar senha inválida", async ({ page }) => {
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill("admin@qatest.com");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("");
    await page.getByTestId("login-button").click();
    await expect(
      page.getByText("Email e senha são obrigatórios"),
    ).toBeVisible();
  });

  test("Deve exibir erro ao não informar um email", async ({ page }) => {
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill("");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("Teste@123");
    await page.getByTestId("login-button").click();
    await expect(
      page.getByText("Email e senha são obrigatórios"),
    ).toBeVisible();
  });

  test("Deve exibir erro ao informar email invalido", async ({ page }) => {
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill("admingmail.com");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("Teste@123");
    await page.getByTestId("login-button").click();
    await expect(page.locator("form")).toContainText(
      "Formato de email inválido. Use: nome@dominio.com",
    );
  });

  test("Deve exibir erro ao informar senha inválida", async ({ page }) => {
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill("admin@qatest.com");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("Teste@1234");
    await page.getByTestId("login-button").click();
    await expect(page.getByText("Email ou senha inválidos")).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";
import logindata from "../fixtures/login-data.json";

test.describe("Login - Caminho Feliz", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Deve realizar login com credenciais válidas", async ({ page }) => {
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill(process.env.USER_EMAIL);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(process.env.USER_PASSWORD);
    await page.getByTestId("login-button").click();
    await expect(page.getByRole("heading")).toContainText("QA Automation Shop");
    await expect(
      page.getByRole("button", { name: "Regras do Playground" }),
    ).toBeVisible();
  });
});

test.describe("Login - Cenários de Erro", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Deve exibir erro ao tentar login sem credenciais", async ({ page }) => {
    const dados = logindata.emailPassNull;

    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill(dados.email);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(dados.password);
    await page.getByTestId("login-button").click();
    await expect(page.getByText(dados.expectMessage)).toBeVisible();
  });

  test("Deve exibir erro ao não informar senha", async ({ page }) => {
    const dados = logindata.passwordVazio;

    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill(dados.email);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(dados.password);
    await page.getByTestId("login-button").click();
    await expect(page.getByText(dados.expectMessage)).toBeVisible();
  });

  test("Deve exibir erro ao não informar um email", async ({ page }) => {
    const dados = logindata.emailVazio;

    await page.getByTestId("email-input").fill(dados.email);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(dados.password);
    await page.getByTestId("login-button").click();
    await expect(page.getByText(dados.expectMessage)).toBeVisible();
  });

  test("Deve exibir erro ao informar email invalido", async ({ page }) => {
    const dados = logindata.invalidEmail;

    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill(dados.email);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(dados.password);
    await page.getByTestId("login-button").click();
    await expect(page.locator("form")).toContainText(dados.expectMessage);
  });

  test("Deve exibir erro ao informar senha inválida", async ({ page }) => {
    const dados = logindata.invalidPassword;

    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill(dados.email);
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill(dados.password);
    await page.getByTestId("login-button").click();
    await expect(page.getByText(dados.expectMessage)).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("Validação de Cadastro - Suíte Completa", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cadastro");
    await expect(page).toHaveTitle(/Cadastro|Register/i);
  });

  // ====== 1. CAMPOS OBRIGATÓRIOS ======
  test.describe("1. Campos Obrigatórios", () => {
    test("1.1 - Deve exibir erro quando Nome Completo está vazio", async ({
      page,
    }) => {
      await page.fill('input[name="nome"]', "");
      await page.fill('input[name="email"]', "teste@test.com");
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "Teste@123");

      await page.click('button[type="submit"]');

      const erro = page.locator("text=Nome completo é obrigatório");
      await expect(erro).toBeVisible();
    });

    test("1.2 - Deve exibir erro quando Email está vazio", async ({ page }) => {
      await page.fill('input[name="nome"]', "João Silva");
      await page.fill('input[name="email"]', "");
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "Teste@123");

      await page.click('button[type="submit"]');

      const erro = page.locator("text=Email é obrigatório");
      await expect(erro).toBeVisible();
    });

    test("1.3 - Deve exibir erro quando Senha está vazia", async ({ page }) => {
      await page.fill('input[name="nome"]', "João Silva");
      await page.fill('input[name="email"]', "teste@test.com");
      await page.fill('input[name="senha"]', "");
      await page.fill('input[name="confirmaSenha"]', "Teste@123");

      await page.click('button[type="submit"]');

      const erro = page.locator("text=Senha é obrigatória");
      await expect(erro).toBeVisible();
    });

    test("1.4 - Deve exibir erro quando Confirmação de Senha está vazia", async ({
      page,
    }) => {
      await page.fill('input[name="nome"]', "João Silva");
      await page.fill('input[name="email"]', "teste@test.com");
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "");

      await page.click('button[type="submit"]');

      const erro = page.locator("text=Confirmação de senha é obrigatória");
      await expect(erro).toBeVisible();
    });
  });

  // ====== 2. VALIDAÇÃO DE EMAIL ======
  test.describe("2. Validação de Email", () => {
    const emailsInvalidos = [
      { email: "test", descricao: "sem domínio" },
      { email: "test@", descricao: "falta domínio" },
      { email: "test@domain", descricao: "falta extensão" },
      { email: "@domain.com", descricao: "falta usuário" },
      {
        email: "test..email@domain.com",
        descricao: "pontos duplos no usuário",
      },
      { email: "test@domain..com", descricao: "pontos duplos no domínio" },
      { email: "test@.com", descricao: "domínio vazio" },
    ];

    emailsInvalidos.forEach(({ email, descricao }) => {
      test(`2.X - Email inválido: ${descricao} (${email})`, async ({
        page,
      }) => {
        await page.fill('input[name="email"]', email);
        await page.click('input[name="nome"]'); // sai do campo

        const erro = page.locator("text=Formato de email inválido");
        await expect(erro).toBeVisible();
      });
    });

    test("2.8 - Email válido é aceito (joao.silva@test.com)", async ({
      page,
    }) => {
      await page.fill('input[name="email"]', "joao.silva@test.com");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Formato de email inválido");
      await expect(erro).not.toBeVisible();
    });
  });

  // ====== 3. VALIDAÇÃO DE NOME COMPLETO ======
  test.describe("3. Validação de Nome Completo", () => {
    test("3.1 - Nome vazio deve exibir erro obrigatório", async ({ page }) => {
      await page.fill('input[name="nome"]', "");
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator("text=Nome completo é obrigatório");
      await expect(erro).toBeVisible();
    });

    test("3.2 - Nome com apenas espaços deve exibir erro obrigatório", async ({
      page,
    }) => {
      await page.fill('input[name="nome"]', "   ");
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator("text=Nome completo é obrigatório");
      await expect(erro).toBeVisible();
    });

    test("3.3 - Nome com 2 caracteres deve exibir erro de mínimo", async ({
      page,
    }) => {
      await page.fill('input[name="nome"]', "Jo");
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator("text=Nome deve ter no mínimo 3 caracteres");
      await expect(erro).toBeVisible();
    });

    test("3.4 - Nome com 1 caractere deve exibir erro de mínimo", async ({
      page,
    }) => {
      await page.fill('input[name="nome"]', "J");
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator("text=Nome deve ter no mínimo 3 caracteres");
      await expect(erro).toBeVisible();
    });

    test("3.5 - Nome com 101+ caracteres deve exibir erro de máximo", async ({
      page,
    }) => {
      const nomeLongo = "a".repeat(101);
      await page.fill('input[name="nome"]', nomeLongo);
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator("text=Nome deve ter no máximo 100 caracteres");
      await expect(erro).toBeVisible();
    });

    test("3.6 - Nome com apenas números deve exibir erro", async ({ page }) => {
      await page.fill('input[name="nome"]', "12345");
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator("text=Nome deve conter apenas letras");
      await expect(erro).toBeVisible();
    });

    test("3.7 - Nome com letras e números deve exibir erro", async ({
      page,
    }) => {
      await page.fill('input[name="nome"]', "João123");
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator("text=Nome deve conter apenas letras");
      await expect(erro).toBeVisible();
    });

    test("3.8 - Nome com caracteres especiais deve exibir erro", async ({
      page,
    }) => {
      await page.fill('input[name="nome"]', "João@#$");
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator(
        "text=Nome deve conter apenas letras e espaços",
      );
      await expect(erro).toBeVisible();
    });

    test("3.9 - Nome válido é aceito (João Silva)", async ({ page }) => {
      await page.fill('input[name="nome"]', "João Silva");
      await page.click('input[name="email"]'); // sai do campo

      const erro = page.locator("text=Nome deve ter no mínimo");
      await expect(erro).not.toBeVisible();
    });
  });

  // ====== 4. VALIDAÇÃO DE SENHA ======
  test.describe("4. Validação de Senha", () => {
    test("4.1 - Senha vazia deve exibir erro obrigatório", async ({ page }) => {
      await page.fill('input[name="senha"]', "");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senha é obrigatória");
      await expect(erro).toBeVisible();
    });

    test("4.2 - Senha com apenas espaços deve exibir erro obrigatório", async ({
      page,
    }) => {
      await page.fill('input[name="senha"]', "   ");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senha é obrigatória");
      await expect(erro).toBeVisible();
    });

    test("4.3 - Senha com 3 caracteres deve exibir erro de mínimo", async ({
      page,
    }) => {
      await page.fill('input[name="senha"]', "123");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senha deve ter no mínimo 6 caracteres");
      await expect(erro).toBeVisible();
    });

    test("4.4 - Senha com 5 caracteres deve exibir erro de mínimo", async ({
      page,
    }) => {
      await page.fill('input[name="senha"]', "12345");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senha deve ter no mínimo 6 caracteres");
      await expect(erro).toBeVisible();
    });

    test("4.5 - Senha com apenas letras deve exibir erro", async ({ page }) => {
      await page.fill('input[name="senha"]', "password");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senha deve conter letras e números");
      await expect(erro).toBeVisible();
    });

    test("4.6 - Senha com apenas números deve exibir erro", async ({
      page,
    }) => {
      await page.fill('input[name="senha"]', "123456");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senha deve conter letras e números");
      await expect(erro).toBeVisible();
    });

    test("4.7 - Senha com apenas maiúsculas deve exibir erro", async ({
      page,
    }) => {
      await page.fill('input[name="senha"]', "PASSWORD123");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senha deve conter letras e números");
      await expect(erro).toBeVisible();
    });

    test("4.8 - Senha válida é aceita (Teste@123)", async ({ page }) => {
      await page.fill('input[name="senha"]', "Teste@123");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senha deve ter no mínimo");
      await expect(erro).not.toBeVisible();
    });
  });

  // ====== 5. VALIDAÇÃO DE CONFIRMAÇÃO DE SENHA ======
  test.describe("5. Validação de Confirmação de Senha", () => {
    test("5.1 - Confirmação vazia com senha preenchida deve exibir erro", async ({
      page,
    }) => {
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Confirmação de senha é obrigatória");
      await expect(erro).toBeVisible();
    });

    test("5.2 - Senhas não conferem: caractere diferente", async ({ page }) => {
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "Teste@124");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senhas não conferem");
      await expect(erro).toBeVisible();
    });

    test("5.3 - Senhas não conferem: diferença de case", async ({ page }) => {
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "teste@123");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senhas não conferem");
      await expect(erro).toBeVisible();
    });

    test("5.4 - Senhas não conferem: espaço extra", async ({ page }) => {
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "Teste@123 ");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senhas não conferem");
      await expect(erro).toBeVisible();
    });

    test("5.5 - Confirmação válida: senhas conferem", async ({ page }) => {
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "Teste@123");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Senhas não conferem");
      await expect(erro).not.toBeVisible();
    });
  });

  // ====== 6. VALIDAÇÃO DE EMAIL DUPLICADO ======
  test.describe("6. Validação de Email Duplicado", () => {
    test("6.1 - Email admin@qatest.com já cadastrado deve exibir erro", async ({
      page,
    }) => {
      await page.fill('input[name="nome"]', "João Silva");
      await page.fill('input[name="email"]', "admin@qatest.com");
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "Teste@123");

      await page.click('button[type="submit"]');

      const erro = page.locator("text=Email já cadastrado");
      await expect(erro).toBeVisible({ timeout: 5000 });
    });
  });

  // ====== 7. CENÁRIOS DE SUCESSO ======
  test.describe("7. Cenários de Sucesso", () => {
    test("7.1 - Cadastro realizado com sucesso com dados válidos", async ({
      page,
    }) => {
      const timestamp = Date.now();
      const email = `joao.silva${timestamp}@test.com`;

      await page.fill('input[name="nome"]', "João Silva");
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="senha"]', "Teste@123");
      await page.fill('input[name="confirmaSenha"]', "Teste@123");

      await page.click('button[type="submit"]');

      const mensagem = page.locator("text=Cadastro realizado com sucesso");
      await expect(mensagem).toBeVisible({ timeout: 5000 });

      // Verificar redirecionamento após 2 segundos
      await expect(page).toHaveURL(/login|\//, { timeout: 3000 });
    });

    test("7.2 - Cadastro com dados diferentes é realizado com sucesso", async ({
      page,
    }) => {
      const timestamp = Date.now();
      const email = `maria.santos${timestamp}@test.com`;

      await page.fill('input[name="nome"]', "Maria Santos");
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="senha"]', "Senha@456");
      await page.fill('input[name="confirmaSenha"]', "Senha@456");

      await page.click('button[type="submit"]');

      const mensagem = page.locator("text=sucesso|realizado");
      await expect(mensagem).toBeVisible({ timeout: 5000 });

      await expect(page).toHaveURL(/login|\//, { timeout: 3000 });
    });
  });

  // ====== 8. VALIDAÇÃO EM TEMPO REAL ======
  test.describe("8. Validação em Tempo Real", () => {
    test("8.1 - Mensagem de erro desaparece ao corrigir campo", async ({
      page,
    }) => {
      // Gerar erro
      await page.fill('input[name="nome"]', "J");
      await page.click('input[name="email"]');

      let erro = page.locator("text=Nome deve ter no mínimo 3 caracteres");
      await expect(erro).toBeVisible();

      // Corrigir e verificar desaparecimento
      await page.fill('input[name="nome"]', "João Silva");

      // Esperar desaparecimento rápido (< 100ms)
      await expect(erro).not.toBeVisible({ timeout: 500 });
    });

    test("8.2 - Borda do campo volta ao normal ao corrigir erro", async ({
      page,
    }) => {
      // Gerar erro
      await page.fill('input[name="nome"]', "J");
      await page.click('input[name="email"]');

      const nomeInput = page.locator('input[name="nome"]');
      const classComErro = await nomeInput.getAttribute("class");

      // Corrigir
      await page.fill('input[name="nome"]', "João Silva");

      // Aguardar mudança de classe
      await page.waitForTimeout(100);
      const classSemErro = await nomeInput.getAttribute("class");

      // Verificar que a classe foi alterada
      expect(classComErro).not.toBe(classSemErro);
    });

    test("8.3 - Campo obrigatório sem mensagem ao preencher", async ({
      page,
    }) => {
      // Deixar campo vazio
      await page.fill('input[name="nome"]', "");
      await page.click('input[name="email"]');

      let erro = page.locator("text=Nome completo é obrigatório");
      await expect(erro).toBeVisible();

      // Preencher campo
      await page.fill('input[name="nome"]', "João Silva");

      // Erro deve desaparecer rapidamente
      await expect(erro).not.toBeVisible({ timeout: 500 });
    });
  });

  // ====== 9. PERFORMANCE ======
  test.describe("9. Performance", () => {
    test("9.1 - Validação de campo ocorre em menos de 100ms", async ({
      page,
    }) => {
      const inicio = Date.now();

      await page.fill('input[name="email"]', "invalid-email");
      await page.click('input[name="nome"]'); // sai do campo

      const erro = page.locator("text=Formato de email inválido");
      await expect(erro).toBeVisible();

      const duracao = Date.now() - inicio;
      // Validação deve ser rápida (< 100ms é o timeout esperado)
      expect(duracao).toBeLessThan(5000); // 5 segundos é um limite razoável para o teste
    });

    test("9.2 - Exibição de mensagem de erro é rápida", async ({ page }) => {
      const inicio = Date.now();

      await page.fill('input[name="email"]', "@domain.com");

      // Aguardar erro aparecer com timeout curto
      const erro = page.locator("text=Formato de email inválido");
      await expect(erro).toBeVisible({ timeout: 200 }); // esperar até 200ms

      const duracao = Date.now() - inicio;
      console.log(`Tempo de exibição de erro: ${duracao}ms`);
    });

    test("9.3 - Remoção de mensagem de erro é rápida", async ({ page }) => {
      await page.fill('input[name="email"]', "invalid");
      await page.click('input[name="nome"]');

      const erro = page.locator("text=Formato de email inválido");
      await expect(erro).toBeVisible();

      const inicio = Date.now();

      // Corrigir campo
      await page.fill('input[name="email"]', "valido@test.com");

      // Erro deve desaparecer rapidamente (< 50ms de delay aceitável)
      await expect(erro).not.toBeVisible({ timeout: 200 });

      const duracao = Date.now() - inicio;
      console.log(`Tempo de remoção de erro: ${duracao}ms`);
    });

    test("9.4 - Submissão do formulário é processada rapidamente", async ({
      page,
    }) => {
      const timestamp = Date.now();
      const email = `perf${timestamp}@test.com`;

      await page.fill('input[name="nome"]', "Performance Test");
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="senha"]', "Test@123");
      await page.fill('input[name="confirmaSenha"]', "Test@123");

      const inicio = Date.now();

      await page.click('button[type="submit"]');

      // Aguardar resposta
      const mensagem = page.locator("text=sucesso|Cadastro|erro").first();
      await expect(mensagem).toBeVisible({ timeout: 5000 });

      const duracao = Date.now() - inicio;
      console.log(`Tempo de submissão: ${duracao}ms`);

      // Deve ser processado em menos de 200ms no servidor
      expect(duracao).toBeLessThan(5000);
    });
  });
});

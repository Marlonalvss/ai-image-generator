import { test, expect } from '@playwright/test';

test.describe('Funcionalidade: Geração de Imagens com AI', () => {

  test.beforeEach(async ({ page }) => {
    // Certifique-se que a URL está correta (localhost:3000 ou a URL da Vercel)
    await page.goto('http://localhost:3000'); 
  });

  test('Cenário 01: Deve gerar uma imagem com sucesso ao inserir um prompt válido', async ({ page }) => {
    
    // 1. Identificar o campo pelo data-testid (muito mais seguro)
    const inputPrompt = page.getByTestId('input-prompt');
    await inputPrompt.fill('Gato astronauta cyberpunk');

    // 2. Clicar no botão de gerar
    const botaoGerar = page.getByTestId('btn-generate');
    
    // Opcional: Validar que o botão está habilitado antes de clicar
    await expect(botaoGerar).toBeEnabled();
    await botaoGerar.click();

    // 3. Validação (Asserção)
    // Espera a imagem aparecer (pode demorar por ser IA, então timeout de 15s)
    const imagemGerada = page.getByTestId('generated-image');
    
    await expect(imagemGerada).toBeVisible({ timeout: 15000 });
    
    // Opcional: Tirar um print do resultado para evidência
    await page.screenshot({ path: 'evidencias/sucesso-geracao.png' });
  });

  test('Cenário 02: O botão de gerar deve estar desabilitado se o input estiver vazio', async ({ page }) => {
    
    // 1. Garante que o input está vazio
    const inputPrompt = page.getByTestId('input-prompt');
    await inputPrompt.fill('');

    // 2. Verifica se o botão está desabilitado (disabled)
    const botaoGerar = page.getByTestId('btn-generate');
    
    // Na sua lógica React, o botão tem "disabled={... || !prompt}"
    await expect(botaoGerar).toBeDisabled();
  });

});
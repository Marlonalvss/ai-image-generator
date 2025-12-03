# 🎨 AI Image Generator

Uma aplicação web moderna para geração de imagens via Inteligência Artificial, desenvolvida com **Next.js 15**, **Tailwind CSS v4** e **RxJS**.

🔗 **[Acesse o Projeto Online](https://ai-image-generator-gamma-pink.vercel.app/)**

## 🚀 Tecnologias

-   **Next.js 15 (App Router):** Renderização server-side e rotas de API.
-   **Tailwind CSS v4:** Estilização responsiva e suporte a Dark Mode com variáveis CSS nativas.
-   **RxJS (Reactive Extensions):** Gerenciamento de streams assíncronos para feedback de status em tempo real.
-   **Pollinations AI:** Integração via API para geração de imagens.
-   **TypeScript:** Tipagem estática para maior segurança e escalabilidade.

## ✨ Funcionalidades

-   🖌️ **Geração de Imagens:** Criação de arte digital baseada em prompts de texto.
-   📜 **Histórico de Sessão:** Galeria interativa que mantém as imagens geradas recentemente para fácil acesso e download.
-   ⚡ **Feedback Reativo:** Sistema de loading detalhado usando *Observables* para comunicar cada etapa do processo (Interpretando, Renderizando, Finalizando).
-   🎥 **Arquitetura Híbrida (Beta):** Interface preparada e segregada para expansão futura de geração de vídeos.
-   🌗 **Dark/Light Mode:** Alternância de tema com persistência visual e UX polida.
-   ⬇️ **Download Direto:** Funcionalidade para baixar as imagens geradas em alta resolução.

---

## 🧪 Engenharia de Qualidade (QA & Automation)

Este projeto foi desenvolvido com mentalidade **Shift-left Testing**, integrando qualidade desde a concepção do código. A suíte de testes cobre tanto o Frontend (E2E) quanto o Backend (API Contracts).

### 🛠️ Stack de Testes
| Camada | Ferramenta | Objetivo |
| :--- | :--- | :--- |
| **E2E (Web)** | **Playwright** (TypeScript) | Simulação de usuário real, validação de fluxo crítico e seletores resilientes (`data-testid`). |
| **API (Integration)** | **Postman + Newman** | Testes de contrato, validação de Status Code (200/400) e SLA de performance. |
| **CI/CD** | **GitHub Actions** | Execução automática da suíte de testes a cada Push/PR. |

### ✅ Cenários Cobertos
- **Happy Path:** Geração de imagem com prompt válido (E2E & API).
- **Negative Testing:** Validação de comportamento ao enviar inputs vazios (Botão desabilitado no Front / Erro 400 na API).
- **Performance:** Validação de tempo de resposta da API de IA (< 20s).

---

## ⚠️ Observação Importante

O modelo de IA utilizado neste MVP foi treinado majoritariamente em **Inglês**.
Para obter resultados precisos e de alta qualidade, **recomenda-se digitar os prompts em inglês** (ex: *"Cyberpunk city"* ao invés de *"Cidade cyberpunk"*).

## 🛠️ Como rodar localmente

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPO.git](https://github.com/SEU_USUARIO/SEU_REPO.git)
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

4.  **Rodando os Testes Automatizados:**
    
    * **Interface (E2E):**
        ```bash
        npx playwright test      # Modo Headless (Terminal)
        npx playwright test --ui # Modo Visual (Interface Interativa)
        ```
    
    * **API (Backend):**
        ```bash
        npm run test:api         # Executa Postman/Newman via terminal
        ```

---
Desenvolvido por **Marlon Alves**
# 💻 DevManager | Terminal-Style Productivity Hub

<div align="center">
  <img src="https://img.shields.io/badge/Status-Desenvolvimento-green?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Estética-Terminal%20/%20Cyberpunk-8250df?style=for-the-badge" alt="Estética" />
</div>

---

## 🚀 Sobre o Projeto

O **DevManager** é um aplicativo mobile desenvolvido para entusiastas de tecnologia e segurança que preferem a eficiência e a estética dos terminais de comando. O app centraliza ferramentas de produtividade, consumo de notícias técnicas e assistência por inteligência artificial em uma interface inspirada no "GitHub Dark" e no "Matrix Mode".

Este projeto demonstra o domínio de fluxos complexos em **React Native**, integração com **IA Generativa**, persistência de dados local e consumo de **APIs externas**.

---

## ✨ Funcionalidades Principais

- 🤖 **AI Assistant (Terminal Chat):** Chat interativo integrado à API do **Google Gemini (flash-latest)** para assistência técnica imediata.
- 📝 **Task Log (CRUD):** Gerenciador de tarefas com persistência de dados utilizando **SQLite**, permitindo criar, listar e deletar logs de atividades.
- 📰 **Dev News Feed:** Consumo em tempo real dos artigos mais relevantes da comunidade **Dev.to** via API REST.
- ⏰ **System Alerts:** Sistema de agendamento de notificações locais para lembretes de tarefas.
- 👤 **User Config:** Customização de perfil com suporte a upload de imagens da galeria ou captura via câmera.
- 🔐 **Secure Access:** Autenticação protegida e gerenciamento de tokens via **Clerk** e **SecureStore**.

---

## 🛠️ Stack Técnica

| Tecnologia | Finalidade |
| :--- | :--- |
| **React Native / Expo** | Framework de desenvolvimento mobile. |
| **Google Gemini API** | Inteligência Artificial para o chat assistente. |
| **SQLite (expo-sqlite)** | Banco de dados local para armazenamento de tarefas. |
| **Axios** | Requisições HTTP para APIs externas. |
| **Clerk** | Gerenciamento completo de autenticação. |
| **Reanimated** | Animações fluidas de interface. |

---

## 🎨 Interface & UX

A interface foi projetada para simular um ambiente de desenvolvimento (IDE/Terminal):
- **Tipografia:** Uso predominante de fontes **Monospace (Courier)** para reforçar a estética de código.
- **Cores:** Paleta baseada no `#0d1117` (GitHub Dark) com detalhes em **Verde Matrix** e **Roxo Dev**.
- **Feedback Visual:** Linhas de log prefixadas com `USER@DEV:~$` para diferenciar as interações.

---

## 🚀 Como Executar

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/NycolasT/DevManager.git](https://github.com/NycolasT/DevManager.git)

2. **Instalar dependências:**

```bash
npm install
```
3. **Configurar variáveis de ambiente: Crie um arquivo .env e adicione suas chaves:**
```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=sua_chave_aqui
GEMINI_API_KEY=sua_chave_aqui
```

5. **Iniciar o projeto:**
   ```bash
   npx expo start
```
   
   

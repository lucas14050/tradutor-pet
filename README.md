# 🐶 Tradutor de Pets

Um tradutor fictício e divertido de latidos de cachorros com visual moderno de startup pet-tech, construído em **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)**.

---

## ✨ Demonstração e Funcionalidades

- **🎙️ Gravador com Microfone Real**: Utiliza a `MediaRecorder API` para capturar o áudio do latido, com temporizador progressivo e limite seguro de gravação.
- **📊 Visualizador em Tempo Real (Canvas & Web Audio API)**: Gráficos de barras sonoras dinâmicas desenhadas em `<canvas>` de acordo com o som capturado.
- **📁 Upload de Áudio**: Suporte a envio de arquivos de som (MP3, WAV, OGG, M4A) com funcionalidade de *Drag and Drop*.
- **✨ Simulação Rápida (Demo)**: Botão com latido sintetizado por osciladores de áudio para testar a aplicação sem precisar de microfone.
- **⏳ Animação de Análise**: Etapas bem-humoradas ("*Analisando pensamentos caninos...*", "*Consultando o Conselho Supremo dos Vira-Latas Caramelo...*") com barra de progresso.
- **💬 Card de Tradução com Métricas**:
  - Frases hilárias (incluindo todas as solicitadas e mais de uma dezena de frases extras).
  - Medidor de "Vontade de Petisco", "Índice de Drama" e "Alvo Provável".
  - Efeito de confetes e patinhas.
- **📋 Copiar Tradução**: Copia a citação diretamente para a área de transferência com notificação visual *Toast*.
- **🔊 Ouvir Tradução**: Leitura da frase em voz alta via `speechSynthesis` (Web Speech API).
- **🎨 Design & Paleta Solicitada**: Amarelo pastel, laranja vibrante, branco e azul-claro com elementos visuais de patinhas e rabo abanando animado.
- **📱 100% Responsivo**: Otimizado para smartphones, tablets e desktops com menu mobile interativo.
- **🔒 Privacidade Garantida**: Todo o processamento é local no navegador. Nenhum áudio é armazenado.

---

## 📁 Estrutura de Arquivos

```
pet/
├── index.html     # Estrutura semântica do site
├── style.css      # Estilização moderna, variáveis, layout e animações
├── script.js      # MediaRecorder, Web Audio API, lógica do tradutor e interatividade
└── README.md      # Documentação do projeto
```

---

## 🚀 Como Executar

Basta abrir o arquivo `index.html` em qualquer navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, etc.):

1. Dê um duplo clique no arquivo `index.html`, ou
2. Arraste-o para uma janela do navegador.

*Nota: Para utilizar o microfone local com `MediaRecorder`, a maioria dos navegadores permite diretamente em arquivos locais (`file://`) ou através de um servidor local (ex: Live Server do VSCode).*

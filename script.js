/**
 * ============================================================================
 * TRADUTOR DE PETS - LÓGICA PRINCIPAL JAVASCRIPT
 * ============================================================================
 * Funcionalidades:
 * - Gravação de áudio com MediaRecorder API e temporizador.
 * - Visualizador em tempo real de ondas de áudio com Web Audio API + Canvas.
 * - Suporte a Upload de arquivos de áudio e Drag & Drop.
 * - Simulação de latido com síntese sonora (Web Audio API) para testes rápidos.
 * - Animação de análise de pensamentos caninos com etapas divertidas.
 * - Gerador de traduções caninas hilárias e dados fictícios de IA pet.
 * - Copiar para área de transferência e reprodução por voz (SpeechSynthesis).
 * - Totalmente executado no navegador do usuário (zero armazenamento de áudio).
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. BANCO DE DADOS DE TRADUÇÕES CANINAS E HUMOR PET
  // --------------------------------------------------------------------------
  const CANINE_TRANSLATIONS = [
    // Frases obrigatórias do briefing:
    {
      text: "Meu pote está vazio! Isso é uma emergência nacional!",
      mood: "🚨 Pânico Gastronômico",
      avatar: "🐕",
      treat: "100%",
      drama: "99.9%",
      target: "Tigela de Ração"
    },
    {
      text: "Quero passear, humano preguiçoso! A calçada está me chamando!",
      mood: "👟 Modo Aventura Ativado",
      avatar: "🦮",
      treat: "75%",
      drama: "88.0%",
      target: "Poste da esquina"
    },
    {
      text: "Vi um fantasma ou era só uma sacola plástica flutuando no vento?!",
      mood: "👻 Alerta Sobrenatural",
      avatar: "🐶",
      treat: "50%",
      drama: "95.5%",
      target: "Sacola do supermercado"
    },
    {
      text: "Exijo mais petiscos imediatamente sob pena de carinha de coitado!",
      mood: "🍖 Chantagem Emocional",
      avatar: "🐩",
      treat: "100%",
      drama: "94.2%",
      target: "Armário de guloseimas"
    },
    {
      text: "Você saiu por 5 minutos... Senti sua falta por 5 longos anos!",
      mood: "😭 Amor Dramático Intenso",
      avatar: "🥺",
      treat: "90%",
      drama: "100%",
      target: "Você (o humano favorito)"
    },

    // Frases adicionais super criativas e engraçadas:
    {
      text: "Aquele monstro barulhento chamado Aspirador de Pó vai pagar por tudo!",
      mood: "⚔️ Declaração de Guerra",
      avatar: "🐕‍🦺",
      treat: "60%",
      drama: "99.1%",
      target: "Aspirador de Pó"
    },
    {
      text: "Ouvi o barulho de plástico de pacote abrindo na cozinha a 4km de distância. O que é pra mim?",
      mood: "👂 Radar Biônico Ativo",
      avatar: "🐶",
      treat: "100%",
      drama: "82.3%",
      target: "Pacote de queijo"
    },
    {
      text: "O carteiro colocou uma folha de papel na nossa caixa. Salvei a família inteira hoje mais uma vez!",
      mood: "🎖️ Herói Não Reconhecido",
      avatar: "🐕",
      treat: "85%",
      drama: "91.0%",
      target: "O Carteiro"
    },
    {
      text: "Eu juro que não fui eu quem destruiu a almofada. Ela explodiu sozinha por combustão espontânea!",
      mood: "😇 Inocência Questionável",
      avatar: "🐾",
      treat: "95%",
      drama: "97.8%",
      target: "Almofada da sala"
    },
    {
      text: "Passe a mão na minha barriga imediatamente. Mas cuidado: se passar do ponto, levo sua mão!",
      mood: "😼 Regras Estritas de Carinho",
      avatar: "🐕",
      treat: "70%",
      drama: "65.4%",
      target: "Sua mão carinhosa"
    },
    {
      text: "Se você não vai comer essa borda de pizza, por lei canina ela pertence a mim!",
      mood: "🍕 Advogado Constitucional Canino",
      avatar: "🐶",
      treat: "100%",
      drama: "89.5%",
      target: "Borda de Pizza"
    },
    {
      text: "Um cachorro desconhecido passou na calçada em frente ao portão. Como ele ousa respirar meu oxigênio?!",
      mood: "😤 Territorialismo Supremo",
      avatar: "🦮",
      treat: "40%",
      drama: "96.7%",
      target: "Cão da vizinhança"
    },
    {
      text: "Por que você joga a bolinha se quer que eu traga? Decida-se humano!",
      mood: "🎾 Crise Existencial",
      avatar: "🐩",
      treat: "80%",
      drama: "72.0%",
      target: "Bolinha de Tênis"
    },
    {
      text: "Não quero tomar banho hoje. Aquele cheiro de terra molhada demorou três dias para aperfeiçoar!",
      mood: "🧼 Resistência Anti-Shampoo",
      avatar: "🐕",
      treat: "99%",
      drama: "98.9%",
      target: "O Chuveiro"
    },
    {
      text: "Eu sou o vira-lata caramelo mais estiloso desse bairro e você sabe muito bem disso!",
      mood: "😎 Autoestima Canina Lá Em Cima",
      avatar: "🐕",
      treat: "100%",
      drama: "45.0%",
      target: "Espelho"
    }
  ];

  const ANALYSIS_STEPS = [
    "Sintonizando receptores auditivos ultrassônicos...",
    "Medindo frequência de abanação do rabo canino...",
    "Decodificando moduladores de indignação e fome...",
    "Consultando o Conselho Supremo dos Vira-Latas Caramelo...",
    "Convertendo latidos em termos jurídicos e exigências de sachê...",
    "Quase pronto! Tradução concluída com sucesso!"
  ];

  // --------------------------------------------------------------------------
  // 2. ELEMENTOS DO DOM
  // --------------------------------------------------------------------------
  // Menu Mobile & Navegação
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  // Abas de Modo (Gravar vs Upload)
  const tabRecord = document.getElementById('tabRecord');
  const tabUpload = document.getElementById('tabUpload');
  const btnDemoBark = document.getElementById('btnDemoBark');
  const panelRecord = document.getElementById('panelRecord');
  const panelUpload = document.getElementById('panelUpload');

  // Gravador de Microfone
  const recordBtn = document.getElementById('recordBtn');
  const micVisualWrap = document.querySelector('.recorder-visual-wrap');
  const micIcon = document.getElementById('micIcon');
  const stopIcon = document.getElementById('stopIcon');
  const recordTimer = document.getElementById('recordTimer');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const waveformCanvas = document.getElementById('waveformCanvas');
  const canvasCtx = waveformCanvas ? waveformCanvas.getContext('2d') : null;

  // Upload de Áudio
  const dropzone = document.getElementById('dropzone');
  const audioFileInput = document.getElementById('audioFileInput');
  const browseFileBtn = document.getElementById('browseFileBtn');
  const fileInfoBox = document.getElementById('fileInfoBox');
  const fileNameDisplay = document.getElementById('fileNameDisplay');
  const fileSizeDisplay = document.getElementById('fileSizeDisplay');
  const clearFileBtn = document.getElementById('clearFileBtn');
  const btnTranslateUploaded = document.getElementById('btnTranslateUploaded');

  // Preview de Áudio Gravado
  const audioPlaybackBox = document.getElementById('audioPlaybackBox');
  const audioPlayer = document.getElementById('audioPlayer');
  const btnDiscardAudio = document.getElementById('btnDiscardAudio');

  // Animação de Análise
  const analysisBox = document.getElementById('analysisBox');
  const analysisProgressBar = document.getElementById('analysisProgressBar');
  const analysisStepText = document.getElementById('analysisStepText');

  // Card de Resultado
  const resultCard = document.getElementById('resultCard');
  const translationText = document.getElementById('translationText');
  const dogMoodBadge = document.getElementById('dogMoodBadge');
  const dogAvatarEmoji = document.getElementById('dogAvatarEmoji');
  const metricTreat = document.getElementById('metricTreat');
  const metricDrama = document.getElementById('metricDrama');
  const metricTarget = document.getElementById('metricTarget');
  const resultTimestamp = document.getElementById('resultTimestamp');
  const btnCopyTranslation = document.getElementById('btnCopyTranslation');
  const copyBtnText = document.getElementById('copyBtnText');
  const btnSpeakTranslation = document.getElementById('btnSpeakTranslation');
  const btnTranslateAgain = document.getElementById('btnTranslateAgain');
  const confettiContainer = document.getElementById('confettiContainer');

  // Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  // Interação do Pet no Hero
  const pokeDogBtn = document.getElementById('pokeDogBtn');
  const heroDogSvg = document.querySelector('.hero-dog-svg');
  const heroBubbleText = document.getElementById('heroBubbleText');

  // --------------------------------------------------------------------------
  // 3. ESTADOS E VARIÁVEIS DE CONTROLE
  // --------------------------------------------------------------------------
  let mediaRecorder = null;
  let audioChunks = [];
  let isRecording = false;
  let timerInterval = null;
  let recordSeconds = 0;
  let audioStream = null;
  let audioContext = null;
  let analyser = null;
  let animationFrameId = null;
  let toastTimeout = null;
  let selectedFile = null;
  let lastUsedIndex = -1;

  // --------------------------------------------------------------------------
  // 4. MENU RESPONSIVO (MOBILE)
  // --------------------------------------------------------------------------
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Fechar menu ao clicar em qualquer link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. TROCA DE ABAS (GRAVAR VS UPLOAD)
  // --------------------------------------------------------------------------
  function switchTab(mode) {
    if (mode === 'record') {
      tabRecord.classList.add('active');
      tabUpload.classList.remove('active');
      panelRecord.classList.add('active');
      panelUpload.classList.remove('active');
      tabRecord.setAttribute('aria-selected', 'true');
      tabUpload.setAttribute('aria-selected', 'false');
    } else {
      tabUpload.classList.add('active');
      tabRecord.classList.remove('active');
      panelUpload.classList.add('active');
      panelRecord.classList.remove('active');
      tabUpload.setAttribute('aria-selected', 'true');
      tabRecord.setAttribute('aria-selected', 'false');
      // Se estava gravando, cancela
      if (isRecording) {
        stopRecording(false);
      }
    }
  }

  if (tabRecord) tabRecord.addEventListener('click', () => switchTab('record'));
  if (tabUpload) tabUpload.addEventListener('click', () => switchTab('upload'));

  // --------------------------------------------------------------------------
  // 6. EFEITOS SONOROS COM WEB AUDIO API (SIMULAÇÃO / FEEDBACK)
  // --------------------------------------------------------------------------
  function playBeep(freq = 600, type = 'sine', duration = 0.12) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Fallback gracioso caso áudio esteja bloqueado pelo navegador
    }
  }

  // Sintetizador divertido de latido "Au au!"
  function playBarkSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;

      // Latido 1: Au!
      createBarkImpulse(ctx, now, 280, 0.15);
      // Latido 2: Au! mais agudo
      createBarkImpulse(ctx, now + 0.18, 360, 0.22);
    } catch (e) {
      console.log('AudioContext not allowed yet');
    }
  }

  function createBarkImpulse(ctx, startTime, startFreq, duration) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 0.5, startTime + duration);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, startTime);
    filter.Q.setValueAtTime(3, startTime);

    gain.gain.setValueAtTime(0.01, startTime);
    gain.gain.linearRampToValueAtTime(0.28, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // --------------------------------------------------------------------------
  // 7. GRAVAÇÃO COM MEDIARECORDER API
  // --------------------------------------------------------------------------
  if (recordBtn) {
    recordBtn.addEventListener('click', toggleRecording);
  }

  async function toggleRecording() {
    if (!isRecording) {
      await startRecording();
    } else {
      stopRecording(true);
    }
  }

  async function startRecording() {
    try {
      // Esconder resultados anteriores
      hideResultCard();
      hidePlaybackBox();

      // Solicitar acesso ao microfone do usuário
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Suporte a diferentes formatos de áudio do navegador
      let mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
          mimeType = 'audio/ogg';
        } else {
          mimeType = '';
        }
      }

      mediaRecorder = mimeType ? new MediaRecorder(audioStream, { mimeType }) : new MediaRecorder(audioStream);
      audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Atribuir ao player de pré-visualização
        if (audioPlayer) {
          audioPlayer.src = audioUrl;
          audioPlaybackBox.classList.remove('hidden');
        }

        // Iniciar animação e tradução
        startAnalysisFlow();
      };

      mediaRecorder.start(100);
      isRecording = true;
      playBeep(440, 'triangle', 0.1);

      // Iniciar analisador de áudio para animação no Canvas
      initAudioVisualizer(audioStream);

      // Atualizar UI
      updateUIRecordingStarted();

    } catch (err) {
      console.error('Erro ao acessar o microfone:', err);
      showToast('⚠️ Permissão de microfone necessária ou não suportada!', '🎙️');
      statusText.textContent = "Acesso ao microfone negado ou indisponível.";
      statusDot.className = "status-dot";
    }
  }

  function stopRecording(shouldAnalyze = true) {
    if (!isRecording) return;

    isRecording = false;
    playBeep(330, 'triangle', 0.12);

    // Parar MediaRecorder
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      if (!shouldAnalyze) {
        mediaRecorder.onstop = null; // não dispara o callback de análise
      }
      mediaRecorder.stop();
    }

    // Parar todas as trilhas do microfone para desligar a luz do microfone
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      audioStream = null;
    }

    // Parar animações do canvas
    stopAudioVisualizer();

    // Atualizar UI
    updateUIRecordingStopped();
  }

  function updateUIRecordingStarted() {
    micVisualWrap.classList.add('recording');
    micIcon.classList.add('hidden');
    stopIcon.classList.remove('hidden');

    statusDot.className = "status-dot recording";
    statusText.textContent = "Ouvindo latido do pet... Toque para parar!";

    // Iniciar temporizador
    recordSeconds = 0;
    recordTimer.textContent = "00:00";
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      recordSeconds++;
      const mins = String(Math.floor(recordSeconds / 60)).padStart(2, '0');
      const secs = String(recordSeconds % 60).padStart(2, '0');
      recordTimer.textContent = `${mins}:${secs}`;

      // Limite de segurança de 30 segundos
      if (recordSeconds >= 30) {
        stopRecording(true);
        showToast('Tempo limite de 30s atingido!', '⏱️');
      }
    }, 1000);
  }

  function updateUIRecordingStopped() {
    micVisualWrap.classList.remove('recording');
    micIcon.classList.remove('hidden');
    stopIcon.classList.add('hidden');

    clearInterval(timerInterval);
    statusDot.className = "status-dot active";
    statusText.textContent = "Latido capturado com sucesso!";
  }

  // --------------------------------------------------------------------------
  // 8. VISUALIZADOR DE ONDAS NO CANVAS (AUDIO CONTEXT)
  // --------------------------------------------------------------------------
  function initAudioVisualizer(stream) {
    if (!waveformCanvas || !canvasCtx) return;

    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;

      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        if (!isRecording) return;
        animationFrameId = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);

        const barWidth = (waveformCanvas.width / bufferLength) * 2;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * (waveformCanvas.height - 10);

          // Gradiente laranja alegre
          const gradient = canvasCtx.createLinearGradient(0, waveformCanvas.height, 0, 0);
          gradient.addColorStop(0, '#FF7A00');
          gradient.addColorStop(1, '#FFB703');

          canvasCtx.fillStyle = gradient;
          canvasCtx.beginPath();
          canvasCtx.roundRect(
            x,
            waveformCanvas.height - barHeight - 4,
            barWidth - 2,
            Math.max(barHeight, 4),
            4
          );
          canvasCtx.fill();

          x += barWidth;
        }
      }

      draw();
    } catch (e) {
      console.warn('Canvas visualizer fallback:', e);
    }
  }

  function stopAudioVisualizer() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    if (canvasCtx && waveformCanvas) {
      canvasCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
    }
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close().catch(() => {});
      audioContext = null;
    }
  }

  // --------------------------------------------------------------------------
  // 9. UPLOAD DE ARQUIVOS (DRAG & DROP + INPUT)
  // --------------------------------------------------------------------------
  if (browseFileBtn && audioFileInput) {
    browseFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      audioFileInput.click();
    });
  }

  if (dropzone && audioFileInput) {
    dropzone.addEventListener('click', () => {
      if (!selectedFile) audioFileInput.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    });

    audioFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
      }
    });
  }

  function handleFileSelect(file) {
    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
      showToast('Por favor envie apenas arquivos de áudio!', '⚠️');
      return;
    }

    selectedFile = file;
    fileNameDisplay.textContent = file.name;
    fileSizeDisplay.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    fileInfoBox.classList.remove('hidden');

    // Carregar no áudio player
    const fileUrl = URL.createObjectURL(file);
    audioPlayer.src = fileUrl;
    audioPlaybackBox.classList.remove('hidden');

    showToast('Áudio carregado! Clique em Traduzir.', '🎵');
  }

  if (clearFileBtn) {
    clearFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      discardSelectedFile();
    });
  }

  function discardSelectedFile() {
    selectedFile = null;
    if (audioFileInput) audioFileInput.value = '';
    if (fileInfoBox) fileInfoBox.classList.add('hidden');
    hidePlaybackBox();
  }

  if (btnDiscardAudio) {
    btnDiscardAudio.addEventListener('click', () => {
      discardSelectedFile();
      hidePlaybackBox();
      showToast('Áudio descartado.', '🗑️');
    });
  }

  if (btnTranslateUploaded) {
    btnTranslateUploaded.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!selectedFile) {
        showToast('Selecione um arquivo de áudio primeiro!', '⚠️');
        return;
      }
      startAnalysisFlow();
    });
  }

  // --------------------------------------------------------------------------
  // 10. SIMULAÇÃO DE LATIDO DEMO (QUICK TEST)
  // --------------------------------------------------------------------------
  if (btnDemoBark) {
    btnDemoBark.addEventListener('click', () => {
      switchTab('record');
      playBarkSound();
      showToast('Latido simulado reproduzido! 🐶', '✨');

      // Simulação rápida de gravação de 1.5s
      statusText.textContent = "Latido de teste detectado!";
      statusDot.className = "status-dot recording";
      recordTimer.textContent = "00:02";

      setTimeout(() => {
        statusDot.className = "status-dot active";
        startAnalysisFlow();
      }, 700);
    });
  }

  // --------------------------------------------------------------------------
  // 11. FLUXO DE ANÁLISE E CARREGAMENTO DIVERTIDO
  // --------------------------------------------------------------------------
  function startAnalysisFlow() {
    // Rolar suavemente até o container de tradução se necessário
    const translatorSection = document.getElementById('tradutor');
    if (translatorSection) {
      translatorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Esconder card de resultado anterior se visível
    hideResultCard();

    // Mostrar tela de animação de análise
    if (analysisBox) {
      analysisBox.classList.remove('hidden');
    }

    // Resetar progresso
    if (analysisProgressBar) analysisProgressBar.style.width = '0%';

    let stepIndex = 0;
    const totalDuration = 2600; // 2.6 segundos para dar suspense e humor
    const intervalTime = totalDuration / ANALYSIS_STEPS.length;

    // Atualizar textos dos passos
    analysisStepText.textContent = ANALYSIS_STEPS[0];

    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < ANALYSIS_STEPS.length) {
        analysisStepText.textContent = ANALYSIS_STEPS[stepIndex];
        const progressPct = Math.round((stepIndex / ANALYSIS_STEPS.length) * 100);
        if (analysisProgressBar) {
          analysisProgressBar.style.width = `${progressPct}%`;
        }
      } else {
        clearInterval(stepInterval);
        if (analysisProgressBar) analysisProgressBar.style.width = '100%';

        setTimeout(() => {
          if (analysisBox) analysisBox.classList.add('hidden');
          showTranslationResult();
        }, 350);
      }
    }, intervalTime);
  }

  // --------------------------------------------------------------------------
  // 12. APRESENTAÇÃO DO CARD DE RESULTADO
  // --------------------------------------------------------------------------
  function showTranslationResult() {
    // Escolher uma frase aleatória sem repetir imediatamente a última
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * CANINE_TRANSLATIONS.length);
    } while (randomIndex === lastUsedIndex && CANINE_TRANSLATIONS.length > 1);

    lastUsedIndex = randomIndex;
    const translation = CANINE_TRANSLATIONS[randomIndex];

    // Atualizar dados na interface
    translationText.textContent = translation.text;
    dogMoodBadge.textContent = translation.mood;
    dogAvatarEmoji.textContent = translation.avatar;
    metricTreat.textContent = translation.treat;
    metricDrama.textContent = translation.drama;
    metricTarget.textContent = translation.target;

    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    resultTimestamp.textContent = `Traduzido hoje às ${timeString}`;

    // Mostrar card com animação
    resultCard.classList.remove('hidden');

    // Tocar efeito de confetes
    launchConfetti();

    // Som de sucesso
    playBeep(520, 'sine', 0.15);
    setTimeout(() => playBeep(780, 'triangle', 0.25), 120);

    // Feedback no balão do cachorro no hero também!
    if (heroBubbleText) {
      heroBubbleText.textContent = `"${translation.text}"`;
    }
  }

  function hideResultCard() {
    if (resultCard) resultCard.classList.add('hidden');
  }

  function hidePlaybackBox() {
    if (audioPlaybackBox) audioPlaybackBox.classList.add('hidden');
  }

  // --------------------------------------------------------------------------
  // 13. AÇÕES DO CARD: COPIAR, OUVIR E TRADUZIR NOVAMENTE
  // --------------------------------------------------------------------------
  // Copiar tradução
  if (btnCopyTranslation) {
    btnCopyTranslation.addEventListener('click', async () => {
      const textToCopy = `"${translationText.textContent.trim()}" — Traduzido no Tradutor de Pets 🐶🐾`;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback para navegadores sem permissão de clipboard direta
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        // Feedback no botão e Toast
        copyBtnText.textContent = "Copiado! ✓";
        btnCopyTranslation.style.backgroundColor = "#D1FAE5";
        btnCopyTranslation.style.color = "#065F46";
        showToast("Tradução copiada para a área de transferência! 🐾", "📋");

        setTimeout(() => {
          copyBtnText.textContent = "Copiar tradução";
          btnCopyTranslation.style.backgroundColor = "";
          btnCopyTranslation.style.color = "";
        }, 2200);

      } catch (err) {
        showToast("Não foi possível copiar automaticamente.", "⚠️");
      }
    });
  }

  // Ouvir em voz alta (Web Speech API)
  if (btnSpeakTranslation) {
    btnSpeakTranslation.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // cancela se algo estiver falando

        const text = translationText.textContent.trim();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.pitch = 1.35; // Voz um pouquinho mais aguda e caricata/animada!
        utterance.rate = 1.05;

        // Selecionar voz em português se disponível
        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find(v => v.lang.includes('pt') || v.lang.includes('BR'));
        if (ptVoice) {
          utterance.voice = ptVoice;
        }

        window.speechSynthesis.speak(utterance);
        showToast("Reproduzindo pensamento canino... 📢", "🔊");
      } else {
        showToast("Síntese de voz não suportada pelo seu navegador.", "⚠️");
      }
    });
  }

  // Traduzir novamente
  if (btnTranslateAgain) {
    btnTranslateAgain.addEventListener('click', () => {
      playBeep(480, 'sine', 0.1);
      startAnalysisFlow();
    });
  }

  // --------------------------------------------------------------------------
  // 14. ANIMAÇÃO DE CONFETES / PATINHAS NO RESULTADO
  // --------------------------------------------------------------------------
  function launchConfetti() {
    if (!confettiContainer) return;
    confettiContainer.innerHTML = '';

    const colors = ['#FF7A00', '#00B4D8', '#FFB703', '#FF70A6', '#10B981'];
    const emojis = ['🐾', '🦴', '✨', '🎾', '❤️'];

    for (let i = 0; i < 22; i++) {
      const piece = document.createElement('div');
      const isEmoji = Math.random() > 0.55;

      piece.style.position = 'absolute';
      piece.style.left = `${Math.random() * 90 + 5}%`;
      piece.style.top = '0';
      piece.style.zIndex = '10';
      piece.style.pointerEvents = 'none';

      if (isEmoji) {
        piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        piece.style.fontSize = `${Math.random() * 14 + 14}px`;
      } else {
        piece.style.width = `${Math.random() * 8 + 6}px`;
        piece.style.height = `${Math.random() * 12 + 8}px`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = '3px';
      }

      const duration = Math.random() * 1.5 + 1.2;
      const xDrift = (Math.random() - 0.5) * 120;

      piece.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${xDrift}px, 220px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });

      confettiContainer.appendChild(piece);
    }
  }

  // --------------------------------------------------------------------------
  // 15. INTERAÇÃO EXTRA: CARINHO NO CACHORRINHO DO HERO
  // --------------------------------------------------------------------------
  const HERO_QUOTES = [
    "Mais carinho na orelha esquerda, por favor! 🐾",
    "Você sabia que eu penso em bifes 23 horas por dia? 🥩",
    "Se jogar a bolinha agora, eu trago de volta... ou talvez não! 🎾",
    "Aquele carteiro não me engana com aquele uniforme azul! 📬",
    "Eu vi você comendo aquele queijo sem me oferecer! 🧀",
    "Au au au! O que significa: amo muito você, humano! ❤️"
  ];

  function pokeDog() {
    playBarkSound();
    const randomHeroQuote = HERO_QUOTES[Math.floor(Math.random() * HERO_QUOTES.length)];
    if (heroBubbleText) {
      heroBubbleText.textContent = `"${randomHeroQuote}"`;
    }

    // Pequena animação no cachorro
    if (heroDogSvg) {
      heroDogSvg.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.08) rotate(3deg)' },
        { transform: 'scale(0.96) rotate(-3deg)' },
        { transform: 'scale(1)' }
      ], {
        duration: 400,
        easing: 'ease-out'
      });
    }

    showToast("Doguinho feliz! Rabinho abanando no máximo! 🐕💨", "❤️");
  }

  if (pokeDogBtn) pokeDogBtn.addEventListener('click', pokeDog);
  if (heroDogSvg) heroDogSvg.addEventListener('click', pokeDog);

  // --------------------------------------------------------------------------
  // 16. TOAST DE NOTIFICAÇÃO
  // --------------------------------------------------------------------------
  function showToast(message, icon = '🐾') {
    if (!toastNotification || !toastMsg) return;

    if (toastIcon) toastIcon.textContent = icon;
    toastMsg.textContent = message;
    toastNotification.classList.remove('hidden');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.add('hidden');
    }, 3200);
  }

});

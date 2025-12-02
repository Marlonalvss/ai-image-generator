import { useState } from 'react';
import { interval, map } from 'rxjs';

// Mensagens que vão ficar rodando em loop enquanto a IA pensa
const STEPS = [
  "🧠 Interpretando sua ideia...",
  "🎨 Carregando modelos de estilo...",
  "📡 Conectando aos nodes da GPU...",
  "🔥 Aquecendo os pixels...",
  "🖌️ Denoising e detalhando...",
  "✨ Aplicando luz e sombra...",
  "🧐 Revisando a composição...",
  "🚀 Finalizando a arte..."
];

export function useGenerationStatus() {
  const [status, setStatus] = useState<string>("Iniciando...");

  const startStream = () => {
    // Cria um stream INFINITO que emite a cada 1.5 segundos
    const stream$ = interval(1500).pipe(
      // O operador % (módulo) faz o loop: 0, 1, 2... 7, 0, 1...
      map(i => STEPS[i % STEPS.length]) 
    );

    const subscription = stream$.subscribe({
      next: (message) => setStatus(message),
    });

    return subscription;
  };

  return { status, startStream };
}
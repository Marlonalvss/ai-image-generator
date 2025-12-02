"use client";

import { useState, useEffect } from "react";
import { useGenerationStatus } from "./hooks/useGenerationStatus"; // <--- IMPORT NOVO

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"image" | "video">("image"); // <--- Estado para alternar modos
  
  // Nosso hook customizado com RxJS
  const { status, startStream } = useGenerationStatus(); 

  // Controle do Dark Mode (Mantivemos o que já funcionava)
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const generateImage = async () => {
    if (!prompt) return;
    
    setLoading(true);
    setImageSrc(null);
    
    // Inicia o stream Infinito
    const subscription = startStream();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } else {
        alert("Erro ao gerar imagem.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      // O SEGREDO ESTÁ AQUI:
      // Só paramos o RxJS (e o texto some) quando TUDO termina.
      subscription.unsubscribe(); 
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageSrc) return;
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = `art-gerada-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center p-8 relative">
      
      <button
        onClick={() => setIsDark(!isDark)}
        className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <div className="max-w-xl w-full space-y-8">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600">
            AI Studio Gen
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Next.js 15 • Tailwind v4 • RxJS • AI
          </p>
        </div>

        {/* --- NOVO: SELETOR DE MODO (IMAGEM VS VIDEO) --- */}
        <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
          <button 
            onClick={() => setMode("image")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'image' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📸 Gerar Imagem
          </button>
          <button 
            onClick={() => setMode("video")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'video' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🎥 Gerar Vídeo (Beta)
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <textarea
            className="w-full p-4 rounded-lg border outline-none transition-all
              bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500
              dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            rows={3}
            placeholder={mode === 'image' ? "Descreva a imagem em inglês..." : "Descreva o vídeo (Ex: Ocean waves moving)..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <button
            onClick={generateImage}
            disabled={loading || !prompt || mode === 'video'} // Desabilitei vídeo propositalmente para ser um "Mock"
            className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {/* AQUI ESTÁ A MENSAGEM DO RXJS */}
                <span className="animate-pulse">{status || "Processando..."}</span>
              </>
            ) : (
              mode === 'image' ? "Gerar Arte Mágica ✨" : "Gerar Vídeo (Em Breve) 🚧"
            )}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="min-h-[300px] rounded-xl flex items-center justify-center overflow-hidden shadow-2xl relative border
            bg-white border-gray-200
            dark:bg-gray-800 dark:border-gray-700"
          >
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt="Imagem Gerada pela IA" 
                className="w-full h-auto object-cover animate-fade-in"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
                {loading ? (
                  <p className="text-purple-500 font-medium">{status}</p>
                ) : (
                  <>
                    <span className="text-4xl opacity-20">{mode === 'image' ? '🖼️' : '🎬'}</span>
                    <span className="text-sm">O resultado aparecerá aqui</span>
                  </>
                )}
              </div>
            )}
          </div>

          {imageSrc && (
            <button
              onClick={downloadImage}
              className="w-full py-2 px-4 rounded-lg border font-medium flex items-center justify-center gap-2 transition-colors
                border-purple-600 text-purple-700 hover:bg-purple-50
                dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-500/10"
            >
              ⬇️ Baixar Imagem
            </button>
          )}
        </div>

      </div>
    </main>
  );
}
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt é obrigatório" }, { status: 400 });
    }

    // Adicionei uma "seed" aleatória para garantir que a imagem mude se você repetir o prompt
    const randomSeed = Math.floor(Math.random() * 1000000);
    
    // URL Mágica do Pollinations (Funciona sem chave)
    const finalUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;

    console.log("🎨 Gerando via Pollinations:", prompt);

    const response = await fetch(finalUrl);

    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });

  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json({ error: "Erro ao processar imagem" }, { status: 500 });
  }
}
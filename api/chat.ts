import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
  runtime: 'edge', // Usamos el runtime más rápido de Vercel
};

export default async function handler(req: Request) {
  // 1. Solo aceptamos peticiones POST
  if (req.method !== 'POST') {
    return new Response('Método no permitido', { status: 405 });
  }

  try {
    const { prompt } = await req.json();

    // 2. Usamos la variable de entorno que configuraremos en Vercel
    const genAI = new GoogleGenerativeAI(process.env['GEMINI_API_KEY'] || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error en la IA' }), { status: 500 });
  }
}

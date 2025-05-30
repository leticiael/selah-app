import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const ADMIN_PASSWORD = 'selah2024';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const senha = url.searchParams.get('senha');
  
  if (senha !== ADMIN_PASSWORD) {
    return Response.json({ error: 'Acesso negado' }, { status: 401 });
  }

  try {
    const positivos = await redis.get("feedback:positivos");
    const negativos = await redis.get("feedback:negativos");
    
    // Corrigir conversão de null para 0
    const positivosNum = positivos ? Number(positivos) : 0;
    const negativosNum = negativos ? Number(negativos) : 0;
    
    return Response.json({
      positivos: positivosNum,
      negativos: negativosNum,
      total: positivosNum + negativosNum
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { rating, sessionId, context } = await request.json();
    
    if (!rating || !sessionId) {
      return Response.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const key = rating === "up" ? "feedback:positivos" : "feedback:negativos";
    await redis.incr(key);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar feedback:', error);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
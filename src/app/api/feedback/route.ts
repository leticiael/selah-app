import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { rating } = await request.json();
    
    // Salva +1 no contador
    await redis.incr(`feedback:${rating}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const positivos = await redis.get('feedback:up') || 0;
    const negativos = await redis.get('feedback:down') || 0;
    
    return NextResponse.json({
      positivos: Number(positivos),
      negativos: Number(negativos),
      total: Number(positivos) + Number(negativos)
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro' }, { status: 500 });
  }
}
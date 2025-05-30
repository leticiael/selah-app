'use client';
import { useState } from 'react';

interface FeedbackButtonsProps {
  context?: string;
  title?: string;
  onFeedbackSubmitted?: (rating: 'up' | 'down') => void;
}

export default function FeedbackButtons({ 
  context = 'breathing',
  title = 'Como foi sua sessão de respiração?',
  onFeedbackSubmitted 
}: FeedbackButtonsProps) {
  const [jaClicou, setJaClicou] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const clicarBotao = async (tipo: 'up' | 'down') => {
    if (jaClicou || enviando) return;
    
    setEnviando(true);
    setFeedback(tipo);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          rating: tipo,
          sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          context 
        })
      });
      
      if (response.ok) {
        setJaClicou(true);
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted(tipo);
        }
      } else {
        throw new Error('Erro no servidor');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar feedback. Tente novamente.');
      setFeedback(null);
    } finally {
      setEnviando(false);
    }
  };

  if (jaClicou) {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="text-4xl">
          {feedback === 'up' ? '😊' : '🤗'}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-100 mb-2">
            {feedback === 'up' ? 'Que bom que você gostou!' : 'Você não está sozinho(a)'}
          </h3>
          <p className="text-blue-200 text-sm max-w-md mb-4">
            {feedback === 'up' 
              ? 'Continue praticando! A respiração traz muitos benefícios.' 
              : 'Sabemos que às vezes os exercícios podem não funcionar como esperado. Isso é normal e faz parte do processo de aprendizado.'
            }
          </p>
          
          {feedback === 'down' && (
            <div className="bg-white/10 p-4 rounded-lg border border-blue-200/20 max-w-md">
              <p className="text-blue-100 text-sm mb-3 font-medium">
                🫂 Se você está passando por um momento difícil:
              </p>
              <div className="text-blue-200 text-sm space-y-2">
                <p>
                  <strong>CVV:</strong> <span className="font-mono text-blue-100">188</span>
                </p>
                <p className="text-xs">
                  Centro de Valorização da Vida - Apoio emocional 24h gratuito
                </p>
                <p className="text-xs">
                  Ligue sempre que precisar conversar. Você é importante! 💙
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <h3 className="text-lg font-semibold text-blue-100 text-center max-w-md">
        {title}
      </h3>
      
      <div className="flex gap-6">
        <button
          onClick={() => clicarBotao('up')}
          disabled={enviando}
          className="group flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50 min-w-[100px] border border-blue-200/20"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform">
            👍
          </span>
          <span className="text-xs font-medium text-blue-200">
            Ajudou!
          </span>
        </button>
        
        <button
          onClick={() => clicarBotao('down')}
          disabled={enviando}
          className="group flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 disabled:opacity-50 min-w-[100px] border border-blue-200/20"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform">
            👎
          </span>
          <span className="text-xs font-medium text-blue-200">
            Não muito
          </span>
        </button>
      </div>
      
      {enviando && (
        <div className="flex items-center gap-2 text-blue-200">
          <div className="w-3 h-3 border-2 border-blue-200 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs">Enviando...</span>
        </div>
      )}
      
      <p className="text-xs text-blue-300/70 text-center max-w-sm">
        Seu feedback é anônimo
      </p>
    </div>
  );
}
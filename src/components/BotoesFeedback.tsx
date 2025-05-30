'use client';
import { useState } from 'react';

export default function BotoesFeedback() {
  const [jaClicou, setJaClicou] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const clicarBotao = async (tipo: 'up' | 'down') => {
    setEnviando(true);
    
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: tipo })
      });
      
      setJaClicou(true);
      alert(tipo === 'up' ? 'Obrigado! 😊' : 'Obrigado pelo feedback! 🤗');
    } catch (error) {
      alert('Erro! Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  if (jaClicou) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-lg text-gray-600">Obrigado pelo feedback!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h3 className="text-xl font-semibold text-gray-800">
        Como foi sua respiração?
      </h3>
      
      <div className="flex gap-6">
        <button
          onClick={() => clicarBotao('up')}
          disabled={enviando}
          className="p-4 bg-green-100 hover:bg-green-200 rounded-full text-4xl disabled:opacity-50 transition-colors"
        >
          👍
        </button>
        
        <button
          onClick={() => clicarBotao('down')}
          disabled={enviando}
          className="p-4 bg-red-100 hover:bg-red-200 rounded-full text-4xl disabled:opacity-50 transition-colors"
        >
          👎
        </button>
      </div>
      
      {enviando && (
        <p className="text-sm text-gray-500">Enviando...</p>
      )}
    </div>
  );
}
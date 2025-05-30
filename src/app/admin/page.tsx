'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [logado, setLogado] = useState(false);
  const [senha, setSenha] = useState('');
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const fazerLogin = () => {
    if (senha === 'selah2024') {
      setLogado(true);
      setErro('');
      buscarDados();
    } else {
      setErro('Senha incorreta');
      setSenha('');
    }
  };

  const buscarDados = async () => {
    setCarregando(true);
    try {
      const response = await fetch('/api/feedback?senha=selah2024');
      if (response.status === 401) {
        setErro('Erro de autorização');
        setLogado(false);
        return;
      }
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setErro('Erro ao carregar dados');
    } finally {
      setCarregando(false);
    }
  };

  const sair = () => {
    setLogado(false);
    setSenha('');
    setDados(null);
  };

  if (!logado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">🔒 Admin Selah</h1>
            <p className="text-gray-300">Dashboard de Feedback</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fazerLogin()}
                placeholder="Digite a senha..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {erro && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg">
                {erro}
              </div>
            )}
            
            <button
              onClick={fazerLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition"
            >
              Entrar
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Acesso restrito aos administradores do Selah
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">📊 Dashboard Selah</h1>
            <p className="text-gray-300">Feedback dos Exercícios de Respiração</p>
          </div>
          <button
            onClick={sair}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Sair
          </button>
        </div>

        {carregando ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-white">Carregando dados...</span>
          </div>
        ) : dados ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Feedbacks Positivos</p>
                  <p className="text-3xl font-bold text-green-400">{dados.positivos}</p>
                </div>
                <div className="text-4xl">👍</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Feedbacks Negativos</p>
                  <p className="text-3xl font-bold text-red-400">{dados.negativos}</p>
                </div>
                <div className="text-4xl">👎</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Taxa de Satisfação</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {dados.total > 0 ? Math.round((dados.positivos / dados.total) * 100) : 0}%
                  </p>
                </div>
                <div className="text-4xl">📈</div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Estatísticas Gerais</h2>
            <button
              onClick={buscarDados}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              🔄 Atualizar
            </button>
          </div>
          
          {dados && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Total de Feedbacks:</span>
                <span className="text-white font-semibold">{dados.total}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Satisfação dos Usuários</span>
                  <span className="text-white">
                    {dados.total > 0 ? Math.round((dados.positivos / dados.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: dados.total > 0 ? `${(dados.positivos / dados.total) * 100}%` : '0%' 
                    }}
                  ></div>
                </div>
              </div>

              {dados.total === 0 && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-400">Ainda não há feedbacks registrados.</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Os dados aparecerão aqui quando os usuários começarem a usar o Selah.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
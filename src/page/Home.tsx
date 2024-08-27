import React, { useState, useEffect } from 'react';
import { decryptText, encryptText, validarTexto } from '../validations/validation';
import { Default, Image, Result } from '../components';

const Home = () => {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState('');
  const [modo, setModo] = useState('encrypt');
  const [error, setError] = useState('');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (copiado) {
      const timer = setTimeout(() => setCopiado(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copiado]);

  useEffect(() => {
    const handlePaste = () => {
      setTimeout(() => {
        if (texto && validarTexto(texto)) {
          setModo('decrypt');
          manejarAccion();
        }
      }, 0);
    };

    const textArea = document.getElementById('inputText');
    textArea?.addEventListener('paste', handlePaste);

    return () => {
      textArea?.removeEventListener('paste', handlePaste);
    };
  }, [texto]);

  const manejarCambio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTexto(e.target.value);
    setError('');
  };

  const manejarAccion = () => {
    if (!texto.trim()) {
      setError('Por favor, ingrese algún texto.');
      return;
    }
    if (!validarTexto(texto)) {
      setError('El texto solo debe contener letras minúsculas sin acentos ni caracteres especiales');
      return;
    }

    const textoResultado = modo === 'encrypt' ? encryptText(texto) : decryptText(texto);
    setResultado(textoResultado);
  };

  const clippText = () => {
    navigator.clipboard.writeText(resultado)
      .then(() => setCopiado(true))
      .catch(() => setError('No se pudo copiar el texto. Inténtalo de nuevo.'));
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f5fc] flex justify-center items-center p-4">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-8">

        <div className="w-full md:w-2/3 flex flex-col gap-8">
          <textarea
            id="inputText"
            className="w-full h-60 text-[#0a3871] text-2xl font-normal leading-relaxed outline-none p-4 rounded-lg resize-none bg-transparent focus:border-[#052051] transition-colors"
            placeholder="Ingrese el texto aquí"
            value={texto}
            onChange={manejarCambio}
            aria-label="Texto para encriptar o desencriptar"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col sm:flex-row justify-center gap-8 lg:gap-32">
            <button
              className={`w-full sm:w-64 h-12 rounded-3xl font-normal transition-colors ${modo === 'encrypt'
                ? 'bg-[#0a3871] text-white hover:bg-[#052051]'
                : 'bg-[#d8dfe8] text-[#0a3871] hover:bg-[#0a3871] hover:text-white'
                }`}
              onClick={() => {
                setModo('encrypt');
                manejarAccion();
              }}
            >
              Encriptar
            </button>

            <button
              className={`w-full sm:w-64 h-12 rounded-3xl font-normal transition-colors ${modo === 'decrypt'
                ? 'bg-[#0a3871] text-white hover:bg-[#052051]'
                : 'bg-[#d8dfe8] text-[#0a3871] hover:bg-[#0a3871] hover:text-white'
                }`}
              onClick={() => {
                setModo('decrypt');
                manejarAccion();
              }}
            >
              Desencriptar
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3 h-auto">
          <div className="bg-white rounded-3xl p-6 shadow-lg w-full h-full flex flex-col justify-center items-center">
            {resultado ? (
              <Result resultado={resultado} clipText={clippText} copy={copiado} />
            ) : texto.trim() === '' ? (
              <Image src="/public/Muñeco.png" alt="muñeco alura" className="w-full h-auto" />
            ) : (
              <Default />
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;

import { useState } from 'react';
import { decryptText, encryptText, validarTexto } from '../validations/validation';

const useEncryptDecrypt = () => {
    const [texto, setTexto] = useState<string>('');
    const [resultado, setResultado] = useState<string>(''); 
    const [modo, setModo] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [error, setError] = useState<string>('');

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

    return [texto, resultado, modo, error, manejarCambio, manejarAccion, setModo] as const;
};

export default useEncryptDecrypt;
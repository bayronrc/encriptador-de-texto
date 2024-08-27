// Objeto de mapeo para la encriptación
const encryptionMap: { [key: string]: string } = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};
const decryptionMap: { [key: string]: string } = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
};

export const encryptText = (text: string): string => {
    return text.split('').map(char => encryptionMap[char] || char).join('');
};

export const decryptText = (text: string): string => {
    let result = text;
    Object.entries(decryptionMap).forEach(([encrypted, decrypted]) => {
        const regex = new RegExp(encrypted, 'g');
        result = result.replace(regex, decrypted);
    });
    return result;
};

export const validarTexto = (text: string): boolean => {
    return /^[a-z\s]+$/.test(text);
};
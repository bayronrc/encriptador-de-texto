import { useState, useEffect } from 'react';

const useTextCopied = () => {
    const [copiado, setCopiado] = useState<boolean>(false);

    useEffect(() => {
        if (copiado) {
            const timer = setTimeout(() => setCopiado(false), 3000); 
            return () => clearTimeout(timer); 
        }
    }, [copiado]);

    return [copiado, setCopiado] as const; 
};

export default useTextCopied;
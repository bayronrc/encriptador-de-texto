import { useState, useEffect } from 'react';

const useErrorMessage = () => {
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000); 
            return () => clearTimeout(timer); 
        }
    }, [error]);

    return [error, setError] as const; 
};

export default useErrorMessage;
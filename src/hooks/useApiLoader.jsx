import { useState, useCallback } from 'react';

/**
 * Hook to manage global API loading state.
 * Returns [loading, startLoading, stopLoading].
 */
export default function useApiLoader() {
    const [loading, setLoading] = useState(false);

    const startLoading = useCallback(() => setLoading(true), []);
    const stopLoading = useCallback(() => setLoading(false), []);

    return [loading, startLoading, stopLoading];
}
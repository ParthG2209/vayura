'use client';

import { useState, useEffect, useCallback } from 'react';

export interface NetworkStatus {
    isOnline: boolean;
    effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
}

/**
 * Hook to monitor network connectivity status
 */
export function useNetworkStatus(): NetworkStatus {
    const [status, setStatus] = useState<NetworkStatus>(() => {
        // SSR-safe initial state
        if (typeof window === 'undefined') {
            return { isOnline: true };
        }
        return { isOnline: navigator.onLine };
    });

    const updateNetworkInfo = useCallback(() => {
        if (typeof window === 'undefined') return;

        const connection = (navigator as any).connection ||
            (navigator as any).mozConnection ||
            (navigator as any).webkitConnection;

        setStatus({
            isOnline: navigator.onLine,
            effectiveType: connection?.effectiveType,
            downlink: connection?.downlink,
            rtt: connection?.rtt,
            saveData: connection?.saveData,
        });
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Initial update
        updateNetworkInfo();

        // Event listeners
        const handleOnline = () => {
            setStatus(prev => ({ ...prev, isOnline: true }));
            updateNetworkInfo();
        };

        const handleOffline = () => {
            setStatus(prev => ({ ...prev, isOnline: false }));
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Listen to connection changes if available
        const connection = (navigator as any).connection;
        if (connection) {
            connection.addEventListener('change', updateNetworkInfo);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            if (connection) {
                connection.removeEventListener('change', updateNetworkInfo);
            }
        };
    }, [updateNetworkInfo]);

    return status;
}

/**
 * Simple hook to check if online
 */
export function useIsOnline(): boolean {
    const { isOnline } = useNetworkStatus();
    return isOnline;
}

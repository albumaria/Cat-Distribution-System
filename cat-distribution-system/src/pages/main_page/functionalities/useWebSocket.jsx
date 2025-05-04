import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import {getUser} from "../../../utils/UserSession";

const useWebSocket = (url) => {
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const clientRef = useRef(null);
    const subscriptionsRef = useRef({});

    useEffect(() => {
        if (!url) return;

        const client = new Client({
            webSocketFactory: () => new SockJS(url),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                setConnected(true);
                setError(null);
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                setConnected(false);
            },
            onStompError: (frame) => {
                console.error('STOMP Error:', frame.headers.message);
                setError(`WebSocket Error: ${frame.headers.message}`);
            }
        });

        clientRef.current = client;
        client.activate();

        return () => {
            Object.values(subscriptionsRef.current).forEach(sub => {
                if (sub && sub.unsubscribe) sub.unsubscribe();
            });

            if (clientRef.current && clientRef.current.connected) {
                clientRef.current.deactivate();
            }
        };
    }, [url]);

    const subscribe = useCallback((topic, callback) => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.warn('WebSocket not connected, cannot subscribe');
            return null;
        }

        if (subscriptionsRef.current[topic]) {
            subscriptionsRef.current[topic].unsubscribe();
        }

        const subscription = clientRef.current.subscribe(topic, message => {
            try {
                const parsedData = JSON.parse(message.body);
                callback(parsedData);
            } catch (e) {
                console.error('Error parsing WebSocket message:', e);
            }
        });

        subscriptionsRef.current[topic] = subscription;
        return subscription;
    }, []);

    const unsubscribe = useCallback((topic) => {
        if (subscriptionsRef.current[topic]) {
            subscriptionsRef.current[topic].unsubscribe();
            delete subscriptionsRef.current[topic];
        }
    }, []);

    const startGenerator = useCallback(async () => {
        try {
            const userId = getUser().id;
            await fetch(`http://localhost:8080/cats/generator/start?user=${userId}`, { method: 'POST' });
            setIsGenerating(true);
        } catch (err) {
            console.error('Failed to start generator:', err);
        }
    }, []);

    const stopGenerator = useCallback(async () => {
        try {
            await fetch('http://localhost:8080/cats/generator/stop', { method: 'POST' });
            setIsGenerating(false);
        } catch (err) {
            console.error('Failed to stop generator:', err);
        }
    }, []);

    return {
        connected,
        error,
        subscribe,
        unsubscribe,
        isGenerating,
        startGenerator,
        stopGenerator
    };
};

export default useWebSocket;
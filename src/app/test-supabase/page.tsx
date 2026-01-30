'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseTestPage() {
    const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
    const [message, setMessage] = useState('Testing connection...');

    useEffect(() => {
        async function testConnection() {
            try {
                const { data, error } = await supabase.from('Artwork').select('id').limit(1);

                if (error) {
                    throw error;
                }

                setStatus('success');
                setMessage('Successfully connected to Supabase! Your client and environment variables are working.');
            } catch (err: any) {
                console.error('Supabase connection error:', err);
                setStatus('error');
                setMessage(`Connection failed: ${err.message || 'Unknown error'}`);
            }
        }

        testConnection();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 font-sans">
            <div className={`p-8 rounded-2xl border ${status === 'success' ? 'border-green-500 bg-green-500/10' : status === 'error' ? 'border-red-500 bg-red-500/10' : 'border-blue-500 bg-blue-500/10'}`}>
                <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
                <p className="text-lg mb-6">{message}</p>

                {status === 'success' && (
                    <div className="space-y-4">
                        <p className="text-gray-400 text-sm">Now that you're connected, you can start using Supabase for Auth, Storage, or Database.</p>
                        <a
                            href="/"
                            className="inline-block bg-white text-black px-6 py-2 rounded-full font-medium transition-transform hover:scale-105"
                        >
                            Back to Home
                        </a>
                    </div>
                )}

                {status === 'error' && (
                    <p className="text-gray-400 text-sm">Double check your <code>.env</code> file for any typos or extra spaces.</p>
                )}
            </div>
        </div>
    );
}

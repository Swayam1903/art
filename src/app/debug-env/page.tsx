export default async function DebugEnvPage() {
    const envs = {
        DATABASE_URL: process.env.DATABASE_URL ? 'PRESENT (starts with ' + process.env.DATABASE_URL.substring(0, 10) + '...)' : 'MISSING',
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'PRESENT' : 'MISSING',
        NODE_ENV: process.env.NODE_ENV,
    };

    return (
        <div className="p-10 font-mono text-sm bg-black text-white min-h-screen">
            <h1 className="text-xl font-bold mb-4">Environment Debugger</h1>
            <pre>{JSON.stringify(envs, null, 2)}</pre>

            <div className="mt-10 p-4 border border-zinc-700 rounded text-zinc-400">
                <p>If anything says MISSING, then Vercel is NOT passing the variables to your app.</p>
                <p className="mt-2">Note: You must push this change and visit the live link on Vercel.</p>
            </div>
        </div>
    );
}

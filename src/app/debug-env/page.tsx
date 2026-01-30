export const dynamic = "force-dynamic";

export default async function DebugEnvPage() {
    let envs = {};

    try {
        envs = {
            DATABASE_URL: process.env.DATABASE_URL ? 'PRESENT (starts with ' + process.env.DATABASE_URL.substring(0, 10) + '...)' : 'MISSING',
            NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
            NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'PRESENT' : 'MISSING',
            NODE_ENV: process.env.NODE_ENV,
            VERCEL_ENV: process.env.VERCEL_ENV || 'LOCAL',
            VERCEL_REGION: process.env.VERCEL_REGION || 'UNKNOWN',
            BUILD_TIME: "2026-01-30 15:30",
            DIAGNOSTIC_MODE: true,
            VERCEL_PROJECT_NAME: process.env.VERCEL_PROJECT_NAME || 'NOT_FOUND',
            VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID || 'NOT_FOUND',
            CHECKED_AT: new Date().toISOString(),
            ALL_KEYS: Object.keys(process.env).filter(k => !k.includes('KEY') && !k.includes('SECRET') && !k.includes('PASSWORD')).sort(),
        };
    } catch (e: unknown) {
        envs = { error: e instanceof Error ? e.message : 'Unknown error' };
    }

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

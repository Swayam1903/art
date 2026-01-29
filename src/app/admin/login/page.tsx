"use client";

import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1C1C1E] p-4">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent-light to-accent"></div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide mb-2">POLYARTS</h1>
                    <p className="text-muted text-xs uppercase tracking-[0.2em]">Administration Portal</p>
                </div>

                <form action={async (formData) => {
                    await login(formData);
                }} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Access Key</label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter authentication key"
                            className="bg-zinc-50 border-zinc-200 focus:border-accent focus:ring-accent/20 h-10 transition-all font-mono"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white font-medium tracking-wide py-6 rounded-lg text-sm transition-all shadow-lg hover:shadow-xl">
                        Authenticate System
                    </Button>
                    <p className="text-[10px] text-center text-zinc-400 mt-6 tracking-wide">
                        Protected System. Unauthorized access is prohibited.
                    </p>
                </form>
            </div>
        </div>
    );
}

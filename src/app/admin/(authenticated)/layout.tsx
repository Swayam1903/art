import { checkAuth } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, FolderOpen, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
        redirect("/admin/login");
    }

    // If not logged in and not on login page, redirect
    // Note: This layout wraps /admin, so we need to handle /admin/login specially 
    // But wait, layout applies to nested too? Yes.
    // So if I am on /admin/login, I shouldn't be redirected recursively.
    // Middleware is better for this, but to keep it simple without middleware file edits:
    // I will make a separate layout for login or just handle it here? 
    // Actually, usually Login is outside Admin Layout or Admin Layout handles the check but ignores login route.
    // Structure: /admin/layout.tsx -> children.
    // If I browse /admin/login, it uses this layout... which redirects to /admin/login... infinite loop.
    // Solution: Move login to /login or /admin-login so it's not under /admin layout?
    // OR: Group routes: (admin)/admin/layout.tsx and (public)/admin/login/page.tsx ?

    // EASIEST: Just move login page out of /admin folder or ignore check logic if path is login.
    // But I can't check path easily in Server Layout without headers hacking.

    // Let's assume the user navigates to /admin/login directly if valid.
    // I will move login page to `src/app/admin-login/page.tsx` to avoid layout conflict, 
    // OR use Route Groups: `src/app/(admin)/admin` and `src/app/(auth)/login`.

    // I'll stick to: Check auth. If false, and we are not in a whitelist... 
    // Since I can't check path, I'll restrict this layout to strictly protected pages.
    // Move login into `src/app/admin/login` but use a different layout?
    // Next.js allows `src/app/admin/login/layout.tsx` to override? No, it nests.

    // REFACTOR:
    // `src/app/admin/(authenticated)/layout.tsx` -> Protected Layout
    // `src/app/admin/(authenticated)/page.tsx` -> Dashboard
    // `src/app/admin/login/page.tsx` -> Public Login
    // `src/app/admin/layout.tsx` -> minimal root layout or none (inherits app root)

    // I will execute this refactor implicitly by creating the files in correct structure.

    // For now, I'll just write the protected layout code, but place it in `src/app/admin/(authenticated)/layout.tsx`.
    // And dashboard to `src/app/admin/(authenticated)/page.tsx`.
    // And delete the root `src/app/admin/layout.tsx` if it exists (it doesn't yet).

    return (
        <div className="flex min-h-screen bg-[#F0EFEC]">
            {/* Sidebar */}
            <aside className="w-72 bg-[#1C1C1E] text-white hidden md:flex flex-col shadow-xl">
                <div className="p-8 border-b border-white/10">
                    <h2 className="text-2xl font-serif font-bold tracking-[0.2em] text-accent">POLYARTS</h2>
                    <span className="text-[10px] uppercase text-zinc-400 tracking-[0.3em] mt-2 block">Administration</span>
                </div>

                <nav className="flex-1 p-6 space-y-3">
                    <Link href="/admin" className="group flex items-center space-x-4 px-4 py-4 text-sm font-medium rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all duration-300">
                        <LayoutDashboard className="w-5 h-5 group-hover:text-accent transition-colors" />
                        <span className="tracking-wide">Dashboard</span>
                    </Link>
                    <Link href="/admin/artworks" className="group flex items-center space-x-4 px-4 py-4 text-sm font-medium rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all duration-300">
                        <ImageIcon className="w-5 h-5 group-hover:text-accent transition-colors" />
                        <span className="tracking-wide">Artworks</span>
                    </Link>
                    <Link href="/admin/categories" className="group flex items-center space-x-4 px-4 py-4 text-sm font-medium rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all duration-300">
                        <FolderOpen className="w-5 h-5 group-hover:text-accent transition-colors" />
                        <span className="tracking-wide">Categories</span>
                    </Link>
                </nav>

                <div className="p-6 border-t border-white/10">
                    <form action={logout}>
                        <button className="group flex items-center space-x-4 px-4 py-4 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg w-full transition-all duration-300">
                            <LogOut className="w-5 h-5 group-hover:text-red-300" />
                            <span className="tracking-wide">Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

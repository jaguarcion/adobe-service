"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputToken, setInputToken] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const t = localStorage.getItem('admin_token');
        if (t) setIsAuthenticated(true);
    }, []);

    const login = () => {
        if (inputToken) {
            localStorage.setItem('admin_token', inputToken);
            setIsAuthenticated(true);
        }
    };

    if (!mounted) return null;

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Access Token</label>
                            <input 
                                type="password" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={inputToken}
                                onChange={e => setInputToken(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={login}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Enter
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const navLinks = [
        { name: 'Dashboard', path: '/' },
        { name: 'Клиенты', path: '/clients' },
        { name: 'Аккаунты', path: '/accounts' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 relative">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">Adobe Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path} 
                            href={link.path}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${pathname === link.path ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button 
                        onClick={() => { localStorage.removeItem('admin_token'); setIsAuthenticated(false); }}
                        className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        Выйти
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}

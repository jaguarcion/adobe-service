"use client";
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [stats, setStats] = useState({ accounts: 0, activeAccounts: 0, clients: 0 });

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        fetch('http://localhost:3000/api/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(console.error);
    }, []);

    const forceCheck = () => {
        const token = localStorage.getItem('admin_token');
        fetch('http://localhost:3000/api/worker/force', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => alert(data.message))
        .catch(console.error);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <button 
                    onClick={forceCheck}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                >
                    Запустить проверку (Фон)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 font-medium text-sm">Всего аккаунтов</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{stats.accounts}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 font-medium text-sm">Активные аккаунты</h3>
                    <p className="text-4xl font-bold text-green-600 mt-2">{stats.activeAccounts}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 font-medium text-sm">Всего клиентов</h3>
                    <p className="text-4xl font-bold text-blue-600 mt-2">{stats.clients}</p>
                </div>
            </div>
        </div>
    );
}

"use client";
import { useEffect, useState } from 'react';

type Client = {
    id: number;
    email: string;
    telegram: string;
    connected_at: string;
    subscription_ends_at: string;
    account_login?: string;
    account_id?: number;
    org_status?: string;
    organization?: string;
};

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState({ email: '', telegram: '', subscription_ends_at: '' });

    const fetchClients = () => {
        const token = localStorage.getItem('admin_token');
        fetch('http://localhost:3000/api/clients', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setClients(data))
        .catch(console.error);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const addClient = (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('admin_token');
        fetch('http://localhost:3000/api/clients', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setIsAdding(false);
                setForm({ email: '', telegram: '', subscription_ends_at: '' });
                fetchClients();
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Клиенты</h1>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                >
                    {isAdding ? 'Отмена' : '+ Добавить клиента'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                    <h2 className="text-lg font-bold mb-4">Новый клиент</h2>
                    <form onSubmit={addClient} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email</label>
                            <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Telegram</label>
                            <input type="text" value={form.telegram} onChange={e => setForm({...form, telegram: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Дата окончания подписки</label>
                            <input type="date" value={form.subscription_ends_at} onChange={e => setForm({...form, subscription_ends_at: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">Создать</button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID / Email</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Контакты</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Подписка до</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Аккаунт Adobe</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {clients.length === 0 && (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Нет клиентов</td></tr>
                            )}
                            {clients.map(client => (
                                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{client.email}</div>
                                        <div className="text-xs text-gray-500">ID: {client.id} | Подкл: {client.connected_at?.substring(0,10)}</div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {client.telegram ? `@${client.telegram.replace('@', '')}` : '-'}
                                    </td>
                                    <td className="p-4 text-sm font-medium">
                                        {client.subscription_ends_at ? client.subscription_ends_at.substring(0,10) : <span className="text-gray-400">Бессрочно</span>}
                                    </td>
                                    <td className="p-4">
                                        {client.account_id ? (
                                            <div>
                                                <div className="text-sm font-medium text-blue-600">{client.account_login}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-xs">{client.organization || 'Нет организации'}</div>
                                            </div>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Нет аккаунта
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

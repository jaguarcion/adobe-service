"use client";
import { useEffect, useState } from 'react';

type Account = {
    id: number;
    login: string;
    organization: string;
    org_status: string;
    org_checked_at: string;
    expires_at: string;
    client_id: number | null;
    client_email: string | null;
};

type Client = {
    id: number;
    email: string;
};

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState({ login: '', password: '' });

    const fetchData = () => {
        const token = localStorage.getItem('admin_token');
        fetch('http://localhost:3000/api/accounts', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setAccounts(data))
        .catch(console.error);

        fetch('http://localhost:3000/api/clients', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setClients(data))
        .catch(console.error);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addAccount = (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('admin_token');
        fetch('http://localhost:3000/api/accounts', {
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
                setForm({ login: '', password: '' });
                fetchData();
            } else {
                alert(data.error);
            }
        });
    };

    const assignClient = (accountId: number, clientId: string) => {
        if (!clientId) return;
        const token = localStorage.getItem('admin_token');
        fetch(`http://localhost:3000/api/accounts/${accountId}/assign`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ client_id: parseInt(clientId) })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) fetchData();
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Аккаунты</h1>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                >
                    {isAdding ? 'Отмена' : '+ Добавить аккаунт'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                    <h2 className="text-lg font-bold mb-4">Новый аккаунт</h2>
                    <form onSubmit={addAccount} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email (Логин)</label>
                            <input required type="email" value={form.login} onChange={e => setForm({...form, login: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Пароль</label>
                            <input required type="text" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
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
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Аккаунт (Логин)</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Организация & Подписка</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Статус</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Клиент</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {accounts.length === 0 && (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Нет аккаунтов</td></tr>
                            )}
                            {accounts.map(acc => (
                                <tr key={acc.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{acc.login}</div>
                                        <div className="text-xs text-gray-500">Обновлен: {acc.org_checked_at?.substring(0,16) || '-'}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-800">{acc.organization || <span className="italic text-gray-400">Не определена</span>}</div>
                                        {acc.expires_at && (
                                            <div className="text-xs text-orange-600 mt-1 font-medium">Лицензия до: {acc.expires_at.substring(0,10)}</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                            ${acc.org_status === 'ok' ? 'bg-green-100 text-green-800' : 
                                              acc.org_status === 'error' ? 'bg-red-100 text-red-800' : 
                                              acc.org_status === 'switched' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {acc.org_status || 'Ожидание'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {acc.client_id ? (
                                            <div className="text-sm font-medium text-indigo-600">
                                                {acc.client_email}
                                            </div>
                                        ) : (
                                            <select 
                                                className="border rounded px-2 py-1 text-sm bg-white outline-none focus:ring-1 focus:ring-blue-500"
                                                onChange={(e) => assignClient(acc.id, e.target.value)}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Назначить клиенту...</option>
                                                {clients.filter(c => !c.account_id || true).map(c => (
                                                    <option key={c.id} value={c.id}>{c.email}</option>
                                                ))}
                                            </select>
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

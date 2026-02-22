import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import api from '../utils/api';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await api.get('/banking/transactions');
                setTransactions(res.data.transactions || []);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    if (loading) {
        return <div className="text-center p-8 text-slate-400">Loading transactions...</div>;
    }

    return (
        <div className="glass p-8 rounded-2xl w-full">
            <h3 className="text-2xl font-bold mb-6">Transaction History</h3>
            {transactions.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                    <History size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No recent transactions found.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {transactions.map((tx) => (
                        <li key={tx.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'DEPOSIT' || tx.type === 'RECEIVED' ? 'bg-green-500/20 text-green-400' :
                                        tx.type === 'WITHDRAW' || tx.type === 'TRANSFER' ? 'bg-red-500/20 text-red-400' :
                                            'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    <History size={18} />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-200 capitalize">{tx.type.toLowerCase()}</div>
                                    <div className="text-xs text-slate-400">{new Date(tx.createdAt).toLocaleString()}</div>
                                </div>
                            </div>
                            <div className={`font-bold ${tx.type === 'DEPOSIT' || tx.type === 'RECEIVED' ? 'text-green-400' :
                                    tx.type === 'WITHDRAW' || tx.type === 'TRANSFER' ? 'text-red-400' :
                                        'text-blue-400'
                                }`}>
                                {tx.type === 'DEPOSIT' || tx.type === 'RECEIVED' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Transactions;

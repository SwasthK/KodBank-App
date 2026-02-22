import React, { useState } from 'react';
import api from '../utils/api';

const Transfer = ({ onComplete }) => {
    const [formData, setFormData] = useState({ recipientCustomerId: '', amount: '' });
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setMsg(''); setError('');
        try {
            const res = await api.post('/banking/transfer', {
                recipientCustomerId: formData.recipientCustomerId,
                amount: parseFloat(formData.amount)
            });
            setMsg(res.data.message);
            setFormData({ recipientCustomerId: '', amount: '' });
            if (onComplete) onComplete();
        } catch (err) {
            setError(err.response?.data?.error || 'Transfer failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass p-8 rounded-2xl max-w-lg mx-auto w-full">
            <h3 className="text-2xl font-bold mb-6">Transfer to Account</h3>
            {msg && <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg mb-4 text-center">{msg}</div>}
            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Recipient Customer ID</label>
                    <input type="text" required value={formData.recipientCustomerId} onChange={e => setFormData({ ...formData, recipientCustomerId: e.target.value })} className="glass-input py-3 w-full uppercase" placeholder="e.g. A1B2C3D4" />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Amount</label>
                    <input type="number" min="0.01" step="0.01" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="glass-input text-2xl font-semibold py-4 w-full" placeholder="0.00" />
                </div>
                <button type="submit" disabled={loading} className="glass-button w-full text-center">
                    {loading ? 'Processing...' : 'Send Money'}
                </button>
            </form>
        </div>
    );
};

export default Transfer;

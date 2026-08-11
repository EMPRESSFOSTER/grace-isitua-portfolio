'use client';

// app/admin/page.tsx
// Grace AI — Admin Dashboard for reviewing portfolio leads, quotes, and AI analytics
// Protected by simple passcode authentication

import { useState, useEffect } from 'react';
import { Shield, Users, FileText, MessageSquare, DollarSign, Lock, RefreshCw, LogOut, CheckCircle2, Clock } from 'lucide-react';

interface AdminStats {
  recentLeads: Array<{
    id: string;
    name: string;
    email: string;
    service: string | null;
    status: string;
    created_at: string;
  }>;
  totalCvDownloads: number;
  totalChats: number;
  recentQuotes: Array<{
    id: string;
    name: string;
    email: string;
    project_type: string;
    status: string;
    created_at: string;
  }>;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);

  // Check saved session passcode
  useEffect(() => {
    const saved = sessionStorage.getItem('grace_admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
      fetchStats();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    // Default admin passkey or check against environment setting
    if (password === 'grace2026' || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('grace_admin_auth', 'true');
      setAuthError('');
      fetchStats();
    } else {
      setAuthError('Invalid passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('grace_admin_auth');
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        // Fallback mock/empty stats if server is unconfigured
        setStats({
          recentLeads: [],
          totalCvDownloads: 0,
          totalChats: 0,
          recentQuotes: [],
        });
      }
    } catch {
      setStats({
        recentLeads: [],
        totalCvDownloads: 0,
        totalChats: 0,
        recentQuotes: [],
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Grace AI Admin</h1>
              <p className="text-xs text-gray-400">Protected Portfolio Dashboard</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {authError && <p className="text-xs text-red-400 mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-purple-500/20"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1">
              <Shield className="w-4 h-4" /> Admin Portal
            </div>
            <h1 className="text-3xl font-extrabold text-white">Grace AI Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="px-4 py-2 text-xs font-medium rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-medium rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Leads</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats?.recentLeads.length || 0}</div>
            <p className="text-[11px] text-gray-500 mt-1">Captured via AI assistant</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Quote Requests</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats?.recentQuotes.length || 0}</div>
            <p className="text-[11px] text-gray-500 mt-1">Submitted quote inquiries</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">CV Downloads</span>
              <FileText className="w-4 h-4 text-pink-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats?.totalCvDownloads || 0}</div>
            <p className="text-[11px] text-gray-500 mt-1">Downloaded by recruiters/clients</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Chats</span>
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats?.totalChats || 0}</div>
            <p className="text-[11px] text-gray-500 mt-1">Unique chat sessions started</p>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Recent Portfolio Leads</h2>
            <span className="text-xs text-gray-500">Latest 10 submissions</span>
          </div>

          {stats?.recentLeads && stats.recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] text-gray-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Service</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {stats.recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02]">
                      <td className="px-5 py-3 font-medium text-white">{lead.name}</td>
                      <td className="px-5 py-3">
                        <a href={`mailto:${lead.email}`} className="text-purple-400 hover:underline">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-5 py-3">{lead.service || 'General Inquiry'}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          <Clock className="w-2.5 h-2.5" /> {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {new Date(lead.created_at).toLocaleDateString('en-GB')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-gray-500">
              No leads recorded yet or Supabase environment variables not configured.
            </div>
          )}
        </div>

        {/* Recent Quotes Table */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Recent Project Quote Requests</h2>
            <span className="text-xs text-gray-500">Latest 10 quotes</span>
          </div>

          {stats?.recentQuotes && stats.recentQuotes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] text-gray-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Project Type</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {stats.recentQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-white/[0.02]">
                      <td className="px-5 py-3 font-medium text-white">{quote.name}</td>
                      <td className="px-5 py-3">
                        <a href={`mailto:${quote.email}`} className="text-purple-400 hover:underline">
                          {quote.email}
                        </a>
                      </td>
                      <td className="px-5 py-3 text-amber-300">{quote.project_type}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          <CheckCircle2 className="w-2.5 h-2.5" /> {quote.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {new Date(quote.created_at).toLocaleDateString('en-GB')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-gray-500">
              No quote requests recorded yet or Supabase environment variables not configured.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

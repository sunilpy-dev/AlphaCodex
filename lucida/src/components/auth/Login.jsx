import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // LocalStorage Mock Auth fetch
    const storedUser = localStorage.getItem('lucida_user_auth');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        // Success
        localStorage.setItem('lucida_active_session', 'true');
        navigate('/workspace');
        return;
      }
    }
    
    setError('Invalid email or password. Please try again.');
  };

  return (
    <div className="min-h-screen bg-[#05060f] flex flex-col justify-center items-center px-4 sm:px-6 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-indigo-600/10 blur-[150px] sm:blur-[200px] rounded-full pointer-events-none" />

      {/* Nav Link back to Home */}
      <Link to="/" className="absolute top-6 sm:top-10 left-6 sm:left-10 flex items-center gap-3 decoration-transparent">
        <span className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-base sm:text-lg shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:rotate-6 transition-transform">✦</span>
        <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-white">Lucida</span>
      </Link>

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-[rgba(255,255,255,0.02)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.08)] p-8 sm:p-10 lg:p-14 rounded-[32px] sm:rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative z-10 my-16">
        <div className="text-center sm:text-left mb-10">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-3">Welcome back</h2>
          <p className="text-base sm:text-lg text-white/40 font-medium">Access your intelligence workspace.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-xl text-base font-medium mb-8">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs sm:text-sm uppercase tracking-widest font-black text-indigo-400 mb-2.5">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm uppercase tracking-widest font-black text-indigo-400 mb-2.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="w-full py-4 sm:py-5 mt-4 sm:mt-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white text-base sm:text-lg font-black rounded-xl sm:rounded-2xl transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.5)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
            Enter Workspace
          </button>
        </form>

        <p className="mt-10 text-center text-base text-white/40 font-medium">
          Don't have an account? <Link to="/register" className="text-indigo-400 hover:text-white transition-colors">Deploy one.</Link>
        </p>
      </div>
    </div>
  );
}

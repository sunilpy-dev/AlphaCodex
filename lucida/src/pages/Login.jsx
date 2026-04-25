import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassPanel from '../components/ui/GlassPanel';
import Button from '../components/ui/Button';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple Auth Logic
    localStorage.setItem('lucida-user', JSON.stringify({ email: formData.email }));
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full bg-[#05060f] flex items-center justify-center relative overflow-hidden font-inter">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-4 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)] mb-4">
            <span className="text-white text-3xl font-bold">✦</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h1>
          <p className="text-white/50 mt-2 text-sm">Sign in to your Lucida workspace</p>
        </div>

        <GlassPanel className="p-8 shadow-2xl border-white/5" intensity="strong">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full py-3.5 group">
              Login
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/40 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Register
              </Link>
            </p>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
};

export default Login;

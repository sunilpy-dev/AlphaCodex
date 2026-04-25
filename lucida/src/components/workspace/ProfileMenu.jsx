import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("lucida-user"));

  const handleLogout = () => {
    localStorage.removeItem("lucida-user");
    navigate("/");
  };

  return (
    <div className="absolute top-0 right-0 z-50">
      {/* Profile Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Profile Menu"
        className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-lg hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-purple-500"
      >
        <User size={20} className="text-white/80" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 rounded-xl bg-[#0a0b14] backdrop-blur-xl border border-white/10 shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="px-2 py-1.5 border-b border-white/5 mb-2">
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Signed in as</p>
            <p className="text-xs text-white/80 truncate font-medium">{user?.email || "Guest"}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

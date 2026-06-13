"use client";

import { useState } from "react";
import { Menu, Search, Bell, User } from "lucide-react";

export default function Topbar({ onToggleSidebar }) {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full h-17 bg-gray-900 text-white flex items-center justify-between px-4 border-b border-gray-700">
      {/* Left: Logo + Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-800 rounded"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-bold text-lg">Admin Panel</h1>
      </div>

      {/* Middle: Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="flex items-center bg-gray-800 rounded px-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-transparent outline-none px-2 py-1 w-full text-sm"
          />
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-800 rounded relative">
          <Bell size={20} />
          {/* Example notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
          <User size={20} />
          <span className="text-sm">Sanzid</span>
        </button>
      </div>
    </div>
  );
}

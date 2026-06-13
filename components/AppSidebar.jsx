"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { AdminSidebarMenu } from "@/lib/adminSidebarMenu";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"} flex flex-col`}
    >
      {/* Top */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-lg font-bold">Admin Panel</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-800 rounded"
        >
          <LuChevronRight
            size={20}
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {AdminSidebarMenu.map((menu, index) => (
          <div key={index}>
            {menu.submenu ? (
              <button
                onClick={() => toggleMenu(index)}
                className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-800 cursor-pointer transition-all"
              >
                <menu.icon size={20} />
                {!collapsed && <span className="text-sm">{menu.title}</span>}
                <LuChevronRight
                  size={16}
                  className={`ml-auto transition-transform duration-300 ${openMenus[index] ? "rotate-90" : ""
                    }`}
                />
              </button>
            ) : (
              <Link
                href={menu.href}
                className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-800 cursor-pointer transition-all"
              >
                <menu.icon size={20} />
                {!collapsed && <span className="text-sm">{menu.title}</span>}
              </Link>
            )}

            {/* Submenu */}
            {menu.submenu && openMenus[index] && !collapsed && (
              <div className="ml-8 mt-1 space-y-1">
                {menu.submenu.map((sub, subIndex) => (
                  <Link
                    key={subIndex}
                    href={sub.href}
                    className="block p-2 text-sm rounded hover:bg-gray-800 transition-all"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

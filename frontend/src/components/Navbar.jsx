import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="flex p-2 m-2 items-center justify-between border-b-1">
      <div className="text-2xl font-bold text-[#8210FB] m-2">Navbar</div>
      <div className="flex justify-center gap-14  m-2">
        <span className="p-2 hover:cursor-pointer hover:text-[#8210FB] font-semibold hover:font-bold">
          Home
        </span>
        <span className="p-2 hover:cursor-pointer hover:text-[#8210FB] font-semibold hover:font-bold">
          About
        </span>
        <span className="p-2 hover:cursor-pointer hover:text-[#8210FB] font-semibold hover:font-bold">
          Contact
        </span>
      </div>
      <div className="flex gap-5 m-2">
        {/* <span className="p-2 hover:cursor-pointer hover:text-[#8210FB] hover:font-bold">
          Login
        </span>
        <span className="bg-[#8210FB] rounded-4xl p-2 text-white hover:bg-purple-700 transition-shadow">
          Get Started
        </span> */}
        <span
          className="flex items-center gap-2 font-semibold"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <User size={18} />
          Profile
          <ChevronDown />
        </span>
        {profileOpen && (
          <div className="absolute right-0 top-14 w-60 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl ">
            <div className="border-b border-gray-100 px-3 py-3">
              <p className="font-semibold text-gray-900">Alex Morgan</p>
              <p className="mt-1 truncate text-sm text-gray-500">
                alex.morgan@example.com
              </p>
            </div>

            <button
              onClick={() => setProfileOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 "
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

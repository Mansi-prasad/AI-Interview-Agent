import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { BsCoin} from 'react-icons/bs';
import {FaCircleUser} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import {HiOutlineLogout} from 'react-icons/hi';
import {MdOutlineSupportAgent} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";

import axios from "axios"
import AuthModel from './AuthModel';

function Navbar() {
  const {userData} = useSelector((state)=>state.user);

  const [showCreditPopup, setShowCreditPopup] = React.useState(false);
  const [showUserPopup, setShowUserPopup] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAuth, setShowAuth] = useState(false);

  const handleLogout = async ()=>{
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {withCredentials: true})
      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/")
    } catch (error) {
      console.log("logout error: ", error)
    }
  }
  return (
<div className="bg-[var(--bg)] flex justify-center px-4 pt-6">
  <motion.div
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="w-full max-w-6xl bg-[var(--surface2)] rounded-[24px] shadow-sm border border-[var(--border)] px-8 py-4 flex items-center justify-between relative"
  >
    {/* left */}
    <div className="flex items-center gap-3 cursor-pointer">
      <div className="bg-[var(--accent)] text-white p-2 rounded-lg">
        <MdOutlineSupportAgent size={22} />
      </div>

      <h1 className="font-semibold hidden md:block text-[var(--ink)]">
        HeyAgent
      </h1>
    </div>

    {/* right */}
    <div className="flex items-center gap-6 relative">
      <div className="relative">
        <button
          onClick={() => {
            if (!userData) {
              setShowAuth(true);
              return;
            }

            setShowCreditPopup(!showCreditPopup);
            setShowUserPopup(false);
          }}
          className="flex items-center gap-2 bg-[var(--accent-soft)] text-[var(--accent)] px-4 py-2 rounded-full text-md hover:bg-[var(--accent)] hover:text-white transition"
        >
          <BsCoin size={20} />
          {userData?.credits || 0}
        </button>

        {showCreditPopup && (
          <div className="absolute right-[-50px] mt-3 w-64 bg-[var(--surface)] text-[var(--ink)] shadow-xl border border-[var(--border)] rounded-xl p-5 z-50">
            <p className="text-sm text-[var(--ink-muted)] mb-4">
              Need more credits? To continue using our services, please
              purchase more credits.
            </p>

            <button
              onClick={() => navigate("/pricing")}
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-2 rounded-lg text-sm transition"
            >
              Buy more credits
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => {
            if (!userData) {
              setShowAuth(true);
              return;
            }

            setShowUserPopup(!showUserPopup);
            setShowCreditPopup(false);
          }}
          className="w-9 h-9 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full flex items-center justify-center font-semibold transition"
        >
          {userData ? (
            userData?.name?.slice(0, 1).toUpperCase()
          ) : (
            <FaCircleUser size={22} />
          )}
        </button>

        {showUserPopup && (
          <div className="absolute right-0 mt-3 w-48 bg-[var(--surface)] text-[var(--ink)] shadow-xl border border-[var(--border)] rounded-xl p-4 z-50">
            <p className="text-sm text-[var(--accent)] mb-1 font-medium">
              {userData?.name}
            </p>

            <button
              onClick={() => navigate("/history")}
              className="w-full text-left text-sm py-2 text-[var(--ink-muted)] hover:text-[var(--ink)]"
            >
              Interview History
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left text-sm py-2 flex items-center gap-2 text-[var(--danger)]"
            >
              <HiOutlineLogout size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </motion.div>

  {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
</div>
  )
}
  export default Navbar
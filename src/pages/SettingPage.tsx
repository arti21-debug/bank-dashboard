import { useState } from "react";
import EditProfile from "../features/settings/EditProfile";
import Preferences from "../features/settings/Preferences";
import Security from "../features/settings/Security";

export default function SettingPage() {
  const [activeBlock, setActiveBlock] = useState("profile");

  return (
    <main className="pb-[env(safe-area-inset-bottom)]">
      <div className="container">
        <section className="pt-6 pb-44 w-full">
          <div className="relative bg-bg-block w-full h-auto p-7.5 rounded-3xl">
            <div className="flex gap-18.75 pt-1.75 font-medium border-b border-[#EBEEF2] max-[1024px]:text-xs max-[600px]:gap-[clamp(1rem,0.409rem+2.95vw,2.625rem)]">
              <button
                onClick={() => {
                  setActiveBlock("profile");
                }}
                className={`cursor-pointer pb-2.75 border-b-3 ${activeBlock === "profile" ? "text-gray-blue border-gray-blue" : "text-grey border-transparent"} max-[550px]:p-1 max-[450px]:w-fit`}
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setActiveBlock("preferences");
                }}
                className={`cursor-pointer pb-2.75 border-b-3 ${activeBlock === "preferences" ? "text-gray-blue border-gray-blue" : "text-grey border-transparent"} max-[550px]:p-1 max-[450px]:w-fit`}
              >
                Preferences
              </button>
              <button
                onClick={() => {
                  setActiveBlock("security");
                }}
                className={`cursor-pointer pb-2.75 border-b-3 ${activeBlock === "security" ? "text-gray-blue border-gray-blue" : "text-grey border-transparent"} max-[550px]:p-1 max-[450px]:w-fit`}
              >
                Security
              </button>
            </div>
            {activeBlock === "profile" && <EditProfile />}
            {activeBlock === "preferences" && <Preferences />}
            {activeBlock === "security" && <Security />}
          </div>
        </section>
      </div>
    </main>
  );
}

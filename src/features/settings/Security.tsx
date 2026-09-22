import { useState } from "react";
import { useCardsStore } from "../../store/useCardsStore";
import { CircleCheck } from "lucide-react";
import usePopup from "../../hooks/usePopup";

export default function Security() {
  const [allErrors, setAllErrors] = useState<string[]>([]);

  const edit = useCardsStore((state) => state.editSecurity);
  const updatePass = useCardsStore((state) => state.updatePassword);
  const secValues = useCardsStore((state) => state.userSecurity);
  const userValues = useCardsStore((state) => state.userData);
  const { isPopOpen, setIsPopOpen, isVisible, setIsVisible } = usePopup();

  const formValidation = (data: FormData) => {
    const errors = [];
    const currPassword = data.get("currPassword");
    const newPassword = data.get("newPassword");
    if (currPassword !== userValues.password) errors.push("incorrect password");
    if (String(newPassword).length < 8) errors.push("min 8 symbols");
    return errors;
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          const errorsResult = formValidation(data);

          if (errorsResult.length) {
            setAllErrors(errorsResult);
          } else {
            setAllErrors([]);
            edit(data);
            updatePass(data);

            // открытие popup
            setIsPopOpen(true);
            setTimeout(() => setIsVisible(true), 10);
          }
        }}
        className="flex flex-col pt-9.25"
      >
        <div className="w-[50%] text-text-primary max-[550px]:w-full">
          <div>
            <h3 className="max-[1024px]:text-sm">Two-factor Authentication</h3>
            <div className="flex items-center gap-5 pt-4.75">
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  name="enable2fa"
                  defaultChecked={secValues.enable2fa ?? false}
                  className="peer sr-only"
                />
                <span className="h-7.5 w-14 rounded-full bg-text-secondary transition-colors peer-checked:bg-[#16DBCC] max-[1024px]:h-6 max-[1024px]:w-11" />
                <span className="absolute left-1 top-1 h-5.5 w-5.5 rounded-full bg-white transition-transform peer-checked:translate-x-6.5 max-[1024px]:w-4 max-[1024px]:h-4 max-[1024px]:peer-checked:translate-x-5" />
              </label>
              <div className="max-[1024px]:text-xs">
                Enable or disable two factor authentication
              </div>
            </div>
          </div>
          <div className="pt-6.75">
            <h3 className="font-medium text-text-secondary text-[17px] max-[1024px]:text-sm">
              Change Password
            </h3>
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <label className="max-[1024px]:text-[13px]">
                  Current Password
                </label>
                {allErrors.includes("incorrect password") && (
                  <div className="text-red-700 font-medium text-sm max-[1024px]:text-xs">
                    incorrect password
                  </div>
                )}
              </div>
              <input
                type="password"
                name="currPassword"
                className="w-full h-12.5 py-4 px-5 mt-2.75 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
                placeholder="**********"
              />
            </div>
          </div>
          <div className="pt-5.5">
            <div className="flex items-center justify-between">
              <label className="max-[1024px]:text-[13px]">New Password</label>
              {allErrors.includes("min 8 symbols") && (
                <div className="text-red-700 font-medium text-sm max-[1024px]:text-xs">
                  min 8 symbols
                </div>
              )}
            </div>
            <input
              type="password"
              name="newPassword"
              className="w-full h-12.5 py-4 px-5 mt-2.75 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="**********"
            />
          </div>
        </div>
        <button
          type="submit"
          className="font-medium text-lg bg-gray-blue text-white py-3.5 px-18.5 mt-7.5 ml-auto rounded-2xl cursor-pointer transition duration-300 hover:bg-[#120fc2] active:bg-blue-700 active:scale-95 max-[1024px]:text-[15px] max-[1024px]:py-2.75 max-[1024px]:px-12 max-[420px]:ml-0"
        >
          Save
        </button>
      </form>
      {isPopOpen && (
        <div
          className={`flex items-center justify-between fixed top-10 right-10 z-50 w-33 h-10 p-5 border border-gray-200 rounded-full bg-white transition-all duration-300 ease-out ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2"
          }`}
        >
          <CircleCheck color="#12d929" />
          <div className="font-bold text-green-500 text-sm">Updated</div>
        </div>
      )}
    </>
  );
}

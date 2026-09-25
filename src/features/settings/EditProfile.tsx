import { useRef, useState } from "react";
import { useCardsStore } from "../../store/useCardsStore";
import { CircleCheck } from "lucide-react";

import profilePicBigSetting from "@/icons/setting-page/profilePic-big-setting.svg";
import pencilEditSetting from "@/icons/setting-page/pencil-edit-setting.svg";
import { handleFileChange } from "../../utils/setFileChange";
import usePopup from "../../hooks/usePopup";

export default function EditProfile() {
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatar = useCardsStore((state) => state.userAvatar);
  const [localAvatar, setLocalAvatar] = useState(
    avatar ?? profilePicBigSetting,
  );
  const setStoreAvatar = useCardsStore((state) => state.setAvatar);

  const values = useCardsStore((state) => state.userData);
  const edit = useCardsStore((state) => state.editProfile);
  const { isPopOpen, setIsPopOpen, isVisible, setIsVisible } = usePopup();

  function formValidation(data: FormData) {
    const name = String(data.get("name"));
    const username = String(data.get("username"));
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errorsArr = [];
    if (name.trim() === "") errorsArr.push("type your name");
    if (username.trim() === "") errorsArr.push("type your username");
    if (!emailExp.test(email)) errorsArr.push("type valid email");
    if (password.trim().length < 8) errorsArr.push("type valid password");

    return errorsArr;
  }

  return (
    <div className="flex gap-13.25 pt-13 max-[600px]:flex-col max-[600px]:items-center">
      <div className="relative flex w-32.5 h-fit">
        <img src={`${localAvatar}`} alt="" className="shrink-0 rounded-full" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, setLocalAvatar)}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-1 w-7.5 h-7.5 rounded-full bg-gray-blue cursor-pointer max-[1024px]:w-6.25 max-[1024px]:h-6.25 max-[600px]:right-3.5"
        >
          <img
            src={`${pencilEditSetting}`}
            alt=""
            className="absolute inset-0 m-auto max-[1024px]:w-3 max-[1024px]:h-3"
          />
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          const errorsResult = formValidation(data);

          if (errorsResult.length) {
            setErrors(errorsResult);
          } else {
            setErrors([]);
            edit(data);
            setStoreAvatar(localAvatar);
            setIsPopOpen(true);
            setTimeout(() => setIsVisible(true), 10);
          }
        }}
        className="flex w-full gap-7.5 text-text-primary max-[600px]:flex-col max-[1024px]:text-[13px]"
      >
        <div className="flex flex-col gap-5.5 flex-1 min-w-0">
          <div>
            <label>Your Name</label>
            <div
              className={`${errors.includes("type your name") ? "block" : "invisible"} font-medium text-sm mt-0.5 text-red-700 max-[1024px]:text-xs`}
            >
              type your name
            </div>
            <input
              type="text"
              name="name"
              defaultValue={values.name}
              className="w-full h-12.5 py-4 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="Charlene Reed"
            />
          </div>
          <div>
            <label>Email</label>
            <div
              className={`${errors.includes("type valid email") ? "block" : "invisible"} font-medium text-sm mt-0.5 text-red-700 max-[1024px]:text-xs`}
            >
              type valid email
            </div>
            <input
              type="email"
              name="email"
              defaultValue={values.email}
              className="w-full h-12.5 py-4 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="charlenereed@gmail.com"
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="text"
              name="birthDate"
              defaultValue={values.birthDate}
              className="w-full h-12.5 py-4 px-5 mt-2.75 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="25 January 1990"
            />
          </div>
          <div>
            <label>Permanent Address</label>
            <input
              type="text"
              name="permanentAddress"
              defaultValue={values.permanentAddress}
              className="w-full h-12.5 py-4 px-5 mt-2.75 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              defaultValue={values.postalCode}
              className="w-full h-12.5 py-4 px-5 mt-2.75 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="45962"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5.5 flex-1 min-w-0">
          <div>
            <label>User Name</label>
            <div
              className={`${errors.includes("type your username") ? "block" : "invisible"} font-medium text-sm pt-0.5 text-red-700 max-[1024px]:text-xs`}
            >
              type your username
            </div>
            <input
              type="text"
              name="username"
              defaultValue={values.username}
              className="w-full h-12.5 py-4 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="Charlene Reed"
            />
          </div>
          <div>
            <label>Password</label>
            <div
              className={`${errors.includes("type valid password") ? "block" : "invisible"} font-medium text-sm pt-0.5 text-red-700 max-[1024px]:text-xs`}
            >
              invalid password
            </div>
            <input
              type="password"
              name="password"
              defaultValue={values.password}
              className="w-full h-12.5 py-4 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="**********"
            />
          </div>
          <div>
            <label>Present Address</label>
            <input
              type="text"
              name="presentAddress"
              defaultValue={values.presentAddress}
              className="w-full h-12.5 py-4 mt-2.75 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              defaultValue={values.city}
              className="w-full h-12.5 py-4 mt-2.75 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="San Jose"
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              defaultValue={values.country}
              className="w-full h-12.5 py-4 mt-2.75 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="USA"
            />
          </div>
          <button
            type="submit"
            className="font-medium text-lg bg-gray-blue text-white py-3.5 px-18.5 mt-3 ml-auto rounded-2xl cursor-pointer transition duration-300 hover:bg-[#120fc2] active:bg-blue-700 active:scale-95 max-[1024px]:text-[15px] max-[1024px]:py-2.75 max-[1024px]:px-12 max-[420px]:ml-0"
          >
            Save
          </button>
        </div>
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
    </div>
  );
}

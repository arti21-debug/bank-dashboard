import { useRef, useState } from "react";
import { useCardsStore } from "../../store/useCardsStore";
import { CircleCheck } from "lucide-react";

import profilePicBigSetting from "@/icons/setting-page/profilePic-big-setting.svg";
import pencilEditSetting from "@/icons/setting-page/pencil-edit-setting.svg";
import { fileToAvatar } from "../../utils/setFileChange";
import usePopup from "../../hooks/usePopup";

export default function EditProfile() {
  const [errors, setErrors] = useState<string[]>([]);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // аватар из стора; если его ещё нет — картинка по умолчанию
  const avatar = useCardsStore((state) => state.userAvatar);
  // локальная копия аватара: новое фото сразу видно в превью,
  // но в стор попадает только после успешного сохранения формы
  const [localAvatar, setLocalAvatar] = useState(
    avatar ?? profilePicBigSetting,
  );
  const setStoreAvatar = useCardsStore((state) => state.setAvatar);

  // текущие данные профиля — используются как значения полей по умолчанию
  const values = useCardsStore((state) => state.userData);
  const edit = useCardsStore((state) => state.editProfile);
  const { isPopOpen, setIsPopOpen, isVisible, setIsVisible } = usePopup();

  // проверяет обязательные поля и возвращает массив ключей ошибок (пустой — форма валидна)
  function formValidation(data: FormData) {
    const name = String(data.get("name"));
    const username = String(data.get("username"));
    const email = String(data.get("email"));
    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errorsArr = [];
    if (name.trim() === "") errorsArr.push("type your name");
    if (username.trim() === "") errorsArr.push("type your username");
    if (!emailExp.test(email)) errorsArr.push("type valid email");

    return errorsArr;
  }

  return (
    <div className="flex gap-13.25 pt-13 max-[600px]:flex-col max-[600px]:items-center">
      <div className="relative flex w-32.5 h-fit">
        {/* превью аватара (локальное, до сохранения) */}
        <img src={`${localAvatar}`} alt="" className="shrink-0 rounded-full" />
        {/* скрытый выбор файла: выбранное изображение записывается в localAvatar */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const input = e.currentTarget;
            const file = input.files?.[0];
            if (!file) return;

            try {
              setAvatarError(null);
              setLocalAvatar(await fileToAvatar(file)); // сжатый JPEG 256×256
            } catch (err) {
              setAvatarError(
                err instanceof Error ? err.message : "Cannot load image",
              );
            } finally {
              input.value = ""; // позволяет выбрать тот же файл повторно
            }
          }}
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
        {avatarError && (
          <div
            role="alert"
            className="absolute top-full mt-2 w-max max-w-48 text-xs font-medium text-red-700"
          >
            {avatarError}
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          // отменяем перезагрузку страницы и собираем значения всех полей по их name
          e.preventDefault();
          const data = new FormData(e.target);
          const errorsResult = formValidation(data);

          if (errorsResult.length) {
            // есть ошибки — показываем сообщения, данные не сохраняем
            setErrors(errorsResult);
          } else {
            // всё валидно: сбрасываем ошибки, сохраняем профиль и аватар в стор
            setErrors([]);
            edit(data);
            setStoreAvatar(localAvatar);
            // сначала монтируем уведомление в начальном (скрытом) состоянии,
            // а через 10 мс включаем видимость, чтобы сработал CSS-transition
            setIsPopOpen(true);
            setTimeout(() => setIsVisible(true), 10);
          }
        }}
        className="flex w-full gap-7.5 text-text-primary max-[600px]:flex-col max-[1024px]:text-[13px]"
      >
        <div className="flex flex-col gap-5.5 flex-1 min-w-0">
          <div>
            <label htmlFor="profile-name">Your Name</label>
            <div
              className={`${errors.includes("type your name") ? "block" : "invisible"} font-medium text-sm mt-0.5 text-red-700 max-[1024px]:text-xs`}
            >
              type your name
            </div>
            <input
              id="profile-name"
              type="text"
              name="name"
              defaultValue={values.name}
              className="w-full h-12.5 py-4 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="Charlene Reed"
            />
          </div>
          <div>
            <label htmlFor="profile-email">Email</label>
            <div
              className={`${errors.includes("type valid email") ? "block" : "invisible"} font-medium text-sm mt-0.5 text-red-700 max-[1024px]:text-xs`}
            >
              type valid email
            </div>
            <input
              id="profile-email"
              type="email"
              name="email"
              defaultValue={values.email}
              className="w-full h-12.5 py-4 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="charlenereed@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="profile-birth-date">Date of Birth</label>
            <input
              id="profile-birth-date"
              type="text"
              name="birthDate"
              defaultValue={values.birthDate}
              className="w-full h-12.5 py-4 px-5 mt-2.75 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="25 January 1990"
            />
          </div>
          <div>
            <label htmlFor="profile-perm-address">Permanent Address</label>
            <input
              id="profile-perm-address"
              type="text"
              name="permanentAddress"
              defaultValue={values.permanentAddress}
              className="w-full h-12.5 py-4 px-5 mt-2.75 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div>
            <label htmlFor="profile-postal-code">Postal Code</label>
            <input
              id="profile-postal-code"
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
            <label htmlFor="profile-username">User Name</label>
            <div
              className={`${errors.includes("type your username") ? "block" : "invisible"} font-medium text-sm pt-0.5 text-red-700 max-[1024px]:text-xs`}
            >
              type your username
            </div>
            <input
              id="profile-username"
              type="text"
              name="username"
              defaultValue={values.username}
              className="w-full h-12.5 py-4 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="Charlene Reed"
            />
          </div>
          <div>
            <label htmlFor="profile-password">Password</label>
            <div
              className={`${errors.includes("type valid password") ? "block" : "invisible"} font-medium text-sm pt-0.5 text-red-700 max-[1024px]:text-xs`}
            >
              invalid password
            </div>
            <input
              id="profile-password"
              type="password"
              name="password"
              defaultValue={values.password}
              className="w-full h-12.5 py-4 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="**********"
            />
          </div>
          <div>
            <label htmlFor="profile-present-address">Present Address</label>
            <input
              id="profile-present-address"
              type="text"
              name="presentAddress"
              defaultValue={values.presentAddress}
              className="w-full h-12.5 py-4 mt-2.75 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div>
            <label htmlFor="profile-city">City</label>
            <input
              id="profile-city"
              type="text"
              name="city"
              defaultValue={values.city}
              className="w-full h-12.5 py-4 mt-2.75 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              placeholder="San Jose"
            />
          </div>
          <div>
            <label htmlFor="profile-country">Country</label>
            <input
              id="profile-country"
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

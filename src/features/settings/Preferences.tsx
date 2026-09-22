import usePopup from "../../hooks/usePopup";
import { useCardsStore } from "../../store/useCardsStore";
import { CircleCheck } from "lucide-react";

export default function Preferences() {
  const edit = useCardsStore((state) => state.editPreferences);
  const values = useCardsStore((state) => state.userPreferences);
  const { isPopOpen, setIsPopOpen, isVisible, setIsVisible } = usePopup();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          edit(data);

          setIsPopOpen(true);
          setTimeout(() => setIsVisible(true), 10);
        }}
        className="flex flex-col"
      >
        <div className="flex gap-7.5 pt-10.5 text-text-primary max-[1024px]:text-[13px] max-[520px]:flex-col max-[520px]:pt-5.5">
          <div className="flex-1 min-w-0">
            <label>Currency</label>
            <select
              name="currency"
              defaultValue={values.currency ?? "USD"}
              className="w-full h-12.5 mt-2.75 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
            >
              <option value="USD" className="bg-bg-input">
                USD
              </option>
              <option value="EUR" className="bg-bg-input">
                EUR
              </option>
              <option value="GBP" className="bg-bg-input">
                GBP
              </option>
            </select>
            <div className="pt-6.75">
              <h3 className="font-medium text-text-secondary text-[17px] max-[1024px]:text-sm">
                Notification
              </h3>
              <div className="flex items-center gap-5 pt-4.75">
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    name="sendOrReceiveCurrency"
                    defaultChecked={
                      values.notification.sendOrReceiveCurrency ?? false
                    }
                    className="peer sr-only"
                  />
                  <span className="h-7.5 w-14 rounded-full bg-text-secondary transition-colors peer-checked:bg-[#16DBCC] max-[1024px]:h-6 max-[1024px]:w-11" />
                  <span className="absolute left-1 top-1 h-5.5 w-5.5 rounded-full bg-white transition-transform peer-checked:translate-x-6.5 max-[1024px]:w-4 max-[1024px]:h-4 max-[1024px]:peer-checked:translate-x-5" />
                </label>
                <div>I send or receive digital currency</div>
              </div>
              <div className="flex items-center gap-5 pt-3.75">
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    name="receiveOrder"
                    defaultChecked={values.notification.receiveOrder ?? false}
                    className="peer sr-only"
                  />
                  <span className="h-7.5 w-14 rounded-full bg-text-secondary transition-colors peer-checked:bg-[#16DBCC] max-[1024px]:h-6 max-[1024px]:w-11" />
                  <span className="absolute left-1 top-1 h-5.5 w-5.5 rounded-full bg-white transition-transform peer-checked:translate-x-6.5 max-[1024px]:w-4 max-[1024px]:h-4 max-[1024px]:peer-checked:translate-x-5" />
                </label>
                <div>I receive merchant order</div>
              </div>
              <div className="flex items-center gap-5 pt-3.75">
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    name="recommendation"
                    defaultChecked={values.notification.recommendation ?? false}
                    className="peer sr-only"
                  />
                  <span className="h-7.5 w-14 rounded-full bg-text-secondary transition-colors peer-checked:bg-[#16DBCC] max-[1024px]:h-6 max-[1024px]:w-11" />
                  <span className="absolute left-1 top-1 h-5.5 w-5.5 rounded-full bg-white transition-transform peer-checked:translate-x-6.5 max-[1024px]:w-4 max-[1024px]:h-4 max-[1024px]:peer-checked:translate-x-5" />
                </label>
                <div>There are recommendation for my account</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div className="flex flex-col">
              <label>Time Zone</label>
              <select
                name="timezone"
                defaultValue={
                  values.timeZone ?? "(GMT-12:00) International Date Line West"
                }
                className="w-full h-12.5 mt-2.75 px-5 border-2 border-[#DFEAF2] rounded-2xl text-[15px] max-[1024px]:h-10 max-[1024px]:text-xs"
              >
                <option
                  value="(GMT-12:00) International Date Line West"
                  className="bg-bg-input"
                >
                  (GMT-12:00) International Date Line West
                </option>

                <option
                  value="(GMT-08:00) Pacific Time (US & Canada)"
                  className="bg-bg-input"
                >
                  (GMT-08:00) Pacific Time (US & Canada)
                </option>

                <option
                  value="(GMT-05:00) Eastern Time (US & Canada)"
                  className="bg-bg-input"
                >
                  (GMT-05:00) Eastern Time (US & Canada)
                </option>

                <option
                  value="(GMT+00:00) Greenwich Mean Time"
                  className="bg-bg-input"
                >
                  (GMT+00:00) Greenwich Mean Time
                </option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="font-medium text-lg bg-gray-blue text-white py-3.5 px-18.5 mt-13.5 ml-auto rounded-2xl cursor-pointer transition duration-300 hover:bg-[#120fc2] active:bg-blue-700 active:scale-95 max-[1024px]:text-[15px] max-[1024px]:py-2.75 max-[1024px]:px-12 max-[420px]:ml-0"
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

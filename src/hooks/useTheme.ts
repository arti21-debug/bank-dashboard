import { useEffect, useState } from "react";

// хук возвращает true, если на <html> включена тёмная тема (класс "dark"),
// и обновляется при каждом переключении темы
export function useTheme() {
  // начальное значение берём из текущих классов <html>
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    // MutationObserver следит за изменениями DOM: при любом изменении
    // перечитываем, есть ли класс "dark"
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    // отслеживаем только атрибут class у <html>, остальные изменения игнорируем
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // при размонтировании компонента отключаем наблюдатель
    return () => observer.disconnect();
  }, []);

  return isDark;
}
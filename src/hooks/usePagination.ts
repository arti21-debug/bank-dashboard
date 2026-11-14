import { useState } from "react";

// хук пагинации: делит список на страницы по 5 элементов
// и группирует номера страниц в блоки по 5 (как в переключателе «1 2 3 4 5 →»)
export default function usePagination<T>(latestTrans: T[]) {
  // индекс текущей страницы (с нуля)
  const [currTransPageIndex, setCurrTransPageIndex] = useState(0);
  // индекс первой страницы в видимой группе номеров (0, 5, 10, ...)
  const [pageGroupStart, setPageGroupStart] = useState(0);

  // элементы текущей страницы: срез [index * 5, (index + 1) * 5)
  const currPageT = latestTrans.slice(
    currTransPageIndex * 5,
    (currTransPageIndex + 1) * 5,
  );

  // общее число страниц (неполная последняя страница тоже считается)
  const totalPages = Math.ceil(latestTrans.length / 5);

  // переход на следующую страницу
  const goNext = () => {
    setCurrTransPageIndex((prev) => prev + 1);
    // если новая страница вышла за правую границу группы — сдвигаем группу вперёд на 5
    if (currTransPageIndex + 1 >= pageGroupStart + 5) {
      setPageGroupStart((prev) => prev + 5);
    }
  };

  // переход на предыдущую страницу
  const goPrev = () => {
    setCurrTransPageIndex((prev) => prev - 1);
    // если новая страница вышла за левую границу группы — сдвигаем группу назад на 5
    if (currTransPageIndex - 1 < pageGroupStart) {
      setPageGroupStart((prev) => prev - 5);
    }
  };

  // возврат на первую страницу и первую группу (например, при смене фильтра)
  const reset = () => {
    setCurrTransPageIndex(0);
    setPageGroupStart(0);
  };

  return {
    currPageT, // элементы текущей страницы
    pageGroupStart, // начало видимой группы номеров
    totalPages,
    currTransPageIndex,
    setCurrTransPageIndex, // прямой переход по клику на номер страницы
    goNext,
    goPrev,
    reset,
  };
}
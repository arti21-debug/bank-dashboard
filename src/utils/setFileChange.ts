// utils/setFileChange.ts
//
// Подготовка аватара пользователя: проверка файла, обрезка до квадрата,
// уменьшение и сжатие в JPEG. Результат — маленькая data-URL строка
// (обычно 5–20 КБ), которую безопасно хранить в localStorage через persist.

/** Максимальный размер исходного файла: 5 МБ. */
const MAX_INPUT_BYTES = 5 * 1024 * 1024;

/** Качество JPEG (0–1): 0.85 даёт хороший баланс размера и чёткости. */
const JPEG_QUALITY = 0.85;

/** Сторона итогового квадратного аватара по умолчанию, px. */
const DEFAULT_AVATAR_SIZE = 256;

/**
 * Превращает выбранный пользователем файл в сжатый квадратный аватар.
 *
 * Шаги:
 *  1. проверяем тип и размер файла;
 *  2. загружаем изображение в `<img>` через временный object URL;
 *  3. вырезаем из центра квадрат и рисуем его на canvas нужного размера;
 *  4. экспортируем canvas как JPEG data-URL.
 *
 * @param file - файл из `<input type="file">`
 * @param size - сторона итогового квадрата в пикселях (по умолчанию 256)
 * @returns data-URL строка вида `data:image/jpeg;base64,...`
 * @throws {Error} с понятным для пользователя сообщением, если файл не
 *   изображение, больше 5 МБ, не читается или canvas недоступен
 */
export async function fileToAvatar(
  file: File,
  size = DEFAULT_AVATAR_SIZE,
): Promise<string> {
  // 1. Валидация на входе: атрибут accept="image/*" — лишь подсказка браузера,
  // реальную проверку делаем сами.
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file");
  if (file.size > MAX_INPUT_BYTES) throw new Error("Image is larger than 5 MB");

  // 2. Object URL — быстрый способ отдать файл в <img> без чтения в base64.
  const url = URL.createObjectURL(file);
  try {
    // Ждём загрузки; битый файл с расширением картинки даст onerror.
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Cannot read image"));
      image.src = url;
    });

    // 3. Квадратная обрезка по центру: берём меньшую сторону и смещаем
    // область так, чтобы лишнее обрезалось с обоих краёв поровну.
    const side = Math.min(img.width, img.height);
    const sourceX = (img.width - side) / 2;
    const sourceY = (img.height - side) / 2;

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Cannot process image");

    // JPEG не поддерживает прозрачность: без подложки прозрачные области
    // PNG/SVG станут чёрными, поэтому сначала заливаем canvas белым.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, size, size);

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight):
    // вырезаем квадрат из оригинала и масштабируем до size × size.
    ctx.drawImage(img, sourceX, sourceY, side, side, 0, 0, size, size);

    // 4. Сжатие: JPEG с фиксированным качеством резко уменьшает размер строки.
    return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
  } finally {
    // Освобождаем память в любом случае: и при успехе, и при ошибке.
    URL.revokeObjectURL(url);
  }
}

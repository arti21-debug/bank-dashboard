// подгрузка медиа файлов
export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setLocalAvatar: (base64: string) => void,
  setStoreAvatar: (base64: string) => void,
) => {
  // получение первого выбраного файла
  const file = e.target.files?.[0];
  if (!file) return;

  // создание ридера файла
  const reader = new FileReader();
  // регистрация события, выполнится асинхронно после чтения
  reader.onload = () => {
    const base64 = reader.result as string;
    setLocalAvatar(base64);
    setStoreAvatar(base64);
  };
  // запуск чтения файла
  reader.readAsDataURL(file);
};

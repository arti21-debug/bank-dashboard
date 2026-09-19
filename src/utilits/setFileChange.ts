// подгрузка медиа файлов
export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAvatar: (base64: string) => void,
) => {
  // получение первого выбраного файла
  const file = e.target.files?.[0];
  if (!file) return;

  // создание ридера файла
  const reader = new FileReader();
  // регистрация события, выполнится асинхронно после чтения
  reader.onload = () => {
    const base64 = reader.result as string;
    localStorage.setItem("avatar", base64);
    setAvatar(base64);
  };
  // запуск чтения файла
  reader.readAsDataURL(file);
};

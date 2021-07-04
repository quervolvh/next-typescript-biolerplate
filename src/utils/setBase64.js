export const setBase64 = (file, callback) => {
  if (file === undefined) {
    return;
  }

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    callback(reader.result);
  };

  reader.onerror = function () {
    callback('');
  };
};

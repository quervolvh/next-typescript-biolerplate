export const setBase64 = (file, callback) => {
  if (file === undefined) {
    return;
  }

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function() {
    let blob = new Blob([new Uint8Array(file)], { type: file.type });

    callback({ file, base64: reader.result, blob });
  };

  reader.onerror = function() {
    callback({ file, base64: null });
  };
};

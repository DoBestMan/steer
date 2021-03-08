export async function getTireSize(file: string, zipCode: string) {
  // Keeping it for now here, as this  will be moved to backend, once the service api is ready.
  const formData = new FormData();
  formData.append('file', await b64toBlob(file), 'image.jpg');
  formData.append('api_key', 'bxzCh5MtzeXmApUZZ5kLxWrqKliQ1eC5ACK9pYvT');
  formData.append('client_id', '20');
  formData.append('zipcode', zipCode);

  try {
    const res = await fetch(
      'https://simpletiredev.picquora.com/api/v2/predict_tire_size',
      {
        body: formData,
        method: 'post',
      },
    );
    return await res.json();
  } catch (e) {
    return Promise.reject(new Error(e));
  }
}
const b64toBlob = async (base64: string) =>
  await fetch(base64).then((res) => res.blob());

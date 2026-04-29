const CLOUD_NAME    = 'dbjhap3ga';
const UPLOAD_PRESET = 'kids_market';

export async function uploadPhoto(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', UPLOAD_PRESET);
  data.append('folder', 'kids-market');

  const res  = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: data }
  );

  if (!res.ok) throw new Error('Upload failed');
  const json = await res.json();
  return json.secure_url;
}
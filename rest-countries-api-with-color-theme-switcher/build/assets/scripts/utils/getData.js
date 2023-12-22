/**
 * Getting data from API
 */
const dataURL = './assets/scripts/utils/data.json';

export async function getData() {
  const res = await fetch(dataURL);
  const data = await res.json();

  return data;
}

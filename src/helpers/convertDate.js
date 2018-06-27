function getFullSeconds(date) {
  return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
}

function getFullMinutes(date) {
  return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
}

function getFullHours(date) {
  return date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
}

export default function convertDate(date) {

  return date.toLocaleDateString() + ' '
    + getFullHours(date) + ":"
    + getFullMinutes(date) + ":"
    + getFullSeconds(date);
}
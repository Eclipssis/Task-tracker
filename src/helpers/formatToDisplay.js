export default function formatToDisplay(number) {
  return (number < 10 ? '0' : '') + number
}
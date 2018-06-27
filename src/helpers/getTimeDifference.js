export default function getTimeDifference(startTime, endTime) {

  let duration = Date.parse(endTime) - Date.parse(startTime);

  let durationInSeconds = Math.round(duration / 1000);
  let durationInMinutes = Math.round(duration / 1000 / 60);
  let durationInHours = Math.round(duration / 1000 / 60 / 60);

  let seconds = Math.round(durationInSeconds % 60);
  let minutes = Math.round(durationInMinutes % 60);
  let hours = Math.round(durationInHours % 24);

  return {
    seconds: seconds,
    minutes: minutes,
    hours: hours
  };
}
export default function getTimeDifference(startTime, endTime) {

  let duration = Date.parse(endTime) - Date.parse(startTime);

  // let seconds = Math.floor(duration / 1000%60);
  // let minutes = Math.floor( duration /1000/60);
  // let hours = Math.floor( duration /1000/60/24);

  duration /= 1000;


  let seconds = Math.round(duration % 60);

  duration = Math.round(duration / 60);
  let minutes = Math.round(duration % 60);

  duration = Math.round(duration / 60);
  let hours = Math.round(duration % 24);



  return {
    seconds: seconds,
    minutes: minutes,
    hours: hours
  };
}
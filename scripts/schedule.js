// Add calendar event listener
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    themeSystem: "bootstrap",
    eventSources: [
      {
        events: [
          {
            title: "Yoga",
            start: "2020-10-17T11:30:00",
            end: "2010-10-17T12:00:00",
          },
          {
            title: "Cardio",
            start: "2020-10-17T12:30:00",
            end: "2010-10-17T13:30:00",
          },
          {
            title: "Muay Thai",
            start: "2020-10-17T15:30:00",
            end: "2010-10-17T16:30:00",
          },
        ],
        color: "red",
      },
    ],
  });
  calendar.render();
});

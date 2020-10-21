events = {
  yoga: [
    {
      title: "Hot yoga",
      start: "2020-10-24",
    },
  ],
  muaythai: [
    {
      title: "Beginner Muay Thai ",
      start: "2020-10-24",
    },
  ],
  jujitsu: [
    {
      title: "Advanced Ju Jitsu",
      start: "2020-10-24",
    },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    slotMinTime: "08:00",
    slotMaxTime: "22:00",
    allDaySlot: false,
    expandRows: true,
    height: "100%",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    },
    initialView: "timeGridWeek",
    navLinks: true, // can click day/week names to navigate views
    nowIndicator: true,
  });

  calendar.render();
});

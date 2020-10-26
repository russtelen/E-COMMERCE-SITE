// events = {
//   yoga: [
//     {
//       title: "Hot yoga",
//       start: "2020-10-24T12:30:00",
//     },
//     {
//       title: "Yoga 1",
//       start: "2020-10-28T12:30:00",
//     },
//     {
//       title: "Yoga 2",
//       start: "2020-10-25T12:30:00",
//     },
//     {
//       title: "Yoga 3",
//       start: "2020-10-26T12:30:00",
//     },
//   ],
//   muaythai: [
//     {
//       title: "Beginner Muay Thai ",
//       start: "2020-10-24T16:30:00",
//     },
//   ],
//   jujitsu: [
//     {
//       title: "Advanced Ju Jitsu",
//       start: "2020-10-24",
//     },
//   ],
// };

document.addEventListener("DOMContentLoaded", () => {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    events: [ // put the array in the `events` property
    {
      title  : 'Hot yoga',
      start  : '2020-10-20T12:30:00Z',
    },
    {
      title  : 'Muay Thai',
      start  : '2020-10-18T12:30:00Z',
      end    : '2020-10-18T15:30:00Z'
    },
    {
      title  : 'Conditioning',
      start  : '2020-10-19T12:30:00Z',
    },
    {
      title: "Advanced Ju Jitsu",
      start: "2020-10-23T12:30:00Z",
    }
  
  ],
    slotMinTime: "06:00",
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
    businessHours: {
  // days of week. an array of zero-based day of week integers (0=Sunday)
  daysOfWeek: [ 0,1, 2, 3, 4, 5, 6 ], // Monday - Thursday

  startTime: '8:00', // a start time (10am in this example)
  endTime: '21:00', // an end time (6pm in this example)
},
// eventClick pop-up
eventClick: (event, jsEvent, view) => {
   console.log(event.event);
   const eventTitle = event.event.title;

    // Format date

   const eventStart = event.event.startStr;
   const eventEnd = event.event.endStr;
  
$('.modal').modal('show');
$('.modal-title').html(eventTitle);
$('.modal-body').html("Start: " + eventStart )
},
  
   
  });
  calendar.render();
});


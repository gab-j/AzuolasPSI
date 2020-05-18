const pogrupis = 1;
const days = ["PIR", "ANT", "TRE", "KET", "PEN", "ŠEŠ", "SEK"];

function monthGridHeader(date) {
  return `<div class="month-day">${days[date.getDay() - 1]}</div>`;
}

function weekGridHeader(date) {
  return `<div><div class="week-day">${
    days[date.getDay() - 1]
  }</div><div class="month-day">${date.getDate()}</div></div>`;
}

function unixTs(date) {
  return Math.round(date.getTime() / 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["timeGrid", "dayGrid", "list"],
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    locale: "lt",

    contentHeight: "auto",

    minTime: "08:00:00",
    maxTime: "22:00:00",
    slotDuration: "01:00:00",

    noEventsMessage: "Nėra rodomų įvykių",

    allDaySlot: false,
    slotEventOverlap: false,
    weekends: false,
    defaultView: "timeGridWeek",
    views: {
      dayGrid: {
        columnHeaderHtml: monthGridHeader,
        titleFormat: {
          month: "long",
        },
      },
      timeGrid: {
        columnHeaderHtml: weekGridHeader,
        titleFormat: {
          month: "long",
          day: "numeric",
        },
      },
    },
    events: function (info, successCallback, failureCallback) {
      console.log("request");
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const xhr = new XMLHttpRequest();
      const url =
        proxy +
        "https://tvarkarasciai.vu.lt/mif/ajax_fullcalendar_events/programu-sistemos-2k-5gr-2019/group/115/";
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Origin", "tvarkarasciai.vu.lt");

      xhr.send({
        start: unixTs(info.start),
        end: unixTs(info.end),
      });

      xhr.onreadystatechange = (e) => {
        const json = JSON.parse(xhr.responseText);

        const filtered = json.events.filter((e) => {
          if (pogrupis == 1) return e.title.indexOf("Pogrupiai: 2") == -1;
          else if (pogrupis == 2) return e.title.indexOf("Pogrupiai: 1") == -1;
        });

        filtered.forEach((e) => {
          // <!-- paskaitos pavadinimas -->
          var fullStr = e.title;
          var end = fullStr.lastIndexOf("</a>");
          var start = fullStr.lastIndexOf(">", end) + 1;
          e.title = fullStr.substr(start, end - start);

          // <!-- dėstytojas -->
          var start2 = fullStr.indexOf("data-academics");
          var start2 = fullStr.indexOf(">", start2) + 1;
          var end2 = fullStr.indexOf("</a>", start2);
          var str2 = fullStr.substr(start2, end2 - start2);
          e.title = e.title.concat("\n", str2);
        });
        successCallback(filtered);
      };
    },
  });
  calendar.render();
});
function switchMode() {
  var element = document.body;
  element.classList.toggle("light");
  if (element.classList.contains("light")) {
    localStorage.setItem("mode", "light");
  } else {
    localStorage.setItem("mode", "dark");
  }
}

window.onload = () => {
  if (localStorage.getItem("mode"))
    if (localStorage.getItem("mode") == "light") {
      var element = document.body;
      element.classList.add("light");
    }
};

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function RenderCalendar(month, year){
    let firstDay = (new Date(year, month)).getDay();
    let daysInMotnh = 32 - new Date(year, month, 32).getDate();

    let calendar = document.getElementById('calendar-body');

    let dataEvents;

    //clearing the calendar
    calendar.innerHTML = "";

    //creating all the cells for the calendar
    let date = 1;
    for (let i = 0; i < 6; i++){
        let row = document.createElement('tr');

        //creating dates
        for (let j = 0; j < 7; j++){
            if(i == 0 && j < firstDay){
                let cell = document.createElement("td");
                row.appendChild(cell);
            }else if(date > daysInMotnh){
                if(j > 0){
                    let cell = document.createElement("td");
                    row.appendChild(cell);
                }else{
                    break;
                }
            }else{
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                cell.id = `${year}_${month + 1}_${date}`;
                row.appendChild(cell);
                date++;
            }
        }
        calendar.appendChild(row);
    }

    //putting all the date in the calendar element
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            dataEvents = JSON.parse(this.responseText);

            if(dataEvents.data.length > 0){
                for(Event of dataEvents.data){
                    let eventDate = new Date(Event.eventStartTime * 1000);
                    let eventCell = document.getElementById(`${eventDate.getFullYear()}_${eventDate.getMonth() + 1}_${eventDate.getDate() + 1}`);
                    let eventText = document.createTextNode(Event.eventName);
                    eventCell.appendChild(document.createElement('br'));
                    eventCell.appendChild(eventText);
                }
            }
        }
    }
    xhttp.open('GET', `events/${year}/${month + 1}`, true);
    xhttp.send();
}

document.addEventListener("DOMContentLoaded", function(event) {
    RenderCalendar(currentMonth, currentYear);
});
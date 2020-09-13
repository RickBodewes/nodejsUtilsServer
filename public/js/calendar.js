let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function RenderCalendar(month, year){
    let firstDay = (new Date(year, month)).getDay();
    let daysInMotnh = 32 - new Date(year, month, 32).getDate();

    let calendar = document.getElementById('calendar-body');

    //clearing the calendar
    calendar.innerHTML = "";
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
                row.appendChild(cell);
                date++;
            }
        }

        calendar.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    RenderCalendar(currentMonth, currentYear);
});
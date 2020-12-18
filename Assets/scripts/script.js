
$(document).ready(function () {

    // declaring an array for hours
    var hourArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    // declaring the current time
    var currentTime = moment().format('dddd, MMMM do');

    // appending the current time to the page, using the currentDay
    $("#currentDay").append(currentTime);

    // looping through the hour array to generate 9 textareas with the hours
    $(hourArray).each(function (index, hour) {

        // creating a row for each block
        var row = $("<div class='row time-block'>");
        $('.container').append(row);
        var hoursToDisplay = moment().set("hour", hour).format("hA");

        // creating the paragraph that contains the hours of the day
        var hoursP = $(`<p class='hour col-1'>${hoursToDisplay}</p>`);

        // creating the textarea that will hold the plans
        var textArea = $("<textarea class='col-10 description'>");
        textArea.data("hours", hour);

        // creating the save buttons
        var saveBtn = $("<button class='saveBtn btn col-1'><i class='fas fa-save'></i></button>");

        // checking if the block matches the current time in order to change the bg-color
        if (hour === moment().hours()) {
            textArea.addClass("present");

        } else if (hour > moment().hours()) {
            textArea.addClass("future");

        } else {
            textArea.addClass("past");
        }

        // Getting the events from the local storage
        if (localStorage.getItem(hour) !== null) {
            textArea.text(localStorage.getItem(hour))
        }



        // appending the hours, textarea, and the buttons.
        row.append(hoursP, textArea, saveBtn);
    })//end of the loop

    function saveEvent(e) {

        // targeting the textarea by using the this to get the specific event.
        var textEvent = $(this.previousElementSibling).val();
        var time = $(this.previousElementSibling).data("hours");

        // storing it in the local storage.
        localStorage.setItem(time, textEvent);
    }



    // listening to the save btns by using event delegation
    $(document).on("click", ".saveBtn", saveEvent);

})

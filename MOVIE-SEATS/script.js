const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied) ');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value // adding the plus sign it changes the value from string to number


//!Populate UI 

populateUI();




//? Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {

    localStorage('selectedMovieIndex', movieIndex);
    localStorage('selectedMoviePrice', moviePrice);

}
// console.log(typeof ticketPrice);
// Update the total and count 
function updateSelectedCount() {

    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // console.log(selectedSeats);

    // const selectedSeatsCount = selectedSeats.length
    // console.log(selectedSeatsCount);

    // The spread syntax return what it is inside an array as number of object starting from [0]
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    console.log(seatsIndex);


    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length

    // we are now inserting the count of seat per ticket sales in the DOM (HTML)
    count.innerText = selectedSeatsCount; // this count the number of seats selected
    total.innerText = selectedSeatsCount * ticketPrice; // This return the total ticket price per the number of seats selected

}

//addEventListener to select the movie by changing the selection
//? Get data from the local storage and populate the UI

function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    console.log(selectedSeats);

    if (selectedSeats != null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {

                seat.classList.add('selected');



            }

        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {

        movieSelected.selectedIndex = selectedMovieIndex;
    }
}


movieSelect.addEventListener('change', e => {

    ticketPrice = +e.target.value;
    console.log(e.target.selectedIndex);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();

});

// addEventListener to select the seats by clicking

container.addEventListener('click', (e) => {
    if (

        e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log(e.target);// This shows you where you have clicked on the container and what you have selected here the class seat. I will only worked with none occupied seats.
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }

});

//! Initial count and total set 

updateSelectedCount();
const container = document.querySelector('.container');
const seats =document.querySelectorAll('.row .seat:not(.occupied)'); 
const count = document.getElementById('count');
const total =document.getElementById('total');
const movieSelect =document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;


function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice)
}

function updatedSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex =[...selectedSeats].map( function(seat){return[...seats].indexOf(seat)} );

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    console.log(seatsIndex)
    
    const selectedSeatsCount = selectedSeats.length;
 
     count.innerText= selectedSeatsCount;
     total.innerText= selectedSeatsCount * ticketPrice;
}


function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
   if(selectedSeats !==null && selectedSeats.length>0){
       seats.forEach((seat,index)=>{
           if(selectedSeats.indexOf(index)>-1){seat.classList.add('selected')}
       })
   }
   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if(selectedMovieIndex !== null){
       movieSelect.selectedIndex = selectedMovieIndex;
   }
}

movieSelect.addEventListener('change',evt=>{
    ticketPrice = +evt.target.value;
    setMovieData(evt.target.selectedIndex,evt.target.value);
    updatedSelectedCount()
})


container.addEventListener('click',function(evt){
    if(evt.target.classList.contains('seat')&& !evt.target.classList.contains('occupied')){
        evt.target.classList.toggle('selected');

        updatedSelectedCount()
    }
})


 updatedSelectedCount();
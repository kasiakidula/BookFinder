import '../css/style';
const templateBookCard = require('./templateBookCard.hbs');          

eventLoader();

function eventLoader(){
	document.querySelector('form').addEventListener('submit', submit);
}

function submit(event){
	event.preventDefault();

	let userInput = document.querySelector('input');

	if(userInput.value !== ''){
		let query = userInput.value.replace(/([!@#$%^&*(),.?":{}|<>-]?\s)|\s/g, '+').toLowerCase();
		let url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`;
		getDataFromBooksAPI(url);

		document.getElementById('books-container').style.display = 'none';
		document.getElementById('loader').style.display = 'block';
	}else{
		alert('Complete the field');
	}

}

function getDataFromBooksAPI(url){
fetch(url)
          .then((response) => {
          	if(!response.ok){
          		throw new Error('Network response was not ok');
          	}
          	return response.json();
          })
          .then((booksData) => {
          	createHTML(booksData);
            //console.log(booksData);
          })
          .catch((error) => {
          	console.error('There has been a problem with your fetch operation:', error);
          });
}


function createHTML(booksData) {
	let booksContainer = document.getElementById('books-container');
	booksContainer.innerHTML = templateBookCard(booksData);
	
	document.getElementById('loader').style.display = 'none';
	booksContainer.style.display = 'grid';
	//console.log(booksData.totalItems);
}


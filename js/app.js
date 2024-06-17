//! Variables

const form = document.querySelector("#formulario")
const listTweets = document.querySelector("#lista-tweets");
let tweets = [];


//! Event Listeners

eventListener();

function eventListener() {
     form.addEventListener("submit", addNewTweet)

     document.addEventListener('DOMContentLoaded', () => {
          window.addEventListener("keypress", function (event) {//! Desactiva la tecla Enter
               if (event.keyCode == 13) {
                    event.preventDefault();
                    console.log("Tecla enter ha sido detectada!");
               }
          }, false);

          tweets = JSON.parse(localStorage.getItem("Tweets")) || []; //? Asigna como arreglo vacío
          console.log(tweets);
          listHtml();
     });
}

//! Funciones
function addNewTweet(e) {
     e.preventDefault();

     //? textearea dónde el usuario escribe
     const tweet = document.querySelector("#tweet").value;

     if (tweet === "") {
          showError("No se puede dejar un tweet vacío");
          return;
     }

     const tweetObj = {
          id: Date.now(),
          tweet
     }
     console.log("Agregando un nuevo tweet");
     tweets = [...tweets, tweetObj]

     listHtml();

     addLocalStorage();
     //? reload the form
     form.reset();
}

//? Mensaje de error cuando le das clic al botón de "Agregar" y envías un tweet o una lista vacía.
function showError(error) {
     const msgError = document.createElement("P");
     msgError.textContent = error;
     msgError.classList.add("error");

     const content = document.querySelector("#contenido");
     content.appendChild(msgError);

     setTimeout(() => {
          msgError.remove();
     }, 3000);

}


//? Función creada para listar los tweets que se van creando en la parte derecha
function listHtml() {
     cleanHtml()
     if (tweets.length > 0) {
          tweets.forEach(tweet => {
               //? Botón de eliminar
               const btnDelete = document.createElement("a");
               btnDelete.classList.add("borrar-tweet");
               btnDelete.innerText = "X"

               btnDelete.onclick = () => {
                    deleteTweet(tweet.id);
               }

               //? Lista
               const li = document.createElement("li");
               li.innerText = tweet.tweet;

               li.appendChild(btnDelete)
               listTweets.appendChild(li);
          })
     }

     addLocalStorage();
}

//? Función creada para limpiar el html y no se repita la lista.
function cleanHtml() {
     while (listTweets.firstChild) {
          listTweets.removeChild(listTweets.firstChild)
     }
}

//? Función para agregar los "Tweets" o "Lista" al localStorage
function addLocalStorage() {
     localStorage.setItem("Tweets", JSON.stringify(tweets));
}

function deleteTweet(id) {
     tweets = tweets.filter(tweet => tweet.id !== id);
     listHtml();

     console.log(tweets);
}


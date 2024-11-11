const JOKES_API = "https://v2.jokeapi.dev/joke/"
const JOKES_FILTER = `?blacklistFlags=sexist,explicit`
let genre = "Any"
let jokesContainer = document.querySelector(".jokes-container")

let refresh = document.getElementById("refresh")

let filterBtns = document.querySelectorAll(".filters li")

function renderLoadingMsg(){
    jokesContainer.innerHTML = ""
    const loadingMsg = document.createElement("h4")
    loadingMsg.innerText = "Loading Joke..."
    jokesContainer.appendChild(loadingMsg)
}


function renderOnUI(data){
    jokesContainer.innerHTML = ""
    let jokeTypeheader = document.createElement("h3")
    jokeTypeheader.innerText = `${data.category} Joke`
    jokesContainer.append(jokeTypeheader)
    if (data.type === "twopart" ){
        // console.log(true);
        let setup = document.createElement('h4')
        setup.innerText =  data.setup
        let delivery = document.createElement('h4')
        delivery.innerText = data.delivery
        jokesContainer.append(setup, delivery)
        
    }else{
        let joke = document.createElement('h4')
        joke.innerText = data.joke
        jokesContainer.append(joke)
    }
}


async function fetchJokes() {
    try{
        renderLoadingMsg()
        let response = await fetch(`${JOKES_API}${genre}${JOKES_FILTER}`)
        let data = await response.json()
        console.log(data);
        renderOnUI(data)
    }catch(error){
    console.error();
    jokesContainer.innerHTML = "<h4>Failed to load joke. Please try again Later.</h4>";
    }
       
}

fetchJokes()
refresh.addEventListener("click", ()=>{
    jokesContainer.innerHTML = ""
    fetchJokes()
})

filterBtns.forEach((btn) =>{
    console.log(btn.id);
    btn.addEventListener("click", () => {
        genre = btn.id;
        jokesContainer.innerHTML = ""
        fetchJokes()

    })
    
})


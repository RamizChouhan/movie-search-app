const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
 //most popular movie
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
//searched movie

const moviebox = document.querySelector("#movie-box");
 
    const getMovies = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
   
   showMovies(data.results);
    } 

    const showMovies = (data) =>{
      moviebox.innerHTML = "";
         data.forEach(
            (item) =>{
               const box = document.createElement("div");
              box.classList.add(
                                "box",         // custom class
                                "group",       // hover effect ke liye zaroori
                                "m-5", "p-5", // spacing
                                "h-[400px]",   // box ki height
                                "rounded",     // corners gol
                                "overflow-hidden", // content bahar na nikle
                                "relative",    // overlay ko iske andar position karne ke liye
                            
                              );
               box.innerHTML = `
         <img class="w-full h-full shadow-2xl" src="${IMGPATH + item.poster_path}">

         <div class="overlay w-full max-h-full rounded-2xl min-h-[auto] absolute bottom-[-100%] font-bold p-5 left-0 transition-all duration-500 bg-white group-hover:bottom-0">

          <div class="title w-full flex justify-between">
           <h2 class="mb-2.5 font-extrabold text-2xl">${item.original_title}</h2>
           <span class="text-orange-500 inline-block font-bold text-2xl"> ${item.vote_average} </span>
          </div>
          
          <h3 class="font-bold text-2xl">Overview:</h3>
          <p>
                ${item.overview}
          </p>
         </div>
               `;

               box.addEventListener("click", () => {
                       if (window.matchMedia("(hover: none)").matches) {
                        box.classList.toggle("show-overlay");
                     }
                  });

               moviebox.appendChild(box);
            }
         )
    }

    document.querySelector("#search").addEventListener(
      "keyup",
      function(event){
            if(event.target.value != ""){
               getMovies(SEARCHAPI + event.target.value);
               //searched movie 
            }else{
               getMovies(APIURL);
               //popular movie
            } 
      }
    )
    getMovies(APIURL);
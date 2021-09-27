const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=0bb6bae245d4da7f34903447b12c0209';
const poster_URL = 'https://image.tmdb.org/t/p/original/';

//Display all the genre from the api
$.ajax(`${base_URL}/genre/movie/list${api_key}`)
    .then(data => {
    console.log(data)
    $("#genreSelection").append(`<option class="genre" value="0">Please select a genre</option>`)
    $(data.genres).each((index) => {
    $("#genreSelection").append(`<option class="genre" value="${data.genres[index].id}">${data.genres[index].name}</option>`);
    });

        getDataFromAPI(`${base_URL}/movie/popular${api_key}`)
    // Events for different inputs (we will load different movie lists based on the filters)
    $('#searchText, #genreSelection').on("input", (e) => {
            e.preventDefault();

            // COnditions for applying filters and getting movies from API
            const isTextFound = $('#searchText').val() !== '';
            const isGenreDefined = $("#genreSelection").val() !== '0';

            if (isTextFound && isGenreDefined) {

                $(".film-list").empty()

                // values from inputs
                const searchTextValue = $('#searchText').val();
                const genreValue = $("#genreSelection").val();

                $.ajax(`${base_URL}/search/movie/${api_key}&query=${searchTextValue}`)
                .then(data => {

                for (let film of data.results) {
                console.log(film.genre_ids)
                let newFilm = $("<tr>")
                film.genre_ids.forEach(i =>{

                    if(i === Number(genreValue)){

                    newFilm.append(`
                    <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
                    <td>${film.title}</td>
                    <td><i class="material-icons">star</i> <strong>9.2</strong></td>
                    <td><i class="material-icons">star_outline</i></td>
                    <td><a href="${film.id}"><i class="material-icons">info</i></a></td>`);
                    $(".film-list").append(newFilm)
                    }
                }) 
            }

            });
                
            } else if (isTextFound && !isGenreDefined) {
            console.log("use text filter for the movies")
            
        //Display movies based on the search text box
                const searchTextValue = $('#searchText').val();
            
                getDataFromAPI(`${base_URL}/search/movie/${api_key}&query=${searchTextValue}`)
            //    
        } else if (!isTextFound && isGenreDefined) {
            console.log("use genre filter for the movies")
            //Display movies based on the genre selection
            getDataFromAPI(`${base_URL}/discover/movie${api_key}&with_genres=${e.target.value}`)
        } else {          
                //Display all the popular movies
            getDataFromAPI(`${base_URL}/movie/popular${api_key}`)
        }
    })
}) 

const averageRating = 3;
const usersVoted = 20;
const YourVote = 5;

// Function to generate movie DOM 
const getDataFromAPI = (ajaxRequest) => {
    $.ajax(ajaxRequest)
    .then(data => {
        
    $(".film-list").empty()

    for (let film of data.results) {

        let newFilm = $(`<tr>
        <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
            <td>${film.title}</td>
            <td><i class="material-icons">star</i> <strong>${averageRating}</strong>(${usersVoted})</td>
            <td>${YourVote}<i class="material-icons"></i></td>
            <td><a href="${film.id}"><i class="material-icons">info</i></a></td>
            </tr>`)
            $(".film-list").append(newFilm)
        }
    });
}

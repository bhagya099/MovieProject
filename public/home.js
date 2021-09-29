const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=0bb6bae245d4da7f34903447b12c0209';
const poster_URL = 'https://image.tmdb.org/t/p/original/';

//Display all the genre from the api
$.ajax(`${base_URL}/genre/movie/list${api_key}`)
    .then(data => {

        // Generating data drop-down for the movie genres
    $("#genreSelection").append(`<option class="genre" value="0">Please select a genre</option>`)
    $(data.genres).each((index) => {
    $("#genreSelection").append(`<option class="genre" value="${data.genres[index].id}">${data.genres[index].name}</option>`);
    });

        // without selecing filters, user will see 20 most popular movies (we will be using function below to display them)
        getDataFromAPI(`${base_URL}/movie/popular${api_key}`)

    // Events for different inputs (we will load different movie lists based on the filters)
    $('#searchText, #genreSelection').on("input", (e) => {
        e.preventDefault();

        // values from inputs
        const searchTextValue = $('#searchText').val();
        const genreValue = $("#genreSelection").val();

        // Conditions for applying filters and getting movies from API
        const isTextFound = searchTextValue !== '';
        const isGenreDefined = genreValue !== '0';

        if (!isTextFound && !isGenreDefined) {

            //Display all the popular movies
            getDataFromAPI(`${base_URL}/movie/popular${api_key}`)
            
        } else if (isTextFound && !isGenreDefined) {
        
            //Display movies based on the search text box
            const searchTextValue = $('#searchText').val();
            getDataFromAPI(`${base_URL}/search/movie/${api_key}&query=${searchTextValue}`)

        } else if (!isTextFound && isGenreDefined) {

            //Display movies based on the genre selection
            getDataFromAPI(`${base_URL}/discover/movie${api_key}&with_genres=${e.target.value}`)

        } else {       
            //  if both filters are selected we will be getting API be search text and filtering in the browser

            // empty the table before adding movie results
        $(".film-list").empty()
        
        const results = data.results;

        // generating movie tables
        results.forEach((film, index) => {
            
            // if user exists in the system, we generate DOM this way (with user rating column)
            if (user !== 0) {
                
                // getting data from backend on the user ratings
                $.ajax('/api').then(logedInUserReviews => {
                    logedInUserReviews.userRatings.forEach(userRating => {

                        // displaying user rating for the movies which have rating in our database
                        if (film.id === userRating.movie_id) {
                            showRowWithData(film, averageRating, usersVoted, userRating.rating);
                        } 
                    });
                    
                    // now we load the rest of the movies (so the ones with rating don't double up)
                    if ($(`.movie-title:eq(${index})`).text() !== film.title) {

                        // movies without user rating will have "?" as a text
                        showRowWithData(film, averageRating, usersVoted, '?');
                    }
                })
                .catch(err => console.log(err));
                
            } else {
                // for users which are not logged in we have a different display (no need to show user rating)
                showRowWithData(film, averageRating, usersVoted, 'NA');
            }    
                
        })
            
            // Yet to introduce filter by genre 
            // // Can't use the same function as this even requires filter after API request
            // $(".film-list").empty()

            // $.ajax(`${base_URL}/search/movie/${api_key}&query=${searchTextValue}`)
            //     .then(data => {

            //     for (let film of data.results) {

            //         film.genre_ids.forEach(i =>{

            //             if(i === Number(genreValue)) {
            //             showRowWithData(film, 1, 20, 'NA')
            //             }
            //         }) 
            //     }

            // });
        }
    })
}) 

const averageRating = 3;
const usersVoted = 20;

// Function to generate movie DOM using ajax request
const getDataFromAPI = (ajaxRequest) => {
    $.ajax(ajaxRequest)
    .then(data => {
        
        // empty the table before adding movie results
        $(".film-list").empty()
        
        const results = data.results;

        // generating movie tables
        results.forEach((film, index) => {
            
            // // if user exists in the system, we generate DOM this way (with user rating column)
            // if (user !== 0) {
                // getting data from backend on the user ratings
                $.ajax('/api').then(userRatings => {

                    console.log(userRatings.ratings)

                    const sumRating = 0;

                    // for getting average
                        const ratingArray = userRatings.ratings.filter((userRating, index) => {

                            console.log(film.id)
                            console.log(userRating.movie_id)
                            return userRating.movie_id === film.id;
                        });

                        const sum = ratingArray.forEach((ratingObject) => {
                            console.log(ratingObject)
                            sumRating = sumRating + ratingObject.rating;
                            console.log(sumRating)
                            return sumRating;
                        })

                        console.log()

                        const averageRating = sum / ratingArray.length;

                        console.log(averageRating);

                    // // get all the rating for reating movies
                    // userRatings.ratings.filter((userRating, index) => {

                    //     const sum = 0;
                    //     const elementsNumber = index + 1;

                    //     console.log(userRating)

                    //     if (userRating.movie_id === film.id) {

                    //         console.log(typeof userRating.movie_id)
                    //         console.log(typeof film.id)

                    //         sum = sum + userRating.rating;
                    //         elementsNumber++;
                    //     }
                        
                    //     console.log(sum);
                    //     console.log(elementsNumber)

                    //     const averageRating = sum / elementsNumber;

                    //       console.log(averageRating)

                    //     // // if user exists in the system, we generate DOM this way (with user rating column)
                    //     // if (user !== 0) {

                    //         // displaying user rating for the movies which have rating in our database
                    //         if (film.id === userRating.movie_id) {
                    //             showRowWithData(film, averageRating, elementsNumber, userRating.rating);
                    //         } 

                    //     // } else {

                    //     // }

                    // });
                    
                    // now we load the rest of the movies (so the ones with rating don't double up)
                    if ($(`.movie-title:eq(${index})`).text() !== film.title) {

                        // movies without user rating will have "?" as a text
                        showRowWithData(film, averageRating, usersVoted, 'not rated');
                    }
                })
                .catch(err => console.log(err));
                
            // } else {
            //     // for users which are not logged in we have a different display (no need to show user rating)
            //     showRowWithData(film, averageRating, usersVoted, 'NA');
            // }    
                
        })
    });
}

// function to generate each row
const showRowWithData = (film, averageRating, usersVoted, yourVote) => {
    let newFilm = $(`<tr>
        <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
        <td class="movie-title">${film.title}</td>
        <td><i class="material-icons">star</i> <strong>${averageRating}</strong>(${usersVoted})</td>
        <td><i class="material-icons">star</i>${yourVote}</td>
        <td><a href="${film.id}"><i class="material-icons">info</i></a></td>
        </tr>`)
    $(".film-list").append(newFilm);
}
const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=0bb6bae245d4da7f34903447b12c0209';
const poster_URL = 'https://image.tmdb.org/t/p/original/';

$.ajax(`${base_URL}/genre/movie/list${api_key}`)
    .then(data => {
        console.log(data)
        $("#genreSelection").append(`<option class="genre" value="0" selected>Please select a genre</option>`)
        $(data.genres).each((index) => {
            $("#genreSelection").append(`<option class="genre" value="${data.genres[index].id}">${data.genres[index].name}</option>`);
        });

        //Display all the popular movies
        $.ajax(`${base_URL}/movie/popular${api_key}`)
            .then(data => {
            //console.log(data)
            for (let film of data.results) {
                //console.log(film)
                let newFilm = $("<tr>")
                newFilm.append(`
                    <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
                    <td>${film.title}</td>
                    <td><i class="material-icons">star</i> <strong>9.2</strong></td>
                    <td><i class="material-icons">star_outline</i></td>
                    <td><a href="${film.id}"><i class="material-icons">info</i></a></td>`);
                $(".film-list").append(newFilm)
            }
        })

        // Events for different inputs (we will load different movie lists based on the filters)
        $('#searchText, #genreSelection').on("input", (e) => {
            e.preventDefault();

            const isTextFound = $('#searchText').val() !== '';
            const isGenreDefined = $("#genreSelection").val() !== '0';
            console.log(isTextFound)
            console.log(isGenreDefined)

            if (isTextFound && isGenreDefined) {
                console.log("use two filters for the movies")
            } else if (isTextFound && !isGenreDefined) {
                console.log("use text filter for the movies")
            } else if (!isTextFound && isGenreDefined) {
                console.log("use genre filter for the movies")
            } else {
                console.log("display all popular movies")
            }
        })


        // if (typeof $('#searchText').val() !== 'undefined' && )

    // $('#searchText').on("input", function (e) {
    //     e.preventDefault();
    //     const searchTextValue = $(this).val();
    //     console.log(searchTextValue);

    //     $.ajax(`${base_URL}/search/movie/${api_key}&query=${searchTextValue}`)
    //     .then(data => {

    //         console.log(data)

    //         for (let film of data.results) {
    //             console.log(film)
    //             let newFilm = $("<tr>")
    //             newFilm.append(`
    //                 <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
    //                 <td>${film.title}</td>
    //                 <td><i class="material-icons">star</i> <strong>9.2</strong></td>
    //                 <td><i class="material-icons">star_outline</i></td>
    //                 <td><a href="${film.id}"><i class="material-icons">info</i></a></td>`);
    //             $(".film-list").append(newFilm)
    //         }
    //     });

    // });

    // $("#genreSelection").on("change", function (e) {
    //     e.preventDefault();
    //     console.log(e.target.value)
        
    //     $.ajax(`${base_URL}/discover/movie${api_key}&with_genres=${e.target.value}`) 

    //     .then(data => {

    //         console.log(data)

    //         for (let film of data.results) {
    //             console.log(film)
    //             let newFilm = $("<tr>")
    //             newFilm.append(`
    //                 <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
    //                 <td>${film.title}</td>
    //                 <td><i class="material-icons">star</i> <strong>9.2</strong></td>
    //                 <td><i class="material-icons">star_outline</i></td>
    //                 <td><a href="${film.id}"><i class="material-icons">info</i></a></td>`);
    //             $(".film-list").append(newFilm)
    //         }
    //     });

    // });

})



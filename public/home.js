const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=0bb6bae245d4da7f34903447b12c0209';
const poster_URL = 'https://image.tmdb.org/t/p/original/';

console.log($('#searchText').val() !== '')
console.log($("#genreSelection:first-child").val())
// if (typeof $('#searchText').val() !== 'undefined' && )

//Display all the popular movies
$.ajax(`${base_URL}/movie/popular${api_key}`)
.then(data => {
        console.log(data)
        for (let film of data.results) {
            console.log(film)
            let newFilm = $("<tr>")
            newFilm.append(`
                <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
                <td>${film.title}</td>
                <td><i class="material-icons">star</i> <strong>9.2</strong></td>
                <td><i class="material-icons">star_outline</i></td>
                <td><a href="${film.id}"><i class="material-icons">info</i></a></td>`);
            $(".film-list").append(newFilm)
        }
    });

//Display movies based on the search text box
$('#searchText').on("input", function (e) {
    e.preventDefault();
    const searchTextValue = $(this).val();
    console.log(searchTextValue);
    $(".film-list").empty()
    $.ajax(`${base_URL}/search/movie/${api_key}&query=${searchTextValue}`)
    .then(data => {
        console.log(data)
        for (let film of data.results) {
            console.log(film)
            let newFilm = $("<tr>")
            newFilm.append(`
                <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
                <td>${film.title}</td>
                <td><i class="material-icons">star</i> <strong>9.2</strong></td>
                <td><i class="material-icons">star_outline</i></td>
                <td><a href="${film.id}"><i class="material-icons">info</i></a></td>`);
            $(".film-list").append(newFilm)
        }
    });

});
//Display all the genre from the api
$.ajax(`${base_URL}/genre/movie/list${api_key}`)
.then(data => {
    console.log(data)
    $("#genreSelection").append(`<option class="genre" value="0">Please select a genre</option>`)
    $(data.genres).each((index) => {
        $("#genreSelection").append(`<option class="genre" value="${data.genres[index].id}">${data.genres[index].name}</option>`);
    });
});
//Display movies based on the genre selection
$("#genreSelection").on("change", function (e) {
    e.preventDefault();
    console.log(e.target.value)
    $(".film-list").empty()
    $.ajax(`${base_URL}/discover/movie${api_key}&with_genres=${e.target.value}`) 
    .then(data => {
        console.log(data)
        for (let film of data.results) {
            console.log(film)
            let newFilm = $("<tr>")
            newFilm.append(`
                <th scope="col"> <img src='${poster_URL}${film.poster_path}' style="width: 50px">  </th>
                <td>${film.title}</td>
                <td><i class="material-icons">star</i> <strong>9.2</strong></td>
                <td><i class="material-icons">star_outline</i></td>
                <td><a href="${film.id}"><i class="material-icons">info</i></a></td>`);
            $(".film-list").append(newFilm)
        }
    });

});

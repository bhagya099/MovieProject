console.log("connected");
// console.log(movieID);

// link variables
const base_URL = "https://api.themoviedb.org/3";
const api_key = "?api_key=0bb6bae245d4da7f34903447b12c0209";
const poster_URL = "https://image.tmdb.org/t/p/original/";

$.ajax(`${base_URL}/movie/${movieID}${api_key}`).then((data) => {
  console.log(data);
  // for image

  $(".col").append(`<img src="${poster_URL}${data.poster_path}"
    alt="poster" style="width: 20rem;">`);
  // for movie details cards
  let h4 = $(`<h4 class="mb-4 card-title">${data.title}`);
  let p1 = $(`<p class="card-text">${data.overview}</p>`);
  let homeLink = $(
    `<a type="button" href="/" class=" card-link">Go To Homepage</a>`
  );
  let rateLink = $(`<a href="#" class="card-link">Rate Movie</a>`);

  $(".card-body").append(h4);
  $(".card-body").append(p1);

  $(".card-body").append(homeLink);
  $(".card-body").append(rateLink);
});


// for posting the rating

$('#rate').on('click', (e) => {
    e.preventDefault();
    console.log($('#rating').val());
    
    $.post('http://localhost:4009/rate', {
      rating: $('#rating').val(),
    });
    $('#rate-div').append(`<h4>You rated the movie ${$('#rating').val()}`);
    $('#rate-div form').remove();
  });
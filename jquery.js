


// http://www.omdbapi.com/?i=tt3896198&apikey=57e4b9a9
// const response = await fetch(`http://www.omdbapi.com/?t=${nowShowing[i]}&apikey=57e4b9a9`);

const movieLists = {
    nowShowing: ['Cars', 'Cars 2', 'Cars 3', 'Star Wars', 'Star Wars Episode II', 'Star Wars Episode III', 'Star Wars Episode IV', 'Star Wars Episode V', 'Star Wars Episode VI', 'Star Wars Episode VII', 'Star Wars Episode VIII'],
    advancedSale: ['The Fast and the Furious', '2 Fast 2 Furious ', 'The Fast and the Furious: Tokyo Drift', 'Fast & Furious', 'Fast Five', 'Fast & Furious 6', 'Furious 7', 'The Fate of the Furious', 'Hobbs & Shaw', 'F9'],
    comingSoon: ['Saw', 'Saw II', 'Saw III', 'Saw IV', 'Saw V', 'Saw VI', 'Saw 3D', 'Jigsaw', 'Spiral', 'Saw X'],
    promotions: ['Shrek'],
    kinolounge: ['Shrek 2'],
    topMovies: ['Shrek', 'Shrek 2', 'Shrek 3', 'Shrek 4', 'Shrek 5', 'Shrek 6', 'Shrek 7', 'Shrek 8', 'Shrek 9', 'Shrek 10'],
}

async function getMovieData(movieName) {
    const response = await fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=57e4b9a9`);
    const data = await response.json();
    return data;
}

async function onPageLoad() {
    // Load main caorusel
    $('#start').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        nav: true,
    });

    // Load now showing
    await loadMovies(movieLists.nowShowing, 'nowShowing');
    await loadMovies(movieLists.advancedSale, 'advancedSale');
    await loadMovies(movieLists.comingSoon, 'comingSoon');
    // Load promotions
    await loadMovies(movieLists.promotions, 'promotions');

    // Load kinolounge
    await loadMovies(movieLists.kinolounge, 'kinolounge');

    // Load top movies
    topMovies();

}

// Selection of tab
$('.main-display .nav-list').on('click', 'li', function () {
    // Set the active tab
    $('.nav-list li.active-tab').removeClass('active-tab');
    $(this).addClass('active-tab');
    // Figure out what tab is clicked
    var targetDivId = $(this).data('target');
    // Show targeted display
    $('.main-display .carousel-container .owl-carousel').removeClass('active');
    $(`#${targetDivId}`).addClass('active');
});


function topMovies() {
    for (i = 0; i < movieLists.topMovies.length; i++) {
        $('.top-movies-content').append(
            `<div class='row'>
                <p>${i + 1}.</p>
                <h4> ${movieLists.topMovies[i]}</h6>
                <button>Buy</button>
            </div>`
        )
    }
}

async function loadMovies(movieArray, catName) {
    // Fetch data append on website
    for (let i = 0; i < movieArray.length; i++) {
        const movieData = await getMovieData(movieArray[i]);
        $(`#${catName}`).append(
            `<div class="movie-container">
                <img class="movie-poster" src="${movieData.Poster}" alt=""></img>
                <div class="movie-description">
                    <p class="movie-title">${movieArray[i]}</p>
                    <p>${movieData.Runtime}s | ${movieData.Rated}</p>
                    <button>${catName == "comingSoon" || catName == "promotions" ? "MORE" : "BUY"}</button >
                </div >
            </div > `
        )
    }

    $(`#${catName} `).owlCarousel({
        margin: 10,
        loop: false,
        stagePadding: 10,
        lazyLoad: true,
        dots: false,
        responsive: {
            200: {
                items: 2,
                stagePadding: 50,
            },
            768: {
                items: 3,
                stagePadding: 50,
            },
            1260: {
                items: 4,
            },

            1366: {
                items: 5
            }
        },
    });
}

$('.menu-icon').on('click', function () {
    $('.sidebar').toggleClass('visible hidden');
})


onPageLoad()

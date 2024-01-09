import store from './store/store.js';
import { setLocale, setStorageData } from './actions/actions.js';
import { extractVideoId, createMovieListItem, addMovieToList } from './dependency/dependency.js';
store.dispatch(setLocale('en'));
store.dispatch(setStorageData({ online: true, eula: true }));

store.subscribe(() => {
    console.log('Store updated:', store.getState());
});

$(document).ready(function () {
    populateMoviesList();
    onYouTubeIframeAPIReady()
    setupMovieItemEventListeners();
    addMovieItemEventListeners()
    updateStarRating();
});

function populateMoviesList() {
    const movies = [
        {
            id: 1,
            title: "Interstellar",
            year: 2014,
            imageUrl: "images/Interstellar.jpg",
            info: "PG-13 | 169 min | Adventure, Drama, Sci-Fi",
            description:
                "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
            director: "Christopher Nolan",
            leadActors:
                "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Mackenzie Foy",
            trailerUrl: "https://www.youtube.com/embed/uaSYEUugnzE",
        },
        {
            id: 2,
            title: "The Wolf of Wall Street",
            year: 2013,
            imageUrl: "images/The Wolf of Wall Street.jpg",
            info: "R | 180 min | Biography, Comedy, Crime",
            description:
                "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
            director: "Martin Scorsese",
            leadActors:
                "Leonardo DiCaprio, Jonah Hill, Margot Robbie, Matthew McConaughey",
            trailerUrl: "https://www.youtube.com/embed/J788MZ2uIGA?enablejsapi=1",
        },
        {
            id: 3,
            title: "Django Unchained",
            year: 2012,
            imageUrl: "images/Django Unchained.jpg",
            info: "R | 165 min | Drama, Western",
            description:
                "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.",
            director: "Quentin Tarantino",
            leadActors:
                "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio, Kerry Washington",
            trailerUrl:
                "https://www.youtube.com/embed/0fUCuvNlOCg?si=DJdGdTtJiRJ5zwa3",
        },
        {
            id: 4,
            title: "The Intouchables",
            year: 2011,
            imageUrl: "images/The Intouchables.jpg",
            info: "R | 112 min | Biography, Comedy, Drama",
            description:
                "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.",
            director: "Olivier Nakache, Éric Toledano",
            leadActors: "François Cluzet, Omar Sy, Anne Le Ny, Audrey Fleurot",
            trailerUrl: "https://www.youtube.com/embed/dGJfkFlQQl4B?enablejsapi=1",
        },
        {
            id: 5,
            title: "Inception",
            year: 2010,
            imageUrl: "images/Inception.jpg",
            info: "PG-13 | 148 min | Action, Adventure, Sci-Fi",
            description:
                "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
            director: "Christopher Nolan",
            leadActors:
                "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Ken Watanabe",
            trailerUrl: "https://www.youtube.com/embed/herRuccntNE?enablejsapi=1",
        },

        {
            id: 6,
            title: "Inglourious Basterds",
            year: 2009,
            imageUrl: "images/Inglourious Basterds.jpg",
            info: "PG-13 | 148 min | Action, Adventure, Sci-Fi",
            description:
                "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
            director: "Quentin Tarantino",
            leadActors: "Brad Pitt, Diane Kruger, Eli Roth, Mélanie Laurent",
            trailerUrl: "https://www.youtube.com/embed/KnrRy6kSFF0?enablejsapi=1",
        },

        {
            id: 7,
            title: "The Dark Knight",
            year: 2008,
            imageUrl: "images/The Dark Knight.jpg",
            info: "PG-13 | 152 min | Action, Crime, Drama",
            description:
                "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            director: "Christopher Nolan",
            leadActors: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
            trailerUrl: "https://www.youtube.com/embed/B9wbHZM-L8g?enablejsapi=1",
        },

        {
            id: 8,
            title: "Into the Wild",
            year: 2007,
            imageUrl: "images/Into the Wild.jpg",
            info: "R | 148 min | Adventure, Biography, Drama",
            description:
                "After graduating from Emory University, top student and athlete Christopher McCandless abandons his possessions, gives his entire $24,000 savings account to charity and hitchhikes to Alaska to live in the wilderness. Along the way, Christopher encounters a series of characters that shape his life.",
            director: "Sean Penn",
            leadActors:
                "Emile Hirsch, Vince Vaughn, Catherine Keener, Marcia Gay Harden",
            trailerUrl: "https://www.youtube.com/embed/aBmU_coqiIs?enablejsapi=1",
        },

        {
            id: 9,
            title: "The Departed",
            year: 2006,
            imageUrl: "images/The Departed.jpg",
            info: "R | 151 min | Crime, Drama, Thriller",
            description:
                "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
            director: "Martin Scorsese",
            leadActors:
                "Leonardo DiCaprio, Matt Damon, Jack Nicholson, Mark Wahlberg",
            trailerUrl: "https://www.youtube.com/embed/loJGSgb9PUE?enablejsapi=1",
        },

        {
            id: 10,
            title: "Batman Begins",
            year: 2006,
            imageUrl: "images/Batman Begins.jpg",
            info: "PG-13 | 140 min | Action, Crime, Drama",
            description:
                "After witnessing his parents' death, Bruce learns the art of fighting to confront injustice. When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.",
            director: "Christopher Nolan",
            leadActors: "Christian Bale, Michael Caine, Ken Watanabe, Liam Neeson",
            trailerUrl: "https://www.youtube.com/embed/5eKQL7f7lLI?enablejsapi=1",
        },
    ];
    movies.forEach((movie) => {
        $("#movies-ul").append(createMovieListItem(movie));
    });
}

function addMovieItemEventListeners() {
    $("#show-add-movie-form").on("click", function () {
        $(".add-movie-form").addClass("zoomed").fadeIn();
        $("body").css("overflow", "hidden");
    });

    $(document).on("click", function (event) {
        if (
            !$(event.target).closest(".add-movie-form, #show-add-movie-form").length
        ) {
            $(".add-movie-form").removeClass("zoomed").fadeOut();
            $("body").css("overflow", "auto");
        }
    });

    $("#movie-form").on("submit", function (event) {
        event.preventDefault();

        let newMovie = {
            title: $("#movie-title").val(),
            year: $("#movie-year").val(),
            imageUrl: $("#movie-image-url").val(),
            info: $("#movie-info").val(),
            description: $("#movie-description").val(),
            director: $("#movie-director").val(),
            leadActors: $("#movie-lead-actors").val(),
            trailerUrl: $("#movie-trailer-url").val(),
        };

        addMovieToList(newMovie);
        $(".add-movie-form").removeClass("zoomed").fadeOut();
        $("body").css("overflow", "auto");
        this.reset();
    });
    
    $(document).on('click', '.watch-trailer', function() {
        let trailerUrl = $(this).closest('.movie-item').data('trailer-url');
        let movieId = $(this).closest('.movie-item').data('movie-id');
        let videoId = extractVideoId(trailerUrl);
        if(videoId) {
            playTrailer(videoId, movieId);
            $(this).closest('.movie-item').find('.movie-trailer-box').fadeIn();
        } else {
            console.error('Invalid trailer URL:', trailerUrl);
        }
    });
}
function setupMovieItemEventListeners() {
    $(document).on("click", ".movie-item", function (event) {
        if (!$(event.target).is(".star, .star-rating *, .add-comment, .comment-input, .watch-trailer")) {
            if ($(this).hasClass("zoomed")) {
                return;
            }

            $(this).addClass("zoomed").find(".additional-details").fadeIn();
        }
    });

    $(document).on("click", function (event) {
        if (!$(event.target).closest(".movie-item.zoomed").length && $(".movie-item.zoomed").length) {
            $(".movie-item.zoomed").removeClass("zoomed").find(".additonal-details").fadeOut();
        }
    });

    $(".add-comment").on("click", function () {
        let movieId = $(this).data("movie-id");
        let commentText = $("#comment-input-" + movieId).val();
        if (commentText) {
            $("#comments-container-" + movieId).append(`<div class="comment">${commentText}</div>`);
            $("#comment-input-" + movieId).val("");
        }
    });

    $(".comment-star").on("click", function () {
        let movieId = $(this).data("movie-id");
        let inputHtml = `
                  <div class="input-group mb-3 mt-2">
                      <input type="text" class="form-control" placeholder="Leave a comment..." id="comment-input-${movieId}">
                      <div class="input-group-append">
                          <button class="btn btn-outline-secondary" type="button" onclick="postComment(${movieId})">Post</button>
                      </div>
                  </div>`;

        $(this).closest(".movie-details").find(".comments-section").prepend(inputHtml);
    });

    $(document).on('mouseenter', '.movie-item.zoomed', function () {
        $(this).find('.watch-trailer').fadeIn()
    }).on('mouseleave', '.movie-item.zoomed', function () {
        $(this).find('.watch-trailer').fadeOut();
    });
}

function updateStarRating() {
    $(".star-rating .star").on("click", function (event) {
        let movieId = $(this).closest(".star-rating").data("movie-id");
        let starValue = $(this).index() + 1;
        let totalRatingElem = $("#total-rating-" + movieId);
        let currentTotalRating = parseInt(totalRatingElem.text().split(" ")[0]) || 0;

        totalRatingElem.text(currentTotalRating + starValue + " ⭐");


        event.stopPropagation();
    });
}
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player = {};

function onYouTubeIframeAPIReady() {

}

function playTrailer(videoId, movieId) {
    new YT.Player(`player-${movieId}`, {
        height: '315',
        width: '560',
        videoId: videoId,
        playerVars: {
        autoplay: 1,
        controls: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
  }

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}










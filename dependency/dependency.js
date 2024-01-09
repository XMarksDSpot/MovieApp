        // Extracts the video ID from a YouTube URL
        function extractVideoId(url) {
            const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }

        // Creates HTML for a movie list item
        function createMovieListItem(movie) {
            return `
            <li class="list-group-item movie-item" data-movie-id="${movie.id}" data-trailer-url="${movie.trailerUrl}">
                <img src="${movie.imageUrl}" alt="${movie.title}" class="movie-image">               
                <div class="movie-content">
                    <div class="movie-title">${movie.title} (${movie.year})</div>                    
                    <div class="additional-details" style="display: none;">
                    <p class="movie-info">${movie.info}</p>
                    <p class="movie-description">${movie.description}</p>
                    <p class="movie-director">Director: ${movie.director}</p>
                    <p class="movie-lead-actors">Lead Actors: ${movie.leadActors}</p>
                    <div class="star-rating" data-movie-id="${movie.id}">
                        <span class="star">&#9734;</span>
                        <span class="star">&#9734;</span>
                        <span class="star">&#9734;</span>
                        <span class="star">&#9734;</span>
                        <span class="star">&#9734;</span>
                        <span id="total-rating-${movie.id}" class="total-rating-star">⭐</span>
                    </div>
                    <div class="comments-section">
                        <h4>Comments</h4>
                        <div id="comments-container-${movie.id}"></div>
                            <div class="form-group">
                                <input type="text" class="comment-input" id="comment-input-${movie.id}" placeholder="Add a comment...">
                                <button class="btn btn-primary add-comment" data-movie-id="${movie.id}">Comment</button>
                            </div>
                        </div>
                    </div>
                </div>    
                <button class="btn btn-primary watch-trailer">Watch Trailer</button>
            <div class="movie-trailer-box" style="display: none;">
                <iframe id="player-${movie.id}" class="movie-trailer" frameborder="0" allowfullscreen></iframe>
            </div>
            </li>`;

        }

        function addMovieToList(movie) {
            let movieHtml = createMovieListItem(movie);
            $("#movies-ul").append(createMovieListItem(movieHtml));
        }

        

        export { extractVideoId, createMovieListItem, addMovieToList};

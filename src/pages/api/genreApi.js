const omdbKey = process.env.NEXT_PUBLIC_OMDB_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.NEXT_PUBLIC_TMDB_TOKEN
  }
};

export async function fetchTvToday() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1`, options)
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}
export async function fetchTvOnAir() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1'`, options)
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    } 
}
export async function fetchTvPopular() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`, options)
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}
export async function fetchTvTopRated() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, options)
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

export async function fetchMovieNowPlaying() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, options)
        const data = await response.json(); 
        return data;
    } catch(error) {
        console.log(error);
    }
}
export async function fetchMoviePopular() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}
export async function fetchMovieTopRated() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options)
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}
export async function fetchMovieUpcoming() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options)
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

export async function getGenres() {
    try {
        const genreMap = new Map();
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then((response) => response.json())
            .then((data) => {
                const movieGenres = data.genres;
                fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
                    .then((response) => response.json())
                    .then((data) => {
                        const combineGenres = [...movieGenres, ...data.genres];
                        combineGenres.forEach((genre) => {
                            genreMap.set(genre.id, genre.name);
                        });
                    });
            }); 
            return genreMap;
    } catch (error) {
        console.log(error);
    }
}
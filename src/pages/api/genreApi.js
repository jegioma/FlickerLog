// // const url = 'https://streaming-availability.p.rapidapi.com/genres';
// const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
// const motnOptions = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-host': process.env.NEXT_PUBLIC_MOTN_RAPIDAPI_HOST,
//         'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY
//     }
// };

// const tmdbOptions = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: process.env.NEXT_PUBLIC_TMDB_TOKEN
//     }
// }
    
// const fetchGenre = async () => {
//     let genreResults = []; 

//     await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', tmdbOptions)
//       .then(response => response.json())
//       .then(data => {
//         if (data && data.genres) { // check if data and data.genres exist
//           genreResults = data.genres.map(genre => {
//             return {
//               genreId: genre.id,
//               genreName: genre.name
//             };
//           });
//         }
//       })
//       .catch(err => console.error(err));

//     return genreResults;
// };



// export default fetchGenre;

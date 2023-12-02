const omdbKey = process.env.NEXT_PUBLIC_OMDB_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.NEXT_PUBLIC_TMDB_TOKEN
  }
};

export async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchRatings(ttid) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${ttid}&apikey=${omdbKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchShowDetails(id) {
  try {
    const fetchId = await fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids`, options);
    const idData = await fetchId.json();
    const ttid = idData?.imdb_id;

    const response = await fetch(`https://www.omdbapi.com/?i=${ttid}&apikey=${omdbKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function formatDate(dateString) {
    let date = dateString.split('-'); //split dateSting by '-' into array
    return date.splice(1).join('-') + '-' + date[0]; //splice array from second element (1) and join MM & DD with '-', then adds the first in array (0) to end
}

export function formatDateString(dateString) {
    const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const dateParts = dateString.split(' '); // Split the date string by space
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    const monthIndex = months.indexOf(month); // Get the index of the month in the array

    if (monthIndex !== -1) {
    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
    return formattedDate;
    } else {
    return 'Invalid date format';
    }
}

export function formatGenreString(genreString) {
  console.log(genreString)
  if (!genreString) {
    return null
  } else {
    return genreString.split(',').map((genre) => genre.trim());
  }
}

export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  

const omdbKey = process.env.NEXT_PUBLIC_OMDB_KEY;

export async function fetchMovieDetails(movie) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?t=${movie}&type=movie&apikey=${omdbKey}`);
    const data = await response.json();
    console.log(data); // Optional: you can remove this line
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchShowDetails(tv) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?t=${tv}&type=series&apikey=${omdbKey}`);
    const data = await response.json();
    console.log(data); // Optional: you can remove this line
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function fetchMovieDetails(movie, id) {
//     try {
//     //   const response = await fetch(`https://api.themoviedb.org/3/${movie}/${id}?language=en-US'`, options);
//     //   const data = await response.json();
//     fetch(`https://api.themoviedb.org/3/${movie}/${id}?language=en-US'`, options)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
//       console.log(data); // Optional: you can remove this line
//       return data;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
  
//   export async function fetchShowDetails(tv, id) {
//     try {
//         const response = await fetch(`https://api.themoviedb.org/3/${tv}/${id}?language=en-US'`, options);
//         const data = await response.json();
//       console.log(data); // Optional: you can remove this line
//       return data;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

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
    return genreString.split(',').map((genre) => genre.trim());
  }
  

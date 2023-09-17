const url = 'https://streaming-availability.p.rapidapi.com/genres';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY
    }
};
    
const fetchGenre = async () => {
    let genreResults = [];
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        // Iterate through each genre in the response
        for (const genreId in data.result) {
            const genreName = data.result[genreId];
            genreResults.push(genreName);
        }
    } catch (error) {
        console.error(error);
    }
    return genreResults;
};


export default fetchGenre;

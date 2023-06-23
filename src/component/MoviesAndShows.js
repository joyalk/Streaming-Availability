import React from "react";

class MoviesAndShows extends React.Component {
    state = {
        motions: [],
    }

    getMoviesAndShows = () => {
        const url = 'https://streaming-availability.p.rapidapi.com/v2/services';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '960a55839cmsha8e7513eb60fbb6p1e110ajsnbadf912bd0a7',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };
        
        try {
            const response = fetch(url, options);
            const result = response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="MoviesAndShows">
                <h1>Search</h1>
                <div className="search"></div>
                    <form>
                        <input type="text"/>
                        <button type={"submit"}>Search</button>
                    </form>
            </div>
        )
    }
}

export default MoviesAndShows
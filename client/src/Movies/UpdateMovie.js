import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
	id: Date.now(),
	title: '',
	director: '',
	metascore: '',
	stars: []
};

const UpdateMovie = props => {
	const [ movie, setMovie ] = useState(initialMovie);
    const { id } = useParams();
    
 console.log('params id:', id);

	useEffect(
		() => {
			const movieToUpdate = props.movies.find((thing) => `${thing.id}` === id);

			if (movieToUpdate) {
				setMovie(movieToUpdate);
			}
		},
		[ props.movies, id ]
	);

	const changeHandler = (ev) => {
		ev.persist();
		let value = ev.target.value;
		if (ev.target.name === 'price') {
			value = parseInt(value, 10);
		}

		setMovie({
			...movie,
			[ev.target.name]: value
		});
    };
    
    console.log('movie:', movie, props.movies);

	const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            axios.get("http://localhost:5000/api/movies")
            .then(res => {
                props.setMovies( res.data );
                props.history.push(`/`);
            })
            .catch(err => console.log(err.response));
        })
        .catch(err => console.log(err));
	};

	return (
		<div>
            <h1 style={{textAlign: "center"}}>Update the Movie!</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" onChange={changeHandler} placeholder="Title" value={movie.title} />
				<div className="baseline" />

				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="Director"
					value={movie.director}
				/>
				<div className="baseline" />

				<input
					type="number"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={movie.metascore}
				/>
				<div className="baseline" />

				<input type="string" name="stars" onChange={changeHandler} placeholder="Stars" value={movie.stars} />
				<div className="baseline" />

				<button className="update-button">Update Movie</button>
			</form>
		</div>
	);
};

export default UpdateMovie;

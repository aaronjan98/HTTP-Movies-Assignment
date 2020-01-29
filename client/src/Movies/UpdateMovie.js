import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

	useEffect(
		() => {
			const movieToUpdate = props.items.find((thing) => `${thing.id}` === id);

			if (movieToUpdate) {
				setMovie(movieToUpdate);
			}
		},
		[ props.items, id ]
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

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
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

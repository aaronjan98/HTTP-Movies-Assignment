import React, { useState } from 'react';

const initialMovie = {
	id: Date.now(),
	title: '',
	director: '',
	metascore: '',
	stars: []
};

const UpdateMovie = () => {
	const [ movie, setMovie ] = useState(initialMovie);

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

				<button>Update Movie</button>
			</form>
		</div>
	);
};

export default UpdateMovie;

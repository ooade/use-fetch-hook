import React, { useState } from 'react';
import { useFetch } from './hooks';
import './App.css';

const App = () => {
	const [query, setQuery] = useState('');

	const url = query && `https://hn.algolia.com/api/v1/search?query=${query}`;

	const { status, data, error } = useFetch(url);

	const handleSubmit = (e) => {
		e.preventDefault();

		const query = e.target.search.value;
		if (query) {
			setQuery(query);
			e.target.search.value = '';
		}
	};

	const articles = data.hits;

	return (
		<div className="App">
			<header> Hackernews Search </header>
			<form className="Form" onSubmit={handleSubmit}>
				<input
					type="text"
					autoFocus
					autoComplete="off"
					name="search"
					placeholder="Search Hackernews"
				/>
				<button> Search </button>
			</form>
			<main>
				{status === 'idle' && (
					<div> Let's get started by searching for an article! </div>
				)}
				{status === 'error' && <div>{error}</div>}
				{status === 'fetching' && <div className="loading"></div>}
				{status === 'fetched' && (
					<>
						<div className="query"> Search results for {query} </div>
						{articles.length === 0 && <div> No articles found! :( </div>}
						{articles.map((article) => (
							<div className="article" key={article.objectID}>
								<a target="_blank" href={article.url} rel="noopener noreferrer">
									{article.title}
								</a>{' '}
								by {article.author}
							</div>
						))}
					</>
				)}
			</main>
		</div>
	);
};

export default App;

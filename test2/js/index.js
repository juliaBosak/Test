const
	searchBlock = document.querySelector('.book-search'),
	searchInput = searchBlock.querySelector('.book-search-input'),
	searchResult = searchBlock.querySelector('.book-search-result');
let timer = null;
searchInput.addEventListener('input', () => {
	clearTimeout(timer);
	if (searchInput.value.length > 3) {
		timer = setTimeout(() => {
			searchResult.innerHTML = '';
			fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&key=AIzaSyB7LzF1j17fQLlkQchZvlrnPH2pPu2lAps`)
				.then(res => res.json())
				.then(data => {
					data.items.forEach((item) => {
						const wrap = document.createElement('div');
						const link = document.createElement('a');
						const spanAuthor = document.createElement('span');
						wrap.classList.add('result-item');
						link.classList.add('result-item-link');
						spanAuthor.classList.add('result-item-span');
						link.target = '_blank';
						if (item.volumeInfo.authors) {
							spanAuthor.innerHTML = item.volumeInfo.authors.join(', ');
						} else {
							spanAuthor.innerHTML = 'Unknown author'
						}
						link.href = item.volumeInfo.canonicalVolumeLink;
						link.innerHTML = item.volumeInfo.title + ' ';
						link.appendChild(spanAuthor);
						wrap.appendChild(link);
						searchResult.appendChild(wrap);
					})
				})
				.catch(error => {
					searchResult.innerHTML = 'No result';
				});
		}, 3000);
	}
	else if (searchInput.value === '') {
		searchResult.innerHTML = '';
	}
});


const
	openButton = document.getElementById('open-button'),
	overlay = document.getElementById('overlay'),
	popup =  document.getElementById('popup'),
	closeButton = popup.querySelector('.close-button'),
	cancelButton = popup.querySelector('.cancel-button'),
	uninstallButton = popup.querySelector('.uninstall-button');

function closePopup() {
	popup.classList.remove('zoomIn');
	popup.classList.add('zoomOut');
	return new Promise((resolve) => {
		setTimeout(() => {
			overlay.classList.remove('show');
			overlay.classList.add('hidden');
			resolve("DONE");
		}, 400)
	})

}

openButton.addEventListener('click', () => {
	popup.classList.remove('zoomOut');
	popup.classList.add('zoomIn');
	overlay.classList.remove('hidden');
	overlay.classList.add('show');
});
overlay.addEventListener('click', (event) => {
		if (!event.target.closest('#popup')) {
			closePopup();
		}
	}
);
closeButton.addEventListener('click', () =>closePopup());
cancelButton.addEventListener('click', () =>closePopup());
uninstallButton.addEventListener('click', () => {
	closePopup()
		.then(
			(result) =>  {
				setTimeout(() => {alert(result)}, 200)
			},
			(error) => {
				setTimeout(() => {alert(error)}, 200)
			}
		);
});
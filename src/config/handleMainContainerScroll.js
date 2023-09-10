const handleMainContainerScroll = (event) => {
	const logoHeader = document.getElementById('logoHeader');
	if (logoHeader) {
		const scrollPosition = event.target.scrollTop;
		if (scrollPosition > 0) {
			logoHeader.classList.add('logoHeader');
		} else {
			logoHeader.classList.remove('logoHeader');
		}
	}
};

export { handleMainContainerScroll };

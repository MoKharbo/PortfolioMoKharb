// Portfolio scripts
const workSection = document.querySelector('.work-section');
const moreProjectsToggle = document.querySelector('#moreProjectsToggle');
const extraProjects = document.querySelectorAll('.extra-project');

if (workSection && moreProjectsToggle && extraProjects.length > 0) {
	extraProjects.forEach((card, index) => {
		card.style.setProperty('--stagger', String(index));
	});

	moreProjectsToggle.addEventListener('click', () => {
		const isExpanded = !workSection.classList.contains('projects-expanded');
		workSection.classList.toggle('projects-expanded', isExpanded);

		moreProjectsToggle.setAttribute('aria-expanded', String(isExpanded));
		moreProjectsToggle.querySelector('.label').textContent = isExpanded ? 'Show Less' : 'Show More';

		extraProjects.forEach((card) => {
			card.classList.remove('is-entering', 'is-leaving');

			if (isExpanded) {
				card.hidden = false;
				card.setAttribute('aria-hidden', 'false');
				void card.offsetWidth;
				card.classList.add('is-entering');
				return;
			}

			card.classList.add('is-leaving');

			const onHide = () => {
				card.hidden = true;
				card.setAttribute('aria-hidden', 'true');
				card.classList.remove('is-leaving');
				card.removeEventListener('animationend', onHide);
			};

			card.addEventListener('animationend', onHide);
		});
	});
}

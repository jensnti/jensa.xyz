window.addEventListener('load', () => {
    const title = document.querySelector('.post-list-title');
    const postlist = document.querySelector('.post-list');
    const icon = document.createElement('span');
    icon.classList.add('icon');
    icon.classList.add('icon-desc');
    icon.title = 'Klicka för att ändra sortering';

    icon.addEventListener('click', () => {
        icon.classList.toggle('icon-desc');
        icon.classList.toggle('icon-asc');

        postlist.classList.toggle('flex-reverse');
    })

    title.appendChild(icon);
})
window.addEventListener('load', () => {
    const title = document.querySelector('.post-list-title');
    const postlist = document.querySelector('.post-list');
    const icon = document.createElement('button');
    icon.classList.add('icon');
    icon.title = 'Klicka för att ändra sortering';
    icon.innerHTML = `<span class="visually-hidden">permalink</span>
    <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M18.5 16.44V6.75a.75.75 0 00-1.5 0v9.69l-2.22-2.22a.75.75 0 10-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 10-1.06-1.06l-2.22 2.22zM2 7.25a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5A.75.75 0 012 7.25zm0 5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm0 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z"></path>
    </svg>
    `;

    icon.addEventListener('click', () => {
        if (postlist.classList.contains('flex-reverse')) {
            icon.innerHTML = `<span class="visually-hidden">permalink</span>
            <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M18.5 16.44V6.75a.75.75 0 00-1.5 0v9.69l-2.22-2.22a.75.75 0 10-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 10-1.06-1.06l-2.22 2.22zM2 7.25a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5A.75.75 0 012 7.25zm0 5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm0 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z"></path>
            </svg>
            `;
        } else {
            icon.innerHTML = `<span class="visually-hidden">permalink</span>
            <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M18.5 17.25a.75.75 0 01-1.5 0V7.56l-2.22 2.22a.75.75 0 11-1.06-1.06l3.5-3.5a.75.75 0 011.06 0l3.5 3.5a.75.75 0 01-1.06 1.06L18.5 7.56v9.69zm-15.75.25a.75.75 0 010-1.5h9.5a.75.75 0 010 1.5h-9.5zm0-5a.75.75 0 010-1.5h5.5a.75.75 0 010 1.5h-5.5zm0-5a.75.75 0 010-1.5h3.5a.75.75 0 010 1.5h-3.5z"></path>
            </svg>
            `;
        }

        postlist.classList.toggle('flex-reverse');
    });

    title.appendChild(icon);
});

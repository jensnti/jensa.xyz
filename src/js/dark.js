window.addEventListener('load', () => {
    document.querySelector('[data-switch-dark]').addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
});
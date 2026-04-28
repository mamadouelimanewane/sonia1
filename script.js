document.addEventListener('DOMContentLoaded', () => {
    console.log('TorodoAvenue script loaded.');

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    const shopBtn = document.querySelector('.btn-shop');
    if (shopBtn) {
        shopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Redirection vers la boutique...');
        });
    }
});

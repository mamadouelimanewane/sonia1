document.addEventListener('DOMContentLoaded', () => {
    // Simple console log to verify script is loaded
    console.log('TorodoAvenue script loaded.');

    // Add interactivity to buttons if needed
    const menuBtn = document.querySelector('.nav-left button[aria-label="Menu"]');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            alert('Menu feature coming soon!');
        });
    }

    const shopBtn = document.querySelector('.btn-shop');
    if (shopBtn) {
        shopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Redirecting to shop...');
        });
    }
});

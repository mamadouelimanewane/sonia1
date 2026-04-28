const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const pages = [
    { file: 'new-in.html', title: 'Nouveautés' },
    { file: 'collections.html', title: 'Collections' },
    { file: 'sea-allure.html', title: 'Sea Allure' },
    { file: 'luminous-prive.html', title: 'Luminous Privé' },
    { file: 'the-opulence.html', title: 'The Opulence' },
    { file: 'i-am-minne.html', title: 'I am Minne' },
    { file: 'bridal.html', title: 'Bridal' },
    { file: 'haute-couture.html', title: 'Haute Couture' },
    { file: 'evening-formal.html', title: 'Soirée & Formel' },
    { file: 'prom-dresses.html', title: 'Robes de Bal' },
    { file: 'bestsellers.html', title: 'Meilleures Ventes' },
    { file: 'sale.html', title: 'Soldes' },
    { file: 'about.html', title: 'La Marque' }
];

const heroRegex = /<!-- Hero Section -->\s*<section class="hero">[\s\S]*?<\/section>/;

pages.forEach(page => {
    const pageContent = `
    <!-- Page Header -->
    <section class="page-header" style="padding: 150px 20px; text-align: center; background-color: #fbf8f1;">
        <h2 style="font-family: 'Cinzel', serif; font-size: 3rem; color: #d4af37;">${page.title}</h2>
        <p style="margin-top: 20px; font-size: 1.1rem; color: #1a1a1a;">Découvrez notre sélection de ${page.title.toLowerCase()}.</p>
    </section>
    `;

    let newHtml = indexHtml.replace(heroRegex, pageContent);
    // update title
    newHtml = newHtml.replace('<title>TorodoAvenue - La Collection Bal de Promo 2026</title>', `<title>TorodoAvenue - ${page.title}</title>`);
    // update section title
    newHtml = newHtml.replace('<h2 class="section-title">NOUVEAUTÉS</h2>', `<h2 class="section-title">${page.title.toUpperCase()}</h2>`);
    
    fs.writeFileSync(page.file, newHtml);
    console.log(`Created ${page.file}`);
});

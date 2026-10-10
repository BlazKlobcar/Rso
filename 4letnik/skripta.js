//Babičin nasvet (index.html)

const gumbNasvet = document.getElementById('gumb-nasvet');
const besediloNasvet = document.getElementById('nasvet-besedilo');

if (gumbNasvet && besediloNasvet) {
    const nasveti = [
        "Testo za potico mora vedno vzhajati na toplem in brez prepiha!",
        "Ščepec soli v sladkem testu poudari vse ostale okuse.",
        "Krompir za žgance naj bo vedno dobro skuhan in vroč.",
        "Pravih ajdovih žgancev nikoli ne mešamo preveč agresivno.",
        "Lubezen je najpomembnejša sestavina vsake dobre domače jedi."
    ];

    gumbNasvet.addEventListener('click', () => {
        const naključniIndeks = Math.floor(Math.random() * nasveti.length);
        besediloNasvet.textContent = nasveti[naključniIndeks];
        besediloNasvet.style.fontWeight = "bold";
        besediloNasvet.style.color = "#8c2d19";
    });

}

//Tabela, filtriranje in podrobnosti (recepti.html)

const vnosIskanje = document.getElementById('vnos-iskanje');
const tabelaReceptov = document.getElementById('tabela-receptov');
const podrobnostiOkvir = document.getElementById('podrobnosti-okvir');
const podrobnostiNaslov = document.getElementById('podrobnosti-naslov');
const podrobnostiBesedilo = document.getElementById('podrobnosti-besedilo');

if (tabelaReceptov) {
    const vrstice = tabelaReceptov.querySelectorAll('tbody tr');

    // Filtriranje podatkov v tabeli
    if (vnosIskanje) {
        vnosIskanje.addEventListener('input', (x) => {
            const niz = x.target.value.toLowerCase().trim();
            vrstice.forEach(vrstica => {
                const besediloVrstice = vrstica.textContent.toLowerCase();
                if (besediloVrstice.includes(niz)) {
                    vrstica.classList.remove('skrito');
                } else {
                    vrstica.classList.add('skrito');
                }
            });
        });
    }

    // Prikaz podrobnosti ob kliku na vrstico
    vrstice.forEach(vrstica => {
        vrstica.addEventListener('click', () => {
            const imeJedi = vrstica.children[0].textContent;
            const opis = vrstica.getAttribute('data-opis');
            if (podrobnostiOkvir && podrobnostiNaslov && podrobnostiBesedilo) {
                podrobnostiNaslov.textContent = imeJedi;
                podrobnostiBesedilo.innerHTML = opis.replace('Sestavine:', '<br><strong>Sestavine:</strong>').replace(' Postopek:', '<br><br><strong>Postopek:</strong>');
                podrobnostiOkvir.classList.remove('skrito');
            }
        });
    });
}

// Preverjanje in dinamični izpis obrazca (prispevaj.html)

const obrazec = document.getElementById('obrazec-recept');
const sporociloNapaka = document.getElementById('sporočilo-napaka');
const sporociloUspeh = document.getElementById('sporočilo-uspeh');
const prikazPrispevka = document.getElementById('prikaz-prispevka');
const vsebinaPrispevka = document.getElementById('vsebina-prispevka');
if (obrazec) {
    obrazec.addEventListener('submit', (x) => {
        x.preventDefault(); // Prepreči osveževanje strani

        // Ponastavitev sporočil
        sporociloNapaka.classList.add('skrito');
        sporociloNapaka.textContent = '';
        sporociloUspeh.classList.add('skrito');

        // Pridobivanje vrednosti
        const imeAvtorja = document.getElementById('ime-avtorja').value.trim();
        const emailAvtorja = document.getElementById('email-avtorja').value.trim();
        const imeJedi = document.getElementById('ime-jedi').value.trim();
        const regijaJedi = document.getElementById('regija-jedi').value;
        const postopek = document.getElementById('postopek').value.trim();
        const izbranaZahtevnost = document.querySelector('input[name="zahtevnost"]:checked');

        // Preverjanje
        let napake = [];
        if (!imeAvtorja) napake.push("Prosimo, vnesite vaše ime.");
        if (!emailAvtorja || !emailAvtorja.includes('@')) napake.push("Vnesite veljaven e-poštni naslov.");

        if (!regijaJedi) napake.push("Izberite regijo izvora.");
        if (!izbranaZahtevnost) napake.push("Izberite zahtevnost priprave.");
        if (!postopek || postopek.length < 10) napake.push("Postopek priprave mora vsebovati vsaj 10 znakov.");        
        if (napake.length > 0) {
                    sporociloNapaka.textContent = napake.join(' ');
                    sporociloNapaka.classList.remove('skrito');
                    return;
                }

        // Dinamični izpis brez osveževanja
        vsebinaPrispevka.innerHTML = `
            <p><strong>Avtor:</strong> ${imeAvtorja} (${emailAvtorja})</p>
            <p><strong>Recept:</strong> ${imeJedi}</p>
            <p><strong>Regija:</strong> ${regijaJedi}</p>
            <p><strong>Zahtevnost:</strong> ${izbranaZahtevnost.value}</p>
            <p><strong>Postopek:</strong></p>
            <p>${postopek}</p>
        `;

        sporociloUspeh.textContent = 'Vaš recept je bil uspešno predložen!';
        sporociloUspeh.classList.remove('skrito');
        prikazPrispevka.classList.remove('skrito');

        // Ponastavitev obrazca
        obrazec.reset();
    });
}
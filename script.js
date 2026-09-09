// =========================================
// RÉCUPÉRATION DES ÉLÉMENTS HTML
// =========================================

const bouton = document.getElementById("boutonSurprise");

const message = document.getElementById("messageSecret");

const cadeau = document.getElementById("cadeauAnime");

const musique =
    document.getElementById("musiqueAnniversaire");

const boutonMusique =
    document.getElementById("boutonMusique");

const boutonPause =
    document.getElementById("boutonPause");


// =========================================
// FONCTION POUR OUVRIR LA SURPRISE
// =========================================

function ouvrirSurprise() {

    message.classList.add("visible");

    cadeau.classList.add("ouvert");

    lancerConfettis();

    // Démarrage de la musique

    musique.play().catch(function () {

        console.log(
            "Le navigateur demande une action manuelle pour démarrer la musique."
        );

    });

}


// =========================================
// BOUTON SURPRISE
// =========================================

bouton.addEventListener(
    "click",
    ouvrirSurprise
);


// =========================================
// CLIQUER SUR LE CADEAU
// =========================================

cadeau.addEventListener(
    "click",
    ouvrirSurprise
);


// =========================================
// MUSIQUE : LIRE
// =========================================

boutonMusique.addEventListener(
    "click",
    function () {

        musique.play();

    }
);


// =========================================
// MUSIQUE : PAUSE
// =========================================

boutonPause.addEventListener(
    "click",
    function () {

        musique.pause();

    }
);


// =========================================
// CONFETTIS
// =========================================

function lancerConfettis() {

    for (let i = 0; i < 100; i++) {

        const confetti =
            document.createElement("div");

        confetti.classList.add(
            "confetti"
        );

        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.backgroundColor =
            choisirCouleur();


        confetti.style.animationDuration =
            (Math.random() * 2 + 2) + "s";


        document.body.appendChild(
            confetti
        );


        setTimeout(
            function () {

                confetti.remove();

            },
            4000
        );

    }

}


// =========================================
// COULEURS DES CONFETTIS
// =========================================

function choisirCouleur() {

    const couleurs = [

        "#ff69b4",

        "#ffd700",

        "#9b59b6",

        "#3498db",

        "#ff7675",

        "#55efc4"

    ];


    const nombre =
        Math.floor(
            Math.random() *
            couleurs.length
        );


    return couleurs[nombre];

}


// =========================================
// CŒURS FLOTTANTS
// =========================================

function creerCoeur() {

    const coeur =
        document.createElement("div");

    coeur.classList.add("coeur");

    coeur.innerHTML = "❤️";


    coeur.style.left =
        Math.random() * 100 + "vw";


    coeur.style.animationDuration =
        (Math.random() * 3 + 4) + "s";


    document.body.appendChild(
        coeur
    );


    setTimeout(
        function () {

            coeur.remove();

        },
        7000
    );

}


// Créer un cœur régulièrement

setInterval(
    creerCoeur,
    700
);


// =========================================
// ENVELOPPE
// =========================================

const enveloppe =
    document.getElementById("enveloppe");


enveloppe.addEventListener(
    "click",
    function () {

        enveloppe.classList.toggle(
            "ouverte"
        );

        lancerConfettis();

    }
);


// =========================================
// COMPTE À REBOURS
// =========================================

// Date : 17 octobre 2026 à minuit

const dateAnniversaire =
    new Date(
        "October 17, 2026 00:00:00"
    ).getTime();


const compteRebours =
    setInterval(
        function () {

            const maintenant =
                new Date().getTime();


            const difference =
                dateAnniversaire -
                maintenant;


            // Calcul des jours

            const jours =
                Math.floor(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            // Calcul des heures

            const heures =
                Math.floor(
                    (difference /
                    (1000 * 60 * 60)) % 24
                );


            // Calcul des minutes

            const minutes =
                Math.floor(
                    (difference /
                    (1000 * 60)) % 60
                );


            // Calcul des secondes

            const secondes =
                Math.floor(
                    (difference / 1000) % 60
                );


            document.getElementById(
                "jours"
            ).textContent = jours;


            document.getElementById(
                "heures"
            ).textContent =
                heures
                .toString()
                .padStart(2, "0");


            document.getElementById(
                "minutes"
            ).textContent =
                minutes
                .toString()
                .padStart(2, "0");


            document.getElementById(
                "secondes"
            ).textContent =
                secondes
                .toString()
                .padStart(2, "0");


            // =================================
            // SI LE JOUR EST ARRIVÉ
            // =================================

            if (difference < 0) {

                clearInterval(
                    compteRebours
                );


                document.querySelector(
                    ".compte-rebours"
                ).innerHTML = `

                    <h2>
                        🎉 C'est aujourd'hui ! 🎂
                    </h2>

                    <p>
                        ❤️ Joyeux anniversaire ❤️
                    </p>

                `;


                lancerConfettis();

            }

        },
        1000
    );


// =========================================
// GALERIE / LIGHTBOX
// =========================================

const medias =
    document.querySelectorAll(
        ".media img, .media video"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const contenuLightbox =
    document.getElementById(
        "contenuLightbox"
    );


const fermer =
    document.getElementById(
        "fermer"
    );


const precedent =
    document.getElementById(
        "precedent"
    );


const suivant =
    document.getElementById(
        "suivant"
    );


let position = 0;


// =========================================
// OUVRIR UNE PHOTO OU UNE VIDÉO
// =========================================

medias.forEach(
    function (media, index) {

        media.addEventListener(
            "click",
            function (event) {

                /*
                 Pour une vidéo,
                 on évite d'ouvrir le lightbox
                 lorsque l'utilisateur utilise
                 les contrôles.
                */

                if (
                    media.tagName ===
                    "VIDEO"
                ) {

                    const rectangle =
                        media.getBoundingClientRect();


                    const y =
                        event.clientY -
                        rectangle.top;


                    const hauteur =
                        rectangle.height;


                    if (
                        y >
                        hauteur - 60
                    ) {

                        return;

                    }

                }


                position = index;


                afficherMedia();


                lightbox.style.display =
                    "flex";

            }
        );

    }
);


// =========================================
// AFFICHER LE MEDIA
// =========================================

function afficherMedia() {

    const media =
        medias[position];


    contenuLightbox.innerHTML =
        "";


    // =================================
    // PHOTO
    // =================================

    if (
        media.tagName ===
        "IMG"
    ) {

        const image =
            document.createElement(
                "img"
            );


        image.src =
            media.src;


        image.alt =
            media.alt;


        contenuLightbox.appendChild(
            image
        );

    }


    // =================================
    // VIDÉO
    // =================================

    else if (
        media.tagName ===
        "VIDEO"
    ) {

        const video =
            document.createElement(
                "video"
            );


        const source =
            media.querySelector(
                "source"
            );


        video.src =
            source.src;


        video.controls =
            true;


        video.autoplay =
            true;


        video.playsInline =
            true;


        contenuLightbox.appendChild(
            video
        );

    }

}


// =========================================
// MEDIA SUIVANT
// =========================================

suivant.addEventListener(
    "click",
    function () {

        position++;


        if (
            position >=
            medias.length
        ) {

            position = 0;

        }


        afficherMedia();

    }
);


// =========================================
// MEDIA PRÉCÉDENT
// =========================================

precedent.addEventListener(
    "click",
    function () {

        position--;


        if (position < 0) {

            position =
                medias.length - 1;

        }


        afficherMedia();

    }
);


// =========================================
// FERMER LE LIGHTBOX
// =========================================

fermer.addEventListener(
    "click",
    function () {

        lightbox.style.display =
            "none";


        contenuLightbox.innerHTML =
            "";

    }
);


// =========================================
// CLIQUER EN DEHORS DU MEDIA
// POUR FERMER
// =========================================

lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            lightbox
        ) {

            lightbox.style.display =
                "none";


            contenuLightbox.innerHTML =
                "";

        }

    }
);


// =========================================
// TOUCHES DU CLAVIER
// =========================================

document.addEventListener(
    "keydown",
    function (event) {


        // Échap = fermer

        if (
            event.key ===
            "Escape"
        ) {

            lightbox.style.display =
                "none";


            contenuLightbox.innerHTML =
                "";

        }


        // Flèche droite

        if (
            event.key ===
            "ArrowRight" &&
            lightbox.style.display ===
            "flex"
        ) {

            position++;


            if (
                position >=
                medias.length
            ) {

                position = 0;

            }


            afficherMedia();

        }


        // Flèche gauche

        if (
            event.key ===
            "ArrowLeft" &&
            lightbox.style.display ===
            "flex"
        ) {

            position--;


            if (position < 0) {

                position =
                    medias.length - 1;

            }


            afficherMedia();

        }

    }
);
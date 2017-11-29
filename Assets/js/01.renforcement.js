// -- Déclarer un Tableau Numérique
var Prenoms = ["Hugo", "Yann", "Baya", "Bryan", "Leslie"];


// -- Aperçu dans la console
console.log(Prenoms);

// -- Si je veux connaitre le nombre d'éléments (Prénoms) de mon Tableau ?
var NombreElementsDansMonTableau = Prenoms.length;
console.log(NombreElementsDansMonTableau);

// -- Pour récupérer une valeur dans le tableau numérique j'utilise son indice (index).
console.log(Prenoms[2]); // Baya
console.log(Prenoms[4]); // Leslie

// var i = 3;
// console.log(Prenoms[i]);

// -- Pour i = 0 (Au départ i vaut 0) ; tant que i < (est strictement inférieur) à NombreElementsDansMonTableau (Prenoms.length) ; alors i++ (J'incrémente successivement i de 1 à chaque itération (Tour de boucle)).

for(let i = 0; i < NombreElementsDansMonTableau ; i++) {
    
    // -- Tous ce qui est situé à l'intérieur des accolades, sera dans la boucle.
    console.log('Ici, i = ' + i);
    console.log(Prenoms[i]);
    console.log('----');
} // -- Fin Boucle For

// -- Voyons maintenant comment procéder avec des objets

var Contact = {
    // INDICE           VALEUR
    prenom        :     "Hugo",
    nom            :     "LIEGEARD",
    age             :     27
};

// -- Aperçu dans la console.
console.log(Contact);

// -- Pour récupérer les valeurs d'un objet j'utilise le "." suivi de l'INDICE.
console.log("Prénom : " + Contact.prenom);
console.log("Nom : " + Contact.nom);
console.log("Age : " + Contact.age + " ans"); // Autre possibilité

var Contacts = [
    "Hugo",
    "Yann",
    {
        // INDICE           VALEUR
        prenom         :    "Bryan",
        nom             :    "DELCAMBRE",
        age              :    21
    },
    {
        prenom         :    "Baya",
        nom             :    "MEFTAH",
        age              :     27
    }
];

// -- Aperçu dans la console
console.log(Contacts);

// -- Comment accéder aux valeurs de mon objet, dans le tableau numérique...

    // -- 1. D'abord, je récupère mon objet
    console.log(Contacts[2]);

    // -- 2. Pour accéder aux valeurs de mon objet
    console.log("Prénom : " + Contacts[2].prenom);
    console.log("Nom : " + Contacts[2].nom);
    console.log("Age : " + Contacts[2].age + " Ans");

    // -- En résumé, j'accède à la valeur de l'indice "prenom" de l'objet situé à l'index 2 de mon tableau numérique de "Contacts"

    // -- Comment parcourir un tableau avec des objets
    // -- Supposons le tableau suivant : 

    var Etudiants = [
        {
            prenom : "Hugo",
            nom : "LIEGEARD",
            classe : "Terminale S"
        },
        {
            prenom : "Yann",
            nom : "DERVAUX",
            classe : "Maternelle"
        },
        {
            prenom : "Baya",
            nom : "MEFTAH",
            classe : "Crèche"
        },
        {
            prenom : "Bryan",
            nom : "DELCAMBRE",
            classe : "CP"
        },
        {
            prenom : "Kasia",
            nom : "KARWAT",
            classe : "Petite Section"
        },
        {
            prenom : "JR",
            nom : "CACHERA",
            classe : "Master II"
        },
    ];

    // -- Regardons dans la console
    console.log(Etudiants);

    // -- Si je veux connaitre le nombre d'étudiants
    var NombreEtudiants = Etudiants.length;
    console.log("Nombre d'étudiants = " + NombreEtudiants);


                        // EXERCICE
    /* -------------------------------------------
    Afficher dans la page HTML à l'aide de jQuery la liste   (ul>li) des Etudiants et leur classe. 
    --------------------------------------------*/

    // jQuery(document).ready(function() { ... });
    // $(document).ready(function() { ... });


    $(function() {
        // -- Ici, jQuery est pret a travailler !
        console.log("ready !");

        var ul = $('<ul>');

        // -- Je parcours mon tableau d'étudiants
        for(let i = 0 ; i < NombreEtudiants ; i++){

            // -- Je récupère l'étudiant en cours dans ma boucle
            let Etudiant = Etudiants[i];

            // -- Aperçu dans la console.
            // console.log(Etudiant);

            $(`

                <li>
                <strong>${Etudiant.prenom} ${Etudiant.nom}</strong> - ${Etudiant.classe}
                </li>

            `).appendTo(ul);

        } // -- End For
        ul.appendTo($('body'));

    });

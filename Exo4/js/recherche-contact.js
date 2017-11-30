/*

OBJECTIF : A partir d'une liste de contacts, être en mesure de récupérer un contact et d'afficher le détail de ses informations.

CONSIGNE :

	// Un internaute doit pouvoir rechercher un contact sur la base de son Username, Email, Phone ou Name
	// Le résultat des membres correspondant s'affiche ensuite dans une liste en dessous du champ de recherche.

    ETAPE 1. Mettre en Place le HTML et le CSS nécessaire pour rechercher un contact.
        Ex. Un champ input-text, et/ou un bouton pour lancer la recherche.
        
    ETAPE 2. Récupérer le Flux JSON : https://jsonplaceholder.typicode.com/users et être en mesure de récupérer la fiche d'un utilisateur par rapport a son username.
    
    ETAPE 3. Afficher en HTML et CSS uniquement les informations de base : Nom, Prénom, Email, Téléphone.
    
    
*/


/* ETAPE 2. Récupérer le Flux JSON : https://jsonplaceholder.typicode.com/users et être en mesure de récupérer la fiche d'un utilisateur par rapport a son username. */

// -- Chargement du DOM ...
$(function () {

    $.getJSON('https://jsonplaceholder.typicode.com/users', function (resultat) {
        // console.log(resultat);
        for(let i = 0; i < resultat.length ; i++) {
        $(`
            <div class="membre">
                <div class="membre_informations">
                    <p>Nom Complet : ${resultat[i].name}</p>
                    <p>Username : ${resultat[i].username}</p>
                    <p>Email : ${resultat[i].email}</p>
                    <p>Téléphone : ${resultat[i].phone}</p>
                </div>
            </div>
        `).appendTo($('.resultat'))
        }
        $('.membre').hide();
        $('#search').change(function(){
            $('.membre').hide();
           var txt = $('#search').val();
           if(txt.length<1)
               $("#error_msg").html("Inserez au moins 1 caractère !");
           else
               $('.membre:contains("'+txt+'")').fadeIn(600);
        }); // -- input
    }); // -- JSON
}); // -- Function
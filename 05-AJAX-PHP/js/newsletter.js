/* ----------------------------------------------------------------------------------------------------
                                                                    LES FONCTIONS
------------------------------------------------------------------------------------------------------*/
/**
 * Validate email function with regualr expression
 * 
 * If email isn't valid then return false
 * 
 * @param email
 * @return Boolean
 */
function validateEmail(email) {
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(email);

    if (!valid) {
        return false;
    } else {
        return true;
    }
}
/* ----------------------------------------------------------------------------------------------------
                                                                    LE TRAITEMENT
------------------------------------------------------------------------------------------------------*/
$(() => {
    // -- jQuery est maitenant chargé !
    console.log('jQuery is ready !');

    // -- J'écoute la soumission du Formulaire
    $('#newsletter').submit(function (e) {

        // -- Bloquer la redirection du formulaire
        e.preventDefault();

        // -- Réinitialiser les erreurs
        $('#newsletter .has-error').removeClass('has-error');
        $('#newsletter .help-block').remove();

        // -- Récupération des champs
        var email = $('#newsletter input[name="email"]');

        // -- Vérifier la validité du mail
        if (!validateEmail(email.val())) {

            // -- Ici, mon email n'est pas valide
            email.parent().addClass('has-error');
            $('<p class="help-block">Vérifiez votre email.</p>').appendTo(email.parent());

        } else {

            // -- Sinon, mon email est valide, je peux procéder à la requète AJAX

        } // if(!validate())

        // -- Une fois la vérification des champs terminées.
        if ($('#newsletter').find('.has-error').length == 0) {

            // -- Si je n'ai pas de classe 'has-error' parmi les enfants de ma newsletter, alors il n'y a pas d'erreur et je peux procéder à ma requete AJAX

            $.ajax({
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                data: $(this).serialize(),
                dataType: 'JSON',
                timeout: 5000
            })
                .done((resultat) => {
                    //console.log(resultat);

                    // -- Si j'ai un retour positif de mon fichier PHP
                    if (resultat.success) {
                        $('#newsletter').replaceWith(`
                            <div class="alert alert-success text-center">
                                <i class="fa fa-thumbs-up fa-2x" aria-hidden="true"></i><br>
                                    Merci, votre Email a bien été ajoutée. <br>
                                    <u>À très vote dans notre prochaine newsletter</u>
                            </div>
                    `);
                    } else {
                        // -- Il y a eu un problème, nous allons vérifier d'où viens le soucis.

                        // -- On vérifie si le problème viens d'un email déjà présent en BDD
                        if(resultat.erreurs.isEmailInDb) {
                            email.parent().addClass('has-error');
                            $('#newsletter').prepend(`
                            <div class="alert alert-danger text-center">
                                <i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><br>
                                Attention cette adresse email est <u>déjà presente dans nos listes.</u>
                            </div>
                            `);
                        }
                    }

                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    //console.log("Une erreur est survenue : " + errorThrown);
                });

        } else {

            // -- Sinon, il y a encore des erreurs à corriger.
            $('#newsletter').prepend(`
                <div class="alert alert-danger text-center">
                    <i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><br>
                    Nous n'avons pas été en mesure de valider votre demande.
                    <u>Vérifiez vos informations.</u>
                </div>
            `);

        }

    }); // submit('newsletter')

}); // jquery(function())
<?php 
# Importation de Idiorm.
require_once 'idiorm.php';

# Configuration de la BDD
ORM::configure('mysql:host=localhost;dbname=newsletter');
ORM::configure('username', 'root');
ORM::configure('password', '');

// -- On déclare à PHP que notre fichier va renvoyer du JSON
// -- Pas obligatoire...
header('Content-Type: application/json');

// -- Détecter la méthode POST
if(!empty($_POST)) :

    # Récupération des données POST
    // $prenom = $_POST['prenom];
    // $nom    = $_POST['nom'];
    // $email  = $_POST['email'];

    # : Cette fonction est très pratique, car elle nous permet de mettre toutes les valeurs d'un array dans des variables nommées en fonction des indices.
    extract($_POST);

    # Vérification des données saisies
    if(!empty($email)) :

        # Si mon email n'est pas vide, alors je vérifie qu'il est au bon format, qu'il est valide.
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) :

            $erreurs['isEmailInvalid'] = true;

            else :

                # Mon email est valide, je vérifie dans la BDD s'il n'est pas déjà présent.
                $isEmailInDb = ORM::for_table('contact') ->where('EMAIL_CONTACT', $email) ->count();

            if(!$isEmailInDb) :

                    # Si l'adresse email de mon utilisateur n'est pas déjà présente en BDD, alors je peux faire l'insertion
                    $person = ORM::for_table('contact')->create();

                    $person->EMAIL_CONTACT    = $email;
                    $person->PRENOM_CONTACT = $prenom;
                    $person->NOM_CONTACT      = $nom;
                    $person->save();

                else :

                    # Sinon, je renvoi un message d'erreur
                    $erreurs['isEmailInDb'] = true;

            endif;

        endif;

        else :

            # Sinon, je log l'erreur dans un tableau errors
            $erreurs['isMailEmpty'] = true;

    endif;

    # Une fois le traitement terminé, on va faire un retour à l'application.
    if(!isset($erreurs)) :

        # Tous s'est bien passé, je renvoi une réponse positive
        echo json_encode(['success' => true]);

        else :

        # Sinon, il y a des erreurs, je retourne mon tableau d'erreurs.
        echo json_encode([
            'success' => false,
            'erreurs'  => $erreurs
        ]);
    
    endif;

    else :
        echo json_encode([
            'nodata' => 'Aucune donn&eacute;es d&eacute;tect&eacute;s.' 
            ]);

endif;

?>
/*-----------------------------Noé--------------------------------------------*/
/*Variables*/
/*Fonctions*/
/*Executions*/

/*-----------------------------Mel-------------------------------------------*/
/*Variables*/
/*Fonctions*/
/*Executions*/

/*----------------------------Benoit----------------------------------------*/
/*Variables*/
/*Fonctions*/
/*Executions*/

/*----------------------------Aurélie--------------------------------------*/
/*Variables*/
/*Fonctions*/
/*Executions*/

/*-----------------------------Kevin--------------------------------------*/
/************************************
* ********Variables*****************
* ***********************************/
const date = $("#datepicker").get(0);  //sélecteur pour le date picker
const ajouterTache = $("#ajouterTache").get(0); //selecteur pour le bouton d'ajout de tâche
const nomTache = $("#form1").get(0);  //sélecteur de l'input nom de la tâche
const priorite = $("#priorite").get(0); //sélecteur de l'input priorité de la tâche
const description = $("#description").get(0);   //sélecteur de l'input description de la tâche
var tbodyRef = document.getElementById("table"); //sélecteur du tableau

/*************************************
* **************Fonctions************
* ***********************************/
/*ajout de rang*/
const lireObjet = function(key){    //fonction pour récupérer la tache enregistré comme string sous forme d'objet
    var value = this.localStorage.getItem(localStorage.key(key));
    return value && JSON.parse(value);
}

//compare les dates
const dateInPast = function(firstDate, secondDate) {
    if (firstDate <= secondDate) {
        
      return true;
    }
    
    return false;
  };

//fonciont qui lis le local storage et créé de nouveaux élément dans le tableau pour les afficher
const ajoutTache = function(){
    for(let i = 0; i < localStorage.length; i++){
        var taskName = document.createTextNode(lireObjet(i).nom); //text qui récupère le non de la tache
        var taskDate = document.createTextNode(lireObjet(i).echeance); //text qui récupère la date de limite de la tache
        var className = lireObjet(i).nom.replace(/\s+/g, '-'); //récupère le nom de la tache et remplace les espaces par des -
        var newRow = tbodyRef.insertRow(); //nouvelle ligne dans le tableau
        var newCell1 = newRow.insertCell(); //nouvele celule dans le tableau
        var newCell2 = newRow.insertCell(); //nouvele celule dans le tableau
        var newCell3 = newRow.insertCell(); //nouvele celule dans le tableau
        const switchBtn = document.createElement("div"); //créer un élément <div> pour le switch
        const switchBtn2 = document.createElement("input"); //créer un élément <input> pour le switch
        const switchBtn3 = document.createElement("label"); //créer un élément <label> pour le switch
        const btnTitre = document.createElement("button"); // créer un élément bouton pour l'affichage du titre pour la prise en compte du tooltip
        newCell2.classList.add(className); //ajoute le nom de la tache modifié comme classe 
        btnTitre.classList.add(className, "titre", "btn");
        switchBtn.classList.add("form-check", "form-switch");
        switchBtn2.classList.add("form-check-input");
        switchBtn2.classList.add(className);
        switchBtn3.classList.add("form-check-label");
        btnTitre.setAttribute("type", "buton");
        btnTitre.setAttribute("data-toggle", "tooltip");
        btnTitre.setAttribute("data-bs-placement", "top");
        btnTitre.title = JSON.stringify(lireObjet(i).description);
        switchBtn2.setAttribute("type", "checkbox");
        switchBtn2.setAttribute("role", "switch");
        switchBtn3.setAttribute("for", "flexSwitchCheckChecked");
        newCell3.appendChild(switchBtn);
        switchBtn.appendChild(switchBtn2, switchBtn3);
        newCell1.appendChild(btnTitre);
        btnTitre.appendChild(taskName);
        newCell2.appendChild(taskDate);
        // couleurs de priorités
        var priorite = lireObjet(i).priorite;
        if(priorite == "eleve"){
            btnTitre.classList.add("btn-danger");
        }
        else if(priorite == "basse"){
            btnTitre.classList.add("btn-success");
        }
        else{
            btnTitre.classList.add("btn-secondary");
        }
        //taches en retard
         const today = new Date();
         const todayDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        if(dateInPast(lireObjet(i).echeance, todayDate)){
            const span = document.createElement("span");
            const retard = document.createTextNode("EN RETARD");
            newCell1.appendChild(span);
            span.appendChild(retard);
            span.classList.add("ms-3", "fs-5", "fw-bold", "text-danger");
        };
        
    }
}


  


/* Active les tooltips bootstrap */
$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});
/*Date picker*/
$("#datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    dayNames: [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ],
    dayNamesShort: [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ],
    dayNamesMin: [ "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa" ],
    monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
})

//fonction pour rafraichir et activer le datepicker 
$( function() {   
    $( "#datepicker" ).datepicker();
} );




/*****************************************
* ************Executions*****************
* ***************************************/
$("#ajouterTache").click( ajoutTache());

$("#ajouterTache").click( function(){  //click sur bouton ajouter à la liste
    
    const nouvelleTache = new Task(nomTache.value, description.value, date.value, priorite.value, false);   //créer une nouvelle instance de l'objet Task 
    if(nouvelleTache.nom != "" && nouvelleTache.echeance != ""){
        localStorage.setItem(nouvelleTache.nom, JSON.stringify(nouvelleTache)); //ajoute la tache à la mémoire local pour garder les informations utilise JSON.stringify pour socker lobjet en tant que string
    }
})


//eventlistener checkbox pour barré les taches terminés
var checkbox = document.querySelectorAll(".form-check-input");  
var listASup = [];
for(let i = 0; i < checkbox.length; i++ ){

    checkbox[i].addEventListener("change", ()=>{
        var target = document.querySelectorAll("." + lireObjet(i).nom.replace(/\s+/g, '-'));
        for(let j = 0 ; j < target.length; j++){
            target[j].classList.toggle("barre");
            
        }
        listASup.push(lireObjet(i).nom);
    })
}
//eventlistener suppression des taches terminés
$("#suprimmerTache").click( function(){
    for(let i = 0; i < listASup.length; i++ ){
        localStorage.removeItem(listASup[i]);
    }
})



/*Noé*/
let saveButton, inputPriorite, tBody, tdPrio, niveauPrio, inputTitre, finButton, delButton;
/**
** FONCTIONS **
**/
const tache =(e) =>{
    e.preventDefault()
    const prio = inputPriorite.value;
    const titre = document.getElementById("form1");
    const descriptionValue = document.getElementById('textArea');
    const dateTache = document.getElementById('datepicker');
    const classTask = titre.value.replace(/\s+/g, '-');
    const idTask = titre.value.replace(/\s+/g, '-') + "-id";
    const nvlleTache = new Task(titre.value, prio, descriptionValue.value, dateTache.value)
    const setStorage = () => localStorage.setItem(titre.value, JSON.stringify(nvlleTache));
    let className;
    if (prio === "Elevee") {
        className = "bg-danger"
    } else if (prio === "Normale") {
        className = "bg-secondary"
    } else if (prio === "Faible") {
        className ="bg-success"
    }
    setStorage(nvlleTache);
    tBody.innerHTML += `
    <tr>
    <td class="${classTask}"> ${titre.value} </td>
    <td class="${classTask}">${dateTache.value}</td>
    <td class="align-middle">
    <h6 class="mb-0"><span class="badge ${className}"> ${prio} </span></h6> 
    </td>
    <td><input class="form-check-input" type="checkbox" id="${idTask}"></td>
    </tr>
    `
}
/**
** EXECUTION **
**/
inputPriorite = document.getElementById('prioriteSelect')
inputTitre = document.getElementById('titre')
finButton = document.getElementById('fin')
delButton = document.getElementById('del')
saveButton = document.getElementById('save')
tBody = document.getElementById('tbody')
saveButton.addEventListener('click', tache)

/*Mel*/
var checkbox = document.querySelectorAll(".form-check-input");
for(let i = 0; i < checkbox.length; i++){
    checkbox.addEventListener('change', function() {
        var target = document.querySelectorAll("." + JSON.parse(localStorage.getItem(localStorage.key(i)))).titre.replace(/\s+/g, '-');
        for(let j = 0 ; j < target.length; j++){
                        target[j].classList.toggle("barre");
                       
                   }
        console.log(target);
      });
    
}
//************************************** */
// var checkbox = document.querySelectorAll(".form-check-input");  
// var listASup = [];
// for(let i = 0; i < checkbox.length; i++ ){

//     checkbox[i].addEventListener("change", ()=>{
//         var target = document.querySelectorAll("." + lireObjet(i).nom.replace(/\s+/g, '-'));
//         for(let j = 0 ; j < target.length; j++){
//             target[j].classList.toggle("barre");
            
//         }
//         listASup.push(lireObjet(i).nom);
//     })
// }
/********************************************** */

/*Benoit*/
/*Variables*/
/*Fonctions*/
/*Executions*/

/*Aurélie*/
//Chargement de la page
// Chargement de la page
window.addEventListener('load', () =>  {

    // Récupération du local storage
    for(let i = 0; i < localStorage.length; i++){
        const storage = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(storage);
        
        let className;
        if (storage.priorite === "Elevee") {
            className = "bg-danger"
        } else if (storage.priorite === "Normale") {
            className = "bg-secondary"
        } else if (storage.priorite === "Faible") {
            className ="bg-success"
        }
        // Raffraichissement de la liste
        const classTask = storage.titre.replace(/\s+/g, '-');
        const idTask = storage.titre.replace(/\s+/g, '-') + "-id";
        tBody.innerHTML += `
        <tr>
        <td class="${classTask}"> ${storage.titre} </td>
        <td class="${classTask}">${storage.dateLimite}</td>
        <td class="align-middle">
        <h6 class="mb-0"><span class="badge ${className}"> ${storage.priorite} </span></h6> 
        </td>
        <td><input class="form-check-input" type="checkbox" id="${idTask}"></td>
        </tr>
        `
    }    
})


/*Variables*/

/*Fonctions*/
/*Executions*/
const date = $("#datepicker").get(0);  //selecteur pour le date picker
const ajouterTache = $("#ajouterTache").get(0); //selecteur pour le bouton d'ajou de tâche
/*Fonctions*/

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

/*Executions*/
$("#ajouterTache").click(function(){  //click sur bouton ajouter à la liste
    const nouvelleTache = new Task(12, "test", date.value, "haute");   //créer une nouvelle instance de l'objet Task 
    localStorage.setItem(nouvelleTache.nom, JSON.stringify(nouvelleTache)); //ajoute la tache à la mémoire local pour garder les informations utilise JSON.stringify pour socker lobjet en tant que string
})
const lireObjet = function(key){    //fonction pour récupérer la tache enregistré comme string sous forme d'objet
    var value = this.localStorage.getItem(key);
    return value && JSON.parse(value);
}


/*
    Simone Cecire
*/

const elements = document.getElementById("elements");
const swapButton = document.getElementById("swapButton");

const selectedElementTemplate = '<tr><td>#VAL</td><td><input type="checkbox" id="checkbox_#ID" class="checkbutton form-check-input"></td></tr>';

let selectedCheckButtons = [];
const list = [1, 2, 3, 4, 5];

swapButton.onclick = () => {
    if (selectedCheckButtons.length === 2) { // sono selezionabili al massimo due elemnti alla volta
        swap(list, selectedCheckButtons[0], selectedCheckButtons[1]);
        render(list);
    }
};

const swap = (list, pos1, pos2) => {
    if (pos1 >= 0 && pos1 < list.length && pos2 >= 0 && pos2 < list.length) { // controllo in caso i valori vadano fuori dalla dimensione dell'array
        const mid = list[pos2];
        list[pos2] = list[pos1];
        list[pos1] = mid;
    }
};

const render = (list) => {
    let newHtml = "<thead><td>Elemento</td><td>Seleziona</td></thead>";
    
    list.forEach(e => {
        newHtml += selectedElementTemplate.replace("#VAL", e).replace("#ID", list.indexOf(e));
    });
    elements.innerHTML = newHtml;

    const checkButtons = document.querySelectorAll(".checkbutton"); // vengono recuperate tutte le check box
    selectedCheckButtons = [];

    checkButtons.forEach(e => {
        e.onclick = () => {        
            const id = parseInt(e.id.replace("checkbox_", ""));

            if (selectedCheckButtons.length < 2 && selectedCheckButtons.indexOf(id) < 0) { // se ci sono meno di due check box nell'array e la check box selezionata non è già presente
                selectedCheckButtons.push(id); // aggiungo all'array l'id della check box selezionata
                console.log(1)
            }
            else if (selectedCheckButtons.indexOf(id) >= 0) { // se la check box selezionata è già presente
                selectedCheckButtons.splice(selectedCheckButtons.indexOf(id), 1); // viene rimossa dall'array
                console.log(2)
           
            }
            else { // in ogni altro caso
                e.checked = false; // non è possibile selezionare la check box (viene deselezionata in automatico)
                console.log(3)
            
            }
            console.log(selectedCheckButtons)
        };
    });
};

render(list);
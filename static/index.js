if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', calculate);

}



async function calculate(event) {
    const calculateBtn = event.target;
    const food = document.getElementById('food-input').value;
    const api_url = `https://api.edamam.com/api/food-database/v2/parser?app_id=c8b889bd&app_key=1cec0da810f8eb1e6a3dfbbb617510a5&ingr=${food}&nutrition-type=logging`;

    const dict = await fetchApi(api_url);
    createTable(dict)
    
}

async function fetchApi(url) {
    /* fetching data */

    const response = await fetch(url);
    const data = await response.json();
     

    

    // parsing hints from json
    const hints = data.hints;
    
    // label: {nutrients}
    const dict = {}

    // iterating over json data and organizing in label: {nutrients} pair
    let i = 0;
    for (const hint of hints) {  
        try {
            let food = hint.food;
            let measures = hint.measures;
            let servingType = measures[i].label;
            let weight = measures[i].weight;
            let label = food.label;
            let nutrients = food.nutrients;
            let category = food.category;
             

            dict[label] = [nutrients, {'measures': servingType}, {'weight': weight}, {'category': category}];
        } catch (e) {
            console.log(e);
        }
        i++;
    }
    console.log(dict);
    return dict;
}


function createTable(dict) {
    const table = document.getElementsByClassName('boostrap4_dark')[0];
    table.innerHTML = "";
    
    for (let key in dict) {

     let row = table.insertRow(-1); // We are adding at the end

      // Create table cells
      for (let i = 0; i < 6; i++) {
        
      }
      let c1 = row.insertCell(0);
      let kcal = row.insertCell(1);
      let c2 = row.insertCell(2);
      let c3 = row.insertCell(3);
      let c4 = row.insertCell(4);
      let c5 = row.insertCell(5);
      let c6 = row.insertCell(6);
      c1.className = 'key';
      kcal.className = 'subtext'
      c2.className = 'subtext';
      c3.className = 'subtext';
      c4.className = 'subtext';

   
    //   Add data to c1 and c2
      c1.innerText = key;
      kcal.innerText = dict[key][0]['ENERC_KCAL'] + "kcal";
      c2.innerText = dict[key][1]['measures'];
      c3.innerText = Math.round(dict[key][2]['weight'] * 100) / 100 + "g";
      c4.innerText = dict[key][3]['category']
      c5.innerHTML = `
      <button class="btn-detail" type="button">See Details</button>`
      c6.innerHTML = `
      <button class="btn-item-add" id="btn-item-add" type="button">Add</button>`
    }
    let detailBtn = document.getElementsByClassName('btn-detail');
    for (let i = 0; i < detailBtn.length; i++) {
        detailBtn[i].addEventListener('click', detailBtnClick);
    }
    
}

function detailBtnClick(event) {
    const btn = event.target;


    //show the modal
    const modal = document.getElementById('modal');
    modal.showModal();
}





if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', calculate);

}

var globalDict = {};

async function calculate(event) {
    const calculateBtn = event.target;
    const food = document.getElementById('food-input').value;
    const api_url = `https://api.edamam.com/api/food-database/v2/parser?app_id=c8b889bd&app_key=1cec0da810f8eb1e6a3dfbbb617510a5&ingr=${food}&nutrition-type=logging`;

    const dict = await fetchApi(api_url);
    createTable(dict);
    globalDict = dict;
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
    
      let c1 = row.insertCell(0);
      let c5 = row.insertCell(1);
      let c6 = row.insertCell(2);
      c1.className = 'key';

   
    //   Add data to c1 and c2
      c1.innerHTML = `<tr><td>${key} <span class="subtext">${dict[key][0]['ENERC_KCAL']} kcal</span> <span class="subtext">${dict[key][1]['measures']}</span> <span class="subtext">${Math.round(dict[key][2]['weight'] * 100) / 100}g</span><span class="subtext">${dict[key][3]['category']}</span></td></tr>`;

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

    // fetching the 'food label' value
    const tr = btn.closest('tr');
    const key = tr.getElementsByClassName('key')[0].innerText;

    const chartDoughnut = document.getElementById('myChart');
    
    console.log(chartDoughnut);
    
    // chartjs plugins
    const doughnutCentreText = {
        id: 'doughnutCentreText',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart; 
            ctx.save

            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = 'bold 15px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle';
            ctx.fillText(globalDict[key][0]['ENERC_KCAL'] + "kcal", xCoor, yCoor); 

        }
    } 

    // creating the chart
    const chart = new Chart(chartDoughnut, {
        type: 'doughnut',
        data: {
            labels: [
                'Protein',
                'Fat',
                'Carbohydrate'
              ],
            datasets: [{
                label: 'Nutritional value: ',
                data: [globalDict[key][0]['PROCNT'], globalDict[key][0]['FAT'], globalDict[key][0]['CHOCDF']],
                backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
                }]
                
        },
        options: {
            borderWidth: 12,
            borderRadius: 2,
            hoverBorderWidth: 0,
            plugins: {
                legend: {
                    display: false,
                }
            },
            },
            plugins: [doughnutCentreText]
        
    });

    // calculate nutrition% of total 
    const totalGrams = globalDict[key][0]['PROCNT'] + globalDict[key][0]['CHOCDF'] + globalDict[key][0]['FAT']
    const proteinPercent = parseFloat((globalDict[key][0]['PROCNT'] / totalGrams) * 100).toFixed(2);
    const carbsPercent = parseFloat((globalDict[key][0]['CHOCDF'] / totalGrams) * 100).toFixed(2);
    const fatPercent = parseFloat((globalDict[key][0]['FAT'] / totalGrams) * 100).toFixed(2);

    // macro-nutrients' amount
    document.getElementById('proteinAmt').innerText = globalDict[key][0]['PROCNT'] + "g";
    document.getElementById('carbsAmt').innerText = globalDict[key][0]['CHOCDF'] + "g";
    document.getElementById('fatAmt').innerText = globalDict[key][0]['FAT'] + "g";

    // percent of total macro-nutrients
    document.getElementById('percProtein').innerText = proteinPercent + "%";
    document.getElementById('percCarbs').innerText = carbsPercent + "%"; 
    document.getElementById('percFat').innerText = fatPercent + "%";

    // food as title of dialog window
    document.getElementById('foodTitleDialog').innerText = key;

    // default food serving
    document.getElementById('defaultOption').innerText = Math.round(globalDict[key][2]['weight'] * 100) / 100 + "g";



    //show the modal
    const modal = document.getElementById('modal');
    modal.showModal();
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', e => {
        modal.close();
        chart.destroy();
    })
    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          modal.close();    
          chart.destroy();
        }
      })
    
}




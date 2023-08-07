if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', calculate);
}

var globalDict = {}

async function calculate() {
    const inputBox = document.getElementById('food-input')

    const activity = inputBox.value;

    api_url = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`
    const dict = await fetchActivity(api_url)
    
    globalDict = dict
    createTable(dict)
}

async function fetchActivity(request) {
    const response = await fetch(request, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'Jgs7o2Cf6HCPoJ3yfWnqIg==jWCKf8EOyBPiAU5m'
        }
    })
    const data = await response.json();
    return data
}

async function createTable(dict) {
    const table = document.getElementsByClassName('boostrap4_dark')[0];
    table.innerHTML = "";
    
    for (let i = 0; i < dict.length; i++) {

     let row = table.insertRow(-1); // We are adding at the end

      // Create table cells
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);

      let calorie_per_30min = dict[i]['calories_per_hour'] / 2;
      //   Add data to c1 and c2
      c1.innerHTML = `<td><span class="head" id=${i}>${dict[i]['name']}</span></td>`
      c2.innerHTML = `<td><span class="duration">30min</span><span class="calorie_per_30min">-${calorie_per_30min}Kcal</span></td>`
      c3.innerHTML = `
      <button class="btn-item-add btn-table-style" type="button">Add</button>`
    }
    
    
    const addBtn = document.getElementsByClassName('btn-item-add');
    for (let i = 0; i < addBtn.length; i++) {
        addBtn[i].addEventListener('click', showDetails);
    }
}

function showDetails(event) {
    const btn = event.target
    const tr = btn.closest('tr')
    const index = tr.getElementsByClassName('head')[0].id 
    const name = tr.getElementsByClassName('head')[0].innerText

    // effort level
    const effortLevel = name.split(',').pop()
    
    const effortSpanTag = document.getElementById('effortlevel')

    effortSpanTag.innerText = ` ${effortLevel}`

    // duration
    duration = 30

    const durationElement = document.getElementById('duration');

    durationElement.value = duration


    //energy burned
    energy_burned = globalDict[index]['calories_per_hour'] / 2

    const energy_burned_element = document.getElementById('energyBurned')

    energy_burned_element.value = energy_burned;

    // change
    durationElement.addEventListener('change', () => {
        duration = durationElement.value
        energy_burned = (parseInt(energy_burned) / 30) * duration
        energy_burned_element.value = energy_burned
        console.log(durationElement.value)
    })

    energy_burned_element.addEventListener('change', () =>{
        energy_burned = energy_burned_element.value
    })

    const dataDiary = {
        "activity_done": name,
        "calories_burned": energy_burned
    }



    // show modal
    const modal = document.getElementById('modal');
    modal.showModal();

    // add food button
    addFoodBtn = document.getElementById('btn-dialogAddFood')
    addFoodBtn.addEventListener('click', function() {
        sessionDiaryFunc(dataDiary)
    })

    // close button
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', (e) => {
        modal.close();
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
        }
      })
}

function sessionDiaryFunc(dataDiary) {
    
    console.log(dataDiary)
    
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
        }
    }

    xhr.open("POST", "activityentry")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(JSON.stringify(dataDiary))
}


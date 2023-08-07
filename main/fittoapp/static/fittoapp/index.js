if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    const calorieSummary = document.getElementsByClassName('calorie-summary')
    food_data[0]['fields'].energy > 0 ? createCalorieChart() : createEmptyCalorieChart()
    createCalorieBurnedChart();
    createCalorieRemainingChart();
    createProgressChart();
    // createProgressBars();
    progressBarFill();
    avgValuesFill();
    console.log(avg_data)
}

function avgValuesFill() {
    avgEnergy = document.getElementsByClassName('kcal')[0]
    avgFat = document.getElementsByClassName('gm1')[0]
    avgCarbs = document.getElementsByClassName('gm')[0]
    avgProtein = document.getElementsByClassName('gm2')[0]
    avgFiber = document.getElementsByClassName('gm3')[0]
    avgBreakfast = document.getElementsByClassName('br1')[0]
    avgLunch = document.getElementsByClassName('br2')[0]
    avgDinner = document.getElementsByClassName('br3')[0]

    console.log(avgEnergy)

    avgEnergy.innerText = avg_data['avgEnergy']['energy__avg']
    avgFat.innerText = avg_data['avgFat']['fat__avg']
    avgProtein.innerText = avg_data['avgProtein']['protein__avg']
    avgCarbs.innerText = avg_data['avgCarbs']['carbs__avg']
    avgFiber.innerText = avg_data['avgFiber']['fiber__avg']
    avgBreakfast.innerText = avg_data['avgBreakfast']['breakfast__avg']
    avgLunch.innerText = avg_data['avgLunch']['lunch__avg']
    avgDinner.innerText = avg_data['avgDinner']['dinner__avg']
}

function progressBarFill() {
    // bar for width
    energyBar = document.getElementById('energyprogress')
    proteinBar = document.getElementById('proteinprogress')
    carbsBar = document.getElementById('carbsprogress')
    fatBar = document.getElementById('fatprogress')

    // % of total 
    energy = (food_data[0]['fields'].energy / 2000) * 100;
    protein = (food_data[0]['fields'].protein / 150) * 100;
    carbs = (food_data[0]['fields'].carbs / 200) * 100;
    fat = (food_data[0]['fields'].fat / 110) * 100;

    energyBar.style.width = energy <= 100 ? `${energy}%` : '100%'
    proteinBar.style.width = protein <= 100 ? `${protein}%` : '100%'
    carbsBar.style.width = carbs <= 100 ? `${carbs}%` : '100%'
    fatBar.style.width = fat <= 100 ? `${fat}%` : '100%'

    document.getElementById('energytooltip').innerText = `${energy.toFixed(0)}%` || 
    console.log(document.getElementById('energytooltip').innerText)
    document.getElementById('proteintooltip').innerText = `${protein.toFixed(0)}%` || '0%'
    document.getElementById('carbstooltip').innerText = `${carbs.toFixed(0)}%` || '0%'
    document.getElementById('fattooltip').innerText = `${fat.toFixed(0)}%` || '0%'

    document.getElementById('energynumbers').innerText = `${food_data[0]['fields'].energy}/2000Kcal` || `0/200Kcal`
    document.getElementById('proteinnumbers').innerText = `${food_data[0]['fields'].protein}/150g` || `0/150g`
    document.getElementById('carbsnumbers').innerText = `${food_data[0]['fields'].carbs}/200g` || `0/200g`
    document.getElementById('fatnumbers').innerText = `${food_data[0]['fields'].fat}/110g` || `0/110g`
}

function createEmptyCalorieChart() {
    const calorieDoughnutChart = document.getElementById('calorieChart');

    const doughnutCentreText = {
        id: 'doughnutCentreText',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart; 
            ctx.save

            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = 'bold 15px sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle';
            ctx.fillText(food_data[0]['fields'].energy + " kcal", xCoor, yCoor); 

        }
    }

    const chart = new Chart(calorieDoughnutChart, {
        type: 'doughnut',
        data: {
            labels: [
                '0KCAL',
              ],
            datasets: [{
                label: 'Nutritional value: 0',
                data: ['100'],
                backgroundColor: [
                '#9da0ad'
                ],
                hoverOffset: 4
                }]
                
        },
        options: {
            borderWidth: 0,
            borderRadius: 2,
            hoverBorderWidth: 0,
            plugins: {
                legend: {
                    display: false,
                }
            },
            cutout: 50,
            },
            plugins: [doughnutCentreText],
        
    });
}

function createCalorieChart() {

    const calorieDoughnutChart = document.getElementById('calorieChart');

    const doughnutCentreText = {
        id: 'doughnutCentreText',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart; 
            ctx.save

            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = 'bold 15px sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle';
            ctx.fillText(food_data[0]['fields'].energy + " kcal", xCoor, yCoor); 

        }
    }

    const chart = new Chart(calorieDoughnutChart, {
        type: 'doughnut',
        data: {
            labels: [
                'Protein',
                'Fat',
                'Carbohydrate'
              ],
            datasets: [{
                label: 'Nutritional value: ',
                data: [food_data[0]['fields'].protein, food_data[0]['fields'].fat, food_data[0]['fields'].carbs],
                backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
                }]
                
        },
        options: {
            borderWidth: 0,
            borderRadius: 2,
            hoverBorderWidth: 0,
            plugins: {
                legend: {
                    display: false,
                }
            },
            cutout: 50,
            },
            plugins: [doughnutCentreText],
        
    });
}

function createCalorieBurnedChart() {

    const calorieBurnedDoughnutChart = document.getElementById('calorieBurnedChart');

    const doughnutCentreText = {
        id: 'doughnutCentreText',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart; 
            ctx.save

            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = 'bold 15px sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle';
            ctx.fillText(bmr_data[0]['fields']['tdee'] + " kcal", xCoor, yCoor); 

        }
    }

    const DoughnutChart = new Chart(calorieBurnedDoughnutChart, {
        type: 'doughnut',
        data: {
            labels: [
                'Activity',
                'BMR',
              ],
            datasets: [{
                label: 'Nutritional value: ',
                data: [bmr_data[0]['fields']['tdee'] - bmr_data[0]['fields']['bmr'], bmr_data[0]['fields']['bmr']],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)'
                 ],
                hoverOffset: 4
                }]
                
        },
        options: {
            borderWidth: 0,
            borderRadius: 2,
            hoverBorderWidth: 0,
            plugins: {
                legend: {
                    display: false,
                }
            },
            cutout: 50,
            },
            plugins: [doughnutCentreText],
        
    });
}

function createCalorieRemainingChart() {
    const calRemainingChart = document.getElementById('calorieRemainingChart')

    const doughnutCentreText = {
        id: 'doughnutCentreText',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart; 
            ctx.save

            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = 'bold 15px sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle';
            ctx.fillText(bmr_data[0]['fields']['daily_intake'] - food_data[0]['fields'].energy + " kcal", xCoor, yCoor); 

        }
    }


    const data = {
        labels: ['Consumed', 'Remaining'],
        datasets: [{
            label: 'Consumed, Remaining',
            data: [food_data[0]['fields'].energy, bmr_data[0]['fields']['daily_intake'] - food_data[0]['fields'].energy],
            backgroundColor: [
                '#f6eded',
                '#9da0ad'
            ]
        }]
    };

    const config = {
        type: 'doughnut',
        data,
        options: {
            borderWidth: 0,
            borderRadius: 2,
            hoverBorderWidth: 0,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: 50,
        },
        plugins: [doughnutCentreText],  
    }

    const chart = new Chart(
        calRemainingChart, 
        config
        );

}

function createProgressBars() {
    const progressBar = document.getElementById('macroBarChart');

    const data   = {
        labels: ['Energy', 'Protein', 'Carbs', 'Fat'],
        datasets: [{
          label: 'Energy',
          data: [food_data[0]['fields'].energy],
          borderColor: [
            'rgba(255, 26, 104, 0.2)'
          ],
          backgroundColor: [
            'rgba(255, 26, 104, 1)'
          ],
          borderWidth: 0.1,
          barPercentage: 0.3,
          borderSkipped: false,
          borderRadius: 10,
          categoryPercentage: 0.6
        },
        {
            label: 'Protein',
            data: [food_data[0]['fields'].protein],
            borderColor: ['rgba(54, 162, 235, 0.2)'],
            backgroundColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 0.1,
            barPercentage: 0.3,
            borderSkipped: false,
            borderRadius: 10,
            categoryPercentage: 1
        },
        {
            label: 'Carbs',
            data: [food_data[0]['fields'].carbs],
            borderColor: ['rgba(255, 206, 86, 0.2)'],
            backgroundColor: ['rgba(255, 206, 86, 1)'],
            borderWidth: 0.1,
            barPercentage: 0.3,
            borderSkipped: false,
            borderRadius: 10,
            categoryPercentage: 1
        },
        {
            label: 'Fat',
            data: [food_data[0]['fields'].fat],
            borderColor: ['rgba(75, 192, 192, 0.2)'],
            backgroundColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 0.1,
                barPercentage: 0.3,
                borderSkipped: false,
                borderRadius: 10,
                categoryPercentage: 1
        }   

    ]
      };

      
      
      //progress bar plugin
      const progressBarPlugin = {
        id: 'progressBarPlugin',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: {top, bottom, left, right, width, height}, 
            scales: {x, y} } = chart;   

            ctx.save();
            
            //setting labels of macro nutrients
            for (let i = 0; i < data.datasets.length; i++ ){
                data.datasets[i].data.forEach((datapoint, index) => {
                    const fontSizeLabel = 12;
                    ctx.font = `16px sans-serif`;
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);
    
    
                    // value text 
                    const fontSizeDatapoint = 12;
                    ctx.font = `bolder ${fontSizeDatapoint} sans-serif`;
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(datapoint, right - 5, y.getPixelForValue(index) - fontSizeDatapoint - 5);
    
                })
            }
            


            // //bg color of progress bar
            
            chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
                // shape
                const barHeight =height / data.labels.length * data.datasets[0].barPercentage * data.datasets[0].
                categoryPercentage;
    
                ctx.beginPath();
                ctx.strokeStyle= data.datasets[0].borderColor[index];
                ctx.fillStyle = data.datasets[0].borderColor[index];
                ctx.lineWidth = barHeight * 0.8;
                ctx.lineJoin = 'round'; 
                ctx.strokeRect(left + 2.5, datapoint.y, width - 5, 1);
            }) 
        }
    }
  
      // config 
      const config = {
        type: 'bar',
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              legend: {
                  display: false
              }
            },
            scales: {
              x: {
                  beginAtZero: true,  
                  grid: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    display: false
                  }
                },
              y: {
                beginAtZero: true,
                grid: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false
                }
              }
            }
          },
          plugins: [progressBarPlugin]
      };
  
      // render init block
      const progressBarChart = new Chart(
        progressBar,
        config
      );
}

function createProgressChart() {
    const getProgressChart = document.getElementById('progressChart');

    const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
    datasets: [{
        label: 'My First Dataset',
        data: [0, 40, 59, 80, 81, 56, 55, 65],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
               x: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      drawBorder: false
                    },
                    ticks: {
                      display: true
                    }
                  }, 
                y: {
                    beginAtZero: true,
                    grid: {
                      display: false,
                      drawBorder: false
                    },
                    ticks: {
                      display: false
                    }
                  }
            }
        }
      };

    const progressChart = new Chart(getProgressChart, config);

}

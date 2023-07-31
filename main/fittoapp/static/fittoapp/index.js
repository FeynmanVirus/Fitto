if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

const nice = 'nice';

function ready() {
    const calorieSummary = document.getElementsByClassName('calorie-summary')
    createCalorieChart();
    createCalorieBurnedChart();
    createCalorieRemainingChart();
    createProgressChart()
    createProgressBars();
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
            ctx.fillText("kcal", xCoor, yCoor); 

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
                data: [20, 30, 40],
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
            ctx.fillText("kcal", xCoor, yCoor); 

        }
    }

    const DoughnutChart = new Chart(calorieBurnedDoughnutChart, {
        type: 'doughnut',
        data: {
            labels: [
                'Protein',
                'Fat',
                'Carbohydrate'
              ],
            datasets: [{
                label: 'Nutritional value: ',
                data: [10, 80, 20],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)'
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
            ctx.fillText("kcal", xCoor, yCoor); 

        }
    }


    const data = {
        labels: ['Remaining'],
        datasets: [{
            label: 'Remaining',
            data: ['50', '200'],
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
          label: 'Weekly Sales',
          data: [4, 12, 6, 9],
          borderColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          backgroundColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 0.1,
          barPercentage: 0.3,
          borderSkipped: false,
          borderRadius: 10,
          categoryPercentage: 0.6
        }]
      };

      //progress bar plugin
      const progressBarPlugin = {
        id: 'progressBarPlugin',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: {top, bottom, left, right, width, height}, 
            scales: {x, y} } = chart;   

            ctx.save();

            //setting labels of macro nutrients
            data.datasets[0].data.forEach((datapoint, index) => {
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
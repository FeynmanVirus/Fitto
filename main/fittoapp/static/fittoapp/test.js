// function createChart() {

//     const progressBarPlugin = {
//         id: 'progressBarPlugin',
//         beforeDatasetsDraw(chart, args, pluginOptions) {
//             const { ctx, data, chartArea: {top, bottom, left, right, width, height}, 
//             scales: {x, y} } = chart;   
  
//             ctx.save();
  
//             //setting labels of macro nutrients
//             for (let i = 0; i < data.datasets.length; i++) {
//                 data.datasets[i].data.forEach((datapoint, index) => {
//                     const fontSizeLabel = 12;
//                     ctx.font = `16px sans-serif`;
//                     ctx.fillStyle = 'white';
//                     ctx.textAlign = 'left';
//                     ctx.textBaseline = 'middle';
//                     ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);
      
      
//                     // value text 
//                     const fontSizeDatapoint = 12;
//                     console.log(datapoint)
//                     console.log(index)
//                     ctx.font = `bolder ${fontSizeDatapoint} sans-serif`;
//                     ctx.fillStyle = 'white';
//                     ctx.textAlign = 'right';
//                     ctx.textBaseline = 'middle';
//                     ctx.fillText(datapoint, right - 5, y.getPixelForValue(index) - fontSizeDatapoint - 5);
                
//                 })
//             }
            
            
  
  
//             // //bg color of progress bar
//             chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
//                 // shape
//                 const barHeight =height / data.labels.length * data.datasets[0].barPercentage * data.datasets[0].
//                 categoryPercentage;
    
//                 ctx.beginPath();
//                 for (let i = 0; i < data.datasets.length; i++) {
//                   ctx.strokeStyle= data.datasets[i].borderColor[index];
//                   ctx.fillStyle = data.datasets[i].borderColor[index];
//                   ctx.lineWidth = barHeight * 0.8;
//                   ctx.lineJoin = 'round'; 
//                   ctx.strokeRect(left + 2.5, datapoint.y, width - 5, 1);
//                 }
//             }) 
//         }
//     }


//     // original data
//     const data = {
//         labels: ['Energy', 'Protein', 'Carbs', 'Fat'],
//         datasets: [
//             {
//                 label: 'Energy',
//                 data: [food_data[0]['fields'].energy],
//                 customMax: 2000,
//                 borderColor: 'rgba(255, 26, 104, 0.2)',
//                 backgroundColor: 'rgba(255, 26, 104, 1)'
//             },
//             {
//                 label: 'Protein',
//                 data: [food_data[0]['fields'].protein],
//                 customMax: 150,
//                 borderColor: 'rgba(54, 162, 235, 0.2)',
//                 BackgroundColor: 'rgba(54, 162, 235, 1)'
//             },
//             {
//                 label: 'Carbs',
//                 data: [food_data[0]['fields'].carbs],
//                 customMax: 250,
//                 borderColor: 'rgba(255, 206, 86, 0.2)',
//                 BackgroundColor: 'rgba(54, 162, 235, 1)'
//             },
//             {
//                 label: 'Fat',
//                 data: [food_data[0]['fields'].fat],
//                 customMax: 160,
//                 borderColor: 'rgba(75, 192, 192, 0.2)',
//                 BackgroundColor: 'rgba(75, 192, 192, 1)'
//             },
                
//         ]
//     }
  
//       // original config 
//       const config = {
//         type: 'bar',
//         data,
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             indexAxis: 'y',
//             plugins: {
//               legend: {
//                   display: false
//               }
//             },
//             scales: {
//               x: {
//                   beginAtZero: true,  
//                   grid: {
//                     display: false,
//                     drawBorder: false
//                   },
//                   ticks: {
//                     display: false
//                   }
//                 },
//               y: {
//                 beginAtZero: true,
//                 grid: {
//                   display: false,
//                   drawBorder: false
//                 },
//                 ticks: {
//                   display: false
//                 }
//               }
//             }
//           },
//           plugins: [progressBarPlugin]
//       };

//       const chart = new Chart(document.getElementById('testChart'),
//       config)

// }

// createChart()
const myWeatherChart = (temp, days, beginYAt)=>{
    var ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Weather Forecast',
                data: temp,
                backgroundColor: [
                    'rgba(87, 21, 93, 1)',

                ],
                borderColor: [
                    'rgba(87, 21, 93, 1)'
                ],
                borderWidth: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {

                y: {
                    beginAtZero: beginYAt
                }
            }
        }
    });
};



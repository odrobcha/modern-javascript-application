const builtWeatherChart = (temp, days, beginYAt)=>{
    var ctx = document.getElementById('weatherChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: `Temperature, C`,
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
                    display: true,

                }
            },
            scales: {
                y: {
                    beginAtZero: beginYAt,

                }
            }
        }
    });
};



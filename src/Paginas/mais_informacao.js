


const monthSelector = document.getElementById("month-selector");
const temperatureCtx = document.getElementById("temperatureChart").getContext("2d");
const fallCtx = document.getElementById("fallChart").getContext("2d");

// Prepare temperature chart
const temperatureData = {
    labels: [], // Fetch labels from NestJS backend
    datasets: [{
        label: 'Temperatura (ºC)',
        data: [], // Fetch data from NestJS backend
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderColor: 'white',
    }]
};

const temperatureChart = new Chart(temperatureCtx, {
    type: 'line',
    data: temperatureData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Temperatura (ºC)',
                    color: 'black',
                    font: {
                        size: 16
                    }
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'black'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Dia do Mês',
                    color: 'black',
                    font: {
                        size: 16
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'black'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                borderRadius: 8,
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y;
                        return `Temperatura: ${value}ºC`;
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false,
                animationDuration: 200
            }
        }
    }

});

// Prepare fall chart
const fallData = {
    labels: [], // Fetch labels from NestJS backend
    datasets: [{
        label: 'Quedas',
        data: [], // Fetch data from NestJS backend
        backgroundColor: 'rgba(135,206,250, 0.8)',
        borderColor: 'rgba(128, 0, 128, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgba(128, 0, 128, 1)',
        pointHoverBackgroundColor: 'rgba(128, 10, 128, 1)',
        pointHoverBorderColor: 'white',
    }]
};

const fallChart = new Chart(fallCtx, {
    type: 'line',
    data: fallData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Number of Falls',
                    color: 'black',
                    font: {
                        size: 16
                    }
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'black',
                    stepSize: 1
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Day of the Month',
                    color: 'black',
                    font: {
                        size: 16
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'black'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(128, 0, 128, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                borderRadius: 8,
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y;
                        return `Quedas: ${value}`;
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false,
                animationDuration: 200
            }
        }
    }
});

async function fetchDataAndUpdateCharts() {
    try {
        const selectedMonth = monthSelector.value;
        const response = await fetch(`/ api / data ? month = ${ selectedMonth } `);
        const data = await response.json();

        // Update temperature chart
        temperatureChart.data.labels = data.temperature.labels;
        temperatureChart.data.datasets[0].data = data.temperature.data;
        temperatureChart.update();

        // Update fall chart
        fallChart.data.labels = data.fall
            .labels;
        fallChart.data.datasets[0].data = data.fall.data;
        fallChart.update();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch initial data and update charts
fetchDataAndUpdateCharts();

// Add an event listener to the month selector
monthSelector.addEventListener("change", () => {
    fetchDataAndUpdateCharts();
});
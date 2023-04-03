const ctx = document.getElementById("fallChart").getContext("2d");

// Sample data, replace this with your actual data fetched from your NestJS backend
const fallData = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1), // Generate labels from 1 to 30 (days of a month)
    datasets: [{
        label: 'Quedas',
        data: [2, 3, 1, 5, 0, 6, 1, 2, 4, 7, 1, 0, 3, 6, 8, 0, 2, 1, 3, 6, 2, 0, 3, 5, 1, 2, 4, 1, 2, 0],
        backgroundColor: function (context) {
            const value = context.dataset.data[context.dataIndex];
            if (value >= 7) {
                return 'rgba(255, 99, 132, 0.8)';
            } else if (value >= 5) {
                return 'rgba(255, 206, 86, 0.8)';
            }
            return 'rgba(75, 192, 192, 0.8)';
        },
        borderColor: 'rgba(128, 0, 128, 1)',
        borderWidth: 1,
    }]
};

const chart = new Chart(ctx, {
    type: 'bar',
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

async function fetchDataAndUpdateChart() {
    try {
        const response = await fetch('/api/falls');
        const data = await response.json();

        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.data;
        chart.update();
    } catch (error) {
        console.error('Error fetching fall data:', error);
    }
}

// ...
const monthSelector = document.getElementById("month-selector");

async function fetchDataAndUpdateChart() {
    try {
        const selectedMonth = monthSelector.value;
        const response = await fetch(`/api/falls?month=${selectedMonth}`);
        const data = await response.json();

        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.data;
        chart.update();
    } catch (error) {
        console.error('Error fetching fall data:', error);
    }
}

fetchDataAndUpdateChart();

monthSelector.addEventListener('change', () => {
    fetchDataAndUpdateChart();
});




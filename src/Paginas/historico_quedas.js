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
            return 'rgba(60, 179, 113, 0.8)';
        },
        borderColor: 'rgba(128, 0, 128, 1)',
        borderWidth: 1,
    }]
};

function convertChartDataToCSV(chartData, selectedMonth) {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Octobro', 'Novembro', 'Dezembro'
    ];
    let csvContent = `data:text/csv;charset=utf-8,Mês: ${monthNames[selectedMonth - 1]}\r\nDia do Mês,Quedas\r\n`;

    chartData.labels.forEach((label, index) => {
        let rowData = `${label},${chartData.datasets[0].data[index]}\r\n`;
        csvContent += rowData;
    });

    return csvContent;
}

function downloadCSV() {
    const selectedMonth = monthSelector.value;
    const csvContent = convertChartDataToCSV(chart.data, selectedMonth);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Historico_Quedas.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}



// Add this at the end of your script
const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", downloadCSV);


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
                    text: 'Numero de Quedas',
                    color: 'white',
                    font: {
                        size: 22
                    }
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                ticks: {
                    color: 'white',
                    stepSize: 1
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Dia do Mês',
                    color: 'white',
                    font: {
                        size: 22
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                ticks: {
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(128, 0, 128, 0.9)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.7)',
                borderWidth: 1,
                borderRadius: 8,
                callbacks: {
                    label: function (context) {
                        const label = `Dia: ${context.chart.data.labels[context.dataIndex]}`;
                        const value = `Quedas: ${context.parsed.y}`;
                        return `${label} ${value}`;
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


monthSelector.addEventListener('change', () => {
    fetchDataAndUpdateChart();
});

function goBack() {
    event.preventDefault();
    window.history.go(-1);
}



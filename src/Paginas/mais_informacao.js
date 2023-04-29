


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
                    color: 'white',
                    font: {
                        size: 16
                    }
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'white'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Dia do Mês',
                    color: 'white',
                    font: {
                        size: 16
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
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

const automaticSweepBtn = document.getElementById("automatic-sweep-btn");

async function executeAutomaticSweep() {
    try {
        const response = await fetch("/api/automatic-sweep", {
            method: "POST",
        });

        const result = await response.json();

        if (result.status === "success") {
            alert("Varrimento automático iniciado com sucesso!");
        } else {
            alert("Ocorreu um erro ao iniciar o varrimento automático. Por favor, tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao iniciar o varrimento automático:", error);
        alert("Ocorreu um erro ao iniciar o varrimento automático. Por favor, tente novamente.");
    }
}

automaticSweepBtn.addEventListener("click", executeAutomaticSweep);


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
                    text: 'Numero de Quedas',
                    color: 'white',
                    font: {
                        size: 16
                    }
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
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
                        size: 16
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
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

// Adicione isso ao seu arquivo JavaScript
const lowerLimitInput = document.getElementById("lower-limit");
const lowerLimitValue = document.getElementById("lower-limit-value");
const upperLimitInput = document.getElementById("upper-limit");
const upperLimitValue = document.getElementById("upper-limit-value");
const saveLimitsBtn = document.getElementById("save-limits");

// Função para atualizar os campos de texto com os valores dos sliders
function updateLimitValues() {
    lowerLimitValue.value = lowerLimitInput.value;
    upperLimitValue.value = upperLimitInput.value;
}

// Inicializar os campos de texto com os valores iniciais dos sliders
updateLimitValues();

// Adicionar event listeners para atualizar os campos de texto quando os sliders mudarem
lowerLimitInput.addEventListener("input", updateLimitValues);
upperLimitInput.addEventListener("input", updateLimitValues);

// Função para salvar
// Função para salvar os limites no back-end
async function saveTemperatureLimits() {
    try {
        const lowerLimit = parseFloat(lowerLimitValue.value);
        const upperLimit = parseFloat(upperLimitValue.value);

        // Verificar se os limites são válidos
        if (lowerLimit >= upperLimit) {
            alert("O limite inferior deve ser menor que o limite superior.");
            return;
        }

        const response = await fetch("/api/temperature-limits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lowerLimit,
                upperLimit
            })
        });

        const result = await response.json();

        if (result.status === "success") {
            alert("Limites de temperatura salvos com sucesso!");
        } else {
            alert("Ocorreu um erro ao salvar os limites de temperatura. Por favor, tente novamente.");
        }
    } catch (error) {
        console.error("Error saving temperature limits:", error);
        alert("Ocorreu um erro ao salvar os limites de temperatura. Por favor, tente novamente.");
    }
}


function goBack() {
    event.preventDefault();
    window.history.go(-1);
}


const modeSwitchBtn = document.getElementById("mode-switch-btn");
let realtimeMode = false;

function switchMode() {
    realtimeMode = !realtimeMode;

    if (realtimeMode) {
        modeSwitchBtn.textContent = "Mudar para modo em tempo real";
        // Ativar modo em tempo real
        // 1. Conectar-se ao WebSocket para receber dados em tempo real
        // 2. Atualizar gráficos em tempo real com os dados recebidos
        // 3. Adicionar gráfico de posição corporal
    } else {
        modeSwitchBtn.textContent = "Mudar para modo histórico";
        // Desativar modo em tempo real
        // 1. Desconectar-se do WebSocket
        // 2. Parar de atualizar gráficos em tempo real
        // 3. Remover gráfico de posição corporal
        // 4. Atualizar gráficos com dados históricos (fetchDataAndUpdateCharts())
    }
}

modeSwitchBtn.addEventListener("click", switchMode);





// Adicionar um event listener ao botão Salvar Limites
saveLimitsBtn.addEventListener("click", saveTemperatureLimits);


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
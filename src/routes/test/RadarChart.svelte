<!-- RadarChart.svelte -->
<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { Chart, registerables } from "chart.js";

    Chart.register(...registerables);

    export let respiratoryRate;
    export let oxygenSaturation;
    export let bloodGlucoseLevels;
    export let painLevel;

    let chart;
    let ctx;

    const bloodGlucoseMap = {
        Low: 1,
        Normal: 2,
        Elevated: 3,
        High: 4,
    };

    const painLevelMap = {
        Mild: 1,
        Low: 2,
        Normal: 3,
        High: 4,
        Excruciating: 5,
    };

    function updateChart() {
        if (chart) {
            chart.data.datasets[0].data = [
                respiratoryRate,
                oxygenSaturation,
                bloodGlucoseMap[bloodGlucoseLevels],
                painLevelMap[painLevel],
            ];
            chart.update();
        }
    }

    $: updateChart();

    onMount(() => {
        ctx = document.getElementById("radarChart").getContext("2d");
        chart = new Chart(ctx, {
            type: "radar",
            data: {
                labels: [
                    "Respiratory Rate",
                    "Oxygen Saturation",
                    "Blood Glucose Levels",
                    "Pain Level",
                ],
                datasets: [
                    {
                        label: "Patient Data",
                        data: [
                            respiratoryRate,
                            oxygenSaturation,
                            bloodGlucoseMap[bloodGlucoseLevels],
                            painLevelMap[painLevel],
                        ],
                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                        borderColor: "rgba(0, 123, 255, 1)",
                        pointBackgroundColor: "rgba(0, 123, 255, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(0, 123, 255, 1)",
                    },
                ],
            },
            options: {
                scale: {
                    ticks: { beginAtZero: true, max: 5 },
                },
            },
        });
    });
</script>

<canvas id="radarChart"></canvas>

<style>
    canvas {
        max-width: 600px;
        margin: 0 auto;
    }
</style>

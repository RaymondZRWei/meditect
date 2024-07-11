<script lang="ts">
    import { type ComponentType } from "svelte";

    import MaterialSymbolsSearchInsights from "~icons/material-symbols/search-insights";
    import PhJarLabelFill from "~icons/ph/jar-label-fill";
    import F7Dial from "~icons/f7/dial";
    import MaterialSymbolsAlarm from "~icons/material-symbols/alarm";
    import MaterialSymbolsMonitorHeart from "~icons/material-symbols/monitor-heart";
    import MaterialSymbolsAddChart from "~icons/material-symbols/add-chart";

    import Stat from "$lib/components/Stat.svelte";
    import Tests from "./Tests.svelte";
    import Treatments from "./Treatments.svelte";
    import Symptoms from "./Symptoms.svelte";
    import Dashboard from "./Dashboard.svelte";
    import game from "$lib/store/game";
    import { diseases } from "$lib/data/diseases";
    import DoctorInterventions from "./DoctorInterventions.svelte";
    import type { GameData } from "$lib/types";

    let pageIndex = 0;

    interface Page {
        name: string;
        icon: ComponentType;
    }

    const pages: Page[] = [
        {
            name: "Symptoms",
            icon: MaterialSymbolsSearchInsights,
        },
        {
            name: "Treatments",
            icon: PhJarLabelFill,
        },
        {
            name: "Tests",
            icon: MaterialSymbolsAddChart,
        },
    ];

    const varyAndRound = (value: number, low: number, high: number): number => {
        return Math.round(value + Math.random() * (high - low) + low);
    };

    let prevGame: GameData | null = null;

    game.subscribe((gameData) => {
        if (!gameData) return;

        if (prevGame && prevGame.elapsedTime === gameData.elapsedTime) return;

        const diseaseName = gameData.disease.name;

        const storedDisease = diseases.find(
            (disease) => disease.name === diseaseName,
        );

        if (!storedDisease) {
            console.error(`Disease ${diseaseName} not found`);
            return;
        }

        const newGameData = storedDisease.updateSymptoms(
            gameData,
            prevGame ?? gameData,
        );

        // Randomly vary the values
        gameData.heartRate.value = varyAndRound(
            gameData.heartRate.value,
            -3,
            3,
        );
        gameData.respiratoryRate = Math.round(
            gameData.respiratoryRate + Math.random() * 2 - 1,
        );
        gameData.oxygenSaturation = varyAndRound(
            gameData.oxygenSaturation,
            -1,
            1,
        );
        gameData.bloodGlucose = varyAndRound(gameData.bloodGlucose, -2, 2);
        gameData.bloodPressureSystolic.value = varyAndRound(
            gameData.bloodPressureSystolic.value,
            -2,
            2,
        );

        gameData.bloodPressureDiastolic.value = varyAndRound(
            gameData.bloodPressureDiastolic.value,
            -2,
            2,
        );

        game.set(newGameData);

        prevGame = structuredClone(newGameData);
    });

    const increaseElapsedTime = () => {
        if (!$game) return;

        $game.elapsedTime += 5;
    };
</script>

<DoctorInterventions />

{#if $game === undefined}
    <div>Loading Game...</div>
{:else if $game === null}
    <Dashboard />
{:else}
    <div class="flex gap-3 h-full">
        <Stat
            title="Heart Rate"
            value={$game.heartRate.value}
            tooltip="This pops up on hover"
            symbol={MaterialSymbolsMonitorHeart}
        />
        <Stat
            title="Blood Pressure Systolic"
            value={$game.bloodPressureSystolic.value}
            tooltip="This pops up on hover"
            symbol={F7Dial}
        />
        <Stat
            title="Blood Pressure Diastolic"
            value={$game.bloodPressureDiastolic.value}
            tooltip="This pops up on hover"
            symbol={F7Dial}
        />

        <button
            on:click={increaseElapsedTime}
            class="bg-blue-500 w-full rounded-lg p-6 flex justify-between"
        >
            <div class="flex flex-col bg-orange-400 items-start">
                <div class="text-white">Elapsed Time</div>
                <div class="text-slate-500">
                    {$game.elapsedTime} minutes
                </div>
            </div>

            <div>
                <MaterialSymbolsAlarm class="size-8 opacity-60" />
            </div>
        </button>
    </div>

    <div>
        {#if pageIndex === 0}
            <Symptoms bind:game={$game} />
        {:else if pageIndex === 1}
            <Treatments bind:game={$game} />
        {:else if pageIndex === 2}
            <Tests bind:game={$game} />
        {/if}
    </div>

    <div class="w-full flex items-stretch my-4">
        {#each pages as page, i}
            {@const isActivePage = i === pageIndex}
            <button
                class="text-center flex flex-col p-4 items-center justify-center rounded-md w-full {isActivePage
                    ? 'bg-violet-700'
                    : 'bg-violet-100'}"
                on:click={() => {
                    pageIndex = i;
                }}
            >
                <svelte:component
                    this={page.icon}
                    class="size-7 opacity-90 mx-auto mb-1"
                />
                <span>{page.name}</span>
            </button>
        {/each}
    </div>
{/if}

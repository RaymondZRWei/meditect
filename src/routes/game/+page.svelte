<script lang="ts">
    import { type ComponentType } from "svelte";

    import game from "$lib/store/game";
    import { diseases } from "$lib/data/diseases";
    import type { GameData } from "$lib/types";

    import MaterialSymbolsSearchInsights from "~icons/material-symbols/search-insights";
    import PhJarLabelFill from "~icons/ph/jar-label-fill";
    import MaterialSymbolsAddChart from "~icons/material-symbols/add-chart";
    import Fa6SolidPlus from "~icons/fa6-solid/plus";

    import Stat from "$lib/components/Stat.svelte";
    import Tests from "./Tests.svelte";
    import Treatments from "./Treatments.svelte";
    import Symptoms from "./Symptoms.svelte";
    import Dashboard from "./Dashboard.svelte";
    import DoctorInterventions from "./DoctorInterventions.svelte";

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
    <div class="flex flex-col h-screen justify-between py-9">
        <div class="grid grid-cols-4 gap-6 grow h-full">
            <section class="flex flex-col gap-3 h-full col-span-1">
                <Stat
                    title="Elapsed Time"
                    value={$game.elapsedTime}
                    unit="minutes"
                    tooltip="This pops up on hover"
                >
                    <div>
                        <button
                            on:click={increaseElapsedTime}
                            class="outline-none"
                            aria-label="Increment Time"
                        >
                            <Fa6SolidPlus class="size-8 text-slate-500" />
                        </button>
                    </div>
                </Stat>

                <Stat
                    title="Heart Rate"
                    value={$game.heartRate.value}
                    unit="bpm"
                    tooltip="This pops up on hover"
                />
                <Stat
                    title="Blood Pressure (Sys)"
                    value={$game.bloodPressureSystolic.value}
                    unit="mmHg"
                    tooltip="This pops up on hover"
                />
                <Stat
                    title="Blood Pressure (Dia)"
                    value={$game.bloodPressureDiastolic.value}
                    unit="mmHg"
                    tooltip="This pops up on hover"
                />
            </section>
            <div class="h-full col-span-3">
                {#if pageIndex === 0}
                    <Symptoms bind:game={$game} />
                {:else if pageIndex === 1}
                    <Treatments bind:game={$game} />
                {:else if pageIndex === 2}
                    <Tests bind:game={$game} />
                {/if}
            </div>
        </div>

        <section class="w-full flex items-stretch gap-3 h-min pt-4">
            {#each pages as page, i}
                {@const isActivePage = i === pageIndex}
                <button
                    class="text-center flex flex-col p-4 items-center justify-center rounded-xl w-full {isActivePage
                        ? 'bg-slate-200'
                        : 'bg-slate-50 hover:bg-slate-100'} transition-colors outline-none"
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
        </section>
    </div>
{/if}

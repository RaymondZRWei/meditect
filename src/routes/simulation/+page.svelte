<script lang="ts">
    import { type ComponentType } from "svelte";

    import game from "$lib/store/game";
    import { diseases } from "$lib/data/diseases";
    import type { GameData } from "$lib/types";

    import MaterialSymbolsSearchInsights from "~icons/material-symbols/search-insights";
    import PhJarLabelFill from "~icons/ph/jar-label-fill";
    import MaterialSymbolsAddChart from "~icons/material-symbols/add-chart";
    import MaterialSymbolsTimer5 from "~icons/material-symbols/timer-5";

    import Stat from "$lib/components/Stat.svelte";
    import Tests from "./Tests.svelte";
    import Treatments from "./Treatments.svelte";
    import Symptoms from "./Symptoms.svelte";
    import Dashboard from "./Dashboard.svelte";
    import DoctorInterventions from "./DoctorInterventions.svelte";
    import Loading from "$lib/components/Loading.svelte";

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
        return Math.round(value + (Math.random() * (high - low) + low));
    };

    let prevGame: GameData | null = $game ? structuredClone($game) : null;

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
        gameData.respiratoryRate = varyAndRound(
            gameData.respiratoryRate,
            -2,
            2,
        );

        gameData.oxygenSaturation = Math.min(
            varyAndRound(gameData.oxygenSaturation, -1, 1),
            100,
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
        gameData.pain = Math.max(
            0,
            Math.min(varyAndRound(gameData.pain, -2, 2), 100),
        );

        // failsafes for value corruption
        if(gameData.pain < 0){
          gameData.pain = Math.round(Math.random()*20);
        }
        if(gameData.pain > 100){
          gameData.pain = Math.round(Math.random()*10)+90;
        }
        if(gameData.heartRate.value < 0){
          gameData.heartRate.value = Math.round(Math.random()*20)+20;
        }
        if(gameData.heartRate.value > 200){
          gameData.heartRate.value = Math.round(Math.random()*10)+170;
        }
        if(gameData.respiratoryRate < 0){
          gameData.respiratoryRate = Math.round(Math.random()*10);
        }
        if(gameData.respiratoryRate > 45){
          gameData.respiratoryRate = Math.round(Math.random()*5)+35;
        }
        if(gameData.oxygenSaturation < 55){
          gameData.oxygenSaturation = Math.round(Math.random()*10)+55;
        }
        if(gameData.oxygenSaturation > 100){
          gameData.oxygenSaturation = Math.round(Math.random()*2)+97;
        }
        if(gameData.bloodPressureSystolic.value < 50){
          gameData.bloodPressureSystolic.value = Math.round(Math.random()*10)+50;
        }
        if(gameData.bloodPressureSystolic.value > 200){
          gameData.bloodPressureSystolic.value = Math.round(Math.random()*20)+180;
        }
        if(gameData.bloodPressureDiastolic.value < 30){
          gameData.bloodPressureDiastolic.value = Math.round(Math.random()*10)+30;
        }
        if(gameData.bloodPressureDiastolic.value > 120){
          gameData.bloodPressureDiastolic.value = Math.round(Math.random()*20)+90;
        }

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
    <Loading />
{:else if $game === null}
    <Dashboard />
{:else}
    <div class="flex flex-col h-screen justify-between py-8">
        <div
            class="bg-slate-100 w-full p-4 rounded-xl mb-3 flex justify-between items-center"
        >
            <div class="text-lg font-medium pl-4">
                {$game.name} ({$game.age} years old)
            </div>
            <button
                class="bg-red-500 hover:bg-red-600 transition-colors px-6 py-3 text-white rounded-lg"
                on:click={() => {
                    game.set(null);
                }}
            >
                Quit Simulation
            </button>
        </div>
        <div class="grid grid-cols-4 gap-4 grow h-full">
            <section class="flex flex-col gap-3 h-full col-span-1">
                <Stat
                    title="Elapsed Time"
                    value={$game.elapsedTime}
                    unit="minutes"
                    tooltip="Click the button to increment the time"
                >
                    <div>
                        <button
                            on:click={increaseElapsedTime}
                            class="outline-none rounded-xl"
                            aria-label="Increment Time"
                        >
                            <MaterialSymbolsTimer5
                                class="size-10 text-primary hover:text-primary-dark transition-colors"
                            />
                        </button>
                    </div>
                </Stat>

                <Stat
                    title="Heart Rate"
                    value={$game.heartRate.value}
                    unit="bpm"
                    tooltip="The patient's heart beats per minute"
                />
                <Stat
                    title="Blood Pressure (Sys)"
                    value={$game.bloodPressureSystolic.value}
                    unit="mmHg"
                    tooltip="Pressure in the patient's arteries when their heart beats"
                />
                <Stat
                    title="Blood Pressure (Dia)"
                    value={$game.bloodPressureDiastolic.value}
                    unit="mmHg"
                    tooltip="Pressure in the patient's arteries when their heart is at rest"
                />
            </section>
            <div class="h-full col-span-3">
                {#if $game.pageIndex === 0}
                    <Symptoms bind:game={$game} />
                {:else if $game.pageIndex === 1}
                    <Treatments bind:game={$game} />
                {:else if $game.pageIndex === 2}
                    <Tests bind:game={$game} />
                {/if}
            </div>
        </div>

        <section class="w-full flex items-stretch gap-4 h-min pt-4">
            {#each pages as page, i}
                {@const isActivePage = i === $game.pageIndex}
                <button
                    class="text-center flex flex-col p-3.5 items-center justify-center rounded-xl w-full {isActivePage
                        ? 'bg-slate-200'
                        : 'bg-slate-50 hover:bg-slate-100'} transition-colors outline-none"
                    on:click={() => {
                        if (!$game) return;

                        $game.pageIndex = i;
                    }}
                >
                    <svelte:component
                        this={page.icon}
                        class="size-6 opacity-90 mx-auto mb-0.5"
                    />
                    <span>{page.name}</span>
                </button>
            {/each}
        </section>
    </div>
{/if}

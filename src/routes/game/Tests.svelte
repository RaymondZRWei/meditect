<script lang="ts">
    import type {
        GameData,
        Test,
        TestableSymptoms,
        TestResult,
    } from "$lib/types";
    import { tests } from "$lib/data/tests";
    import TestButton from "$lib/components/TestButton.svelte";
    import Checklist from "$lib/components/Checklist.svelte";

    import { tick } from "svelte";

    export let game: GameData;

    const adminsterTest = (selectedTest: Test | null) => {
        if (!selectedTest) return;

        let results: TestResult["results"] = {};

        switch (selectedTest.queriedSymptoms[0]) {
            case "respiratoryRate":
                results.respiratoryRate = game.respiratoryRate;
                break;
            case "oxygenSaturation":
                results.oxygenSaturation = game.oxygenSaturation;
                break;
            case "bloodGlucose":
                results.bloodGlucose = game.bloodGlucose;
                break;
            case "pain":
                results.pain = Math.floor(game.pain);
                break;
        }

        game.testResults = [
            ...game.testResults,
            {
                testName: selectedTest.name,
                duration: selectedTest.duration,
                results,
                timeAdministered: game.elapsedTime,
            },
        ];

        game.elapsedTime += selectedTest.duration;
    };

    // Function to find the latest value of a symptom
    function findLatestSymptomValue(
        symptom: TestableSymptoms,
    ): number | undefined {
        for (let i = game.testResults.length - 1; i >= 0; i--) {
            let result = game.testResults[i].results[symptom];
            if (result) {
                return result;
            }
        }
        return undefined;
    }

    let latestRespiratoryRate: number | undefined;
    let latestOxygenSaturation: number | undefined;
    let latestGlucoseLevel: number | undefined;
    let latestPain: number | undefined;

    $: if (game.testResults) {
        latestRespiratoryRate = findLatestSymptomValue("respiratoryRate");
        latestOxygenSaturation = findLatestSymptomValue("oxygenSaturation");
        latestGlucoseLevel = findLatestSymptomValue("bloodGlucose");
        latestPain = findLatestSymptomValue("pain");
    }

    $: {
        if (game.testResults) {
            scroll(game.testResults.length - 1);
        }
    }

    async function scroll(index: number) {
        await tick();

        if (typeof document !== "undefined") {
            const selectedLineElement = document.getElementById(
                `line-${index}`,
            );
            if (selectedLineElement) {
                selectedLineElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }
</script>

<div class="bg-slate-100 p-8 rounded-xl h-full">
    <h2 class="text-3xl font-bold mb-4">Tests</h2>

    <div class="grid grid-cols-2">
        <div class="col-span-1 gap-4 flex flex-col py-4 overflow-auto">
            <TestButton
                title="Respiratory Rate"
                unit="Breaths per Min"
                actionMessage="Use Spirometer"
                maxValue={30}
                value={latestRespiratoryRate}
                onclick={() => adminsterTest(tests[0])}
            />
            <TestButton
                title="Oxygen Saturation"
                unit="% Sp02"
                actionMessage="Use Oximeter"
                maxValue={100}
                value={latestOxygenSaturation}
                onclick={() => adminsterTest(tests[1])}
            />
            <TestButton
                title="Blood Glucose Level"
                unit="mg / dL"
                actionMessage="Use Glucometer"
                maxValue={100}
                value={latestGlucoseLevel}
                onclick={() => adminsterTest(tests[2])}
            />
            <TestButton
                title="Pain Level"
                unit="Scale 0-100"
                actionMessage="Ask Patient"
                maxValue={100}
                value={latestPain}
                onclick={() => adminsterTest(tests[3])}
            />
        </div>
        <div class="col-span-1">
            <Checklist bind:game />
        </div>
    </div>

    <div class="h-fit p-5">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="font-bold text-lg mb-2">Tests</h2>
            </div>
        </div>
        {#if game.testResults.length === 0}
            <p>No tests administered yet.</p>
        {:else}
            <div
                class="flex flex-col gap-3 overflow-auto max-h-28 border-[1px] rounded-sm p-2"
            >
                {#each game.testResults as test, i}
                    <div
                        id={`line-${i}`}
                        class="flex justify-between px-2 py-1 {i ===
                            game.testResults.length - 1 && 'bg-slate-200'}"
                    >
                        <div>{test.timeAdministered} min</div>
                        <div>
                            {test.testName}
                        </div>
                        <div class="flex gap-10">
                            {#each Object.values(test.results) as result}
                                {result}
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

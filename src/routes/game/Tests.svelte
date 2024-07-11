<script lang="ts">
    import { createDialog, melt } from "@melt-ui/svelte";
    import { fade } from "svelte/transition";

    import type { GameData, TestResult } from "$lib/types";
    import { tests } from "$lib/data/tests";
    import Test from "$lib/components/Test.svelte";
    import Checklist from "$lib/components/Checklist.svelte";

    import Fa6SolidPlus from "~icons/fa6-solid/plus";

    export let game: GameData;

    const {
        elements: {
            trigger,
            overlay,
            content,
            title,
            description,
            close,
            portalled,
        },
        states: { open },
    } = createDialog({
        forceVisible: true,
    });

    let selectedTest: Test | null = null;

    open.subscribe((isOpen) => {
        if (!isOpen) {
            selectedTest = null;
        }
    });

    const adminsterTest = (selectedTest: Test | null) => {
        if (!selectedTest) return;

        game.elapsedTime += selectedTest.duration;

        let results: TestResult["results"] = {};

        selectedTest.queriedSymptoms.forEach((symptom) => {
            results[symptom] = game[symptom];
        });

        game.testResults = [
            {
                testName: selectedTest.name,
                duration: selectedTest.duration,
                results,
                timeAdministered: game.elapsedTime,
            },
            ...game.testResults,
        ];
    };
</script>

<div class="grid grid-cols-2">
    <div class="col-span-1 gap-4 flex flex-col py-4 overflow-auto">
        <Test
            title="Respiratory Rate"
            unit="Breaths per Min"
            actionMessage="Count"
            maxValue={30}
        />
        <Test
            title="Oxygen Saturation"
            unit="% Sp02"
            actionMessage="Use Pulse Oximetry"
            maxValue={100}
        />
        <Test
            title="Blood Glucose Level"
            unit="mg / dL"
            actionMessage="Use Glucometer"
            maxValue={100}
        />
        <Test
            title="Pain Level"
            unit="Scale 0-100"
            actionMessage="Ask Patient"
            maxValue={100}
        />
    </div>
    <div class="col-span-1">
        <Checklist />
    </div>
</div>

<div class="h-full p-5">
    <div class="flex items-center justify-between">
        <div>
            <h2>Tests</h2>
        </div>
        <button use:melt={$trigger} aria-label="New Test">
            <Fa6SolidPlus class="size-8" />
        </button>
    </div>
    {#if game.testResults.length === 0}
        <p>No tests administered yet.</p>
    {:else}
        <div class="flex flex-col gap-3">
            {#each game.testResults as test}
                <div class="flex justify-between bg-red-300">
                    <div>
                        {test.testName}
                    </div>
                    <div class="flex gap-10">
                        {#each Object.entries(test.results) as [symptom, result]}
                            {symptom}: {result}
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

{#if $open}
    <div use:melt={$portalled}>
        <div
            use:melt={$overlay}
            class="fixed inset-0 z-50 bg-black/50"
            transition:fade={{ duration: 150 }}
        />
        <div
            class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white
            p-6 shadow-lg"
            transition:fade={{
                duration: 150,
            }}
            use:melt={$content}
        >
            <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
                Choose a Test to Administer
            </h2>
            <p
                use:melt={$description}
                class="mb-5 mt-2 leading-normal text-zinc-600"
            >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit,
                vel?
            </p>

            <div class="flex flex-col gap-3">
                {#each tests as test}
                    <button
                        class="text-left outline-none"
                        class:bg-fuchsia-400={selectedTest === test}
                        on:click={() => (selectedTest = test)}
                    >
                        {test.name}
                    </button>
                {/each}
            </div>

            <div>
                <button class="outline-none" use:melt={$close}>Close</button>

                {#if selectedTest}
                    <button
                        on:click={() => adminsterTest(selectedTest)}
                        use:melt={$close}
                        class="outline-none"
                    >
                        Administer
                    </button>
                {/if}
            </div>
        </div>
    </div>
{/if}

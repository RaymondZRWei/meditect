<script lang="ts">
    import type { GameData } from "$lib/types";
    import { tick } from "svelte";

    export let game: GameData;

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

<div class="h-full grid grid-cols-5 gap-4">
    <div class="col-span-3 bg-slate-100 pl-6 py-6 rounded-xl">
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
                    class="flex flex-col gap-3 max-h-[60vh] overflow-auto rounded-sm border-[1px] p-2"
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
                                {#each Object.entries(test.results) as [symptom, result]}
                                    {result}
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    <div class="bg-slate-600 rounded-xl p-8 col-span-2">
        <h2 class="text-white font-bold text-2xl mb-5">Observations</h2>
        <div class="flex flex-col gap-3 text-slate-200">
            {#each game.qualitativeSymptoms.toReversed() as symptom}
                <div>{symptom}</div>
            {/each}
        </div>
    </div>
</div>

<script lang="ts">
    import { slide } from "svelte/transition";
    import { createAccordion } from "@melt-ui/svelte";
    import type { GameData } from "$lib/types";
    import { diseases } from "$lib/data/diseases";
    import { continuousSymptoms, testableSymptoms } from "$lib/types";

    import IconDoubleUp from "~icons/material-symbols/keyboard-double-arrow-up-rounded";
    import IconUp from "~icons/material-symbols/keyboard-arrow-up-rounded";
    import IconDoubleDown from "~icons/material-symbols/keyboard-double-arrow-down-rounded";
    import IconDown from "~icons/material-symbols/keyboard-arrow-down-rounded";
    import BiDash from "~icons/bi/dash";

    export let game: GameData;

    const {
        elements: { content, item, trigger, root },
        helpers: { isSelected },
    } = createAccordion({
        defaultValue: "item-1",
    });
</script>

<main class="flex flex-col h-full pl-4">
    <div class="mt-4 mx-4 flex flex-col overflow-auto text-slate-600" {...root}>
        {#each diseases as disease, i}
            <div
                {...$item(disease.name)}
                use:item
                class="overflow-hidden transition-colors"
            >
                <h2
                    class="flex justify-start items-center {i !== 0 &&
                        'border-t border-t-neutral-300'}"
                >
                    <button
                        {...$trigger(disease.name)}
                        use:trigger
                        class="flex-1 text-left cursor-pointer"
                    >
                        {disease.name}
                    </button>
                </h2>
                {#if $isSelected(disease.name)}
                    <div
                        class="content text-sm text-slate-400 mb-4"
                        {...$content(disease.name)}
                        use:content
                        transition:slide
                    >
                        {#each Object.entries(disease.statHints) as [symptom, modifier]}
                            {@const symptomName = {
                                ...continuousSymptoms,
                                ...testableSymptoms,
                            }[symptom]}

                            {#if symptomName}
                                <div class="flex">
                                    <div>
                                        {symptomName}
                                    </div>
                                    <div>
                                        {#if modifier === -2}
                                            <IconDoubleDown
                                                class="size-5 text-red-500"
                                            />
                                        {:else if modifier === -1}
                                            <IconDown
                                                class="size-5 text-red-500"
                                            />
                                        {:else if modifier === 0}
                                            <BiDash
                                                class="size-5 text-slate-500"
                                            />
                                        {:else if modifier === 1}
                                            <IconUp
                                                class="size-5 text-green-500"
                                            />
                                        {:else if modifier === 2}
                                            <IconDoubleUp
                                                class="size-5 text-green-500"
                                            />
                                        {/if}
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="flex-1 flex flex-col justify-center items-start p-4">
        <span>Notes:</span>
        <textarea
            name="paragraph_text"
            class="h-full w-full px-2 py-1 border-solid border-black border-[1px] text-sm rounded-sm resize-none"
            bind:value={game.notes}
        />
    </div>
</main>

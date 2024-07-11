<script lang="ts">
    import { createAccordion, melt } from "@melt-ui/svelte";
    import { slide } from "svelte/transition";

    import IconUp from "~icons/material-symbols/keyboard-double-arrow-up-rounded";
    import IconDown from "~icons/material-symbols/keyboard-double-arrow-down-rounded";
    import IconConstant from "~icons/oui/token-constant";

    const {
        elements: { content, item, trigger, root },
        helpers: { isSelected },
    } = createAccordion({
        defaultValue: "item-1",
    });

    export let items = [
        {
            disease: "Opioid Overdose",
            stats: {
                rr: IconDown,
                os: IconDown,
                gl: IconConstant,
                pain: IconUp,
            },
            checked: false,
        },
        {
            disease: "Pulmonary Embolism",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
        {
            disease: "Asthma Attack",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
        {
            disease: "Heart Attack",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
        {
            disease: "Stroke",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
        {
            disease: "Sepsis",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
        {
            disease: "Food Poisoning",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
        {
            disease: "Acute Pancreatitis",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
        {
            disease: "Staph",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
        {
            disease: "Laceration",
            stats: { rr: -1, os: -1, gl: 0, pain: 1 },
            checked: false,
        },
    ];
    let text = "";
</script>

<main class="flex flex-col h-full">
    <h3 class="text-black font-bold text-3xl">Checklist</h3>

    <!-- Items -->
    <div class="mt-4 mx-4 flex flex-col overflow-auto text-slate-600" {...root}>
        {#each items as { disease, stats, checked }, i}
            <div
                {...$item(disease)}
                use:item
                class="overflow-hidden transition-colors"
            >
                <h2
                    class="flex justify-start items-center {i !== 0 &&
                        'border-t border-t-neutral-300'}"
                >
                    <button
                        {...$trigger(disease)}
                        use:trigger
                        class="flex-1 text-left cursor-pointer"
                    >
                        {disease}
                    </button>
                    <input type="checkbox" bind:checked class="ml-auto" />
                </h2>
                {#if $isSelected(disease)}
                    <div
                        class="content text-sm text-slate-400 mb-4"
                        {...$content(disease)}
                        use:content
                        transition:slide
                    >
                        <div class="py-4 px-8 h-fit flex flex-col">
                            <div class="flex items-center">
                                <span>Respiratory Rate</span>
                                <span class="ml-auto">
                                    <svelte:component this={stats.rr}
                                    ></svelte:component>
                                </span>
                            </div>
                            <div class="flex items-center">
                                <span>Oxygen Saturation</span>
                                <span class="ml-auto">
                                    <svelte:component this={stats.os}
                                    ></svelte:component>
                                </span>
                            </div>
                            <div class="flex items-center">
                                <span>Blood Glucose Levels</span>
                                <span class="ml-auto">
                                    <svelte:component this={stats.gl}
                                    ></svelte:component>
                                </span>
                            </div>
                            <div class="flex items-center">
                                <span>Pain Level</span>
                                <span class="ml-auto">
                                    <svelte:component this={stats.pain}
                                    ></svelte:component>
                                </span>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="flex-1 flex flex-col justify-center items-start p-4">
        <span>Notes:</span>
        <textarea
            name="paragraph_text"
            class="h-full w-full px-4 py-2 border-solid border-black border-[1px] rounded-sm resize-none"
        />
    </div>
</main>

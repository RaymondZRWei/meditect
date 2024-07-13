<script lang="ts">
    import { createTooltip, melt } from "@melt-ui/svelte";
    import { fade } from "svelte/transition";

    import type { Medicine } from "$lib/types";

    const {
        elements: { trigger, content, arrow },
        states: { open },
    } = createTooltip({
        positioning: {
            placement: "top",
        },
        openDelay: 0,
        closeDelay: 0,
        closeOnPointerDown: false,
        forceVisible: true,
    });

    export let medicine: Medicine;
    export let selectedMedicine: Medicine | null;
</script>

<div>
    <button
        use:melt={$trigger}
        class="flex justify-between items-center bg-slate-200 border-[2.5px] rounded-xl px-4 py-5 w-full {selectedMedicine &&
        selectedMedicine.name === medicine.name
            ? 'border-secondary'
            : 'border-slate-200'} transition-all"
        on:click={() => (selectedMedicine = medicine)}
    >
        <div class="font-semibold">{medicine.name}</div>
        <div>{medicine.duration}m</div>
    </button>

    {#if $open}
        <div
            use:melt={$content}
            transition:fade={{ duration: 100 }}
            class=" z-10 rounded-lg bg-slate-600 text-white shadow"
        >
            <div use:melt={$arrow} />
            <p class="px-4 py-1">{medicine.description}</p>
        </div>
    {/if}
</div>

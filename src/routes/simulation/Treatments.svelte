<script lang="ts">
    import { createTooltip, melt } from "@melt-ui/svelte";
    import { fade } from "svelte/transition";

    import { medicines, updateGameWithMedicine } from "$lib/data/medicine";
    import type { GameData, Medicine } from "$lib/types";

    import MedicineSelector from "./MedicineSelector.svelte";

    export let game: GameData;

    let selectedMedicine: Medicine | null = null;

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

    const administerMedicine = () => {
        if (!selectedMedicine) return;

        game = updateGameWithMedicine(game, selectedMedicine);

        selectedMedicine = null;
    };
</script>

<section
    class="bg-slate-100 p-10 rounded-xl h-full flex flex-col justify-between"
>
    <div>
        <h2 class="text-3xl font-bold mb-6">Treatments</h2>
        <div class="grid grid-cols-2 gap-3">
            {#each Object.values(medicines) as medicine}
                <MedicineSelector bind:selectedMedicine {medicine} />
            {/each}
        </div>
    </div>
    <div>
        <button
            class="bg-primary hover:bg-primary-dark transition-all rounded-lg px-6 py-3.5 text-white disabled:opacity-20 float-right"
            disabled={selectedMedicine === null}
            use:melt={$trigger}
            on:click={administerMedicine}
        >
            Administer
        </button>

        {#if $open && selectedMedicine === null}
            <div
                use:melt={$content}
                transition:fade={{ duration: 100 }}
                class=" z-10 rounded-lg bg-slate-600 text-white shadow"
            >
                <div use:melt={$arrow} />
                <p class="px-4 py-1">Select a medicine above to administer</p>
            </div>
        {/if}
    </div>
</section>

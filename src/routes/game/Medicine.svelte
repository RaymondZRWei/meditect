<script lang="ts">
    import { updateGameWithMedicine } from "$lib/data/medicine";
    import { createTooltip, melt } from "@melt-ui/svelte";
    import { fade } from "svelte/transition";
    import type { GameData, Medicine } from "$lib/types";

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

    export let game: GameData;
    export let medicine: Medicine;

    const administerMedicine = (medicine: Medicine) => {
        game = updateGameWithMedicine(game, medicine);
    };
</script>

<div>
    <div
        use:melt={$trigger}
        class="flex justify-between items-center bg-slate-200 rounded-xl px-4 py-6"
    >
        <div class="font-bold">{medicine.name}</div>
    </div>

    {#if $open}
        <div
            use:melt={$content}
            transition:fade={{ duration: 100 }}
            class=" z-10 rounded-lg bg-white shadow"
        >
            <div use:melt={$arrow} />
            <p class="px-4 py-1">Add item to library</p>
        </div>
    {/if}
</div>

<script lang="ts">
    import { medicines, updateGameWithMedicine } from "$lib/data/medicine";
    import type { GameData } from "$lib/types";
    import Medicine from "./Medicine.svelte";

    export let game: GameData;
</script>

<section class="bg-slate-100 p-8 rounded-xl h-full">
    <h2 class="text-3xl font-bold mb-4">Treatments</h2>
    <div class="grid grid-cols-2 gap-3">
        {#each Object.values(medicines) as medicine}
            <Medicine bind:game {medicine} />
        {/each}
    </div>
</section>

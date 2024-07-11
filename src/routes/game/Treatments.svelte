<script lang="ts">
    import { medicines, updateGameWithMedicine } from "$lib/data/medicine";
    import type { GameData, Medicine } from "$lib/types";

    export let game: GameData;

    const administerMedicine = (medicine: Medicine) => {
        game = updateGameWithMedicine(game, medicine);
    };
</script>

<section>
    <h2 class="text-2xl font-semibold">Treatments</h2>
    <div class="flex flex-col gap-3">
        {#each Object.values(medicines) as medicine}
            <div class="flex gap-3">
                <div>
                    {medicine.name} - {medicine.duration}
                </div>
                <button on:click={() => administerMedicine(medicine)}
                    >Administer</button
                >
            </div>
        {/each}
    </div>
</section>

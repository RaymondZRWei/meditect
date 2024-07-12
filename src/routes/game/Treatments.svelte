<script lang="ts">
    import { medicines, updateGameWithMedicine } from "$lib/data/medicine";
    import type { GameData, Medicine } from "$lib/types";

    export let game: GameData;

    let showDescription = false;
    let currentHover = -1;

    const administerMedicine = (medicine: Medicine) => {
        game = updateGameWithMedicine(game, medicine);
    };
</script>
<section>
  <h2 class="text-2xl font-semibold">Treatments</h2>
  <div class="flex flex-col gap-2">
      {#each Object.values(medicines) as medicine, index}
          <div class="flex gap-3">
              <div>
                  <span
                      on:mouseenter={() => { showDescription = true; currentHover = index; }}
                      on:mouseleave={() => { showDescription = false; }}
                  >
                      {medicine.name} - {medicine.duration}
                  </span>
              </div>
              <button
                  on:click={() => administerMedicine(medicine)}
                  class="outline-none"
              >
                  Administer
              </button>
          </div>
      {/each}
      {#if showDescription}
          <div class="absolute bg-white text-black p-2 border rounded" style="left: 55%; top: {7 + currentHover * 3.6}%;">
              {medicines[currentHover].description}
          </div>
      {/if}
  </div>
</section>
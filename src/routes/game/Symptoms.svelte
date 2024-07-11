<script lang="ts">
    import type { GameData } from "$lib/types";

    export let game: GameData;
</script>

<div class="h-full bg-purple-400 grid grid-cols-3">
    <div class="col-span-2 bg-orange-300">hi</div>
    <div class="bg-yellow-300 col-span-1">
        <h2>Observations</h2>
        <div>
            {#each game.qualitativeSymptoms as symptom}
                <div>{symptom}</div>
            {/each}
        </div>
    </div>
</div>

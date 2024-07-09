<script lang="ts">
    import { browser } from "$app/environment";
    import game, { defaultValue } from "$lib/stores/game";

    const newGame = () => {
        if (browser) {
            localStorage.removeItem("gameData");
        }

        game.set(JSON.parse(JSON.stringify(defaultValue)));
    };
</script>

<div class="modal" class:modal-open={$game.finished}>
    {#if $game.finished}
        <div class="modal-box max-w-2xl">
            <h3 class="font-bold text-4xl">Game Over</h3>
            <div class="text-xl mt-4">
                <span class="font-bold">Score:</span>
                <span>
                    <!-- TODO: SHOW THE FINAL SCORE % HERE -->
                </span>
            </div>
            <div class="text-xl mt-4">
                Congratulations, you made it to the end of the game!
            </div>

            <div class="modal-action">
                <button class="btn btn-primary" on:click={newGame}>
                    Play Again
                </button>
            </div>
        </div>
    {/if}
</div>

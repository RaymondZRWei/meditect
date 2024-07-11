<script lang="ts">
    import userData from "$lib/store/userData";
    import { diseases } from "$lib/data/diseases";

    import WelcomeModal from "./WelcomeModal.svelte";
    import game from "$lib/store/game";
    import type { UserData } from "$lib/types";

    const startGame = () => {
        // Picking a random disease
        const randomDisease =
            diseases[Math.floor(Math.random() * diseases.length)];

        const gameData = randomDisease.getDefaultGameData();

        // Updating the game data
        game.set(gameData);
    };

    const getUserCompletedDiseases = (userData: UserData) => {
        let completedDiseases: Set<string> = new Set();
        let partiallyCompletedDiseases: Set<string> = new Set();

        for (const game of userData.games) {
            if (game.doctorIntervention) continue;

            if (game.doctorHints.length === 0) {
                completedDiseases.add(game.disease.name);
            } else {
                partiallyCompletedDiseases.add(game.disease.name);
            }
        }

        return { completedDiseases, partiallyCompletedDiseases };
    };
</script>

{#if $userData === undefined}
    <div>Loading User Data...</div>
{/if}

<WelcomeModal />

{#if $userData}
    {@const { completedDiseases, partiallyCompletedDiseases } =
        getUserCompletedDiseases($userData)}

    <div>
        <section>
            <h2>Diseases</h2>
            <div class="flex flex-col">
                {#each diseases as disease}
                    {@const completed = completedDiseases.has(disease.name)}
                    {@const partiallyCompleted = partiallyCompletedDiseases.has(
                        disease.name,
                    )}
                    <div>
                        <h2
                            class="text-lg font-semibold {completed
                                ? 'bg-green-400'
                                : partiallyCompleted
                                  ? 'bg-yellow-400'
                                  : 'bg-red-400'}"
                        >
                            {disease.name}
                        </h2>
                    </div>
                {/each}
            </div>
        </section>
        <button on:click={startGame} class="bg-slate-600">Start Game</button>
    </div>
{/if}

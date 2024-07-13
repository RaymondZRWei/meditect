<script lang="ts">
    import userData from "$lib/store/userData";
    import { diseases } from "$lib/data/diseases";

    import WelcomeModal from "./WelcomeModal.svelte";
    import game from "$lib/store/game";
    import type { StoredUserData } from "$lib/types";
    import Loading from "$lib/components/Loading.svelte";

    const startGame = () => {
        // Picking a random disease
        const randomDisease =
            diseases[Math.floor(Math.random() * diseases.length)];

        const gameData = randomDisease.getDefaultGameData();

        // Updating the game data
        game.set(gameData);
    };

    const getUserCompletedDiseases = (userData: StoredUserData) => {
        if (!userData)
            return {
                completedDiseases: null,
                partiallyCompletedDiseases: null,
            };

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

    $: ({ completedDiseases, partiallyCompletedDiseases } =
        getUserCompletedDiseases($userData));
</script>

{#if $userData === undefined}
    <Loading />
{/if}

<WelcomeModal />

<div class="mt-16">
    <div class="grid grid-cols-10 gap-8">
        <div class="col-span-7">
            <h1 class="text-5xl font-bold mb-5">Dashboard</h1>
            <p class="text-slate-500 mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                consequatur unde recusandae aliquid, amet accusamus vitae
                consectetur, omnis quo porro necessitatibus. Est quam libero
                incidunt dolores voluptatum accusamus ab dolorem.
            </p>
            <section>
                <h2 class="text-3xl font-bold mb-6">Disease Certifications</h2>
                <div class="grid grid-cols-2 gap-4">
                    {#each diseases as disease}
                        <div
                            class="flex justify-between items-center bg-slate-100 rounded-xl p-5"
                        >
                            <h2 class="text-lg font-semibold">
                                {disease.name}
                            </h2>
                            {#if completedDiseases !== null && partiallyCompletedDiseases !== null}
                                {@const completed = completedDiseases.has(
                                    disease.name,
                                )}
                                {@const partiallyCompleted =
                                    partiallyCompletedDiseases.has(
                                        disease.name,
                                    )}
                                <div
                                    class="size-3 rounded-full {completed
                                        ? 'bg-green-400'
                                        : partiallyCompleted
                                          ? 'bg-yellow-400'
                                          : 'bg-red-400'}"
                                ></div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </section>
        </div>
        <div class="flex flex-col gap-3 col-span-3">
            <section class="p-8 bg-slate-100 rounded-xl flex flex-col gap-3">
                <button
                    on:click={startGame}
                    class="bg-primary hover:bg-primary-dark transition-colors px-6 py-3.5 rounded-lg text-white outline-none"
                >
                    Start Game
                </button>
                <button
                    on:click={startGame}
                    class="bg-secondary hover:bg-secondary-dark transition-colors px-6 py-3.5 rounded-lg text-white outline-none"
                >
                    Past Games
                </button>
            </section>
            <section class="grow p-8 bg-slate-100 rounded-xl">
                {#if $userData && completedDiseases !== null && partiallyCompletedDiseases !== null}
                    <h2 class="text-3xl font-bold mb-6">Account Stats</h2>
                    <div class="flex flex-col gap-4">
                        <div>
                            <h3 class="text-lg font-semibold">
                                Games Completed
                            </h3>
                            <p class="text-base text-slate-500">
                                {$userData.games.length}
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold">Completions</h3>
                            <p class="text-base text-slate-500">
                                {completedDiseases.size}
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold">
                                Partial Completions
                            </h3>
                            <p class="text-base text-slate-500">
                                {partiallyCompletedDiseases.size}
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold">
                                Failed Completions
                            </h3>
                            <p class="text-base text-slate-500">
                                {$userData.games.length -
                                    completedDiseases.size -
                                    partiallyCompletedDiseases.size}
                            </p>
                        </div>
                    </div>
                {/if}
            </section>
        </div>
    </div>
</div>

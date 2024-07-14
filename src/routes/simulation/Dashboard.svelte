<script lang="ts">
    import colors from "tailwindcss/colors";

    import type { StoredUserData } from "$lib/types";
    import { diseases } from "$lib/data/diseases";
    import userData from "$lib/store/userData";
    import game from "$lib/store/game";

    import microCredential from "$lib/images/micro-credential.png";

    import WelcomeModal from "./WelcomeModal.svelte";
    import Loading from "$lib/components/Loading.svelte";

    const startGame = () => {
        // Picking a random disease
        const randomDisease =
            diseases[Math.floor(Math.random() * diseases.length)];

        const gameData = structuredClone(randomDisease.getDefaultGameData());

        game.set(gameData);
    };

    const downloadCredentials = () => {
        const completedDiseases =
            getUserCompletedDiseases($userData).completedDiseases;
        const partiallyCompletedDiseases =
            getUserCompletedDiseases($userData).partiallyCompletedDiseases;

        if (!completedDiseases || !partiallyCompletedDiseases) {
            return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const image = new Image();
        image.src = microCredential;

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            const imageWidth = image.width;

            let currentHeight = 225;

            const fontSize = 18;

            for (const disease of diseases) {
                ctx.font = `${fontSize}px Arial`;
                ctx.fillStyle = colors.black;

                const textX = 50;
                const textY = currentHeight;

                ctx.fillText(disease.name, textX, textY);

                const circleX = imageWidth - 50;
                const circleY = currentHeight - fontSize / 2;
                const circleRadius = fontSize / 2.75;

                ctx.beginPath();
                ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);

                if (completedDiseases.has(disease.name)) {
                    ctx.fillStyle = colors.green[400];
                } else if (partiallyCompletedDiseases.has(disease.name)) {
                    ctx.fillStyle = colors.yellow[400];
                } else {
                    ctx.fillStyle = colors.red[400];
                }

                ctx.fill();

                currentHeight += fontSize * 1.7;
            }

            // Random 20 character string of numbers and letters
            const randomString = Math.random().toString(36).substring(2, 22);

            ctx.font = "13px Arial";
            ctx.fillStyle = colors.white;
            const text = `ID: ${randomString}`;

            const textWidth = ctx.measureText(text).actualBoundingBoxRight;

            const textX = canvas.width - textWidth - 8;
            const textY =
                canvas.height -
                8 -
                ctx.measureText(text).actualBoundingBoxAscent;

            ctx.fillText(text, textX, textY);

            const dataURL = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = dataURL;
            link.download = `micro-credential-${randomString}.png`;
            link.click();
        };
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

<div class="mt-12">
    <div class="grid grid-cols-10 gap-8">
        <div class="col-span-7">
            <h1 class="text-5xl font-bold mb-6">Dashboard</h1>
            <p class="text-slate-500 mb-10">
                Complete the simulation to earn credentials for the following
                ailments. Make use of the qualitative and quantitative data to
                diagnose and treat each patient. Beware, you are judged on speed
                and accuracy!
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
                    Start Simulation
                </button>
                <button
                    on:click={downloadCredentials}
                    class="bg-secondary hover:bg-secondary-dark transition-colors px-6 py-3.5 rounded-lg text-white outline-none"
                >
                    Download Credentials
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

<script lang="ts">
    import { fade } from "svelte/transition";
    import { createDialog, melt } from "@melt-ui/svelte";

    import game from "$lib/store/game";
    import userData from "$lib/store/userData";
    import type { GameResult } from "$lib/types";

    const {
        elements: { overlay, content, title, description, portalled },
    } = createDialog({
        forceVisible: true,
    });

    let lastHintIndexShown: number | null = $game
        ? structuredClone($game.doctorHints).length || null
        : null;

    const saveAndGoToDashboard = () => {
        if (!$game) return;

        userData.update((data) => {
            if (!data) return data;

            const storedGame: GameResult = {
                bloodPressureDiastolic: $game.bloodPressureDiastolic,
                bloodPressureSystolic: $game.bloodPressureSystolic,
                disease: $game.disease,
                elapsedTime: $game.elapsedTime,
                heartRate: $game.heartRate,
                doctorHints: $game.doctorHints,
                doctorIntervention: $game.doctorIntervention,
            };

            data.games.push(storedGame);

            return data;
        });

        game.set(null);
    };
</script>

{#if $game}
    {@const totalDoctorHints = $game.doctorHints.length}

    {#if $game.finished}
        {@const diseaseName = $game.disease.name}

        <div use:melt={$portalled}>
            <div
                use:melt={$overlay}
                class="fixed inset-0 z-50 bg-black/50"
                transition:fade={{ duration: 150 }}
            />
            <div
                class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white
            p-6 shadow-lg"
                transition:fade={{
                    duration: 150,
                }}
                use:melt={$content}
            >
                {#if $game.doctorIntervention}
                    <h2
                        use:melt={$title}
                        class="m-0 text-lg font-medium text-black"
                    >
                        Treatment Failed
                    </h2>
                {:else}
                    <h2
                        use:melt={$title}
                        class="m-0 text-lg font-medium text-black"
                    >
                        Treatment Successful
                    </h2>
                {/if}
                <p
                    use:melt={$description}
                    class="mb-5 mt-2 leading-normal text-slate-600"
                >
                    {#if $game.doctorIntervention}
                        <div>
                            {$game.doctorIntervention}
                        </div>
                    {:else}
                        <div>
                            You have successfully treated the patient.
                            You had {totalDoctorHints} doctor hints.
                        </div>
                    {/if}
                </p>

                <button
                    on:click={saveAndGoToDashboard}
                    class="bg-primary hover:bg-primary-dark transition-colors px-6 py-3 rounded-lg text-white outline-none"
                >
                    Save Score
                </button>
            </div>
        </div>
    {:else if totalDoctorHints !== 0 && lastHintIndexShown !== totalDoctorHints}
        {@const hintMessage = $game.doctorHints[totalDoctorHints - 1]}

        <div use:melt={$portalled}>
            <div
                use:melt={$overlay}
                class="fixed inset-0 z-50 bg-black/50"
                transition:fade={{ duration: 150 }}
            />
            <div
                class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw]
        max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white
        p-6 shadow-lg"
                transition:fade={{
                    duration: 150,
                }}
                use:melt={$content}
            >
                <h2
                    use:melt={$title}
                    class="m-0 text-lg font-medium text-black"
                >
                    Head Doctor Hint
                </h2>
                <p
                    use:melt={$description}
                    class="mb-5 mt-2 leading-normal text-slate-600"
                >
                    {hintMessage}
                </p>

                <button
                    on:click={() => {
                        lastHintIndexShown = totalDoctorHints;
                    }}
                    class="bg-slate-200 hover:bg-slate-300 transition-colors px-6 py-3 rounded-lg outline-none"
                >
                    Close
                </button>
            </div>
        </div>
    {/if}
{/if}

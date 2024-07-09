<script lang="ts">
    import { onMount, type ComponentType, onDestroy } from "svelte";
    import type { Unsubscriber } from "svelte/motion";
    import { page } from "$app/stores";
    import game, { type GameData } from "$lib/stores/game";
    import { listsOverLap, randomInt } from "$lib/utils";

    import FaHome from "svelte-icons/fa/FaHome.svelte";
    import FaDollarSign from "svelte-icons/fa/FaDollarSign.svelte";
    import FaPlus from "svelte-icons/fa/FaPlus.svelte";
    import { type EventData } from "$lib/data/events";
    import EventModal from "./EventModal.svelte";
    import EndScreen from "./EndScreen.svelte";
    import tutorialStage from "$lib/stores/tutorialStage";
    import Stat from "$lib/components/Stat.svelte";
    import IconChecklist from "~icons/solar/checklist-minimalistic-linear";
    import CheckList from "./Checklist.svelte";
    import Checklist from "./Checklist.svelte";

    let pageURL = "";
    let pageUnsubscribe: Unsubscriber;

    onMount(() => {
        pageUnsubscribe = page.subscribe((p) => {
            pageURL = p.url.pathname;
        });
    });

    onDestroy(() => {
        if (pageUnsubscribe) {
            pageUnsubscribe();
        }
    });

    interface Page {
        name: string;
        icon: ComponentType;
        route: string;
    }

    const pages: Page[] = [
        {
            name: "Dashboard",
            icon: FaHome,
            route: "/play",
        },
    ];

    let eventModal: EventData | null = null;

    const advanceStage = () => {
        tutorialStage.update((t) => {
            if (t === 6) {
                t = 7;
            } else if (t === 7) {
                t = 8;
            }
            return t;
        });

        game.update((g) => {
            return g;
        });
    };


    // TODO: SET ITEMS AS THE SAME DATA TYPE AS EVERYTHING ELSE
    let openChecklist = false;
    let items;

    onMount(() => {
        let checklist = localStorage.getItem("checklist");
        if (checklist)
        items = JSON.parse(checklist);
    });
</script>

<EndScreen />

{#if !$game.loading}
    <div
        class="modal"
        class:modal-open={$tutorialStage === 0 && pageURL !== "/play/portfolio"}
    >
        <div class="modal-box">
            <h3 class="font-bold text-3xl">Welcome to Market Master</h3>
            <p class="py-4">
                <!-- TODO: PUT INTRO HERE -->
            </p>

            <div class="modal-action">
                <a
                    class="btn btn-primary"
                    href="/play"
                    on:click={() => $tutorialStage++}
                >
                    Start
                </a>
            </div>
        </div>
    </div>

    <main class="max-w-screen-lg mx-auto min-h-screen flex flex-col relative">
        <!-- TODO: TUTORIAL TIP FOR ADVANCE BUTTON -->
        {#if $tutorialStage === 6}
            <div class="absolute top-20 right-10 z-50">
                <div
                    class="tooltip tooltip-open tooltip-bottom tooltip-primary"
                    data-tip="Click to advance"
                />
            </div>
        {/if}

        <div class="stats shadow my-7">
            <!-- TODO: ADD STATISTICAL DATA HERE USING STAT COMPONENT -->
            <!-- Example: -->
            <Stat
                title="Example"
                value="123"
                datatip="This pops up on hover"
                symbol={FaDollarSign}
            />
            <Stat
                title="Example"
                value="123"
                datatip="This pops up on hover"
                symbol={FaDollarSign}
            />
            <!-- TODO: FINAL STAT FOR ADVANCING -->
            <div class="stat">
                <div class="stat-title">HP</div>
                <div class="stat-value">
                    1 <span class="text-xl">/ 60</span>
                </div>
                <div class="stat-figure">
                    <button
                        class="btn btn-primary btn-xs"
                        on:click={advanceStage}
                    >
                        <div class="h-3 w-3"><FaPlus /></div>
                    </button>
                </div>
            </div>
        </div>

        <div class="grow relative">
            <div class="absolute inset-0 h-full w-full">
                <slot />
            </div>
        </div>

        <!-- TODO: CHANGE THESE FOOTER BUTTONS -->
        <div class="w-full h-[4rem] flex items-stretch my-4">
            {#each pages as page}
                {@const onPage = pageURL === page.route}
                {@const showDashboardTooltip =
                    page.name === "Dashboard" && $tutorialStage === 4}
                <a
                    href={page.route}
                    class="text-center flex flex-col items-center justify-center btn-ghost rounded-md !bg-opacity-5 w-full {onPage &&
                        'btn-active'}"
                    on:click={() => {
                        if (showDashboardTooltip) {
                            tutorialStage.set(5);
                        }
                    }}
                >
                    <div
                        class={showDashboardTooltip
                            ? "tooltip tooltip-open tooltip-primary"
                            : ""}
                        data-tip="Click to go to the dashboard"
                    >
                        <div
                            class="h-[1.1rem] w-[1.1rem] opacity-90 mx-auto mb-0.5"
                        >
                            <svelte:component this={page.icon} />
                        </div>
                        <span class="btm-nav-label">{page.name}</span>
                    </div>
                </a>
            {/each}
        </div>
    </main>

    <button
        class="absolute bottom-1 left-1 h-20 w-20 flex items-center justify-center"
        on:click={() => (openChecklist = true)}
    >
        <IconChecklist class="w-full h-1/2 my-4" />
    </button>

    <Checklist bind:items bind:isOpen={openChecklist} />

    <EventModal event={eventModal} />
{/if}

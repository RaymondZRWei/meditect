<script lang="ts">
    import { onMount, type ComponentType } from "svelte";

    import type { GameData } from "$lib/types";

    import Fa6SolidHouse from "~icons/fa6-solid/house";
    import PhJarLabelFill from "~icons/ph/jar-label-fill";
    import F7Dial from "~icons/f7/dial";
    import MaterialSymbolsAlarm from "~icons/material-symbols/alarm";
    import MaterialSymbolsMonitorHeart from "~icons/material-symbols/monitor-heart";
    import MaterialSymbolsAddChart from "~icons/material-symbols/add-chart";

    import Stat from "$lib/components/Stat.svelte";
    import Tests from "./Tests.svelte";
    import Treatments from "./Treatments.svelte";
    import Dashboard from "./Dashboard.svelte";
    import { browser } from "$app/environment";
    import WelcomeModal from "./WelcomeModal.svelte";

    let pageIndex = 0;
    let game: GameData | null | undefined = undefined;

    onMount(() => {
        if (browser) {
            const storedValue = window.localStorage.getItem("gameData");

            if (storedValue) {
                game = JSON.parse(storedValue) as GameData;
            } else {
                game = null;
            }
        }
    });

    interface Page {
        name: string;
        icon: ComponentType;
    }

    const pages: Page[] = [
        {
            name: "Dashboard",
            icon: Fa6SolidHouse,
        },
        {
            name: "Treatments",
            icon: PhJarLabelFill,
        },
        {
            name: "Tests",
            icon: MaterialSymbolsAddChart,
        },
    ];
</script>

<main
    class="max-w-screen-lg mx-auto min-h-screen grid relative bg-orange-400"
    style="grid-template-rows: auto 1fr auto;"
>
    <div class="flex gap-3">
        <Stat
            title="Heart Rate"
            value={game?.heartRate ?? 60}
            tooltip="This pops up on hover"
            symbol={MaterialSymbolsMonitorHeart}
        />
        <Stat
            title="Blood Pressure"
            value={game?.heartRate ?? 100}
            tooltip="This pops up on hover"
            symbol={F7Dial}
        />

        <Stat
            title="Elapsed Time"
            value={game?.heartRate ?? 0}
            tooltip="This pops up on hover"
            symbol={MaterialSymbolsAlarm}
        />
    </div>

    {#if game === undefined}
        <div>Loading Game...</div>
    {:else if game === null}
        <div></div>
        <WelcomeModal />
    {:else}
        <div>
            {#if pageIndex === 0}
                <Dashboard bind:game />
            {:else if pageIndex === 1}
                <Treatments bind:game />
            {:else if pageIndex === 2}
                <Tests bind:game />
            {/if}
        </div>
    {/if}

    <div class="w-full flex items-stretch my-4">
        {#each pages as page, i}
            {@const isActivePage = i === pageIndex}
            <button
                class="text-center flex flex-col p-4 items-center justify-center rounded-md w-full {isActivePage
                    ? 'bg-violet-700'
                    : 'bg-violet-100'}"
                on:click={() => {
                    pageIndex = i;
                }}
            >
                <svelte:component
                    this={page.icon}
                    class="size-6 opacity-90 mx-auto mb-0.5"
                />
                <span>{page.name}</span>
            </button>
        {/each}
    </div>
</main>

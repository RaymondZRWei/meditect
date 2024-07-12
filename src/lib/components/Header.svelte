<script lang="ts">
    import { page } from "$app/stores";

    import logo from "$lib/images/logo.png";
    import game from "$lib/store/game";

    interface Route {
        name: string;
        path: string;
    }

    const routes: Route[] = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Statistics", path: "/stats" },
    ];
    $: isPlaying = $page.url.pathname.includes("/game") && $game;
</script>

<header
    class="py-8 px-12 flex overflow-auto {isPlaying
        ? 'absolute'
        : 'sticky z-50 bg-white shadow-md w-full'} top-0 justify-between items-center"
>
    <a href={routes[0].path} class="flex items-center gap-3">
        <img src={logo} alt="Med Ed Logo" class="size-12" />
        {#if !isPlaying && $game !== undefined}
            <div class="mt-2 text-4xl font-bold tracking-tight">Med Ed</div>
        {/if}
    </a>
    {#if !isPlaying}
        <div class="flex gap-14 items-center text-lg">
            {#each routes as { name, path }}
                <a
                    href={path}
                    class={$page.url.pathname === path
                        ? "text-primary"
                        : "text-slate-500"}
                >
                    {name}
                </a>
            {/each}
        </div>
    {/if}
</header>

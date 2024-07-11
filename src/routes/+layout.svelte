<script lang="ts">
    import "./global.css";

    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { Toaster } from "svelte-french-toast";

    // TODO: ADD A LOGO
    // import logo from "$lib/images/logo.png";

    interface Route {
        name: string;
        path: string;
    }

    const routes: Route[] = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        // { name: "History", path: "/history" },
        { name: "Statistics", path: "/stats" },
    ];

    $: isPlaying = $page.url.pathname.includes("/game");
</script>

<header
    class="p-10 w-full flex overflow-auto {isPlaying
        ? 'md:absolute'
        : 'md:sticky z-50 bg-fuchsia-400'} md:top-0 justify-between items-center"
>
    <a href="/" class="flex items-center gap-5">
        <img alt="Med Ed Logo" class="h-[3.25rem] w-[3.25rem]" />
        {#if !isPlaying}
            <div class="mt-2 text-3xl font-bold">Med Ed</div>
        {/if}
    </a>
    {#if !isPlaying}
        <div class="flex gap-14 items-center text-lg mt-4">
            {#each routes as { name, path }}
                <a
                    href={path}
                    class={$page.url.pathname === path
                        ? "text-primary"
                        : "opacity-80"}
                >
                    {name}
                </a>
            {/each}
        </div>
    {/if}
</header>

<slot />

<Toaster />

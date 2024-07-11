<script lang="ts">
    import "./global.css";

    import { page } from "$app/stores";
    import { Toaster } from "svelte-french-toast";

    import Header from "$lib/components/Header.svelte";
    import game from "$lib/store/game";

    $: isPlaying = $page.url.pathname.includes("/game") && $game;
</script>

<div
    class="min-h-screen grid {isPlaying
        ? 'grid-rows-[auto]'
        : 'grid-rows-[auto_1fr]'}"
>
    <Header />

    <main class="h-full w-full">
        <slot />
    </main>
</div>

<Toaster />

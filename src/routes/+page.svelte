<script lang="ts">
    import Scene from "$lib/components/Scene.svelte";
</script>

<section class="grid h-full pb-32 pt-24 pl-24 grid-cols-8">
    <div class="pt-24 col-span-5">
        <h1
            class="mb-4 text-4xl font-bold tracking-tight !leading-[1.1] md:text-5xl xl:text-6xl"
        >
            Medical Education through
            <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
            >
                Simulated Experience
            </span>
        </h1>
        <p class="mb-6 opacity-70 md:mb-8 md:text-lg lg:text-xl">
            There was a problem with learning medicine, it was boring! Med Ed
            solves that issue with game driven teaching where learning isn't
            just not boring, it's fun!
        </p>
        <div>
            <a
                class="bg-primary text-white rounded-lg px-6 py-3.5"
                href="/game"
            >
                Start Playing
            </a>
        </div>
    </div>
    <div class="col-span-3">
        <Scene />
    </div>
</section>

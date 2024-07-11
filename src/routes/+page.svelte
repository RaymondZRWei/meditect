<script lang="ts">
    import Scene from "$lib/components/Scene.svelte";
</script>

<section>
    <div
        class="grid max-w-screen-xl h-fit px-8 py-4 mx-auto md:grid-rows-none md:gap-8 xl:gap-0 md:py-16 md:grid-cols-12"
    >
        <div
            class="w-auto mr-auto place-self-center md:col-start-1 md:col-end-9"
        >
            <h1
                class="mb-4 text-4xl font-bold tracking-tight !leading-[1.1] md:text-5xl xl:text-6xl"
            >
                Medical Education through
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400"
                >
                    Simulated Experience
                </span>
            </h1>
            <p class="mb-6 opacity-70 md:mb-8 md:text-lg lg:text-xl">
                There was a problem with learning medicine, it was boring! Med
                Ed solves that issue with game driven teaching where learning
                isn't just not boring, it's fun!
            </p>
            <a class="bg-orange-500" href="/game">Start Playing</a>
        </div>
        <div
            class="hidden md:block -mx-[50px] md:-mx-[250px] md:col-start-10 md:col-end-12"
        >
            <Scene />
        </div>
    </div>
</section>

<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import gsap from "gsap";
    import ScrollTrigger from "gsap/dist/ScrollTrigger";

    import Footer from "$lib/components/Footer.svelte";
    import Scene from "$lib/components/Scene.svelte";

    import MdiGithub from "~icons/mdi/github";
    import SimpleIconsDevpost from "~icons/simple-icons/devpost";

    if (browser) {
        gsap.registerPlugin(ScrollTrigger);
    }

    onMount(() => {
        // Scroll Indicator
        gsap.to("#mouse", {
            opacity: 0,
            scrollTrigger: {
                trigger: "#content",
                start: "top bottom-=100",
                end: "top bottom-=100",
                scrub: true,
                // markers: true,
            },
        });
    });

    interface TeamMember {
        name: string;
        image: string;
        devPostLink: string;
        githubLink: string;
    }

    const teamMembers: TeamMember[] = [
        {
            name: "Gabe D'Souza",
            image: "src/lib/images/gabe.webp",
            devPostLink: "https://devpost.com/principle105",
            githubLink: "https://github.com/principle105",
        },
        {
            name: "Raymond Wei",
            image: "src/lib/images/raymond.webp",
            devPostLink: "https://devpost.com/raymondweizr",
            githubLink: "https://github.com/RaymondZRWei",
        },
        {
            name: "Henry Wei",
            image: "src/lib/images/henry.webp",
            devPostLink: "https://devpost.com/henryweihw",
            githubLink: "https://github.com/HenryWei8",
        },
        {
            name: "Elijah Won",
            image: "src/lib/images/elijah.webp",
            devPostLink: "https://devpost.com/ejinsw",
            githubLink: "https://github.com/ejinsw",
        },
    ];
</script>

<div class="relative">
    <section
        class="grid h-full pb-32 pt-12 grid-cols-5 max-w-screen-xl mx-auto"
    >
        <div class="pt-20 col-span-3">
            <h1
                class="mb-4 text-4xl font-mono tracking-tighter !leading-[1.2] font-bold md:text-5xl xl:text-6xl"
            >
                Micro-Credentials through a
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                >
                    Simulated Experience
                </span>
            </h1>
            <p class="mb-6 text-slate-500 md:mb-10 md:text-lg lg:text-xl">
                Bridging theory and practice in medicine.
            </p>
            <div>
                <a
                    class="bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg px-6 py-4"
                    href="/simulation"
                >
                    Start Simulation
                </a>
            </div>
        </div>
        <div class="col-span-2">
            <Scene />
        </div>
    </section>

    <div
        class="w-10 h-16 border-[3px] border-slate-400 rounded-3xl fixed z-20 bottom-8 left-1/2 before:w-3 before:h-3 before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:bg-slate-400 before:rounded-full before:animate-wheel transition-opacity"
        id="mouse"
    />

    <div class="flex flex-col pt-24" id="content">
        <div class="max-w-screen-lg mx-auto">
            <section class="mb-32">
                <h2 class="text-6xl font-bold text-center mb-14">About</h2>

                <h3 class="font-semibold mb-6 text-4xl">Our Mission</h3>
                <p class="text-slate-500 mb-14 text-lg">
                    Medical Education is still old school. Textbooks,
                    long-breathed articles, scholastic journals, and other dry
                    sources are the only way to keep up-to-date with vital,
                    potentially life depending, information. In other
                    industries, skills are easy to maintain and develop with
                    technology providing so many dynamic and quality resources,
                    however, medicine has yet to reach that point still. Our
                    mission is to solve this crisis with content that is
                    accurate, relevant, and fun to learn.
                </p>

                <h3 class="font-semibold mb-6 text-4xl">
                    Game Driven Learning
                </h3>
                <p class="text-slate-500 mb-14 text-lg">
                    Learning, especially learning medicine, is an extremely
                    arduous, tedious, and painful journey. Nurses, doctors, and
                    other practictioners sacrifice hundreds of thousands of
                    dollars on school along with years of work for this effect.
                    However, even after they finish that long process, they are
                    still faced with the fact that medicine is growing and
                    changing. By introducing a game-like experience to learning
                    material, we hope to alleviate some of this pain by turning
                    a lifelong burden into something much more pleasant and fun.
                </p>

                <h3 class="font-semibold mb-6 text-4xl">Continuous Learning</h3>
                <p class="text-slate-500 mb-14 text-lg">
                    A traditional education is often forgettable or even
                    dreaded. Our system ensures a fully immersive and dynamic
                    interface that constantly challenges medical professionals
                    to be in the moment while learning. It turns books into
                    battles and concepts into experiences. By the time you
                    finish, it is our hope that you'll not only know more, but
                    come back hungrier than before.
                </p>
            </section>
            <section>
                <h2 class="text-6xl font-bold text-center mb-14">Our Team</h2>
                <div
                    class="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-32"
                >
                    {#each teamMembers as teamMember}
                        <div class="text-center">
                            <img
                                class="rounded-xl sm:size-48 lg:size-60 mx-auto"
                                src={teamMember.image}
                                alt={teamMember.name}
                            />
                            <div class="mt-2 sm:mt-4">
                                <h3
                                    class="text-sm font-medium text-slate-800 sm:text-base lg:text-lg"
                                >
                                    {teamMember.name}
                                </h3>
                                <div class="flex justify-center gap-1 mt-1">
                                    <a
                                        href={teamMember.devPostLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-slate-600 hover:text-slate-800 transition-colors"
                                    >
                                        <SimpleIconsDevpost class="w-6 h-6" />
                                    </a>
                                    <a
                                        href={teamMember.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-slate-600 hover:text-slate-800 transition-colors"
                                    >
                                        <MdiGithub class="w-6 h-6" />
                                    </a>
                                    {#if teamMember.name == "Raymond Wei"}
                                        <a
                                            href={"https://github.com/inconspicuousaltacc"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            <MdiGithub class="w-6 h-6" />
                                        </a>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>
        </div>
    </div>

    <Footer />
</div>

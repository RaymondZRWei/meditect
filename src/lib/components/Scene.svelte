<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Dna from "./Dna.svelte";
</script>

<div class="relative w-full" style="padding-bottom: calc(100% / (16 / 9));">
    <div class="absolute top-0 left-0 w-full h-full">
        <Canvas shadows>
            <Dna />
        </Canvas>
    </div>
</div>

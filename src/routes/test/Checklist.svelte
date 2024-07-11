<script lang="ts">
    export let isOpen: boolean = false;
    export let items = [
        {
            disease: "Disease1",
            treatments: ["Med1", "Med2", "Med3"],
            checked: false,
            notes: "",
        },
        {
            disease: "Disease2",
            treatments: ["Med1", "Med2", "Med3"],
            checked: false,
            notes: "",
        },
        {
            disease: "Disease3",
            treatments: ["Med1", "Med2", "Med3"],
            checked: false,
            notes: "",
        },
        {
            disease: "Disease4",
            treatments: ["Med1", "Med2", "Med3"],
            checked: false,
            notes: "",
        },
        {
            disease: "Disease5",
            treatments: ["Med1", "Med2", "Med3"],
            checked: false,
            notes: "",
        },
    ];
</script>

<div class="modal" class:modal-open={isOpen}>
    <div class="modal-box">
        <h3 class="font-bold text-3xl">Checklist</h3>

        <!-- Items -->
        <div class="mt-4 h-80 flex flex-col overflow-auto">
            {#each items as item}
                <div class="collapse !pointer-events-none !overflow-visible">
                    <input
                        type="checkbox"
                        class="pointer-events-auto w-10/12"
                    />
                    <div
                        class="collapse-title flex justify-center items-center"
                    >
                        <span class="flex flex-col justify-center items-start">
                            <h3 class="text-lg">{item.disease}</h3>
                            <div class="font-extralight text-secondary">
                                {#each item.treatments as treatment}
                                    <span>{treatment + " "}</span>
                                {/each}
                            </div>
                        </span>
                        <span class="ml-auto">
                            <input
                                type="checkbox"
                                class="z-100 pointer-events-auto"
                                bind:checked={item.checked}
                            />
                        </span>
                    </div>
                    <div class="collapse-content overflow-auto">
                        <div
                            class=" h-fit flex justify-center items-center p-4"
                        >
                            <textarea
                                name="paragraph_text"
                                class="textarea textarea-bordered w-full h-20 py-1 px-2 pointer-events-auto"
                                bind:value={item.notes}
                            />
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="modal-action">
            <button
                class="btn"
                on:click={() => {
                    isOpen = false;
                    localStorage.setItem("checklist", JSON.stringify(items));
                }}
            >
                Close
            </button>
        </div>
    </div>
</div>

<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import { onMount } from "svelte";
  import SemicircleGauge from "./SemicircleGauge.svelte";

  const value1 = writable<number | null>(null);
  const value2 = writable<number | null>(null);
  const value3 = writable<number | null>(null);
  const value4 = writable<number | null>(null);

  function updateValue(event: Event, store: Writable<number | null>): void {
      const target = event.target as HTMLInputElement;
      store.set(Number(target.value));
  }

  onMount(() => {
      document.querySelectorAll(".buttons").forEach((button) => {
          const originalText = button.textContent;
          button.addEventListener("mouseover", function () {
              button.textContent = button.getAttribute("data-hover");
          });
          button.addEventListener("mouseout", function () {
              button.textContent = originalText;
          });
      });
  });
</script>

<main>
  <div class="box">
      <div class="gauge">
          <input
              type="range"
              min="0"
              max="30"
              bind:value={$value1}
              on:input={(e) => updateValue(e, value1)}
          />
          <SemicircleGauge
              value={value1}
              maxValue={30}
              width={200}
              height={100}
          />
      </div>
      <div class="first">
          <div class="top">Respiratory Rate</div>
          <div class="bottom">Breaths per Min</div>
      </div>
      <div class="second">
          <button class="buttons" data-hover="1 minute"
              >Count Respiratory Rate
          </button>
      </div>
  </div>

  <div class="box">
      <div class="gauge">
          <input
              type="range"
              min="0"
              max="100"
              bind:value={$value2}
              on:input={(e) => updateValue(e, value2)}
          />
          <SemicircleGauge
              value={value2}
              maxValue={100}
              width={200}
              height={100}
          />
      </div>
      <div class="first">
          <div class="top">Oxygen Saturation</div>
          <div class="bottom">% SpO2</div>
      </div>
      <div class="second">
          <button class="buttons" data-hover="1 minute"
              >Use Pulse Oximetry
          </button>
      </div>
  </div>

  <div class="box">
      <div class="gauge">
          <input
              type="range"
              min="50"
              max="250"
              bind:value={$value3}
              on:input={(e) => updateValue(e, value3)}
          />
          <SemicircleGauge
              value={value3}
              maxValue={250}
              width={200}
              height={100}
          />
      </div>
      <div class="first">
          <div class="top">Blood Glucose Level</div>
          <div class="bottom">mg/dL</div>
      </div>
      <div class="second">
          <button class="buttons" data-hover="30 seconds"
              >Measure with Glucometer</button
          >
      </div>
  </div>
  <div class="box">
      <div class="gauge">
          <input
              type="range"
              min="0"
              max="100"
              bind:value={$value4}
              on:input={(e) => updateValue(e, value4)}
          />
          <SemicircleGauge
              value={value4}
              maxValue={100}
              width={200}
              height={100}
          />
      </div>
      <div class="first">
          <div class="top">Pain Level</div>
          <div class="bottom">Scale of 0-100</div>
      </div>
      <div class="second">
          <button class="buttons" data-hover="15 seconds"
              >Ask Patient
          </button>
      </div>
  </div>
</main>

<style>
  main {
      display: flex;
      font-family: Arial, sans-serif;
      flex-direction: column;
      text-align: center;
      gap: 30px;
      margin-top: 100px;
  }
  .gauge {
      width: 185px;
  }
  .box {
      display: flex;
      flex-direction: row;
      width: 700px;
      height: 130px;
      background-color: #cbc3e3;
      margin-left: 10%;
      justify-content: flex-start;
      border-radius: 15px;
  }
  input {
      margin-bottom: 10px;
  }
  .first {
      width: 200px;
      display: flex;
      flex-direction: column;
      margin-top: 40px;
  }
  .top {
      font-weight: bolder;
      color: #2b2d42;
      font-size: 18px;
  }
  .bottom {
      font-weight: 80;
      color: grey;
      font-size: 13px;
  }
  .second {
      margin-left: 60px;
      font-weight: 80;
      color: #2b2d42;
      font-size: 13px;
      margin-top: 45px;
  }
  button {
      width: 180px;
      height: 40px;
      border-radius: 20px;
      border: 2px solid black;
  }
  button:hover {
      background-color: rgb(180, 173, 206);
  }
</style>
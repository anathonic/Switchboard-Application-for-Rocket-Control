<template>
  <div class="bg-gray-800 min-h-screen sm:p-10 p-5 flex flex-col justify-center duration-500 transition-all ease-in-out">
    <Pcb
        :topSwitchesStates="topSwitchesStates"
        :bottomSwitchesStates="bottomSwitchesStates"
        @update:topSwitchesStates="updateTopSwitchesStates"
        @update:bottomSwitchesStates="updateBottomSwitchesStates"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMqtt } from "@/composables/useMqtt";
import { MqttConfig } from "@/models/mqttConfig";
import Pcb from "@/components/p5/Pcb.vue";
import {Switch, topSwitches, bottomSwitches} from "@/switchesConfig";
let counter = 0;

const mqttConfig: MqttConfig = {
  transport: 'tcp',
  port: 9001,
  ip: '127.0.0.1'
};
const topic = "PUT"

const messageHandler = (_topic: string, _message: Buffer) => {};

const { isConnected, publish } = useMqtt(mqttConfig, topic, messageHandler);

const topSwitchesStates = ref([false, false, false, false, false, false]);
const bottomSwitchesStates = ref([false, false, false, false, false, false]);

const updateTopSwitchesStates = (newStates: boolean[]) => {
  topSwitchesStates.value = newStates;
};

const updateBottomSwitchesStates = (newStates: boolean[]) => {
  bottomSwitchesStates.value = newStates;
};

// const calculateInt32FromSwitchStates = (topStates: boolean[], bottomStates: boolean[]) => {
//   let result = 0;
//   for (let i = 0; i < topStates.length; i++) {
//     if (topStates[i]) {
//       result |= 1 << i;
//     }
//   }
//   for (let i = 0; i < bottomStates.length; i++) {
//     if (bottomStates[i]) {
//       result |= 1 << (i + topStates.length);
//     }
//   }
//   return result;
// };

const calculateInt32FromSwitchStates = (topStates: boolean[], bottomStates: boolean[]) => {
  let result = 0;
  topSwitches.forEach((sw: Switch, i: number) => {
    if (topStates[i]) {
      result |= 1 << sw.mqttBit;
    }
  });
  bottomSwitches.forEach((sw: Switch, i: number) => {
    if (bottomStates[i]) {
      result |= 1 << sw.mqttBit;
    }
  });
  return result;
};

onMounted(() => {
  setInterval(() => {
    const combinedStates = calculateInt32FromSwitchStates(topSwitchesStates.value, bottomSwitchesStates.value);
    counter += 1;

    if (isConnected.value) {
      const message = JSON.stringify({
        timestamp: new Date().toISOString(),
        counter: counter,
        data: combinedStates
      });
      publish(topic, message);
    }
  }, 5000);
});
</script>

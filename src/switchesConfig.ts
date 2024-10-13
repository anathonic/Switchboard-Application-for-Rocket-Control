export interface Switch {
    type: string;
    pin: number;
    mqttBit: number;
    ledBit: number;
}

export const topSwitches: Switch[] = [
    { type: "bistable", pin: 1, mqttBit: 6, ledBit: 10 },
    { type: "bistable", pin: 2, mqttBit: 7, ledBit: 11 },
    { type: "bistable", pin: 3, mqttBit: 8, ledBit: 8 },
    { type: "bistable", pin: 4, mqttBit: 9, ledBit: 9 },
    { type: "bistable", pin: 5, mqttBit: 10, ledBit: 6 },
    { type: "bistable", pin: 6, mqttBit: 11, ledBit: 7 },
];
export const bottomSwitches: Switch[] = [
    { type: "monostable", pin: 1, mqttBit: 12, ledBit: 5 },
    { type: "monostable", pin: 2, mqttBit: 13, ledBit: 4 },
    { type: "monostable", pin: 3, mqttBit: 14, ledBit: 3 },
    { type: "monostable", pin: 4, mqttBit: 15, ledBit: 2 },
    { type: "monostable", pin: 5, mqttBit: 16, ledBit: 1 },
    { type: "monostable", pin: 6, mqttBit: 17, ledBit: 0 }
];
export default { topSwitches, bottomSwitches };

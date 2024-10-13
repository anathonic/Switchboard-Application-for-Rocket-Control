const pccTopics = {
    'pcc/sensors/gps': {
        displayName: 'PCC: GPS'
    },
    'receiver-1/telemetry-packet': {
        displayName: 'Telemetry'
    },
    'receiver-2/tracker-packet': {
        displayName: 'Tracker AV'
    },
    'pcc/sensors/scaled/inside-temperature': {
        displayName: 'PCC: CPU temperature',
        additional: {
            unit: 'ºC'
        }
    },
    'pcc/alive-states': {
        displayName: 'PCC: Alive statuses',
        keepalive: true
    },
    'receiver-3/tracker-packet': {
        displayName: 'Tracker NC'
    },
    'receiver-4/tracker-packet': {
        displayName: 'Tracker COTS'
    },
    'relayboard/switches/switchboard-2/ack': {
        displayName: 'RelayBoard: SwitchBoard-2 ack'
    },
    'relayboard/switches/switchboard-1/ack': {
        displayName: 'RelayBoard: SwitchBoard-1 ack'
    },
    'switchboard-1/switches': {
        displayName: 'SwitchBoard 1: switches'
    },
    'switchboard-1/scaled/battery-voltage-3.3V': {
        displayName: 'SwitchBoard 1: battery voltage 3.3V',
        additional: {
            unit: 'V'
        }
    },
    'switchboard-1/scaled/battery-voltage-12V-1': {
        displayName: 'SwitchBoard 1: battery voltage 12V - 1',
        additional: {
            unit: 'V'
        }
    },
    'switchboard-1/scaled/battery-voltage-12V-2': {
        displayName: 'SwitchBoard 1: battery voltage 12V - 2',
        additional: {
            unit: 'V'
        }
    },
    'pcc/calculated/mass-flow-rate': {
        displayName: 'LPB: mass flow rate [TM2]',
        additional: {
            unit: 'g/s'
        }
    },
    'pcc/calculated/pressure-diff/out-tank': {
        displayName: 'PCC: n2o out tank',
        additional: {
            unit: 'Bar'
        }
    },
    'pcc/calculated/pressure-diff/in-out': {
        displayName: 'PCC: n2o in out',
        additional: {
            unit: 'Bar'
        }
    },
    'switchboard-2/switches': {
        displayName: 'SwitchBoard-2: switches'
    },
    'switchboard-2/scaled/battery-voltage-3.3V': {
        displayName: 'SwitchBoard-2: battery voltage 3.3V',
        additional: {
            unit: 'V'
        }
    },
    'switchboard-2/scaled/battery-voltage-12V-1': {
        displayName: 'SwitchBoard-2: battery voltage 12V - 1',
        additional: {
            unit: 'V'
        }
    },
    'switchboard-2/scaled/battery-voltage-12V-2': {
        displayName: 'SwitchBoard-2: battery voltage 12V - 2',
        additional: {
            unit: 'V'
        }
    }
} as const

const lpbTopics = {
    'lpb/switches/switchboard-2/ack': {
        displayName: 'LPB: SwitchBoard-2 ack'
    },
    'lpb/switches/switchboard-1/ack': {
        displayName: 'LPB: SwitchBoard-1 ack'
    },
    'lpb/sensors/scaled/pt1': {
        displayName: 'LPB: N2O inlet pressure [PT1]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/raw/pt1': {
        displayName: 'LPB: raw N2O inlet pressure [PT1]'
    },
    'lpb/sensors/scaled/pt2': {
        displayName: 'LPB: N2O outlet pressure [PT2]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/raw/pt2': {
        displayName: 'LPB: raw N2O outlet pressure [PT2]'
    },
    'lpb/sensors/scaled/pt3': {
        displayName: 'LPB: CO2 inlet pressure [PT3]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/raw/pt3': {
        displayName: 'LPB: raw CO2 inlet pressure [PT3]'
    },
    'lpb/sensors/scaled/pt4': {
        displayName: 'LPB: chamber pressure [PT4]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/raw/pt4': {
        displayName: 'LPB: raw chamber pressure [PT4]'
    },
    'lpb/sensors/scaled/tm1': {
        displayName: 'LPB: thrust [TM1]',
        additional: {
            unit: 'kg'
        }
    },
    'lpb/sensors/raw/tm1': {
        displayName: 'LPB: raw thrust [TM1]'
    },
    'lpb/sensors/scaled/tm2': {
        displayName: 'LPB: rocket weight [TM2]',
        additional: {
            unit: 'kg'
        }
    },
    'lpb/sensors/raw/tm2': {
        displayName: 'LPB: raw rocket weight [TM2]'
    },
    'lpb/sensors/scaled/pt5': {
        displayName: 'LPB: [PT5]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/raw/pt5': {
        displayName: 'LPB: raw [PT5]'
    },
    'lpb/sensors/scaled/pt6': {
        displayName: 'LPB: [PT6]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/raw/pt6': {
        displayName: 'LPB: raw [PT6]'
    },
    'lpb/sensors/scaled/inside-temperature': {
        displayName: 'LPB: RPi temperature',
        additional: {
            unit: 'ºC'
        }
    },
    'lpb/sensors/frontend-avg/pt1': {
        displayName: 'LPB: N2O inlet pressure AVG [PT1]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/frontend-avg/pt2': {
        displayName: 'LPB: N2O outlet pressure AVG [PT2]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/frontend-avg/pt3': {
        displayName: 'LPB: CO2 outlet pressure AVG [PT3]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/frontend-avg/pt4': {
        displayName: 'LPB: chamber pressure AVG [PT4]',
        additional: {
            unit: 'Bar'
        }
    },
    'lpb/sensors/frontend-avg/tm1': {
        displayName: 'LPB: thrust AVG [TM1]',
        additional: {
            unit: 'kg'
        }
    },
    'lpb/sensors/frontend-avg/tm2': {
        displayName: 'LPB: tank AVG [TM2]',
        additional: {
            unit: 'kg'
        }
    },
    'relayboard/sensors/scaled/battery-voltage-analog-1': {
        displayName: 'RelayBoard: battery voltage A+',
        additional: {
            unit: 'V'
        }
    },
    'relayboard/sensors/raw/battery-voltage-analog-1': {
        displayName: 'RelayBoard: battery voltage raw A+'
    },
    'relayboard/sensors/scaled/battery-voltage-analog-2': {
        displayName: 'RelayBoard: battery voltage A-',
        additional: {
            unit: 'V'
        }
    },
    'relayboard/sensors/raw/battery-voltage-analog-2': {
        displayName: 'RelayBoard: battery voltage raw A-'
    },
    'relayboard/sensors/scaled/battery-voltage-12V': {
        displayName: 'RelayBoard: battery voltage 12V',
        additional: {
            unit: 'V'
        }
    },
    'relayboard/sensors/raw/battery-voltage-12V': {
        displayName: 'RelayBoard: battery voltage raw 12V'
    },
    'relayboard/sensors/scaled/battery-voltage-24V': {
        displayName: 'RelayBoard: battery voltage 24V',
        additional: {
            unit: 'V'
        }
    },
    'relayboard/sensors/raw/battery-voltage-24V': {
        displayName: 'RelayBoard: battery voltage 24V'
    }
} as const

const companionTopics = {
    'companion/switches/switchboard-1/ack': {
        displayName: 'Companion: SwitchBoard-1 ack'
    },
    'companion/switches/switchboard-2/ack': {
        displayName: 'Companion: SwitchBoard-2 ack'
    },
    'companion/sensors/raw/oxidizer-pressure': {
        displayName: 'Companion: raw tank pressure'
    },
    'companion/sensors/scaled/oxidizer-pressure': {
        displayName: 'Companion: tank pressure',
        additional: {
            unit: 'Bar'
        }
    },
    'companion/sensors/scaled/battery-voltage': {
        displayName: 'Companion: battery voltage',
        additional: {
            unit: 'V'
        }
    },
    'companion/sensors/raw/battery-voltage': {
        displayName: 'Companion: battery raw voltage'
    },
    'companion/sensors/scaled/inside-temperature': {
        displayName: 'Companion: RPi temperature',
        additional: {
            unit: 'ºC'
        }
    },
    'companion/switches/relief-open-time': {
        displayName: 'Companion: relief valve open time',
        additional: {
            unit: 'S'
        }
    },
    'nose-cone/sensors/scaled/dynamic-pressure': {
        displayName: 'Nose Cone: dynamic pressure',
        additional: {
            unit: 'hPa'
        }
    },
    'nose-cone/sensors/scaled/battery-voltage': {
        displayName: 'Nose Cone: battery voltage',
        additional: {
            unit: 'V'
        }
    },
    'nose-cone/sensors/scaled/temperature': {
        displayName: 'Nose Cone: temperature',
        additional: {
            unit: 'ºC'
        }
    },
    'hecu/sensors/scaled/battery-voltage-1': {
        displayName: 'HECU: battery raw voltage 1'
    },
    'hecu/sensors/scaled/battery-voltage-2': {
        displayName: 'HECU: battery voltage 2',
        additional: {
            unit: 'V'
        }
    },
    'hecu/sensors/raw/battery-voltage-2': {
        displayName: 'HECU: battery raw voltage 2'
    },
    'hecu/switches/valve-state': {
        displayName: 'HECU: valve state'
    },
    'companion/sensors/frontend-avg/oxidizer-pressure': {
        displayName: 'Companion: tank pressure AVG',
        additional: {
            unit: 'bar'
        }
    }
} as const

export const allTopics = {
    ...lpbTopics,
    ...pccTopics,
    ...companionTopics
} as const
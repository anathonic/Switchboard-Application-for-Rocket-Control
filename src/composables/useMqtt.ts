import { ref, onMounted, onBeforeUnmount } from 'vue';
import mqtt, { MqttClient } from 'mqtt';
import { v4 as uuidv4 } from 'uuid';

interface MqttConfig {
    node_id: string;
    transport: string;
    port: number;
    ip: string;
}

export function useMqtt(mqttConfig: MqttConfig, topic: string, messageHandler: (topic: string, message: Buffer) => void) {
    const client = ref<MqttClient | null>(null);
    const isConnected = ref(false);
    const clientId = ref<string>(uuidv4());

    onMounted(() => {
        const address = `${mqttConfig.transport}://${mqttConfig.ip}:${mqttConfig.port}`;
        console.log(`Connecting to MQTT broker at ${address} with clientId ${clientId.value}`);
        client.value = mqtt.connect(address, {
            clientId: clientId.value
        });

        client.value.on('connect', () => {
            console.log('Connected to MQTT broker');
            isConnected.value = true;
            client.value?.subscribe(topic, (err) => {
                if (err) {
                    console.error('Error subscribing to topic:', err);
                } else {
                    console.log(`Subscribed to topic "${topic}"`);
                }
            });
        });

        client.value.on('message', messageHandler);

        client.value.on('close', () => {
            console.log('Connection to MQTT broker closed');
            isConnected.value = false;
        });

        client.value.on('error', (error) => {
            console.error('MQTT connection error:', error);
        });

        client.value.on('offline', () => {
            console.warn('MQTT connection is offline');
        });

        client.value.on('reconnect', () => {
            console.log('Reconnecting to MQTT broker');
        });
    });

    onBeforeUnmount(() => {
        if (client.value) {
            console.log('Disconnecting from MQTT broker');
            client.value.end();
        }
    });

    const publish = (topic: string, message: string) => {
        if (client.value && isConnected.value) {
            client.value.publish(topic, message, (err) => {
                if (err) {
                    console.error('Error publishing message:', err);
                } else {
                    console.log(`Message published to topic "${topic}": ${message}`);
                }
            });
        } else {
            console.warn('Cannot publish message, client not connected');
        }
    };

    return { isConnected, clientId, client, publish };
}

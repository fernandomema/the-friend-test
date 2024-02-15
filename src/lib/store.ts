import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";
import { svelteSyncedStore } from "@syncedstore/svelte";
import type { RoomStatus } from "./RoomStatus";
import type { Player } from "$lib/types/Player";
import type { Question } from "$lib/types/Question";
import type { Room } from "$lib/types/Room";

// Create your SyncedStore store
export const store = syncedStore({ 
    players: [] as Player[],
    room: {} as Room,
});
export const svelteStore = svelteSyncedStore(store);

// Create a document that syncs automatically using Y-WebRTC
export const getRtcProvider = (roomId: string) => {
    const doc = getYjsDoc(store);
    // const webrtcProvider = new WebrtcProvider("friends-test-" + roomId, doc, {
    //     signaling: [
    //         'wss:stun.l.google.com:19302'
    //     ],
    //     filterBcConns: false,
    // });
    const webrtcProvider = new WebsocketProvider("wss://ws-friendstest.servitimo.net", "friends-test-" + roomId, doc);

    const disconnect = () => webrtcProvider.disconnect();
    const connect = () => webrtcProvider.connect();
    return {
        webrtcProvider, disconnect, connect
    }
}

export type storeData = {
    status: RoomStatus,
    players: Player[],
    questions: Question[],
}
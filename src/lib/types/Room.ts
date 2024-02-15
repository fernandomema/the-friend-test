import type { RoomStatus } from "$lib/RoomStatus";
import type { Player } from "./Player";
import type { Question } from "./Question";

export type Room = {
    status: RoomStatus,
    currentQuestion: Question,
    currentPlayers: Player[],
    currentRound: number,
}
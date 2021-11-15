import { Instruments } from "../Instruments";

export class CreateInstrumentDto {
	readonly id: string;

	readonly notes: string;

	readonly bpm: number;

	readonly type: Instruments;
}

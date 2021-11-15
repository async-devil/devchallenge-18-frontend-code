export class Note {
	public frequency: number;

	public durationMs: number;

	constructor(frequency: number, durationMs: number) {
		this.frequency = frequency;
		this.durationMs = durationMs;
	}
}

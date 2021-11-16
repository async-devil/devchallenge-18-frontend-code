import { Note } from "../Notes/Note";
import { Notes } from "../Notes/Notes";
import { Oscillator } from "../Oscillator/Oscillator";
import { CreateInstrumentDto } from "./dto/create-instrument.dto";
import { Instruments } from "./Instruments";

export class Instrument {
	private ID: string;

	private type: Instruments;

	private bpm: number;

	private notes: Notes;

	private notesBuffer: Note[] = [];

	private on = false;

	private pause = false;

	private oscillator: Oscillator;

	constructor(dto: CreateInstrumentDto) {
		this.oscillator = new Oscillator();
		this.updateInstrument(dto);
	}

	public changeAdsr(a: number, d: number, s: number, r: number) {
		this.oscillator.changeAdsrValue({
			a,
			d,
			s,
			r,
		});
	}

	public updateInstrument(dto: CreateInstrumentDto) {
		this.ID = dto.id;
		this.type = dto.type;
		this.oscillator.changeWaveType(this.type);
		this.notes = new Notes(dto.notes, dto.bpm);
		this.bpm = dto.bpm;
	}

	get id() {
		return this.ID;
	}

	public async play(notes: Note[]) {
		if (notes.length === 0) return;
		if (!this.on || this.pause) return;

		const note = notes[0];

		await this.oscillator.playFreqForMs(note.frequency, note.durationMs);
		notes.shift();

		await this.play(notes);
	}

	public async start() {
		await this.stop();

		this.on = true;
		this.pause = false;

		this.notesBuffer = [...this.notes.notes];

		await this.play(this.notesBuffer);
	}

	public async stop() {
		this.on = false;
		this.pause = false;

		this.notesBuffer = [];

		await this.oscillator.stop();
	}

	public async pauseOrResume(state?: boolean) {
		const pauseState = state || !this.pause;
		this.pause = pauseState;

		if (!this.pause) await this.play(this.notesBuffer);
	}
}

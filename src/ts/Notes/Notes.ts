import { Note } from "./Note";
import { Pitches } from "./Pitches";

export class Notes {
	private textNotes: string;

	readonly notes: Note[] = [];

	private bpm: number;

	constructor(notes: string, bpm: number) {
		this.textNotes = notes;
		this.bpm = bpm;

		this.parseNotes();
	}

	private findNoteFreqByOctave(curOctaveFreq: number, octave: number, iteration = 0): number {
		if (octave === iteration) return curOctaveFreq;

		return this.findNoteFreqByOctave(curOctaveFreq * 2, octave, iteration + 1);
	}

	private parseNotes() {
		if (!this.textNotes) return;

		const notes = this.textNotes.split(" ");

		notes.forEach((note) => {
			const pitch = note.match(/[A-Z_]#?/); // Note letter match
			if (!pitch) throw new Error("Unknown note");
			let frequency = Pitches[`${pitch.toString()}`] as Pitches;

			const octave = note.match(/\d(?=\/)/); // Note octave match
			frequency = !octave ? frequency : this.findNoteFreqByOctave(frequency, parseInt(octave[0]));

			const noteValue = note.match(/(?<=\/)\d+/); // Note value match
			const beat = (60 / this.bpm) * 1000;
			let duration = beat / parseInt(noteValue ? noteValue.toString() : "1");

			const dotModifierState = Boolean(note.match(/(?<=\d)\./)); // Note elongation match
			duration = duration * (dotModifierState ? 1.5 : 1);

			this.notes.push(new Note(frequency, duration));
		});
	}
}

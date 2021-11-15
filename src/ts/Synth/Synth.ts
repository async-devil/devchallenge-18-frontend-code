import { CreateInstrumentDto } from "../Instrument/dto/create-instrument.dto";
import { Instrument } from "../Instrument/Instrument";

export class Synth {
	private readonly instruments: Instrument[] = [];

	private selectedInstruments: Instrument[] = [];

	private on = false;

	private pause = false;

	public getInstrumentById(id: string): Instrument {
		const instrument = this.instruments.find((elem) => elem.id === id);
		if (!instrument) throw new Error("No instrument found");
		return instrument;
	}

	public createInstrument(instrumentDto: CreateInstrumentDto) {
		const newInstrument: Instrument = new Instrument(instrumentDto);

		this.instruments.push(newInstrument);

		return newInstrument;
	}

	public getAllInstrumentsId() {
		const idList: string[] = [];

		this.instruments.forEach((instrument) => idList.push(instrument.id));

		return idList;
	}

	public selectInstrumentById(id: string) {
		const instrument = this.getInstrumentById(id);
		this.selectedInstruments.push(instrument);
	}

	public clearSelectedInstruments() {
		this.selectedInstruments = [];
	}

	public pauseOrResumeSelected() {
		const inversePauseState = !this.pause;
		this.pause = inversePauseState;

		this.selectedInstruments.forEach((instrument) => instrument.pauseOrResume(this.pause));
	}

	private changeOnStateToSelected(state: boolean) {
		if (this.on === state) return;
		this.on = state;
		this.pause = false;

		this.selectedInstruments.forEach((instrument) => {
			if (this.on) void instrument.start();
			else void instrument.stop();
		});
	}

	public startSelected() {
		this.changeOnStateToSelected(true);
	}

	public stopSelected() {
		this.changeOnStateToSelected(false);
	}
}

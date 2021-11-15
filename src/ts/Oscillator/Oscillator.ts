import { Instruments } from "../Instrument/Instruments";

export class Oscillator {
	private audioContext: AudioContext;

	private gain: GainNode;

	private type = Instruments.SINE;

	constructor() {
		this.audioContext = new AudioContext();
		this.gain = this.audioContext.createGain();

		this.gain.gain.value = 0.5;
	}

	private sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	public changeWaveType(waveType: Instruments) {
		this.type = waveType;
	}

	public async playFreqForMs(freq: number, duration: number, bpm: number) {
		if (freq === 0) return this.sleep(duration);

		const beatDuration = (60 / bpm) * 1000;

		await this.audioContext.resume();

		const oscillator = this.audioContext.createOscillator();

		oscillator.connect(this.gain);
		oscillator.connect(this.audioContext.destination);

		oscillator.type = this.type;
		oscillator.frequency.value = freq;

		oscillator.start(0);
		await this.sleep(duration);

		oscillator.stop(0);
		await this.sleep(beatDuration - duration);
	}

	public async stop() {
		await this.audioContext.suspend();
	}
}

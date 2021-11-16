import { Instruments } from "../Instrument/Instruments";

export class Oscillator {
	private audioContext: AudioContext;

	private type = Instruments.SINE;

	private adsr = {
		a: 40,
		d: 20,
		s: 0.5,
		r: 30,
	};

	constructor() {
		this.audioContext = new AudioContext();
	}

	private sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	public changeWaveType(waveType: Instruments) {
		this.type = waveType;
	}

	public changeAdsrValue(adsr: { a: number; d: number; s: number; r: number }) {
		this.adsr = adsr;
	}

	public async playFreqForMs(freq: number, duration: number) {
		if (freq === 0) return this.sleep(duration);

		const attackDuration = this.adsr.a;
		const decayDuration = this.adsr.d;
		const releaseDuration = this.adsr.r;
		const sustainValue = this.adsr.s;
		let sustainDuration = duration - attackDuration - decayDuration - releaseDuration;
		sustainDuration = sustainDuration > 0 ? sustainDuration : 0;

		await this.audioContext.resume();

		const oscillator = this.audioContext.createOscillator();
		const gainNode = this.audioContext.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(this.audioContext.destination);
		oscillator.connect(this.audioContext.destination);

		oscillator.type = this.type;
		oscillator.frequency.value = freq;

		oscillator.start(this.audioContext.currentTime);

		gainNode.gain.exponentialRampToValueAtTime(
			1,
			this.audioContext.currentTime + attackDuration / 1000
		);
		await this.sleep(attackDuration);

		gainNode.gain.exponentialRampToValueAtTime(
			sustainValue,
			this.audioContext.currentTime + decayDuration / 1000
		);
		await this.sleep(decayDuration);

		gainNode.gain.setValueAtTime(
			sustainValue,
			this.audioContext.currentTime + sustainDuration / 1000
		);
		await this.sleep(sustainDuration);

		gainNode.gain.exponentialRampToValueAtTime(
			0.0001,
			this.audioContext.currentTime + releaseDuration / 1000
		);
		await this.sleep(releaseDuration);

		oscillator.stop(0);
	}

	public async stop() {
		await this.audioContext.suspend();
	}
}

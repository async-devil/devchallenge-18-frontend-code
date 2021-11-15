import { Synth } from "../Synth/Synth";

export function adsrForm(synth: Synth, formData: FormData) {
	const parsedData = {
		id: formData.get("id").toString(),
		a: parseInt(formData.get("a").toString()),
		d: parseInt(formData.get("d").toString()),
		s: parseFloat(formData.get("s").toString()),
		r: parseInt(formData.get("r").toString()),
	};

	const instrument = synth.getInstrumentById(parsedData.id);

	instrument.changeAdsr(parsedData.a, parsedData.d, parsedData.s, parsedData.r);
}

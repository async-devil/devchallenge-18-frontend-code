import { Synth } from "../Synth/Synth";

export function synthSelect(synth: Synth, formData: FormData) {
	const idList = synth.getAllInstrumentsId();

	synth.clearSelectedInstruments();

	idList.forEach((id) => {
		const state = formData.get(id);
		if (state) synth.selectInstrumentById(id);
	});
}

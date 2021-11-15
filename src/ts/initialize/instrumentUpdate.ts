import { CreateInstrumentDto } from "../Instrument/dto/create-instrument.dto";
import { Instruments } from "../Instrument/Instruments";
import { Synth } from "../Synth/Synth";

export function updateForm(synth: Synth, formData: FormData) {
	const parsedData: CreateInstrumentDto = {
		id: formData.get("id").toString(),
		notes: formData.get("notes").toString(),
		bpm: parseInt(formData.get("bpm").toString()),
		type: formData.get("type").toString() as Instruments,
	};

	const instrument = synth.getInstrumentById(parsedData.id);

	instrument.updateInstrument(parsedData);
}

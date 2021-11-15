import { Synth } from "../Synth/Synth";

export function controlForm(synth: Synth, formData: FormData) {
	const parsedData = {
		id: formData.get("id").toString(),
		controlType: formData.get("control").toString(),
	};

	const instrument = synth.getInstrumentById(parsedData.id);

	switch (parsedData.controlType) {
		case "start": {
			void instrument.start();
			break;
		}

		case "stop": {
			void instrument.stop();
			break;
		}

		case "interrupt": {
			void instrument.pauseOrResume();
			break;
		}

		default: {
			throw new Error("Unknown control type");
		}
	}
}

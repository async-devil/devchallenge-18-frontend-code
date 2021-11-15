import { Synth } from "../Synth/Synth";

export function synthControl(synth: Synth, formData: FormData) {
	const controlType = formData.get("control").toString();

	switch (controlType) {
		case "start": {
			synth.stopSelected();
			synth.startSelected();
			break;
		}

		case "stop": {
			synth.stopSelected();
			break;
		}

		case "interrupt": {
			synth.pauseOrResumeSelected();
			break;
		}

		default: {
			throw new Error("Unknown control type");
		}
	}
}

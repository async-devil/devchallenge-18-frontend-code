import { initializeForm, initializeFormsByClassName } from "./initialize/initializeForms";
import { CreateInstrumentDto } from "./Instrument/dto/create-instrument.dto";
import { Instruments } from "./Instrument/Instruments";
import { Synth } from "./Synth/Synth";

const synth = new Synth();

initializeFormsByClassName(synth, "synth__select");
initializeFormsByClassName(synth, "synth__control_form");

document.getElementById("create-instrument-button").addEventListener("click", () => {
	const id = (Math.random() + 1).toString(36).substring(2);

	const instrumentData: CreateInstrumentDto = {
		notes: "",
		bpm: 90,
		type: Instruments.SINE,
		id,
	};

	document
		.getElementById("synth__instruments")
		.insertAdjacentHTML(
			"beforeend",
			`<div class="instrument" id="${instrumentData.id}"><form class="instrument__update"><h2>Update instrument ${instrumentData.id}</h2><div class="create__notes input-container"><p class="instrument_description">Write your notes here</p><textarea name="notes"></textarea></div><div class="create__bpm input-container"><p class="instrument_description">Write song bmp</p><input type="number" name="bpm"value="${instrumentData.bpm}"min="0"max="1000"step="5"/></div><div class="create__type input-container"><p class="instrument_description">Select wave</p><select name="type"><option value="sawtooth">Sawtooth</option><option value="square">Square</option><option value="triangle">Triangle</option><option value="sine">Sinusoidal</option></select></div><button type="submit">Update</button><input type="hidden" name="id" value="${instrumentData.id}"/></form><form class="instrument__adsr"><h2>Configure ADSR</h2><div class="adsr__a input-container"><p class="instrument_description">Attack duration in ms</p><input type="number" name="a" value="40" min="0" max="1000" step="10"/></div><div class="adsr__d input-container"><p class="instrument_description">Decay duration in ms</p><input type="number" name="d" value="20" min="0" max="5000" step="10"/></div><div class="adsr__s input-container"><p class="instrument_description">Sustain value from 0 to 1</p><input type="number" name="s" value="0.5" min="0" max="1" step="0.1"/></div><div class="adsr__r input-container"><p class="instrument_description">Release duration in ms</p><input type="number" name="r" value="30" min="0" max="5000" step="10"/></div><button type="submit">Set</button><input type="hidden" name="id" value="${instrumentData.id}"/></form><div class="instrument-control-container form"><h2>Control instrument</h2><div class="instrument-control-forms-container"><form class="instrument__control"><input type="hidden" name="id" value="${instrumentData.id}"/><button type="submit">Start</button><input type="hidden" name="control" value="start"/></form><form class="instrument__control"><input type="hidden" name="id" value="${instrumentData.id}"/><button type="submit">Stop</button><input type="hidden" name="control" value="stop"/></form><form class="instrument__control"><input type="hidden" name="id" value="${instrumentData.id}"/><button type="submit">Pause/Resume</button><input type="hidden" name="control" value="interrupt"/></form></div></div></div>`
		);

	document
		.getElementById("select-instruments")
		.insertAdjacentHTML(
			"beforeend",
			`<label><input type="checkbox" name="${instrumentData.id}" /> Instrument ${instrumentData.id}</label>`
		);

	synth.createInstrument(instrumentData);

	initializeForm(synth, document.getElementById(instrumentData.id) as HTMLFormElement);
});

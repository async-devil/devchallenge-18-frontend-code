import { Synth } from "../Synth/Synth";
import { adsrForm } from "./instrumentAdsr";
import { controlForm } from "./instrumentControl";
import { updateForm } from "./instrumentUpdate";
import { synthControl } from "./synthControl";
import { synthSelect } from "./synthSelect";

function addListener(synth: Synth, form: HTMLFormElement) {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;

		const formData = new FormData(event.target as HTMLFormElement);

		switch (target.className) {
			case "instrument__update": {
				updateForm(synth, formData);
				break;
			}

			case "instrument__adsr": {
				adsrForm(synth, formData);
				break;
			}

			case "instrument__control": {
				controlForm(synth, formData);
				break;
			}

			case "synth__select": {
				synthSelect(synth, formData);
				break;
			}

			case "synth__control_form": {
				synthControl(synth, formData);
				break;
			}

			default:
				throw new Error("Invalid form class name");
		}
	});
}

export function initializeForm(synth: Synth, form: HTMLFormElement) {
	addListener(synth, form);
}

export function initializeFormsByClassName(synth: Synth, className: string) {
	const collection = document.getElementsByClassName(className);

	for (let i = 0; i < collection.length; i++) {
		initializeForm(synth, collection[i] as HTMLFormElement);
	}
}

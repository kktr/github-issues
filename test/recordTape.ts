import nock from "nock";

export async function recordTape() {
	await nock.recorder.rec({ output_objects: true, dont_print: true });
}

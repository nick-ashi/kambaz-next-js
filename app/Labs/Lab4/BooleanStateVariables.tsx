import { useState } from "react";

export default function BooleanStateVariables() {
  const [done, setDone] = useState(true);
  const [valid, setValid] = useState(true);

  return (
    <div id="wd-boolean-state-variables">
      <h2>Boolean State Variables</h2>
      <p>{done ? "Done" : "Not done"}</p>
      <label className="form-control">
        <input type='checkbox' checked={done} onChange={() => setDone(!done)} />
        Done
      </label>
      {done && <div className="alert alert-success"> You're done. </div>}
      <h4>{valid ? "YOU'RE VALID" : "You're not valid"}</h4>
      <label className="valid-control me-3">
        <input type='radio' name="valid" checked={valid} onChange={() => setValid(true)} />
        Valid
      </label>
      <label className="invalid-control me-3">
        <input type='radio' name="valid" checked={!valid} onChange={() => setValid(false)} />
        Invalid
      </label>
      <hr/>
    </div>
  );
}
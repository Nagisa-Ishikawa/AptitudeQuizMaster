import React, { useState } from "react";

function ErrorComponent() {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("This is a test error");
  }

  return (
    <div>
      <h2>This is a component that can throw an error</h2>
      <button onClick={() => setThrowError(true)}>Throw Error</button>
    </div>
  );
}

export {ErrorComponent}
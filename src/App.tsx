import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

function App() {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <PrimeReactProvider>
      <div className='text-center'>
        <h1>Hello World</h1>
        <Checkbox
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
        ></Checkbox>
      </div>
    </PrimeReactProvider>
  );
}

export default App;

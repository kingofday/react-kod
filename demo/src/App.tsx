import React from 'react';
import { Select } from "react-kod"
import "./index.css";
import "react-kod/dist/styles.css";
import MultiSelectExample from './Components/MultiSelectExample';
import SelectExample from './Components/SelectExample';
import ModalExample from './Components/ModalExample';
import SpinnerSample from './Components/SpinnerSample';
const Option = Select.Option;
const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="text" {...props} style={{ padding: 10, borderRadius: 4, border: "solid 1px #ccc" }} />
}
function App() {

  return (
    <div className="App" dir='rtl' style={{ height: 1000, paddingTop: 250, paddingBottom: 30 }}>
      <MultiSelectExample />
      {/* <SelectExample /> */}
       {/*<ModalExample/> 
      <SpinnerSample/>*/}
    </div>
  );
}

export default App;

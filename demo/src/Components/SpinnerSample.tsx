
import { Spinner } from "react-kod";
const SpinnerSample = () => {
    return <div className='' id=''>
        <Spinner size={"small"} />
        <Spinner size={"medium"} />
        <Spinner size={"large"} />
        <Spinner size={"extra-larg"} />
        <br/>
        <br/>
        <br/>
        <Spinner type="dot" size={"small"} />
        <Spinner type="dot" size={"medium"} /> 
        <Spinner type="dot" size={"large"} />
    </div>;
}
export default SpinnerSample;
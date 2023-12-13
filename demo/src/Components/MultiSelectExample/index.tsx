import { useEffect, useState } from "react";
import { Modal, MultiSelect } from "react-kod";
import Example from "./Example";

const MultiSelectExample = () => {
    const columns = ["multi-select"];
    const [t, setT] = useState("");
    const [filters, setFilters] = useState<string[]>([]);
    useEffect(() => {
        setTimeout(() => { setT("t") }, 50000)
    }, [])
    return <div>
        <span>t: {t}</span>
        <Example columns={columns} filters={filters} setFilters={(v) => setFilters(v)} />
    </div>
}
export default MultiSelectExample;
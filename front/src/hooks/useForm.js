import { useState } from "react";

const useForm = () => {
    const [ form, setForm ] = useState();

    const change = ( {target} ) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        })
    }

    return {
        form,
        change
    }
}

export default useForm;
import { useEffect, useState } from "react";

const useData = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://travelstar-go.herokuapp.com/services')
            .then(res => res.json())
            .then(data => {
                setItems(data);

            });
    }, []);

    return [items, setItems];
}

export default useData;
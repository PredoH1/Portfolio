import { useEffect, useState } from "react";

export function useCollection(listFn, deps = []) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");

    listFn()
      .then((items) => {
        if (active) {
          setData(items);
          setStatus("ready");
        }
      })
      .catch((error) => {
        console.error(error);
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, status };
}

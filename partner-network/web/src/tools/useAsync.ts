import {useEffect, useState} from "react";


export function useAsync<T> (asyncFunc: () => Promise<T>): {value?: T, error?: Error, loading: boolean} {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const [value, setValue] = useState<T>();

    useEffect(() => {
        asyncFunc()
            .then(setValue)
            .catch(setError)
            .finally(() =>
                setLoading(false));
    }, [])

    return {value, error, loading}
}

// TODO: Remove usages of useLazyAsync and implement loading animations
export function useLazyAsync<T> (asyncFunc: () => Promise<T>, defaultValue: T): T {
    const res = useAsync(asyncFunc);

    if (res.error) {
        alert(res.error);
        return defaultValue;
    }

    if (res.loading) {
        return defaultValue;
    }

    if (res.value == null) {
        return defaultValue;
    }

    return res.value;
}
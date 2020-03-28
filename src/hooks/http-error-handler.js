import {useEffect, useState} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqIntercepter = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resIntercepter = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqIntercepter);
            httpClient.interceptors.response.eject(resIntercepter);
        };
    }, [reqIntercepter, resIntercepter]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
};
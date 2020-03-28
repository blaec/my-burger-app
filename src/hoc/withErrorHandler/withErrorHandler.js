import React, {useState, useEffect} from 'react';

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary"

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const reqIntercepter = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resIntercepter = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqIntercepter);
                axios.interceptors.response.eject(resIntercepter);
            };
        }, [reqIntercepter, resIntercepter]);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        return (
            <Aux>
                <Modal show={error}
                       modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;
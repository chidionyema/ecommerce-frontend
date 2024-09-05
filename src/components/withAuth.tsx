import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const AuthComponent = (props: React.ComponentProps<typeof WrappedComponent>) => {
        const router = useRouter();
        const jwtToken = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;

        useEffect(() => {
            if (!jwtToken) {
                router.push('/login');
            }
        }, [jwtToken, router]);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;

import React from 'react';
import useAccessControl from './use-access-control';
import { Action, Resource } from './aceess-rules';


interface WithAccessControlProps {
    accessedResource: Resource;
}

const withAccessControlForUpdate = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    return React.forwardRef<any, P & WithAccessControlProps>((props, ref) => {
        const { isAllowed } = useAccessControl();
        const { accessedResource, ...rest } = props;

        if (!isAllowed(Action.Update, accessedResource)) {
            return <></>;
        }

        return <WrappedComponent ref={ref} {...(rest as P)} />;
    });
};

export default withAccessControlForUpdate
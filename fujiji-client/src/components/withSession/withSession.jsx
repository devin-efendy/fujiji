import jwt from 'jsonwebtoken';
import getConfig from 'next/config';
import RequireAuthDialog from '../RequireAuthDialog/RequireAuthDialog';
import { useSession } from '../../context/session';

const withSession = (WrappedComponent) => function (props) {
  if (typeof window === 'undefined') {
    // since we do client-side authentication
    // server side rendering have no context on user authentication
    return null;
  }

  const { authToken, signOutUser } = useSession();

  let clientSideLogin = true;

  try {
    const { publicRuntimeConfig } = getConfig();
    jwt.verify(authToken, publicRuntimeConfig.JWT_AUTH_TOKEN);
  } catch (error) {
    clientSideLogin = false;
  }

  if (!clientSideLogin) {
    signOutUser();
  }

  return clientSideLogin ? (
    <WrappedComponent {...props} />
  ) : (
    <RequireAuthDialog {...props} />
  );
};

export default withSession;

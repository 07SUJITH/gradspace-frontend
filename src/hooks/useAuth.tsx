import { useContext } from 'react';

import { AuthContext, AuthContextType } from '../context/AuthProvider';

const useAuth = (): AuthContextType | undefined => {
  return useContext(AuthContext);
};

export default useAuth;

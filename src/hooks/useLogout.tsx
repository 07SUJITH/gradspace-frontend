import useAxiosPrivate from '../hooks/useAxiosPrivate';

const useLogout = (): (() => Promise<void>) => {
  const axiosPrivate = useAxiosPrivate();
  const logout = async (): Promise<void> => {
    try {
      await axiosPrivate.post('/auth/logout/');
      localStorage.removeItem('persist');
      window.location.href = '/signin';
    } catch (e: any) {
      localStorage.removeItem('persist');
      window.location.href = '/signin';
    }
  };

  return logout;
};

export default useLogout;

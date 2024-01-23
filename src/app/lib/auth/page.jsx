import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    // Check if the 'access_token' cookie is present
    const accessToken = cookie.get('access_token');

    // If the user is not logged in, redirect to the login page
    if (!accessToken) {
      router.push('../login');
      return null;
    }

    // If the user is logged in, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;


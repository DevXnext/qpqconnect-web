"use client"
import { useRouter } from "next/navigation";
import cookie from "js-cookie";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    const accessToken = cookie.get("access_token");

    if (!accessToken && typeof window !== 'undefined') {
      router.push("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;

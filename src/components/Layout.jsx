import { Outlet, useNavigation } from "react-router";
import LoadingSpinner from "./LoadingSpinner";


const Layout = () => {
  const navigation = useNavigation();

  return (
    <div>
      {/* Show spinner when a route is loading */}
      {navigation.state === "loading" ? (
        <LoadingSpinner />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Layout;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/menu/home";
import Message from "./pages/menu/message";
import Notifications from "./pages/menu/notification";
import Settings from "./pages/menu/settings";
import Forgetpass from "./pages/forgetpassword";
import Rootlayout from "./pages/layout";
import Signin from "./pages/login";
import Registration from "./pages/registration";
import Loggedinuser from "./Privateroute/Loggedin";
import Notloggedinuser from "./Privateroute/Notloggedin";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Loggedinuser />}>
          <Route element={<Rootlayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<Notloggedinuser />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/forgetpass" element={<Forgetpass />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;

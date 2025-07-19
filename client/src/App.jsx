import { Bounce, ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
const App = () => {
  return (
    <>
      <HomePage />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default App;

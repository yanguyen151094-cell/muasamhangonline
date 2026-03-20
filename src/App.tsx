import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { CartProvider } from "./context/CartContext";
import FloatingContact from "./components/feature/FloatingContact";
import WelcomePopup from "./components/feature/WelcomePopup";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <CartProvider>
        <BrowserRouter basename={__BASE_PATH__}>
          <AppRoutes />
          <FloatingContact />
          <WelcomePopup />
        </BrowserRouter>
      </CartProvider>
    </I18nextProvider>
  );
}

export default App;

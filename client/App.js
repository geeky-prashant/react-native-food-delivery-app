import Navigation from "./navigation";
import { Provider } from "react-redux";
import { store } from "./store";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" backgroundColor='#000' />
        <Navigation />
      </Provider>
    </>
  );
}

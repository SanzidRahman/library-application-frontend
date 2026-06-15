"use client";

import { persistor, store } from "@/redux/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./Loading";


const Layout = ({ children }) => {
  // const queryClient = new QueryClient();
  return (
    // <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistor} leading={<Loading />}>
        {children}
        {/* <Suspense fallback={null}>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense> */}
      </PersistGate>
    </Provider>
    // </QueryClientProvider>
  );
};

export default Layout;

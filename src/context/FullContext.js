import { createContext } from "react";
import { AuthProvider } from "./AuthContext";
import { DeclaProvider } from "./DeclaContext";
import { DsaniProvider } from "./DsaniContext";
import { EventProvider } from "./EventContext";
import { LedenProvider } from "./LedenContext";
import { ApiProvider } from "./ApiContext";

const FullContext = createContext();
export default FullContext;

export const FullProvider = ({ children }) => {
  const data = {};
  return (
    <FullContext.Provider value={data}>
      <AuthProvider>
        <ApiProvider>
          <LedenProvider>
            <EventProvider>
              <DsaniProvider>
                <DeclaProvider>{children}</DeclaProvider>
              </DsaniProvider>
            </EventProvider>
          </LedenProvider>
        </ApiProvider>
      </AuthProvider>
    </FullContext.Provider>
  );
};

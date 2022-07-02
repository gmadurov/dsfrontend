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
                {/* declas: declas,
                    GET_decla: GET_decla,
                    GET: GET,
                    POST: POST,
                    PUT: PUT,
                    DELETE: DELETE,
                    boekstuks: boekstuks,
                    GET_boekstuk: GET_boekstuk,
                    POST_boekstuk: POST_boekstuk,
                    PUT_boekstuk: PUT_boekstuk,
                    DELETE_boekstuk: DELETE_boekstuk */}
              </DsaniProvider>
              {/* PUT: PUT, */}
            </EventProvider>
            {/* events: events,
                setEvents:setEvents,
                POST: POST,
                PUT: PUT,
                DELETE: DELETE, */}
          </LedenProvider>
          {/* leden: leden */}
        </ApiProvider>
        {/* ApiRequest: ApiRequest,
            ApiFileRequest: ApiFileRequest, */}
      </AuthProvider>
      {/* loginFunc: loginFunc,
          logoutFunc: logOutUser,
          setAuthTokens: setAuthTokens,
          setUser: setUser,
          user: user,
          authTokens: authTokens, */}
    </FullContext.Provider>
  );
};

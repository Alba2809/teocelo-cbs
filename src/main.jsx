import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { ExtraDataContextProvider } from "./context/ExtraDataContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { PostProvider } from "./context/PostContext.jsx";
import { LampProvider } from "./context/LampContext.jsx";
import { WaterProvider } from "./context/WaterContext.jsx";
import { NatureProvider } from "./context/NatureContext.jsx";
import { ComplaintProvider } from "./context/ComplaintContext.jsx";
import { EmailProvider } from "./context/EmailCOntext.jsx";
import { OfficialProvider } from "./context/OfficialContext.jsx";
import { SoccerProvider } from "./context/SoccerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ExtraDataContextProvider>
        <AuthProvider>
          <PostProvider>
            <LampProvider>
              <WaterProvider>
                <NatureProvider>
                  <ComplaintProvider>
                    <OfficialProvider>
                      <EmailProvider>
                        <SoccerProvider>
                          <BrowserRouter>
                            <App />
                          </BrowserRouter>
                        </SoccerProvider>
                      </EmailProvider>
                    </OfficialProvider>
                  </ComplaintProvider>
                </NatureProvider>
              </WaterProvider>
            </LampProvider>
          </PostProvider>
        </AuthProvider>
      </ExtraDataContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

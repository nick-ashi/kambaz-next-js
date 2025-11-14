"use client";
import Session from "./Account/Session";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css"
import { Provider } from "react-redux";
import store from "./store";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return ( 
  <Provider store={store}>
    <Session>
      <div className="d-flex" id="wd-kambaz">
        <div>
          <KambazNavigation /> 
        </div> 
        <div className="wd-main-content-offset p-3 flex-fill">
        {children}
      </div> 
    </div>
    </Session>
  </Provider>
);}

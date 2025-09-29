import { Outlet } from "react-router-dom";

import Header from "./header/Header";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";


export function Layout() {
    return(
        <>
            <Header />
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}
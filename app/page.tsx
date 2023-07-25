/** @format */

"use client";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Premium from "@/app/components/Premium";
import Logs from "@/app/components/Logs";

import { ToastContainer, toast } from 'react-toastify';

import { MetaMaskProvider } from "metamask-react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    return (
        <>

            <MetaMaskProvider>
                
                <div className="h-screen bg-gradient-to-tr from-slate-700 to-slate-800 overflow-x-hidden overflow-scroll z-0">
                    <Header />
                    <section className="divide-y-2 divide-slate-600">
                        <Premium />
                        {/* <Logs /> */}
                        {/* <Footer /> */}
                    </section>
                    
                </div>

            </MetaMaskProvider>
            <ToastContainer autoClose={3000} draggableDirection="x" />
        </>
    );
}

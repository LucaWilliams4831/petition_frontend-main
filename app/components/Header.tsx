/** @format */

"use client";

import Link from "next/link";
import React from "react";
import { Menu } from "@headlessui/react";

import { useMetaMask } from "metamask-react";


type Props = {};

function Header({}: Props) {

    const { status, connect, account, chainId, ethereum } = useMetaMask();

    const connectWallet = () => {
        console.log("st", status);
        connect();
    };

    

    return (
        <header className="sticky top-0 z-20 text-slate-400 body-font backdrop-blur-md backdrop-brightness-75 shadow-lg">
            <div className="container mx-auto md:flex hidden flex-wrap p-3 flex-col md:flex-row items-center">
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                    
                </nav>
                <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center">
                    <span className="ml-3 text-2xl font-semibold tracking-wider uppercase xl:block lg:hidden">
                        PETITION
                    </span>
                </a>
                <div className="inline-flex lg:w-2/5 lg:justify-end ml-5 lg:ml-0">
 
                        <button className="bg-slate-800 py-1 px-3 focus:outline-none hover:bg-inherit rounded-2xl text-base mt-4 md:mt-0 gap-2 border-2 border-slate-800 ease shadow-lg" onClick={connectWallet}>
                            <span className="inline-flex py-1 px-3 gap-2 justify-center items-center">
                                {/* <FaGithub /> */}
                                <p className="text-lg">{status!='connected'? "Connect Wallet": account?.substring(0, 4) + "..." + account?.substring(account.length - 4)}</p>
                            </span>
                        </button>
 
                </div>
            </div>

            {/* mobile menu */}
            <Menu as="div">
                <div className="container mx-auto md:hidden flex flex-wrap p-3 flex-row items-center justify-between">
                    <a className="flex order-first lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center">
                       
                        <span className="ml-3 text-lg font-semibold tracking-wider uppercase xl:block lg:hidden">
                            PETITION
                        </span>
                    </a>
                </div>
            </Menu>
        </header>
    );
}

export default Header;

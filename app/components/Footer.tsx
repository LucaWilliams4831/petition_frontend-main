/** @format */

import Link from "next/link";
import React from "react";
import { FaDiscord, FaGithub, FaInstagram } from "react-icons/fa";

type Props = {};

function Footer({}: Props) {
    return (
        <div>
            <footer className="text-slate-400 body-font backdrop-brightness-75">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <span className="ml-3 text-xl">Petition</span>
                    </a>
                    <p className="text-sm text-slate-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-slate-800 sm:py-2 sm:mt-0 mt-4">
                        © 2023 —
                        <a
                            href="#"
                            className="text-slate-300 hover:underline decoration-1 ml-1 ease"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @Luca
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

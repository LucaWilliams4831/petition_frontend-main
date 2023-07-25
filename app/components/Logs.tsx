/** @format */


import React from "react";
import Heading from "./Heading";

type Props = {};

function Logs({ }: Props) {

    const stats = [
        {
            title: "Title 1",
            address: "0x14...ce66",
            createtime: "7/12/2023",
            signingtoken: "LucaToken",
            eventtype: "sign",
            txhash: "0x00...00",

        },
        {
            title: "Title 3",
            address: "0x40...e111",
            createtime: "7/12/2023",
            signingtoken: "AlivnToken",
            eventtype: "unstake",
            txhash: "0x00...00",

        },
        {
            title: "Title 1",
            address: "0x5c...cc3f",
            createtime: "7/12/2023",
            signingtoken: "AlivnToken",
            eventtype: "active",
            txhash: "0x00...00",

        },
        {
            title: "Title 1",
            address: "0x28...e130",
            createtime: "7/12/2023",
            signingtoken: "AlivnToken",
            eventtype: "deactive",
            txhash: "0x00...00",

        }
    ];

    return (
        <div className="max-w-7xl mx-auto mb-10 sm:px-6 lg:px-8">
            <div className="text-white overflow-hidden mt-10 shadow-xl sm:rounded-lg">
                <div className="flex flex-col text-center w-full mb-20">
                    <Heading text="Logs" />
                </div>
                <table className="table-fixed w-full">
                    <thead>
                        <tr className="bg-slate-500 text-white w-full">
                            <th className="w-1/9 py-4 uppercase ...">Petition Title</th>
                            <th className="w-1/9 py-4 uppercase ...">Address</th>
                            <th className="w-1/9 py-4 uppercase ...">CreatedTime</th>
                            <th className="w-1/9 py-4 uppercase ...">SigningToken</th>
                            <th className="w-1/9 py-4 uppercase ...">Event Type</th>
                            <th className="w-1/9 py-4 uppercase ...">TxHash</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stats.map((s) => (
                                <tr>
                                    <td className="py-3 text-center">{s.title}</td>
                                    <td className="p-3 text-center">{s.address}</td>
                                    <td className="p-3 text-center">{s.createtime}</td>
                                    <td className="p-3 text-center">{s.signingtoken}</td>
                                    <td className="p-3 text-center">{s.eventtype}</td>
                                    <td className="p-3 text-center">{s.txhash}</td>
                                   </tr>
                            ))}


                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Logs;

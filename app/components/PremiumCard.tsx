/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { abi } from "../abi";

type Props = {
    id: number;
    name: string;
    status: boolean;
    signingtoken: string;
    desc: string;
    signstatus: boolean;
    account: string;
    owner: string;
    handleDescription: (title: string, desc: string) => void;
    handleActive: (id:number, flag: boolean) => void;
    handleSign: (id: number, flag: boolean) => void;
};

function PremiumCard({ id, name, owner, status, signingtoken, desc, signstatus, account, handleDescription, handleActive, handleSign }: Props) {
    const [isOwner, setIsOwner] = useState(false);
    const [isSigned, setSigned] = useState(false);
    const [isStaked, setStaked] = useState(false);
    const[totalSigner, setTotalSigner] = useState(0)
    const[totalStakers, setTotalStakers] = useState(0)
    const[signingTokenList, setSigningTokenList] = useState("undefined")

    // if (account == null)
    //     return;
    const Web3 = require('web3');
    // const web3 = new Web3(new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/eth/sepolia/public"));
    const web3 = new Web3(window.ethereum);
    const tokens: { [key: string]: string } = {"0x7f53c1a37583B8E209be9e0456D0F68a92a9a0A4": "Alvin", "0x158AA8eaBf541D5f92b7C1dFE1070F707526a863":"Luca", "0x4f9328e937Cf84283048B68250a842C702D73400": "Jason" }
    
    const contract = new web3.eth.Contract(abi, "0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7");

    const getIsSigned = async () => {

        contract.methods.isSigned(id, account).call().then((result: any) => {
  
            setSigned(result)
            // You can assign the result to a variable or use it as needed
        })
            .catch((error: any) => {
                console.error(error);
                // setPetitionCount(0);
                return;
            });
    }
    const getIsStaked = async () => {

        contract.methods.isSigned(id, account).call().then((result: any) => {
            // Handle the return value here
            console.log("isSigned => ", account, " = ",result);
            setSigned(result)
            // You can assign the result to a variable or use it as needed
        })
            .catch((error: any) => {
                console.error(error);
                // setPetitionCount(0);
                return;
            });
    }
    
    const getSigningTokens = async (id: number) => {

        contract.methods.getSigningTokens(id).call().then((result: any) => {
            // Handle the return value here
            let signingtokens = ""
            for (let i = 0; i < result.length; i++) {
                signingtokens += tokens[result[i]] + ", "
            }

            signingtokens = signingtokens.slice(0, -2)
            setSigningTokenList(signingtokens)
        })
            .catch((error: any) => {
                console.error(error);
                // setPetitionCount(0);
                return;
            });
    }
    const getTotalSigners = async (id: number) => {

        contract.methods.getTotalSigners(id).call().then((result: any) => {
            // Handle the return value here
            setTotalSigner(result)
            // You can assign the result to a variable or use it as needed
        })
            .catch((error: any) => {
                console.error(error);
                // setPetitionCount(0);
                return;
            });
    }
    const getTotalStakers = async (id: number) => {

        contract.methods.getTotalStakers(id).call().then((result: any) => {
            // Handle the return value here
            console.log("total Singers",result);
            setTotalStakers(result)
            // You can assign the result to a variable or use it as needed
        })
            .catch((error: any) => {
                console.error(error);
                // setPetitionCount(0);
                return;
            });
    }

    useEffect(() => {
        getTotalSigners(id)
        getTotalStakers(id)
        getSigningTokens(id)
        
    },[]);
    useEffect(() => {
        
        if (owner.toLowerCase() === account.toLowerCase()) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
        getIsSigned();
    }, [account]);

    return (
        <div className="p-10 xl:w-1/3 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-slate-400 flex flex-col relative overflow-hidden backdrop-brightness-90">

                <div className="flex flex-row text-2xl tracking-widest text-slate-400 title-font mb-4 border-b border-slate-500 font-medium">
                    {name}
                    {status ? <div className="bg-green-500 ml-2 mt-3 w-3 h-3 rounded-full"></div> : <div className="bg-red-500 ml-2 mt-3 w-3 h-3 rounded-full"></div>}
                </div>

                <div className="mb-5">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span>Signing Token Name</span>
                        {signingTokenList}
                    </div>


                    <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span>Total Signers</span>
                        {totalSigner}
                    </div>
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span>Total Stakers</span>
                        {totalStakers}
                    </div>
                    {/* <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span>Total Staking Amount</span>
                        {totalStaking}
                    </div> */}
                    {isStaked    ?
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                            <span>Remain Claim Time</span>
                            4 days 3 hours
                        </div>
                        :
                        <div></div>
                    }
                </div>

                <div className="flex items-center justify-center mt-auto w-full">
                    {
                        isOwner && 
                        (status ? <button className="items-center text-center mt-auto text-red-500 border-2 border-red-500 py-2 px-4 focus:outline-none hover:bg-inherit rounded ease" onClick={() => handleActive(id, false)}>
                            DeActive </button>
                            : <button className="items-center text-center mt-auto text-white border-2 border-green-500 py-2 px-4 focus:outline-none hover:bg-inherit rounded ease" onClick={() => handleActive(id, true)}>
                                Active
                            </button>)
                            
                    }
                    
                    {
                        status && (isSigned ?
                            <>
                                    <button className="items-center text-center mt-auto text-red-500 border-2 border-red-500 py-2 px-4 ml-4 focus:outline-none hover:bg-inherit rounded ease" onClick={() => handleSign(id, false)}>
                                        UnSign
                                    </button>
                                    <button className="items-center text-center mt-auto text-white border-2 border-green-500 py-2 px-4 ml-4 focus:outline-none hover:bg-inherit rounded ease" onClick={() => handleSign(id, true)}>
                                        Stake
                                    </button>
                                </>
                            :
                            <button className="items-center text-center mt-auto text-white border-2 border-green-500 py-2 px-4 ml-4 focus:outline-none hover:bg-inherit rounded ease" onClick={() => handleSign(id, true)}>
                                Sign
                            </button>
                            )
                    }
                    
                    <button className="items-center mt-auto text-white border-2 border-slate-500 py-2 px-4 ml-4 focus:outline-none hover:bg-inherit rounded ease" onClick={() => handleDescription(name, desc)}>
                        Detail
                    </button>
                </div>

            </div>
        </div >
    );
}

export default PremiumCard;

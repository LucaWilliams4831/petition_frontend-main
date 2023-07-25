/** @format */

"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Heading from "./Heading";
import PremiumCard from "./PremiumCard";

import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';

import { abi } from '../abi';

import { useMetaMask } from "metamask-react";
import { Flag } from "@mui/icons-material";
interface MinimumTokenBalance {
    tokenAddress: string;
    balance: number;
  }

  declare global {
    interface Window {
      ethereum?: any;
    }
  }
// Connect to Ethereum network

type DialogProps = {
    onClose: () => void;
    title:string;
    description: string;
};

function MyDialog({ onClose }: DialogProps) {
    const { account } = useMetaMask();

    const [title, setTitle] = useState<string>('');
    const [desc, setDescription] = useState<string>('');
  
    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };
  
    const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    };
  
    const allowedTokens: string[] = ['Alvin', 'Luca', 'Jason'];
    const allowedTokensAddress: string[] = [
      '0x7f53c1a37583B8E209be9e0456D0F68a92a9a0A4',
      '0x158AA8eaBf541D5f92b7C1dFE1070F707526a863',
      '0x4f9328e937cf84283048b68250a842c702d73400'
    ];
    const [textboxValues, setTextboxValues] = useState<string[]>(Array(allowedTokens.length).fill(''));
  
    const handleTextboxChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue: string = event.target.value;
  
      setTextboxValues((prevValues: string[]) => {
        const newValues = [...prevValues];
        newValues[index] = newValue;
        return newValues;
      });
    };
  
    const onCreatePetition = async () => {
      const checkedIndexes: number[] = [];
      const signingtokens: string[] = [];
      const minimumTokenBalances: MinimumTokenBalance[] = [];
  
      const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked && textboxValues[index] !== '') {
          const numericValue: number = parseFloat(textboxValues[index]);
          if (!isNaN(numericValue) && numericValue > 0) {
            checkedIndexes.push(index);
            signingtokens.push(allowedTokensAddress[index]);
            const newItem: MinimumTokenBalance = { tokenAddress: allowedTokensAddress[index], balance: parseInt(textboxValues[index]) };
            minimumTokenBalances.push(newItem);
          }
        }
      });
  
      if (signingtokens.length === 0) {
        toast.error('Please select signing tokens and input minimum amount for holding');
        return;
      }
  
      if (title.trim() === '') {
        toast.error('Please input title');
        return;
      }
  
      if (desc.trim() === '') {
        toast.error('Please input description');
        return;
      }
  
      const networkCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]:checked');
      if (networkCheckboxes.length === 0) {
        toast.error('Please select network');
        return;
      }
  
      const Web3: any = require('web3'); // Replace 'any' with the correct type for Web3
      await window.ethereum.enable();
      const web3: any = new Web3(window.ethereum); // Replace 'any' with the correct type for web3
  
      const contract: any = new web3.eth.Contract(abi, '0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7'); // Replace 'any' with the correct type for contract
  
      const transactionObject = {
        from: account,
        to: '0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7',
        data: contract.methods.createPetition(title, desc, signingtokens, minimumTokenBalances).encodeABI(),
      };
  
      web3.eth
        .sendTransaction(transactionObject)
        .on('confirmation', (confirmationNumber: number, receipt: any) => {
          if (confirmationNumber === 0) {
            console.log('Transaction confirmed!');
            toast.success('Petition Created Successfully');
            onClose();
          }
        })
        .on('error', (error: Error) => {
          toast.error('Failed');
        });
    };

     return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">

            {/* Add your dialog content here */}
            <Transition appear show={true} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-white"
                                        >
                                            <span>Create Petition</span>
                                        </Dialog.Title>

                                        <CloseIcon sx={{ color: "white" }} onClick={onClose} />
                                    </div>

                                    <div className="flex flex-col mt-2 text-slate-400">
                                        <span className="ml-2">Title</span>
                                        <input
                                            id="title"
                                            type="text"
                                            value={title}
                                            onChange={handleTitleChange}
                                            className="border bg-black text-white border-gray-800 w-full rounded-md px-3 py-1 text-white-500 my-1"
                                        />
                                    </div>

                                    <div className="flex flex-col mt-2 text-slate-400">
                                        <span className="ml-2">Description</span>
                                        <textarea
                                            className="border bg-black text-white border-gray-800 w-full rounded-md px-3 py-1 text-white-500 my-1"
                                            value={desc}
                                            onChange={handleDescChange}
                                            rows={4}
                                            id="description"
                                        ></textarea>
                                    </div>

                                    <div className="flex flex-col mt-2 text-slate-400">
                                        <span className="ml-2">Signing Token (Please input Minimum Amount for each Signing Tokens)</span>
                                        <div>
                                            {allowedTokens.map((allowtoken, index) => (
                                                <div key={index} className="flex items-center justify-start text-slate-400 ml-2">
                                                <input
                                                    type="checkbox"
                                                    id={`checkbox-${index}`}
                                                    data-network={allowedTokensAddress[index]}
                                                    className="form-checkbox text-blue-500"
                                                    onChange={(event) => { 
                                                        const checkbox = event.target;
                                                        const textbox = document.getElementById(`textbox-${index}`)as HTMLInputElement;
                                                        textbox.disabled = !checkbox.checked;
                                               
                                                    }}
                                                />
                                                <span className="ml-2">{allowtoken}</span>
                                                <input
                                                    type="number"
                                                    id={`textbox-${index}`}
                                                    className="border bg-black text-white border-gray-800 w-full rounded-md px-3 py-1 text-white-500 my-1"
                                                    value={textboxValues[index] || ""}
                                                    disabled
                                                    onChange={handleTextboxChange(index)}
                                                />
                                                <label htmlFor={`textbox-${index}`} className="sr-only">
                                                    {allowtoken}
                                                </label>
                                                </div>
                                            ))}

                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onCreatePetition}
                                        >
                                            Create
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </div>
    );
}

type Props = {};

function Premium({ }: Props) {
    if (typeof window === "undefined") {
        // Client-side-only code
        return;
      }
    const { account } = useMetaMask();
    const [petitionCount, setPetitionCount] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDescription, setDescriptionFlag] = useState(false);
    const [description, setDescription] = useState("description");
    const [petitionData, setPetitionData] = useState([]);
    const [title, setTitle] = useState("Title")

    const handleDescription = (title: string, desc: string) => {
        setDescriptionFlag(true)
        setTitle(title)
        setDescription(desc)
    }

    const handleCreate = () => {
        setModalOpen(true);
    };
    const handleSign = async (id:number, flag: boolean) => {
        console.log(flag);
        
        const contract: any = new web3.eth.Contract(abi, '0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7');
        if(flag === true) {
            const transactionObject = {
            from: account,
            to: '0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7',
            data: contract.methods.signPetition(id).encodeABI(),
            };
        
            web3.eth
            .sendTransaction(transactionObject)
            .on('confirmation', (confirmationNumber: number, receipt: any) => {
            if (confirmationNumber === 0) {
                console.log('Transaction confirmed!');
                getPetitionData()
                toast.success('You Signed Successfully');
               }
            })
            .on('error', (error: Error) => {
            toast.error('Sign Failed');
            });
        } else {
            const transactionObject = {
                from: account,
                to: '0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7',
                data: contract.methods.unsignPetition(id).encodeABI(),
                };
            
                web3.eth
                .sendTransaction(transactionObject)
                .on('confirmation', (confirmationNumber: number, receipt: any) => {
                if (confirmationNumber === 0) {
                    console.log('Transaction confirmed!');
                    getPetitionData()
                    toast.success('You unsigned Successfully');
            
                }
                })
                .on('error', (error: Error) => {
                toast.error('UnSign Failed');
                });
        }
      };
    const handleClose = () => {
        getPetitionCount();
        setModalOpen(false);
        setDescriptionFlag(false);
    };

    useEffect(() => {
        getPetitionCount();
      
    }, [])


    useEffect(() => {
        if( petitionCount > 0 )
            getPetitionData()
    }, [petitionCount])
    
    const Web3 = require('web3');
    // const web3 = new Web3(new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/eth/sepolia/public"));
    const web3 = new Web3((window as any).ethereum);
    
    const contract = new web3.eth.Contract(abi, "0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7");

    const getPetitionCount = async () => {

        contract.methods.getTotalPetitions().call().then((result: any) => {
            // Handle the return value here
            console.log(result);
            setPetitionCount(parseInt(result));
            // You can assign the result to a variable or use it as needed
        })
            .catch((error: any) => {
                console.error(error);
                setPetitionCount(0);
                return;
            });
    }
    const handleActive = async (id:number, flag: boolean) => {
        console.log(flag);
        
        const contract: any = new web3.eth.Contract(abi, '0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7');
      
        console.log(id);
        console.log(account);
        console.log(flag);
      
        const transactionObject = {
          from: account,
          to: '0x96e266A60e6156d8ba9F774A81320eBEdDd21fB7',
          data: contract.methods.setPetitionActive(id, flag).encodeABI(),
        };
      
        web3.eth
        .sendTransaction(transactionObject)
        .on('confirmation', (confirmationNumber: number, receipt: any) => {
          if (confirmationNumber === 0) {
            console.log('Transaction confirmed!');
            getPetitionData()
            toast.success('Petition Created Successfully');
      
          }
        })
        .on('error', (error: Error) => {
          toast.error('Failed');
        });

      };

    const getPetitionData= async () => {
        console.log("getPetitionData")
        contract.methods.getAllPetitions().call().then((result: any) => {
            console.log(result);
            setPetitionData(result);
        })
          .catch((error: any) => {
                console.error(error);
                setPetitionData([]);
            });
    }

    return (
        <div>
            <section className="text-slate-400 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-10">
                        {/* <Heading text="Dashboard" /> */}
                    </div>
                    <div className="inline-flex lg:justify-start ml-5 lg:ml-0">
                        <button className="bg-slate-800 py-1 px-3 focus:outline-none hover:bg-inherit rounded-2xl text-base mt-4 md:mt-0 gap-2 border-2 border-slate-500 ease shadow-lg" onClick={handleCreate}>
                            <span className="inline-flex py-1 px-3 gap-2 justify-center items-center">
                                <p className="text-lg">Create Petition</p>
                            </span>
                        </button>
                    </div>
                    {isModalOpen && <MyDialog onClose={handleClose} title={title} description={description}/>}
                    {isDescription && <DescDialog onClose={handleClose} title={title} description={description} />}
                    {petitionData.length ?
                    <div className="flex flex-wrap -m-3">
                        {
                            petitionData.map((item, index) => {
                                return (
                                <PremiumCard
                                    handleDescription={handleDescription}
                                    handleActive={handleActive}
                                    handleSign={handleSign}
                                    key={index}
                                    id={parseInt(item[0])}
                                    signingtoken="AlvinToken"
                                    desc={item[2]}
                                    name={item[1]}
                                    status={item[4]}
                                    owner={item[3]}
                                    signstatus={false}
                                    account={account ?? ""}

                                />)
                            }
                            )
                        }
                    </div>
                    :
                    <div></div>
                    } 
                </div>
            </section>
        </div>
    );
}


function DescDialog({ onClose, title, description }: DialogProps) {
 

     return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">

            {/* Add your dialog content here */}
            <Transition appear show={true} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-white"
                                        >
                                            <span>{title}</span>
                                        </Dialog.Title>
                                        <div className="flex flex-col mt-2 text-slate-400">
                                        <span className="ml-2">{description}</span>
                                        </div>

                                        <CloseIcon sx={{ color: "white" }} onClick={onClose} />
                                    </div>  
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </div>
    );
}
export default Premium;

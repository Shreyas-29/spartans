"use client";

import { authSteps } from '@/constants'
import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const AuthProcess = () => {

    const [currentStep, setCurrentStep] = useState(1);


    return (
        <section className="flex items-center justify-center w-full py-8 mx-auto md:py-16">
            <div className="flex flex-col items-center w-full">
                <h2 className="mb-4 text-4xl font-bold text-center">
                    Streamlined Authentication Process
                </h2>
                <p className="max-w-2xl mx-auto mb-8 text-base text-center">
                    Experience a hassle-free and secure login process with our 3-step authentication. Your account's safety is our top priority
                </p>

                <div className="flex py-8 space-x-4 md:py-12">
                    {/* Left Side */}
                    <div className="w-1/2 space-y-4 px-8 lg:ml-12">
                        {/* {authSteps.map((step, index) => (
                            <div key={index} style={{ display: currentStep === index + 1 ? 'block' : 'none' }}>
                                <div className="p-8 mb-4 bg-gray-100 hover:bg-gray-200">
                                    <h2 className="text-3xl font-bold">{step.title}</h2>
                                    <p className="text-gray-600">{step.description}</p>
                                    <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">{step.buttonText}</button>
                                </div>
                            </div>
                        ))}
                        <div className="flex space-x-4">
                            {authSteps.map((step, index) => (
                                <button
                                    key={index}
                                    className={`text-lg font-semibold ${currentStep === index + 1 ? 'text-blue-500' : 'text-gray-400'}`}
                                    onClick={() => setCurrentStep(index + 1)}
                                >
                                    Step {index + 1}
                                </button>
                            ))}
                        </div> */}
                        <div></div>
                        {/* {authSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-start">
                                <div className="w-full space-y-2">
                                    <h2
                                        className="flex-1 w-full px-4 py-3 font-semibold transition-all bg-white border rounded-lg cursor-pointer text-start text-slate-900 hover:bg-slate-100 border-slate-50 hover:border-slate-200"
                                        onClick={() => setCurrentStep(index + 1)}
                                    >
                                        {step.title}
                                    </h2>
                                    <p
                                        className="w-full px-4 text-slate-600 text-start"
                                        style={{ display: currentStep === index + 1 ? 'block' : 'none' }}
                                    >
                                        {step.description}
                                    </p>
                                    <div className="px-4">
                                        <Button
                                            variant="default"
                                            style={{ display: currentStep === index + 1 ? 'flex' : 'none' }}
                                        >
                                            {step.buttonText}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))} */}
                        {authSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-start">
                                <div className="w-full space-y-2">
                                    <motion.h2
                                        className="flex-1 w-full px-4 py-3 font-semibold transition-all bg-white border rounded-lg cursor-pointer text-start text-slate-900 hover:bg-slate-100 border-slate-50 hover:border-slate-200"
                                        initial={{ y: -10, }}
                                        animate={{ y: 0, }}
                                        exit={{ y: -10, }}
                                        onClick={() => setCurrentStep(index + 1)}
                                    >
                                        {step.title}
                                    </motion.h2>
                                    <motion.p
                                        className="w-full px-4 text-slate-600 text-start"
                                        initial={{ opacity: 0, display: 'none', y: -10 }}
                                        animate={{ opacity: currentStep === index + 1 ? 1 : 0, display: currentStep === index + 1 ? 'block' : 'none', y: 0 }}
                                        exit={{ y: -10, opacity: 0 }}
                                    >
                                        {step.description}
                                    </motion.p>
                                    <motion.div
                                        className="px-4"
                                        initial={{ opacity: 0, display: 'none', y: -10 }}
                                        animate={{ opacity: currentStep === index + 1 ? 1 : 0, display: currentStep === index + 1 ? 'block' : 'none', y: 0 }}
                                        exit={{ y: -10, opacity: 0 }}
                                    >
                                        <Link href={step.href}>
                                            <Button variant="default">
                                                {step.buttonText}
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="w-1/2 md:px-8 flex items-center justify-center">
                        <div className="px-12 flex items-center justify-center">
                            <Image
                                src={authSteps[currentStep - 1].imageSrc}
                                alt={authSteps[currentStep - 1].title}
                                width={500}
                                height={500}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthProcess

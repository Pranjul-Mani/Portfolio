"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { startAssistant, stopAssistant } from "@/lib/vapi";
import { useVapi } from "@/hooks/useVapi";
import { FaMicrophone, FaMicrophoneSlash, FaTimes } from "react-icons/fa";

const FloatingAIAssistant: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { callDetails, endCall } = useVapi();

    const handleStartAssistant = async () => {
        setIsLoading(true);
        try {
            await startAssistant("Visitor", "Portfolio", "visitor@portfolio.com", "+1234567890");
        } catch (error) {
            console.error("Failed to start assistant:", error);
            alert("Failed to start voice assistant. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStopAssistant = () => {
        stopAssistant();
        endCall();
        setIsExpanded(false);
    };

    const VolumeVisualizer: React.FC<{ volume: number }> = ({ volume }) => {
        const bars = 6;
        return (
            <div className="flex items-center justify-center space-x-0.5 h-3">
                {Array.from({ length: bars }, (_, i) => (
                    <motion.div
                        key={i}
                        className={`w-0.5 bg-cyan-400 rounded-full ${i / bars < volume ? "opacity-100" : "opacity-30"
                            }`}
                        style={{
                            height: callDetails.assistantIsSpeaking
                                ? Math.random() * 6 + 3 + "px"
                                : "3px"
                        }}
                        animate={{
                            scaleY: callDetails.assistantIsSpeaking
                                ? [1, 1.5, 0.8, 1.2, 1]
                                : 1
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: callDetails.assistantIsSpeaking ? Infinity : 0,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="fixed bottom-12 right-12 z-50">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute bottom-20 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl p-4 w-64 shadow-2xl"
                        style={{ transformOrigin: "bottom right" }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                                    < img src="bot2.gif" className="text-white text-sm" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-white font-semibold text-sm">PRAX</h3>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span className="text-green-400 text-xs">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaTimes className="text-sm" />
                            </button>
                        </div>

                        {callDetails.isCallActive ? (
                            <div className="space-y-3">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <motion.div
                                            className={`w-2 h-2 rounded-full ${callDetails.assistantIsSpeaking
                                                ? "bg-green-400"
                                                : "bg-gray-400"
                                                }`}
                                            animate={{
                                                scale: callDetails.assistantIsSpeaking ? [1, 1.2, 1] : 1,
                                                opacity: callDetails.assistantIsSpeaking ? [1, 0.7, 1] : 1
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: callDetails.assistantIsSpeaking ? Infinity : 0,
                                                ease: "easeInOut"
                                            }}
                                        />
                                        <span className="text-xs text-gray-300">
                                            {callDetails.assistantIsSpeaking
                                                ? "Speaking..."
                                                : "Listening..."}
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <VolumeVisualizer volume={callDetails.volumeLevel} />
                                    </div>
                                </div>

                                <button
                                    onClick={handleStopAssistant}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                                >
                                    <FaMicrophoneSlash className="text-sm" />
                                    End Call
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-gray-300 text-xs text-center">
                                    Hi there! I&apos;m PRAX, Pranjul&apos;s AI assistant.
                                </p>

                                <button
                                    onClick={handleStartAssistant}
                                    disabled={isLoading}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-400 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed text-sm"
                                >
                                    <FaMicrophone className="text-sm" />
                                    {isLoading ? "Starting..." : "Start Voice Chat"}
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Floating Button */}
            <motion.button
                onClick={() => callDetails.isCallActive ? handleStopAssistant() : setIsExpanded(!isExpanded)}
                className={`relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${callDetails.isCallActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    boxShadow: callDetails.assistantIsSpeaking
                        ? "0 0 20px rgba(34, 211, 238, 0.6)"
                        : "0 4px 20px rgba(0, 0, 0, 0.3)"
                }}
            >
                {/* Pulsing Ring for Active Call */}
                {callDetails.isCallActive && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-400"
                        animate={{
                            scale: [1, 1.3],
                            opacity: [0.8, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />
                )}

                {/* Icon */}
                <div className="w-32 h-32 flex items-center justify-center rounded-full overflow-hidden">
                    {callDetails.isCallActive ? (
                        <FaMicrophoneSlash className="text-white text-xl" />
                    ) : (
                        <img
                            src="/bot3.gif"
                            alt="Chatbot"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Online indicator dot */}
                {!callDetails.isCallActive && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </motion.button>
        </div>
    );
};

export default FloatingAIAssistant;
"use client";

import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="w-[100vw]  bg-gray-900 text-white py-4 px-4 flex flex-col items-center justify-center">
            {/* Social Icons */}
            <motion.div
                className="flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Link
                    href="https://linkedin.com/in/pranjul-mani"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-300"
                    >
                        <Linkedin className="w-6 h-6 text-white" />
                    </motion.div>
                </Link>

                <Link
                    href="https://github.com/pranjul-mani"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                    >
                        <Github className="w-6 h-6 text-white" />
                    </motion.div>
                </Link>
            </motion.div>

            {/* Copyright Text */}
            <motion.p
                className="mt-4 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                © {new Date().getFullYear()} All rights reserved.
            </motion.p>
        </div>
    );
};

export default Footer;

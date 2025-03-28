"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { JSX } from "react/jsx-runtime";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const direction = current - (scrollYProgress.getPrevious() || 0);

            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                setVisible(direction < 0);
            }
        }
    });

    const scrollToSection = (id: string) => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            const section = document.querySelector(id);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 1, y: -100 }}
                animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                    "flex max-w-xs sm:max-w-fit fixed top-6 sm:top-10 inset-x-0 mx-auto border rounded-full shadow-md z-[5000] px-6 py-3 sm:px-10 sm:py-5 items-center justify-center space-x-2 sm:space-x-4 border-white/[0.2] bg-black-100"
                    ,
                    className
                )}
            >
                {navItems.map((navItem, idx) => (
                    <button
                        key={`link=${idx}`}
                        onClick={() => scrollToSection(navItem.link)}
                        className={cn(
                           "relative dark:text-neutral-50 items-center flex space-x-1 sm:space-x-2 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"

                        )}
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="text-sm !cursor-pointer">{navItem.name}</span>
                    </button>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};

"use client"

import MagicButton from './ui/MagicButton';
import { Spotlight } from './ui/Spotlight';
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";


const Hero = () => {

    return (

        <section className="py-12 sm:py-16 text-center mt-10 sm:mt-16 md:mt-20 scroll-mt-24 mb-20 sm:mb-10 px-4 sm:px-8 md:px-16" id='home'>

            <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-40 mt-10 md:mt-20">

                <div>
                    <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill="white" />
                    <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill="purple" />
                    <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill="blue" />
                </div>

                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold">
                        Hello, It&apos;s me <br />
                        <span className="text-cyan-400">Pranjul Mani</span>
                    </h1>
                    <h2 className="text-xl mt-2 text-gray-300">{" "}
                        <span className="text-gray-300"> Code. Create. Scale.</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-md">
                        Aspiring Software Engineer | Passionate about Web & AI 
                    </p>


                    <div className="flex justify-center md:justify-start gap-4 mt-4 ">
                        <a href="https://github.com/pranjul-mani" className="text-3xl">
                            <i><FaGithub /></i>
                        </a>
                        <a href="https://linkedin.com/in/pranjul-mani" className="text-blue-400 text-3xl">
                            <i><FaLinkedin /></i>
                        </a>
                    </div>


                    <a
                        href="https://drive.google.com/file/d/193pseXbrUdg4EIuTkaHhH09ubijHfyax/view?usp=drive_link"
                        download>
                        <MagicButton
                            title="Resume"
                            icon={""}
                            position=''

                        />

                    </a>
                </div>


                <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 ml-0 md:ml-20"
                >
                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl"></div>
                    <div className="relative rounded-full overflow-hidden border-4 border-cyan-400">
                        <Image
                            src="/profile.jpg"
                            alt="Profile"
                            width={300}
                            height={300}
                            className="object-cover"
                        />
                    </div>
                </motion.div>
            </div>

        </section >
    )
}

export default Hero;

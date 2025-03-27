"use client"
import { motion } from 'framer-motion';



const About = () => {

    return (
        <section className="text-white py-16 px-6 sm:px-10 md:px-16 lg:px-32 xl:px-48 
                   mt-10 sm:mt-20 md:mt-24 mb-16 sm:mb-20 md:mb-24" id="about">
       
        <h2 className="text-4xl sm:text-3xl md:text-5xl font-bold text-center py-6">
            About Me
        </h2>
    
       
        <p className="mt-10 text-lg sm:text-xl md:text-2xl text-gray-300 text-center leading-relaxed max-w-4xl mx-auto">
            Hey there! I'm a passionate <span className="text-cyan-400 font-semibold">Full Stack Developer </span> 
             specializing in <span className="text-cyan-400 font-semibold">MERN stack</span> and <span className="text-cyan-400 font-semibold">Java</span>.
            Currently pursuing my <span className="text-cyan-400 font-semibold">Computer Science degree at MMMUT</span>,
            I love building web applications that blend <span className="text-cyan-400 font-semibold">performance, design, and functionality</span>.
            I also enjoy solving <span className="text-cyan-400 font-semibold">DSA problems</span> and exploring new technologies.
            
        </p>
    </section>
    
    );
}


export default About;
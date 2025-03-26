"use client";

import { motion, TargetAndTransition } from "framer-motion";
import Image from "next/image";

const skills = [
    { src: "/java.png", alt: "Java" },
    { src: "/c.png", alt: "C" },
    { src: "/html.png", alt: "Html" },
    { src: "/css-3.png", alt: "CSS" },
    { src: "/js.png", alt: "Javascript" },
    { src: "/re.svg", alt: "React" },
    { src: "/mongo.png", alt: "MongoDB" },
    { src: "/nodejs.png", alt: "Node.js" },
    { src: "/exp.svg", alt: "Express" },
    { src: "/tail.svg", alt: "TailwindCSS" },
    { src: "/fm.svg", alt: "Framer Motion" },
    { src: "/three.svg", alt: "Threejs" },
    { src: "/next.svg", alt: "Nextjs" },
    { src: "/git.svg", alt: "Git" },
    { src: "/ts.svg", alt: "Typescipt" },
    { src: "/api1.png", alt: "API" },
    { src: "/mysql.png", alt: "MySQL" },
];

const floatAnimation: TargetAndTransition = {
    y: [0, -10, 0], 
    transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
    },
};

const Skills = () => {
    return (
        <section className=" py-16 text-center mt-10" id="skills">
            <h2 className="text-5xl font-bold text-white">Technologies</h2>
            <div className="flex flex-wrap justify-center gap-20 mt-20">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        animate={floatAnimation}
                        className="p-4 rounded-xl shadow-lg"
                    >
                        <Image src={skill.src} alt={skill.alt} width={64} height={64} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;

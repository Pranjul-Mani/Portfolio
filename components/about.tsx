"use client"


const About = () => {

    return (
        <section className="text-white py-16 px-6 sm:px-10 md:px-16 lg:px-32 xl:px-48 
                   mt-10 sm:mt-10 md:mt-24 mb-16 sm:mb-20 md:mb-24" id="about">

            <h2 className="text-4xl sm:text-3xl md:text-5xl font-bold text-center py-6">
                About Me
            </h2>


            <p className="mt-10 text-lg sm:text-xl md:text-2xl text-gray-300 text-center leading-relaxed max-w-4xl mx-auto">
                Hey there! I&apos;m a passionate <span className="text-cyan-400 font-semibold">Full Stack Developer </span>
                specializing in <span className="text-cyan-400 font-semibold">MERN stack</span> and <span className="text-cyan-400 font-semibold">Java programming</span>.
                Currently pursuing my B.Tech in<span className="text-cyan-400 font-semibold"> Computer Science and Engineering</span> at MMMUT,
                Worked on several full-stack projects, applying core concepts of web development alongside a solid grasp of <span className="text-cyan-400 font-semibold">Data Structures and Algorithms.</span> Always eager to learn something new to grow as a developer and stay updated with the latest in tech.
               Outside of tech, I have a keen interest in <span className="text-cyan-400 font-semibold">space exploration and geopolitics,</span> which fuel my curiosity and global perspective.

            </p>
        </section>

    );
}


export default About;
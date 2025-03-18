"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        try {
            await emailjs.send(
                "service_6vsvnow",
                "template_g22dqe9",
                {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message,
                },
                "WWjX2Pm5F-LkF7Rsx"
            );

            setSuccessMessage("Thank you for your feedback! We'll get back to you soon.");
            reset();
        } catch (error) {
            console.error("Email sending failed:", error);
            setSuccessMessage("Something went wrong. Please try again later.");
        }

        setIsLoading(false);
    };

    return (

        <div id='contact' className="mb-10">
            <h1 className='heading'>
                <span >Contact </span>
            </h1>
            <section className="flex items-center justify-center p-6 mt-5 ">
                <Card className="w-full max-w-4xl max-h-6xl p-6 pb-1 shadow-md ">
                    <BackgroundBeamsWithCollision >
                        <p className="text-2xl font-bold text-center">I'd love to hear your feedback!</p>


                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 mx-6">
                            <div className="mt-9">
                                <Input className="bg-black-200 text-white-200 font-bold"
                                    placeholder="Enter your name"
                                    {...register("name", { required: "Name is required" })}
                                />
                            </div>

                            <div className="mt-9">
                                <Input className="bg-black-200 text-white-200 font-bold"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                />
                            </div>

                            <div className="mt-9">
                                <Textarea className="bg-black-200 text-white-200 font-bold"
                                    placeholder="Your Message"
                                    rows={4}
                                    {...register("message", { required: "Message is required" })}
                                />
                            </div>

                            {/* <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send"}
                            </Button> */}
                            <MagicButton
                                title="Send"
                                icon={<FaLocationArrow />}
                                position='right'
                            />
                        </form>

                        {successMessage && <p className="mt-4 text-center text-green-600">{successMessage}</p>}
                    </BackgroundBeamsWithCollision>
                </Card>
            </section>
        </div>
    );
};

export default Contact;

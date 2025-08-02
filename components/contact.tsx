"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision" // Custom component
import MagicButton from "@/components/ui/MagicButton" // Custom component
import { FaLocationArrow } from "react-icons/fa"
import { Mail, Phone, MapPin } from "lucide-react" // Lucide icons for contact info

interface FormData {
  name: string
  email: string
  message: string
}

// The Contact component provided by the user, renamed for clarity
const ContactFormSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm<FormData>()
  const [successMessage, setSuccessMessage] = useState("")

  const onSubmit = async (data: FormData) => {
    try {
      await emailjs.send(
        "service_6vsvnow", 
        "template_g22dqe9", 
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        "WWjX2Pm5F-LkF7Rsx", 
      )
      setSuccessMessage("Thank you for your feedback!")
      reset()
    } catch (error) {
      console.error("Email sending failed:", error)
      setSuccessMessage("Something went wrong. Please try again later.")
    }
  }

  return (
    <Card className="w-full max-w-4xl max-h-6xl p-6 pb-1 shadow-md h-full">
      {" "}
      {/* Added h-full */}
      <BackgroundBeamsWithCollision>
        <p className="text-2xl font-bold text-center">I&apos;d love to hear your feedback!</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 mx-6">
          <div className="mt-9">
            <Input
              className="bg-black-200 text-white-200 font-bold"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          <div className="mt-9">
            <Input
              className="bg-black-200 text-white-200 font-bold"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>
          <div className="mt-9">
            <Textarea
              className="bg-black-200 text-white-200 font-bold"
              placeholder="Your Message"
              rows={4}
              {...register("message", { required: "Message is required" })}
            />
          </div>
          <MagicButton title="Send" icon={<FaLocationArrow />} position="right" />
        </form>
        {successMessage && <p className="mt-4 text-center text-green-600">{successMessage}</p>}
      </BackgroundBeamsWithCollision>
    </Card>
  )
}

// The main page component combining the form and contact details
export default function ContactPage() {
  return (
    <div id="contact" className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
      {/* Moved heading to the top, outside the grid */}
      <h1 className="heading text-center mb-8">
        <span>Contact </span>
      </h1>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-16 md:grid-cols-2 animate-fade-in-up">
        {/* Left Column: Contact Form */}
        <div className="flex">
          {" "}
         
          <ContactFormSection /> 
        </div>

        {/* Right Column: Contact Information Card */}
        <Card className="flex flex-col justify-center p-6 h-full">
          {" "}
          {/* Added h-full */}
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Get in Touch</CardTitle>
            <CardDescription>You can also reach me directly through the following channels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">pranjulmani010@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">+91 7080705082</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-muted-foreground">Fatehpur, Uttar Pradesh</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

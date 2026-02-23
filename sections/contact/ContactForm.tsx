"use client"
import { Input } from "@/components/ui/input"

const ContactForm = () => {
    return (
        <form className="font-jost">
            <div className="space-y-3">
                <span className="text-red-600 text-lg">Contact us</span>
                <h1 className="text-4xl font-medium mt-3">Get in touch</h1>
                <p className="text-gray-700">
                    We are always happy to help you with any questions or concerns you may have. Send us a message and we'll get back to you as soon as possible.
                </p>
            </div>

            <div className="mt-10 grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="text-sm">Your Name*</label>
                        <Input placeholder="Your Name" className="mt-2" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm">Your Email*</label>
                        <Input placeholder="Your Email" className="mt-2" />
                    </div>
                </div>
                <div>
                    <label htmlFor="subject" className="text-sm">Subject*</label>
                    <Input placeholder="Subject" className="mt-2" />
                </div>
                <div>
                    <label htmlFor="message" className="text-sm">Your Message</label>
                    <textarea className="w-full h-32 border border-gray-300 rounded-md p-3 mt-2" placeholder="Message" />
                </div>
                <button className="w-fit px-4 bg-black text-white py-2">Send Message</button>
            </div>
        </form>
    )
}

export default ContactForm
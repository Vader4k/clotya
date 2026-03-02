"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

const TrackingForm = () => {

    const [trackingInfo, setTrackingInfo] = useState({
        orderId: "",
        email: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTrackingInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form className="font-jost">
            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="orderId" className="text-sm">Order ID</label>
                    <Input
                        type="text"
                        name="orderId"
                        value={trackingInfo.orderId}
                        className="py-5 rounded-none"
                        onChange={handleChange}
                        placeholder="Found in your order confirmation email."
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={trackingInfo.email}
                        className="py-5 rounded-none"
                        onChange={handleChange}
                        placeholder="Email you used during checkout."
                    />
                </div>
                <button className="bg-neutral-200 border border-neutral-300 rounded font-medium px-5 py-2 w-fit" type="submit">Track</button>
            </div>
        </form>
    )
}

export default TrackingForm
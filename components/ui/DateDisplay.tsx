"use client"

import { useState, useEffect } from "react";

export default function DateDisplay() {
    const [formattedDate, setFormattedDate] = useState("")

    useEffect( () => {
        const date = new Date();

        const options: Intl.DateTimeFormatOptions = { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        setFormattedDate(date.toLocaleDateString('en-US', options))
    }, [])
    
    
    return (
        <p>
          {formattedDate}
        </p>
    )

}
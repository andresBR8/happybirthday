"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: Date
  onComplete: () => void
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        onComplete()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="relative">
        <div className="text-2xl md:text-4xl font-bold font-serif text-[#daa520] drop-shadow-[0_0_15px_rgba(218,165,32,0.5)]">
          {value.toString().padStart(2, "0")}
        </div>
        <div className="absolute inset-0 bg-[#daa520] opacity-10 blur-xl rounded-full" />
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1 md:mt-2 font-light">
        {label}
      </span>
    </div>
  )

  return (
    <div className="flex justify-center items-center py-4 px-6 md:px-8 rounded-2xl backdrop-blur-md bg-black/30 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-fade-in mb-6">
      <TimeUnit value={timeLeft.days} label="Días" />
      <div className="text-[#daa520]/50 text-xl font-light mb-4">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="text-[#daa520]/50 text-xl font-light mb-4">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <div className="text-[#daa520]/50 text-xl font-light mb-4">:</div>
      <TimeUnit value={timeLeft.seconds} label="Segdos" />
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

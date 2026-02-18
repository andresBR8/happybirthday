"use client"

import { useState, useEffect, useRef } from "react"
import { X, Lock, Unlock } from "lucide-react"

interface SecretCodeModalProps {
  onUnlock: () => void
  onCancel: () => void
}

export function SecretCodeModal({ onUnlock, onCancel }: SecretCodeModalProps) {
  const [code, setCode] = useState(["", "", "", ""])
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  
  const CORRECT_CODE = "8419"

  useEffect(() => {
    // Focus first input on mount
    inputsRef.current[0]?.focus()
  }, [])

  const handleInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1) // Take last char
    setCode(newCode)

    // Auto-focus next
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus()
    }

    // Check code if full
    const fullCode = newCode.join("")
    if (fullCode.length === 4 && !newCode.includes("")) {
      if (fullCode === CORRECT_CODE) {
        setSuccess(true)
        setTimeout(onUnlock, 800)
      } else {
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setCode(["", "", "", ""])
          inputsRef.current[0]?.focus()
        }, 500)
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
        onClick={onCancel}
      />
      
      {/* Modal Card */}
      <div 
        className={`relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl transition-transform duration-300 ${shake ? "animate-shake-horizontal" : "animate-scale-in"}`}
      >
        {/* Close button */}
        <button 
          onClick={onCancel}
          className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center gap-6">
          <div className={`rounded-full p-4 ${success ? "bg-green-500/20 text-green-400" : "bg-[#daa520]/20 text-[#daa520]"}`}>
            {success ? <Unlock size={32} /> : <Lock size={32} />}
          </div>

          <h3 className="text-xl font-medium text-white font-serif tracking-wide">
            {success ? "¡Acceso Concedido!" : "Código de Seguridad"}
          </h3>
          
          <div className="flex gap-3 my-2">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[i]}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={success}
                className={`h-14 w-12 rounded-lg border-2 bg-black/50 text-center text-2xl font-bold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#daa520]/50
                  ${success 
                    ? "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                    : shake 
                      ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                      : "border-white/10 focus:border-[#daa520]"
                  }`}
              />
            ))}
          </div>

          <p className="text-sm text-white/40 font-light">
            Ingresa el PIN de 4 dígitos
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake-horizontal {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
        .animate-shake-horizontal { animation: shake-horizontal 0.4s ease-in-out; }
      `}</style>
    </div>
  )
}

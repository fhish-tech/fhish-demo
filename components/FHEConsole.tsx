"use client"

import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X, Trash2, Shield, Zap, Database, ArrowRight } from "lucide-react"
import { useFHELogStore, FHELog } from "@/lib/logger"
import { cn } from "@/lib/utils"

export const FHEConsole = () => {
  const { logs, isOpen, toggleOpen, clearLogs } = useFHELogStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [logs])

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleOpen}
        className={cn(
          "fixed bottom-8 right-8 z-[60] p-4 rounded-full shadow-2xl transition-all hover:scale-110",
          isOpen ? "bg-red-500 rotate-90" : "bg-blue-600 hover:bg-blue-500"
        )}
      >
        {isOpen ? <X size={24} /> : <Terminal size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[450px] bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-50 flex flex-col font-mono"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Shield size={20} />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-tight text-white/90">FHE LOGS</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Real-time Encryption Stream</p>
                </div>
              </div>
              <button 
                onClick={clearLogs}
                className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Log Stream */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {logs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-20 grayscale">
                  <Terminal size={48} className="mb-4" />
                  <p className="text-xs">Waiting for FHE activity...</p>
                </div>
              )}
              {logs.map((log) => (
                <LogItem key={log.id} log={log} />
              ))}
            </div>

            {/* Footer Status */}
            <div className="p-4 border-t border-white/10 bg-black/40 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-white/30 uppercase font-bold">Encryptions</span>
                <span className="text-xs text-white/80">{logs.filter(l => l.type === 'fhe').length} calls</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-white/30 uppercase font-bold">Network</span>
                <span className="text-xs text-white/80">{logs.filter(l => l.type === 'network').length} requests</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const LogItem = ({ log }: { log: FHELog }) => {
  const isFHE = log.type === 'fhe'
  const isNetwork = log.type === 'network'
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "group relative p-3 rounded-lg border transition-all",
        isFHE ? "bg-purple-500/[0.03] border-purple-500/10" : 
        isNetwork ? "bg-blue-500/[0.03] border-blue-500/10" : 
        "bg-white/[0.01] border-white/5"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {isFHE ? <Zap size={12} className="text-purple-400" /> : 
           isNetwork ? <Database size={12} className="text-blue-400" /> : 
           <ArrowRight size={12} className="text-white/40" />}
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-wider",
            isFHE ? "text-purple-400" : isNetwork ? "text-blue-400" : "text-white/40"
          )}>
            {log.type}
          </span>
        </div>
        <span className="text-[9px] text-white/20">
          {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
      
      <p className="text-[11px] leading-relaxed text-white/80 mb-2">{log.message}</p>
      
      {log.data && (
        <div className="mt-2 bg-black/40 rounded p-2 overflow-x-hidden">
          <pre className="text-[10px] text-white/40 font-mono break-all whitespace-pre-wrap max-h-32 overflow-y-auto">
            {typeof log.data === 'string' ? log.data : JSON.stringify(log.data, null, 2)}
          </pre>
        </div>
      )}
    </motion.div>
  )
}

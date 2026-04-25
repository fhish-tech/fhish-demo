import { create } from 'zustand'

export type LogType = 'info' | 'warn' | 'error' | 'fhe' | 'network'

export interface FHELog {
  id: string
  timestamp: number
  type: LogType
  message: string
  data?: any
}

interface FHELogStore {
  logs: FHELog[]
  isOpen: boolean
  addLog: (type: LogType, message: string, data?: any) => void
  clearLogs: () => void
  toggleOpen: () => void
  setOpen: (open: boolean) => void
}

export const useFHELogStore = create<FHELogStore>((set) => ({
  logs: [],
  isOpen: false,
  addLog: (type, message, data) => set((state) => ({
    logs: [
      {
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        type,
        message,
        data
      },
      ...state.logs
    ].slice(0, 100) // Keep last 100 logs
  })),
  clearLogs: () => set({ logs: [] }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (isOpen) => set({ isOpen })
}))

// Global helper for non-component code
export const fheLog = (type: LogType, message: string, data?: any) => {
  useFHELogStore.getState().addLog(type, message, data)
}

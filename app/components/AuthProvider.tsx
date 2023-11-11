"use client"

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

export const AuthProvider = ({ children, session } : {
    children?: ReactNode,
}) => {
    return <SessionProvider >{ children }</SessionProvider>
}

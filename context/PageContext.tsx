'use client'
import { createContext, useContext } from 'react'

export type PageName = 'home' | 'work' | 'services' | 'studio' | 'contact'

interface PageContextType {
  currentPage: PageName
  navigateTo: (page: PageName) => void
}

export const PageContext = createContext<PageContextType>({
  currentPage: 'home',
  navigateTo: () => {},
})

export const usePage = () => useContext(PageContext)

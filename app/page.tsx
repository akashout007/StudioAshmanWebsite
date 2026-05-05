'use client'
import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { PageContext, PageName } from '@/context/PageContext'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import HomePage from '@/components/pages/HomePage'
import WorkPage from '@/components/pages/WorkPage'
import ServicesPage from '@/components/pages/ServicesPage'
import StudioPage from '@/components/pages/StudioPage'
import ContactPage from '@/components/pages/ContactPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('home')
  const isTransitioning = useRef(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const navigateTo = useCallback((page: PageName) => {
    if (page === currentPage || isTransitioning.current) return
    isTransitioning.current = true

    gsap.to(wrapRef.current, {
      opacity: 0,
      y: -18,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentPage(page)
        window.scrollTo({ top: 0 })
        gsap.fromTo(
          wrapRef.current,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
            onComplete: () => { isTransitioning.current = false },
          }
        )
      },
    })
  }, [currentPage])

  return (
    <PageContext.Provider value={{ currentPage, navigateTo }}>
      <Cursor />
      <Nav />
      <div ref={wrapRef} className="page-wrap">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'work' && <WorkPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'studio' && <StudioPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>
    </PageContext.Provider>
  )
}

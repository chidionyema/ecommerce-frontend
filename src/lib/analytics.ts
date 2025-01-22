// lib/analytics.ts
import Router from 'next/router'
import { GA4React } from 'ga-4-react'

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const initGA = async () => {
  if (!MEASUREMENT_ID || typeof window === 'undefined') return
  
  const ga4react = new GA4React(MEASUREMENT_ID)
  try {
    await ga4react.initialize()
    trackPageView(window.location.pathname)
    
    Router.events.on('routeChangeComplete', (url) => {
      trackPageView(url)
    })
  } catch (error) {
    console.error('Analytics initialization failed:', error)
  }
}

export const trackPageView = (path: string) => {
  window.gtag('config', MEASUREMENT_ID!, {
    page_path: path,
    transport_type: 'beacon'
  })
}

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
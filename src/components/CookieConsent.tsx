// components/CookieConsent.tsx
import { useState, useEffect } from 'react'
import { Button, Snackbar, Alert, Box } from '@mui/material'

const CookieConsent = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) {
      setOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setOpen(false)
    window.location.reload() // Re-initialize analytics
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="info" sx={{ width: '100%' }}>
        We use cookies to analyze traffic and improve your experience.
        <Box mt={1} display="flex" gap={1}>
          <Button variant="contained" size="small" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="outlined" size="small" onClick={handleDecline}>
            Decline
          </Button>
        </Box>
      </Alert>
    </Snackbar>
  )
}
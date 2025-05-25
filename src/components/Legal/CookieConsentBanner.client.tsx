'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Typography,
  Slide,
  Paper,
  Stack,
} from '@mui/material';

const COOKIE_NAME = 'cookie_consent_v1';          // bump version if wording changes
const EXP_DAYS    = 180;                          // 6 months

export default function CookieConsentBanner() {
  const [open, setOpen] = useState(false);

  // Show banner only if consent cookie absent
  useEffect(() => {
    if (!Cookies.get(COOKIE_NAME)) setOpen(true);
  }, []);

  const acceptAll = () => {
    Cookies.set(COOKIE_NAME, 'analytics', { expires: EXP_DAYS, sameSite: 'Lax' });
    setOpen(false);
    window.dispatchEvent(new Event('cookie-consent-granted')); //  trigger GA etc.
  };

  const decline = () => {
    Cookies.set(COOKIE_NAME, 'necessary', { expires: EXP_DAYS, sameSite: 'Lax' });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Slide direction="up" in={open}>
      <Paper
        elevation={6}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1400,
          p: 2,
          borderRadius: 0,
        }}
        role="dialog"
        aria-label="Cookie consent banner"
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            We use cookies to personalise content and analyse traffic.{' '}
            <a href="/privacy-policy" target="_blank">
              Learn more
            </a>
            .
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
            <Button size="small" onClick={decline}>
              Reject
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={acceptAll}
            >
              Accept
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Slide>
  );
}

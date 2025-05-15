// src/components/Booking/StrategySessionScheduler.tsx
"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Box, Typography, Button, IconButton, Grid, TextField, Paper, alpha,
  Stack, Dialog, DialogContent, Slide, CircularProgress, useMediaQuery, InputAdornment,
} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { styled, useTheme, Theme as MuiTheme } from "@mui/material/styles";
import {
  ChevronLeft, ChevronRight, X as CloseIcon, CheckCircle,
  Calendar as CalendarIcon, Clock as ClockIcon, User as UserIcon,
  Mail as MailIcon, Send, Edit3,
} from "lucide-react";
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, getDay, isEqual, isToday, isBefore, set,
  // parse, isValid, // parse and isValid were imported but not used
} from "date-fns";

// --- Styling ---
const schedulerStyles = (theme: MuiTheme) => ({
  colors: {
    primary: theme.palette.mode === 'dark' ? "#8A8BF4" : "#6366F1",
    text: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    background: theme.palette.background.paper,
    selectedBg: theme.palette.mode === 'dark' ? alpha("#6366F1", 0.35) : alpha("#6366F1", 0.12),
    selectedText: theme.palette.mode === 'dark' ? "#E0E1E3" : theme.palette.primary.main,
    availableHoverBg: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.08) : alpha(theme.palette.common.black, 0.04),
    disabledText: theme.palette.action.disabled,
    borderColor: theme.palette.divider,
    success: theme.palette.success.main,
  },
  borderRadius: "16px",
  fontFamily: theme.typography.fontFamily,
});

const ModalPaper = styled(Paper)(({ theme }) => {
  const styles = schedulerStyles(theme);
  return {
    borderRadius: styles.borderRadius, padding: 0, backgroundColor: styles.colors.background,
    maxWidth: "520px", width: "100%", maxHeight: "90vh", display: "flex",
    flexDirection: "column", boxShadow: theme.shadows[10],
  };
});

const HeaderBox = styled(Box)(({ theme }) => {
  const styles = schedulerStyles(theme);
  return {
    padding: theme.spacing(2, 2.5), borderBottom: `1px solid ${styles.colors.borderColor}`,
    display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0,
  };
});

const ContentBox = styled(DialogContent)(({theme}) => ({
    padding: theme.spacing(2.5, 3), fontFamily: schedulerStyles(theme).fontFamily,
    flexGrow: 1, overflowY: 'auto',
}));

// CalendarGrid inlined below using sx prop

const DayCellButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isTodayCell" && prop !== "isAvailableCell",
})<{ isSelected?: boolean; isTodayCell?: boolean; isAvailableCell?: boolean }>(({ theme, isSelected, isTodayCell, isAvailableCell }) => {
  const styles = schedulerStyles(theme);
  return {
    minWidth: "40px", width: "40px", height: "40px", padding: 0, borderRadius: "10px",
    fontWeight: isSelected ? 600 : 500, fontSize: "0.9rem",
    color: isSelected ? styles.colors.selectedText : (isAvailableCell ? styles.colors.text : styles.colors.disabledText),
    backgroundColor: isSelected ? styles.colors.selectedBg : "transparent",
    border: (isTodayCell && !isSelected) || isSelected ? `2px solid ${styles.colors.primary}` : "2px solid transparent", // Simplified border logic slightly
    opacity: isAvailableCell || isSelected ? 1 : 0.4,
    pointerEvents: isAvailableCell || isSelected ? "auto" : "none",
    transition: "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease",
    "&:hover": {
      backgroundColor: isAvailableCell && !isSelected ? styles.colors.availableHoverBg : undefined,
      borderColor: isAvailableCell && !isSelected && !isTodayCell ? styles.colors.borderColor : undefined,
      transform: isAvailableCell && !isSelected ? "scale(1.05)" : undefined,
    },
  };
});

const TimeSlotButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ theme, isSelected }) => {
  const styles = schedulerStyles(theme);
  return {
    width: "100%", padding: theme.spacing(1.5, 2.5), borderRadius: "10px",
    fontWeight: isSelected ? 600 : 500, justifyContent: "center", fontSize: "0.95rem",
    color: isSelected ? theme.palette.getContrastText(styles.colors.primary) : styles.colors.text,
    backgroundColor: isSelected ? styles.colors.primary : alpha(styles.colors.availableHoverBg, theme.palette.mode === 'dark' ? 0.9 : 0.5),
    border: `1px solid ${isSelected ? styles.colors.primary : styles.colors.borderColor}`,
    boxShadow: isSelected ? `0 2px 8px ${alpha(styles.colors.primary, 0.3)}` : 'none',
    transition: "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease",
    "&:hover": {
      backgroundColor: isSelected ? alpha(styles.colors.primary, 0.85) : styles.colors.availableHoverBg,
      borderColor: styles.colors.primary, transform: "scale(1.01)",
    },
  };
});

const StyledTextField = styled(TextField)(({ theme }) => {
    const styles = schedulerStyles(theme);
    return {
        mb: 2, // Changed from marginBottom: theme.spacing(2)
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.05) : alpha(theme.palette.common.black, 0.02),
            '& fieldset': { borderColor: styles.colors.borderColor, },
            '&:hover fieldset': { borderColor: styles.colors.primary, },
            '&.Mui-focused fieldset': { borderColor: styles.colors.primary, borderWidth: '1px' },
        },
        '& .MuiInputLabel-root': { color: styles.colors.textSecondary, '&.Mui-focused': { color: styles.colors.primary, } }
    }
});

const ActionButton = styled(Button)(({ theme }) => {
  const styles = schedulerStyles(theme);
  return {
    width: "100%", padding: theme.spacing(1.5), borderRadius: "10px",
    backgroundColor: styles.colors.primary, color: theme.palette.getContrastText(styles.colors.primary),
    fontWeight: 600, fontSize: "1rem",
    "&:hover": { backgroundColor: alpha(styles.colors.primary, 0.85), },
    "&:disabled": { backgroundColor: theme.palette.action.disabledBackground, color: theme.palette.action.disabled }
  };
});

const SlideUp = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any>; },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} timeout={300} />;
});

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface StrategySessionSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail?: string;
  sessionName?: string;
}

type BookingStep = "date" | "time" | "details" | "confirmation";

const StrategySessionScheduler: React.FC<StrategySessionSchedulerProps> = ({
  isOpen,
  onClose,
  recipientEmail = "strategy@glustack.com",
  sessionName = "Strategy Session"
}) => {
  const theme = useTheme();
  const styles = useMemo(() => schedulerStyles(theme), [theme]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<BookingStep>("date");

  const [userDetails, setUserDetails] = useState({ name: "", email: "", notes: "" });
  const [formErrors, setFormErrors] = useState({ name: false, email: false });
  const [isLoading, setIsLoading] = useState(false);

  const startOfTodayUtil = useMemo(() => set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }), []);

  const isDateAvailable = useCallback((date: Date): boolean => {
    const dayOfWeek = getDay(date);
    return dayOfWeek !== 0 && dayOfWeek !== 6 && !isBefore(date, startOfTodayUtil);
  }, [startOfTodayUtil]);

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !isDateAvailable(selectedDate)) return [];
    return ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
  }, [selectedDate, isDateAvailable]);

  // Inlined logic for daysInMonth and monthStartOffset
  const daysInMonth = useMemo(() => eachDayOfInterval({ start: startOfMonth(currentMonthDate), end: endOfMonth(currentMonthDate) }), [currentMonthDate]);
  const monthStartOffset = useMemo(() => getDay(startOfMonth(currentMonthDate)), [currentMonthDate]);

  const resetSelections = useCallback(() => { // Added useCallback
    setSelectedDate(null);
    setSelectedTime(null);
    setUserDetails({ name: "", email: "", notes: ""});
    setFormErrors({name: false, email: false});
  }, []);

  const handleCloseDialog = useCallback(() => { // Added useCallback
    onClose();
    setTimeout(() => {
      setStep("date");
      resetSelections();
      setCurrentMonthDate(new Date());
    }, 300);
  }, [onClose, resetSelections]);

  const handleDateSelect = (day: Date) => {
    if (!isDateAvailable(day)) return;
    setSelectedDate(day);
    setSelectedTime(null);
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("details");
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: !(value.trim()) ? prev[name as keyof typeof formErrors] : false })); // Simplified error reset
  };

  const validateForm = (): boolean => {
      const newErrors = {
          name: !userDetails.name.trim(),
          email: !userDetails.email.trim() || !/\S+@\S+\.\S+/.test(userDetails.email),
      };
      setFormErrors(newErrors);
      return !newErrors.name && !newErrors.email;
  }

  const handlePrepareEmail = () => {
    if (!validateForm() || !selectedDate || !selectedTime) return;
    setIsLoading(true);
    const subject = encodeURIComponent(`${sessionName} Request: ${format(selectedDate, "PPP")} at ${selectedTime}`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to request a ${sessionName}.\n\n` +
      `Name: ${userDetails.name}\nEmail: ${userDetails.email}\n` +
      `Requested Date: ${format(selectedDate, "PPP")}\nRequested Time: ${selectedTime}\n` +
      `${userDetails.notes ? `Notes: ${userDetails.notes}\n` : ""}\nPlease confirm this booking.\n\nThanks!`
    ); // Slightly compacted body string
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    setTimeout(() => {
        window.location.href = mailtoLink;
        setIsLoading(false);
        setStep("confirmation");
    }, 1000);
  };

  const renderStepContent = () => {
    switch (step) {
      case "date":
        return (<>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <IconButton onClick={() => setCurrentMonthDate(prev => subMonths(prev, 1))} aria-label="Previous month" sx={{color: styles.colors.textSecondary}}> <ChevronLeft /> </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 600, color: styles.colors.text, textAlign: 'center' }}>{format(currentMonthDate, "MMMM yyyy")}</Typography>
              <IconButton onClick={() => setCurrentMonthDate(prev => addMonths(prev, 1))} aria-label="Next month" sx={{color: styles.colors.textSecondary}}> <ChevronRight /> </IconButton>
            </Stack>
            <Grid container columns={7} sx={{textAlign: 'center', mb: 1}}>
                {WEEK_DAYS.map(day => <Grid item xs={1} key={day}><Typography variant="caption" sx={{color: styles.colors.textSecondary, fontWeight: 500}}>{day}</Typography></Grid>)}
            </Grid>
            {/* Inlined CalendarGrid */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", py: "8px" }}>
              {Array.from({ length: monthStartOffset }).map((_, i) => <Box key={`offset-${i}`} />)}
              {daysInMonth.map((day) => (
                <DayCellButton key={day.toString()} isSelected={selectedDate ? isEqual(day, selectedDate) : false}
                  isTodayCell={isToday(day)} isAvailableCell={isDateAvailable(day)} onClick={() => handleDateSelect(day)}
                  aria-label={`Select date ${format(day, "PPP")}${isDateAvailable(day) ? "" : " (unavailable)"}`} disabled={!isDateAvailable(day)}>
                  {format(day, "d")}
                </DayCellButton>
              ))}
            </Box>
        </>);
      case "time":
        return (<>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: styles.colors.textSecondary, mb: 0.5, textAlign: 'center' }}>Available times for:</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: styles.colors.text, mb: 2.5, textAlign: 'center' }}>
              {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
            </Typography>
            <Stack spacing={1.5}>
              {availableTimeSlots.length > 0 ? availableTimeSlots.map((time) => (
                <TimeSlotButton key={time} isSelected={selectedTime === time} onClick={() => handleTimeSelect(time)} aria-pressed={selectedTime === time}>
                  {time}
                </TimeSlotButton>
              )) : <Typography sx={{textAlign: 'center', color: styles.colors.textSecondary, py: 3}}>No available slots for this day.</Typography>}
            </Stack>
            <Button startIcon={<Edit3 size={16}/>} onClick={() => setStep("date")} sx={{mt: 2.5, color: styles.colors.textSecondary, textTransform: 'none', display: 'block', mx: 'auto'}}>Change Date</Button>
        </>);
      case "details":
        return (<>
            <Typography variant="h6" sx={{ fontWeight: 600, color: styles.colors.text, mb: 0.5, textAlign: 'center' }}>Your Details</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: styles.colors.textSecondary, mb: 2.5, textAlign: 'center' }}>
              For {sessionName} on <br/>{selectedDate ? format(selectedDate, "MMM d, yyyy") : ""} at {selectedTime}
            </Typography>
            <StyledTextField fullWidth label="Full Name" name="name" value={userDetails.name} onChange={handleDetailsChange} required error={formErrors.name} helperText={formErrors.name ? "Name is required" : " "}
              InputProps={{startAdornment: <InputAdornment position="start"><UserIcon size={18} color={styles.colors.textSecondary}/></InputAdornment>}} aria-required="true"/>
            <StyledTextField fullWidth label="Email Address" name="email" type="email" value={userDetails.email} onChange={handleDetailsChange} required error={formErrors.email} helperText={formErrors.email ? "Valid email is required" : " "}
              InputProps={{startAdornment: <InputAdornment position="start"><MailIcon size={18} color={styles.colors.textSecondary}/></InputAdornment>}} aria-required="true"/>
            <StyledTextField fullWidth label="Additional Notes (Optional)" name="notes" value={userDetails.notes} onChange={handleDetailsChange} multiline rows={3}
              InputProps={{startAdornment: <InputAdornment position="start" sx={{alignItems: 'flex-start', mt: 1.5}}><Edit3 size={18} color={styles.colors.textSecondary}/></InputAdornment>}}/>
            <ActionButton onClick={handlePrepareEmail} disabled={isLoading || !selectedDate || !selectedTime} startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Send size={18} />} sx={{mt: 1}}>
              {isLoading ? "Preparing..." : "Confirm & Prepare Email"}
            </ActionButton>
            <Button startIcon={<Edit3 size={16}/>} onClick={() => setStep("time")} sx={{mt: 2, color: styles.colors.textSecondary, textTransform: 'none', display: 'block', mx: 'auto'}}>Change Time</Button>
        </>);
      case "confirmation":
        return (
          <Box sx={{ textAlign: 'center', py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <CheckCircle size={60} color={styles.colors.success} style={{ marginBottom: theme.spacing(2.5) }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: styles.colors.text, mb: 1.5 }}>Email Prepared!</Typography>
            <Typography sx={{ color: styles.colors.textSecondary, mb: 1, maxWidth: '380px' }}>
              Your booking request for <strong style={{color: styles.colors.text}}>{sessionName}</strong> on <br/>
              <strong style={{color: styles.colors.text}}>{selectedDate ? format(selectedDate, "PPP") : ""} at {selectedTime}</strong> is ready.
            </Typography>
            <Typography sx={{ color: styles.colors.textSecondary, mb: 3, maxWidth: '380px', fontSize: '0.9rem' }}>
              Please check your default email application and click send to finalize your request.
            </Typography>
            <ActionButton onClick={handleCloseDialog} sx={{maxWidth: '200px'}}>Done</ActionButton>
          </Box>
        );
      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} TransitionComponent={SlideUp} PaperComponent={ModalPaper}
      aria-labelledby="scheduler-dialog-title" fullScreen={isMobile}>
      <HeaderBox>
        <Typography variant="h6" id="scheduler-dialog-title" sx={{ fontWeight: 600, color: styles.colors.text, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarIcon size={22} style={{color: styles.colors.primary}}/> {sessionName}
        </Typography>
        <IconButton onClick={handleCloseDialog} aria-label="Close scheduler" sx={{color: styles.colors.textSecondary}}> <CloseIcon size={22} /> </IconButton>
      </HeaderBox>
      <ContentBox dividers={step !== 'confirmation'}>
        {renderStepContent()}
      </ContentBox>
    </Dialog>
  );
};

export default StrategySessionScheduler;
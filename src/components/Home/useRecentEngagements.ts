import { useState, useEffect } from "react";

const engagementsList = [
  "Oliver from Berlin started a Cloud Pilot",
  "Nina from Seattle signed up for DevOps Sprint",
  "Acme Corp. initiated a Data Migration project",
  "Clara from NYC booked a 6-month retainer",
];

export function useRecentEngagements() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % engagementsList.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return engagementsList[index];
}

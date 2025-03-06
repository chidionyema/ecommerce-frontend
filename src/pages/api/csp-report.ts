export const runtime = 'edge';

import { NextApiRequest, NextApiResponse } from "next";

// pages/api/csp-report.ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      console.error('CSP Violation:', req.body);
    }
    res.status(200).send('');
  }
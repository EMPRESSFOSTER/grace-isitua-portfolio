// app/api/admin/stats/route.ts
// Secure endpoint for fetching admin stats
// GET /api/admin/stats

import { NextRequest } from 'next/server';
import { getAdminStats } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const stats = await getAdminStats();
    if (!stats) {
      return Response.json(
        {
          recentLeads: [],
          totalCvDownloads: 0,
          totalChats: 0,
          recentQuotes: [],
          message: 'Supabase parameters missing',
        },
        { status: 200 }
      );
    }
    return Response.json(stats, { status: 200 });
  } catch (error) {
    console.error('[Grace AI] Error fetching admin stats:', error);
    return Response.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}

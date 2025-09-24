// import { NextResponse } from 'next/server'
// const workersData = require('../../../../workers.json');

// export async function GET() {
//   try {
//     return NextResponse.json({
//       success: true,
//       data: workersData
//     })
//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to fetch workers data'
//     }, { status: 500 })
//   }
// }

// src/app/api/workers/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/workers.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workers data' },
      { status: 500 }
    );
  }
}


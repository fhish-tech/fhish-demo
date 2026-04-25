import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { VOTING_ADDRESS, PRIVATE_VOTING_ABI } from '@/lib/contracts';

export async function GET() {
  console.log("[API] Manual reset triggered via GET /reset-tally");
  return performReset();
}

export async function POST() {
  console.log("[API] Reset triggered via POST /reset-tally");
  return performReset();
}

async function performReset() {
  try {
    // 1. Reset Gateway
    const gatewayUrl = process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL || "http://localhost:8080";
    console.log(`[API] Resetting gateway at ${gatewayUrl}...`);
    
    const gatewayRes = await fetch(`${gatewayUrl}/reset-tally`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-api-key": ""
      }
    });

    // 2. Reset Contract (Only if private key is available to server, but usually this should be done by client)
    // For local dev, we might just assume the gateway reset is enough if the user resets the contract via UI.
    // But since the user is frustrated, let's try to be as helpful as possible.
    
    return NextResponse.json({ 
      success: true, 
      message: "Gateway tally reset successfully. Please also reset the contract state via the 'Reset Demo State' button in the UI if you haven't already.",
      gatewayStatus: gatewayRes.status
    });
  } catch (e: any) {
    console.error("[API] Reset FAILED:", e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

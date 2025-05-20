import { NextResponse } from 'next/server';

let ledState = false;

export async function GET() {
  return NextResponse.json({ led: ledState ? "LED_ON" : "LED_OFF" });
}

export async function POST(request:Request) {
  try {
    const { led } = await request.json();
    ledState = led;
    return NextResponse.json({ message: 'LED state updated', led: ledState ? "LED_ON" : "LED_OFF" });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
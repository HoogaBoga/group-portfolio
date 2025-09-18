import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json().catch(() => ({}))

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const endpoint = process.env.NEXT_PUBLIC_GSHEET_WEBAPP_URL
    if (!endpoint) {
      return NextResponse.json(
        { ok: false, error: "Google Sheet endpoint not configured" },
        { status: 500 }
      )
    }

    const urlParams = new URLSearchParams()
    urlParams.append("name", name)
    urlParams.append("email", email)
    urlParams.append("message", message)

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: urlParams.toString(),
    })

    const text = await upstream.text().catch(() => "")
    let parsed: any = null
    try { parsed = text ? JSON.parse(text) : null } catch {}

    if (!upstream.ok || (parsed && parsed.ok === false)) {
      const msg = parsed?.error || text || `Upstream error ${upstream.status}`
      return NextResponse.json({ ok: false, error: msg }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: String(error?.message || error) },
      { status: 500 }
    )
  }
} 
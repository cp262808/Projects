"use client";
export default function Example(){
  const copy = () => {
    const text = `# Check JWT validation
curl -H "Authorization: Bearer invalid_token" \\
  https://api.example.com/users

# Expected secure response
HTTP/1.1 401 Unauthorized
{
  "error": "Invalid token",
  "message": "JWT signature verification failed"
}`;
    navigator.clipboard?.writeText(text);
    const btn = document.getElementById("copybtn");
    if (btn){ btn.textContent = "Copied!"; setTimeout(()=>{ btn.textContent = "Copy"; }, 1200); }
  }
  return (
  <section className="py-14 bg-transparent">
      <div className="container">
        <div className="border rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#282A35] text-white px-4 py-3 text-sm font-bold">Example — API Security Check</div>
          <div className="bg-gray-50 relative p-4">
            <button id="copybtn" onClick={copy} className="absolute right-3 top-3 text-xs border px-3 py-1 rounded bg-transparent">Copy</button>
<pre className="whitespace-pre-wrap text-sm leading-6 text-slate-800">{`# Check JWT validation
curl -H "Authorization: Bearer invalid_token" \  https://api.example.com/users

# Expected secure response
HTTP/1.1 401 Unauthorized
{
  "error": "Invalid token",
  "message": "JWT signature verification failed"
}`}</pre>
          </div>
          <div className="bg-transparent border-t px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <strong>Result:</strong>
            <button className="btn btn-primary">Try API Security Checker</button>
          </div>
        </div>
      </div>
    </section>
  )
}

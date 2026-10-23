// Build Notes sign-up on the resource pages (the main site has its own). Posts JSON to /api/newsletter (MailerLite double opt-in).
document.querySelectorAll("form.signup").forEach((f) => {
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = f.querySelector(".msg"), email = f.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.className = "msg err"; msg.textContent = "Enter a full email address, like name@email.com."; return; }
    msg.className = "msg"; msg.textContent = "Sending...";
    try {
      const r = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, page: location.pathname, "bot-field": f["bot-field"].value }) });
      if (!r.ok) throw new Error(String(r.status));
      msg.className = "msg ok"; msg.textContent = "Almost there. Check your inbox and click the confirm link."; f.reset();
    } catch { msg.className = "msg err"; msg.textContent = "That didn't go through. Try again in a minute."; }
  });
});

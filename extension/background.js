// Clean Word Counter - Chrome Extension Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "count-words-clean",
    title: "Count Words with CleanWordCounter",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "count-words-clean" && info.selectionText) {
    const text = info.selectionText.trim();
    const words = text ? (text.match(/\S+/g) || []).length : 0;
    const chars = text.length;
    const readMin = (words / 225).toFixed(1);

    if (tab && tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (w, c, r) => {
          const id = 'clean-word-counter-badge';
          const existing = document.getElementById(id);
          if (existing) existing.remove();

          const badge = document.createElement('div');
          badge.id = id;
          badge.style.position = 'fixed';
          badge.style.bottom = '24px';
          badge.style.right = '24px';
          badge.style.zIndex = '2147483647';
          badge.style.backgroundColor = '#111111';
          badge.style.color = '#ffffff';
          badge.style.padding = '12px 16px';
          badge.style.borderRadius = '10px';
          badge.style.boxShadow = '0 12px 30px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1)';
          badge.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          badge.style.fontSize = '13px';
          badge.style.lineHeight = '1.4';
          badge.style.display = 'flex';
          badge.style.flexDirection = 'column';
          badge.style.gap = '4px';

          badge.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #262626; padding-bottom:6px; margin-bottom:4px;">
              <span style="color:#0070f3; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; display:flex; align-items:center; gap:4px;">
                <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background-color:#0070f3;"></span>
                CleanWordCounter
              </span>
              <button id="clean-wc-close" style="background:none; border:none; color:#888; cursor:pointer; font-size:16px; line-height:1; padding:0 2px;">&times;</button>
            </div>
            <div style="color:#ededed; font-size:14px; font-weight:500;">
              <strong style="font-size:18px; font-weight:700; color:#fff;">${w.toLocaleString()}</strong> words &nbsp;&bull;&nbsp; 
              <strong style="font-size:18px; font-weight:700; color:#fff;">${c.toLocaleString()}</strong> chars
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; color:#888; font-size:11px; margin-top:2px;">
              <span>~${r} min read speed</span>
              <a href="https://cleanwordcounter.com" target="_blank" style="color:#0070f3; text-decoration:none; font-weight:600;">Open Tool &rarr;</a>
            </div>
          `;

          document.body.appendChild(badge);

          const closeBtn = document.getElementById('clean-wc-close');
          if (closeBtn) closeBtn.onclick = () => badge.remove();

          setTimeout(() => {
            if (badge.parentNode) badge.remove();
          }, 8000);
        },
        args: [words, chars, readMin]
      }).catch(() => {
        // Fallback or restricted page
      });
    }
  }
});

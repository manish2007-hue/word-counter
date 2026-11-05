// Clean Word Counter - Popup Logic

const textInput = document.getElementById('text-input');
const statWords = document.getElementById('stat-words');
const statChars = document.getElementById('stat-chars');
const statCharsNoSpaces = document.getElementById('stat-chars-no-spaces');
const statSentences = document.getElementById('stat-sentences');
const statRead = document.getElementById('stat-read');
const statSpeak = document.getElementById('stat-speak');

const btnClean = document.getElementById('btn-clean');
const btnCopy = document.getElementById('btn-copy');
const btnClear = document.getElementById('btn-clear');

// Try to grab any highlighted text from the current active tab when popup opens
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0] && tabs[0].id) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => window.getSelection().toString()
    }).then((results) => {
      if (results && results[0] && results[0].result) {
        textInput.value = results[0].result;
        updateStats();
      }
    }).catch(() => {
      // Ignore if tab does not allow content script (e.g. chrome:// settings)
    });
  }
});

function updateStats() {
  const text = textInput.value;
  const trimmed = text.trim();

  // Words
  const words = trimmed ? (trimmed.match(/\S+/g) || []).length : 0;
  statWords.textContent = words.toLocaleString();

  // Characters
  statChars.textContent = text.length.toLocaleString();
  statCharsNoSpaces.textContent = text.replace(/\s/g, '').length.toLocaleString();

  // Sentences
  const sentences = trimmed ? (trimmed.split(/[.!?]+/).filter(Boolean).length || 1) : 0;
  statSentences.textContent = sentences.toLocaleString();

  // Reading Time (225 wpm)
  if (words === 0) {
    statRead.textContent = '0s';
  } else {
    const sec = Math.round((words / 225) * 60);
    statRead.textContent = sec < 60 ? `${sec}s` : `${(words / 225).toFixed(1)}m`;
  }

  // Speaking Time (130 wpm)
  if (words === 0) {
    statSpeak.textContent = '0s';
  } else {
    const sec = Math.round((words / 130) * 60);
    statSpeak.textContent = sec < 60 ? `${sec}s` : `${(words / 130).toFixed(1)}m`;
  }
}

textInput.addEventListener('input', updateStats);

btnClean.addEventListener('click', () => {
  let val = textInput.value;
  // Replace multiple spaces with a single space
  val = val.replace(/[ \t]+/g, ' ');
  // Replace 3+ consecutive line breaks with 2
  val = val.replace(/\n{3,}/g, '\n\n');
  textInput.value = val.trim();
  updateStats();
});

btnCopy.addEventListener('click', () => {
  navigator.clipboard.writeText(textInput.value).then(() => {
    const orig = btnCopy.textContent;
    btnCopy.textContent = 'Copied!';
    setTimeout(() => { btnCopy.textContent = orig; }, 1200);
  });
});

btnClear.addEventListener('click', () => {
  textInput.value = '';
  textInput.focus();
  updateStats();
});

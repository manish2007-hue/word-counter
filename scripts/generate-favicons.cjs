const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Standalone SVG Favicon (with solid fallback stroke so every headless engine & Googlebot renders it)
const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Left Wing (High-contrast slate black) -->
  <path d="M4 8.5L10 24L16 13.5" stroke="#09090b" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Right Wing (Vibrant Electric Blue) -->
  <path d="M16 13.5L22 24L28 8.5" stroke="#0070f3" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Apex Pulse Dot -->
  <circle cx="28" cy="8.5" r="2.4" fill="#0070f3"/>
</svg>`;

// 2. Apple Touch Icon SVG (Dark background with white & electric blue wings, optimal for iOS)
const appleTouchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" rx="36" fill="#09090b"/>
  <g transform="translate(18, 18) scale(4.5)">
    <path d="M4 8.5L10 24L16 13.5" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 13.5L22 24L28 8.5" stroke="#0070f3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="28" cy="8.5" r="2.2" fill="#00dfd8"/>
  </g>
</svg>`;

async function buildIcons() {
  const publicDir = path.join(__dirname, '..', 'public');

  // Save the improved, universal SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), cleanSvg.trim());

  // Generate PNGs at required Googlebot & device resolutions
  const png48 = await sharp(Buffer.from(cleanSvg)).resize(48, 48).png().toBuffer();
  const png96 = await sharp(Buffer.from(cleanSvg)).resize(96, 96).png().toBuffer();
  const png144 = await sharp(Buffer.from(cleanSvg)).resize(144, 144).png().toBuffer();
  const png192 = await sharp(Buffer.from(cleanSvg)).resize(192, 192).png().toBuffer();
  const png512 = await sharp(Buffer.from(cleanSvg)).resize(512, 512).png().toBuffer();
  
  const png16 = await sharp(Buffer.from(cleanSvg)).resize(16, 16).png().toBuffer();
  const png32 = await sharp(Buffer.from(cleanSvg)).resize(32, 32).png().toBuffer();

  const appleTouch = await sharp(Buffer.from(appleTouchSvg)).resize(180, 180).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(publicDir, 'favicon-96x96.png'), png96);
  fs.writeFileSync(path.join(publicDir, 'favicon-144x144.png'), png144);
  fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'favicon-512x512.png'), png512);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

  // Generate standard multi-image favicon.ico (16, 32, 48)
  const icoSizes = [
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 }
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  const count = icoSizes.length;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(count, 4); // count of images

  const entries = [];
  const imageBuffers = [];

  for (const item of icoSizes) {
    imageBuffers.push(item.buffer);

    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(item.size, 0); // width
    entry.writeUInt8(item.size, 1); // height
    entry.writeUInt8(0, 2); // color palette (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // offset of image data

    entries.push(entry);
    offset += item.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...imageBuffers]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  console.log('Favicon assets successfully created in /public:');
  console.log(' - favicon.svg');
  console.log(' - favicon.ico (' + icoBuffer.length + ' bytes)');
  console.log(' - favicon-48x48.png (Google Search Standard)');
  console.log(' - favicon-96x96.png');
  console.log(' - favicon-144x144.png');
  console.log(' - favicon-192x192.png');
  console.log(' - favicon-512x512.png');
  console.log(' - apple-touch-icon.png (180x180)');
}

buildIcons().catch(err => {
  console.error('Failed generating favicons:', err);
  process.exit(1);
});

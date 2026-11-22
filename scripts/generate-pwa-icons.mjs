import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const publicDir = path.resolve('public');
const iconsDir = path.join(publicDir, 'icons');
fs.mkdirSync(iconsDir, { recursive: true });

// CRC32 Table for valid PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth 8
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  // Filter type 0 (None) per scanline
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  const iend = Buffer.alloc(0);

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', iend),
  ]);
}

// 5x7 bitmap glyphs for "3", "0", "H", "F"
const GLYPHS = {
  '3': [
    '11110',
    '00001',
    '00001',
    '01110',
    '00001',
    '00001',
    '11110',
  ],
  '0': [
    '01110',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01110',
  ],
};

function drawHomeFitIcon(size, maskable = false) {
  const rgba = Buffer.alloc(size * size * 4);

  const setPixel = (x, y, r, g, b, a = 255) => {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const idx = (y * size + x) * 4;
    rgba[idx] = r;
    rgba[idx + 1] = g;
    rgba[idx + 2] = b;
    rgba[idx + 3] = a;
  };

  // Colors: Brand Red (#E53935 -> 229, 57, 53), White (255, 255, 255), Dark Red Ring (#C62828 -> 198, 40, 40)
  const RED = [229, 57, 53];
  const DARK_RED = [198, 40, 40];
  const WHITE = [255, 255, 255];

  const cornerRadius = maskable ? 0 : Math.round(size * 0.2);

  const isInsideRoundedRect = (x, y, w, h, rad) => {
    if (rad <= 0) return true;
    const dx = Math.max(rad - x, 0, x - (w - 1 - rad));
    const dy = Math.max(rad - y, 0, y - (h - 1 - rad));
    return dx * dx + dy * dy <= rad * rad;
  };

  // Fill background
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (isInsideRoundedRect(x, y, size, size, cornerRadius)) {
        setPixel(x, y, RED[0], RED[1], RED[2], 255);
      } else {
        setPixel(x, y, 0, 0, 0, 0);
      }
    }
  }

  // Draw subtle inner athletic ring
  const cx = size / 2;
  const cy = size / 2;
  const ringR = size * (maskable ? 0.36 : 0.41);
  const ringThickness = Math.max(3, size * 0.022);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dist = Math.hypot(x - cx, y - cy);
      if (Math.abs(dist - ringR) <= ringThickness / 2) {
        setPixel(x, y, DARK_RED[0], DARK_RED[1], DARK_RED[2], 255);
      }
    }
  }

  // Draw crisp Dumbbell Bar above "30"
  const scale = maskable ? 0.78 : 0.92;
  const barY = Math.round(size * (maskable ? 0.31 : 0.28));
  const barHalfW = Math.round(size * 0.16 * scale);
  const barHalfH = Math.max(2, Math.round(size * 0.015 * scale));

  for (let y = barY - barHalfH; y <= barY + barHalfH; y++) {
    for (let x = Math.round(cx) - barHalfW; x <= Math.round(cx) + barHalfW; x++) {
      setPixel(x, y, WHITE[0], WHITE[1], WHITE[2], 255);
    }
  }

  // Dumbbell left & right plates
  const plateW = Math.max(3, Math.round(size * 0.032 * scale));
  const plateH = Math.max(6, Math.round(size * 0.055 * scale));
  for (const side of [-1, 1]) {
    const pxCenter = Math.round(cx + side * (barHalfW - plateW));
    for (let y = barY - plateH; y <= barY + plateH; y++) {
      for (let x = pxCenter - plateW; x <= pxCenter + plateW; x++) {
        setPixel(x, y, WHITE[0], WHITE[1], WHITE[2], 255);
      }
    }
  }

  // Draw bold "30" numeral in center
  const cellSize = Math.max(4, Math.round(size * 0.044 * scale));
  const glyphW = 5 * cellSize;
  const glyphH = 7 * cellSize;
  const gap = Math.round(cellSize * 1.1);
  const totalW = glyphW * 2 + gap;
  const startX = Math.round(cx - totalW / 2);
  const startY = Math.round(cy - glyphH / 2 + size * 0.07 * scale);

  const drawGlyph = (char, ox, oy) => {
    const rows = GLYPHS[char];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < rows[r].length; c++) {
        if (rows[r][c] === '1') {
          for (let dy = 0; dy < cellSize; dy++) {
            for (let dx = 0; dx < cellSize; dx++) {
              setPixel(
                ox + c * cellSize + dx,
                oy + r * cellSize + dy,
                WHITE[0],
                WHITE[1],
                WHITE[2],
                255
              );
            }
          }
        }
      }
    }
  };

  drawGlyph('3', startX, startY);
  drawGlyph('0', startX + glyphW + gap, startY);

  return encodePNG(size, size, rgba);
}

fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), drawHomeFitIcon(192, false));
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), drawHomeFitIcon(512, false));
fs.writeFileSync(path.join(iconsDir, 'icon-maskable-512x512.png'), drawHomeFitIcon(512, true));
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), drawHomeFitIcon(180, false));

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect width="512" height="512" rx="104" fill="#E53935"/>
  <circle cx="256" cy="256" r="208" stroke="#C62828" stroke-width="12"/>
  <rect x="176" y="138" width="160" height="16" rx="8" fill="#FFFFFF"/>
  <rect x="156" y="114" width="24" height="64" rx="8" fill="#FFFFFF"/>
  <rect x="332" y="114" width="24" height="64" rx="8" fill="#FFFFFF"/>
  <text x="256" y="365" text-anchor="middle" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="210" letter-spacing="-8">30</text>
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svgIcon);

console.log('Generated PWA icons successfully in public/icons/');

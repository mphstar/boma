type Palette = [string, string, string];

const PAL: Record<string, Palette> = {
  hero: ['#0f2a21', '#4d6a52', '#d8c691'],
  jeep: ['#4b4a36', '#8a7b55', '#d8c691'],
  trek: ['#173d3b', '#4f7f78', '#cfe0d2'],
  goa: ['#2b2a2a', '#6d6a5a', '#c9c4a6'],
  candi: ['#3a3226', '#8d7a55', '#e0c98e'],
  kopi: ['#453c32', '#876b49', '#d1aa6c'],
  pkopi: ['#2f4126', '#6d7e4a', '#cfd49a'],
  karet: ['#2c3f2a', '#7d8f58', '#dfd49a'],
  pkaret: ['#2a3a2a', '#728257', '#d6d79f'],
  sboma: ['#173b30', '#5e8b78', '#d9d19a'],
  srimba: ['#173d3b', '#4f7f78', '#cfe0d2'],
  glamp: ['#2b3a31', '#7d8b66', '#e6d49a'],
  camp: ['#34402b', '#7f8a5c', '#dccd95'],
  event: ['#24414a', '#617f7a', '#cfe0d2'],
  out: ['#2c4a34', '#7f9a63', '#e0d69c'],
};

const pine = (x: number, y: number, scale = 1, color = '#133127'): string =>
  `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M0-160L46-70H-46ZM0-120L58-20H-58ZM0-70L68 30H-68Z" fill="${color}"/></g>`;

const factory = (color: string): string =>
  `<g transform="translate(220 330)"><path d="M0 190V90L120 40V90L240 40V190Z" fill="${color}"/><rect x="240" y="-10" width="30" height="200" fill="${color}"/><rect x="236" y="-30" width="38" height="30" fill="${color}"/><rect x="240" y="40" width="440" height="150" fill="${color}"/><g fill="#42573f">${[0, 1, 2, 3, 4].map((i) => `<rect x="${275 + i * 80}" y="90" width="38" height="34"/>`).join('')}</g></g>`;

const MOTIFS: Record<string, string> = {
  jeep: '<g transform="translate(300 430)"><path d="M0 60L20 10Q40 -20 90 -20H190Q230 -20 250 20L270 60Z" fill="#d8b56f"/><path d="M50 10Q60-8 95-8H185Q205-8 218 10Z" fill="#2c3a30"/><circle cx="70" cy="62" r="30" fill="#1d2a21"/><circle cx="70" cy="62" r="13" fill="#9a9a84"/><circle cx="210" cy="62" r="30" fill="#1d2a21"/><circle cx="210" cy="62" r="13" fill="#9a9a84"/></g>',
  trek: '<path d="M600 140Q640 150 640 190V440H560V190Q560 150 600 140Z" fill="#e5efe4" opacity=".85"/><path d="M580 190V440" stroke="#fff" stroke-width="4" opacity=".6"/><ellipse cx="600" cy="450" rx="120" ry="22" fill="#cfe0d2" opacity=".6"/><g transform="translate(230 470)" fill="#1d2a21"><circle cy="-44" r="8"/><path d="M0-36V6M0-28L-14-10M0-28L12-12M0 6L-12 36M0 6L10 36" stroke="#1d2a21" stroke-width="6" stroke-linecap="round"/></g>',
  goa: '<path d="M180 520Q260 250 480 270Q720 260 820 520Z" fill="#4a4a40"/><path d="M380 520V430Q380 340 490 340Q600 340 600 430V520Z" fill="#0d1210"/><path d="M420 520V440Q420 380 490 380Q560 380 560 440V520Z" fill="#1d241f"/>',
  candi: '<g fill="#b9a574"><rect x="300" y="470" width="400" height="40"/><rect x="340" y="430" width="320" height="40"/><rect x="380" y="390" width="240" height="40"/><rect x="420" y="350" width="160" height="40"/><rect x="460" y="310" width="80" height="40"/><path d="M480 310L500 250L520 310Z"/></g><g fill="#6e5f41"><rect x="470" y="440" width="60" height="30"/></g>',
  kopi: [150, 335, 730, 875]
    .map(
      (x, i) =>
        `<g transform="translate(${x} ${410 + (i % 2) * 35})"><path d="M0 70V0" stroke="#2b3626" stroke-width="9"/><ellipse cx="-35" cy="5" rx="48" ry="17" fill="#658451" transform="rotate(-23 -35 5)"/><ellipse cx="36" cy="-10" rx="48" ry="17" fill="#688d53" transform="rotate(20 36 -10)"/><circle cx="-8" cy="30" r="11" fill="#a95839"/><circle cx="14" cy="38" r="11" fill="#b76743"/></g>`,
    )
    .join(''),
  karet: [200, 380, 560, 740]
    .map(
      (x, i) =>
        `<g transform="translate(${x} ${300 + (i % 2) * 30})"><rect x="-10" width="20" height="220" fill="#6b5b45"/><path d="M-10 90L10 70" stroke="#e5d9b5" stroke-width="4"/><path d="M-4 90V120" stroke="#e5ecd0" stroke-width="3"/><ellipse cx="0" cy="-10" rx="60" ry="50" fill="#5a7a45"/></g>`,
    )
    .join(''),
  sboma: '<path d="M-10 560Q250 470 520 520T1010 480V650H-10Z" fill="#9ed0c6" opacity=".9"/><path d="M0 590Q260 510 520 550T1000 520" stroke="#e8f6ef" stroke-width="5" fill="none" opacity=".7"/><g fill="#3d5a43"><ellipse cx="260" cy="520" rx="60" ry="24"/><ellipse cx="760" cy="500" rx="50" ry="20"/></g>',
  srimba:
    '<path d="M-10 540Q300 470 560 520T1010 470V650H-10Z" fill="#8cc3bd" opacity=".9"/><path d="M0 590Q300 520 560 560T1000 510" stroke="#e8f6ef" stroke-width="5" fill="none" opacity=".7"/><g fill="#5e6a5a"><ellipse cx="300" cy="520" rx="70" ry="30"/><ellipse cx="640" cy="535" rx="55" ry="24"/><ellipse cx="820" cy="505" rx="45" ry="20"/></g>',
  glamp: `<g transform="translate(500 500)"><path d="M-170 0A170 150 0 0 1 170 0Z" fill="#e9dcb3"/><path d="M-60 0A60 90 0 0 1 60 0Z" fill="#2c3a2f"/><path d="M-170 0H170" stroke="#8b7a4d" stroke-width="10"/><g fill="#f4d98a">${[-120, -80, -40, 0, 40, 80, 120].map((x) => `<circle cx="${x}" cy="-150" r="5"/>`).join('')}</g></g>`,
  camp: '<g transform="translate(500 510)"><path d="M-170 0L0-250L170 0Z" fill="#d6b16f"/><path d="M0-250L170 0H40Z" fill="#b48f56"/><path d="M-50 0L0-110L50 0Z" fill="#26352b"/><path d="M-250 8H250" stroke="#e5d8aa" stroke-width="4"/></g>',
  event: [300, 500, 700]
    .map(
      (x, i) =>
        `<g><rect x="${x}" y="240" width="4" height="220" fill="#e8ddb7"/><path d="M${x + 4} 245h70l-14 28 14 28h-70z" fill="${['#d6b16f', '#7fa67a', '#cf9672'][i]}"/></g>`,
    )
    .join(''),
  out: '<g stroke="#4a3a26" stroke-width="12"><path d="M260 520V310M740 520V310"/></g><path d="M260 330Q500 420 740 330" stroke="#e5d8aa" stroke-width="6" fill="none"/><path d="M300 520V400M700 520V400M300 400H700" stroke="#6b5636" stroke-width="8" fill="none"/><g transform="translate(500 440)" fill="#1d2a21"><circle cy="-48" r="9"/><path d="M0-38V8M0-30L-18-14M0-30L18-14M0 8L-12 40M0 8L12 40" stroke="#1d2a21" stroke-width="6" stroke-linecap="round" fill="none"/></g>',
};

let sceneSequence = 0;

export function buildSceneSvg(key: string): string {
  const palette = PAL[key] ?? PAL.hero;
  const gradientId = `g${key}${(sceneSequence += 1)}`;
  const motif =
    key === 'pkopi' ? factory('#d8c9a0') : key === 'pkaret' ? factory('#cbd2a8') : (MOTIFS[key] ?? '');
  const isHero = key === 'hero';

  return `<svg viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${gradientId}" x2="0" y2="1"><stop stop-color="${palette[0]}"/><stop offset="1" stop-color="${palette[1]}"/></linearGradient></defs>
  <rect width="1000" height="650" fill="url(#${gradientId})"/><circle cx="${isHero ? 760 : 740}" cy="${isHero ? 170 : 140}" r="${isHero ? 70 : 86}" fill="${palette[2]}" opacity=".7"/>
  <path d="M0 360L160 220L290 325L450 155L660 335L835 200L1000 350V650H0Z" fill="#d2ddc5" opacity=".16"/>
  <path d="M0 425L230 300L400 385L630 260L1000 415V650H0Z" fill="#0f2a21" opacity=".4"/>
  ${isHero ? '<path d="M0 470L190 360L360 440L560 330L760 430L1000 340V650H0Z" fill="#12301f" opacity=".55"/><path d="M0 330Q250 290 500 330T1000 310V400H0Z" fill="#fff" opacity=".05"/>' : ''}
  <path d="M0 530Q300 450 600 500T1000 460V650H0Z" fill="#2b4c33"/>
  ${pine(70, 560, 1.1)}${pine(930, 570, 1.25)}${pine(-10, 590, 0.9, '#0f261d')}${pine(1010, 600, 1, '#0f261d')}
  ${motif}</svg>`;
}

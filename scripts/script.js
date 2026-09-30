// THEME
const toggleBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.textContent = '🌙';
}
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    const isLight = document.body.classList.contains('light-mode');
    toggleBtn.textContent = isLight ? '🌙' : '☀️';

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// MOON INFORMATION
function getMoonSign(date = new Date()) {
    const signs = [
        '♈',
        '♉',
        '♊',
        '♋',
        '♌',
        '♍',
        '♎',
        '♏',
        '♐',
        '♑',
        '♒',
        '♓'
    ];

    const d = (date.getTime() - 946728000000) / 86400000;

    let L = (218.316 + 13.176396 * d) % 360;
    let M = (134.963 + 13.064993 * d) % 360;
    if (L < 0) L += 360;

    let eclipticLongitude = (L + 6.289 * Math.sin((M * Math.PI) / 180)) % 360;
    if (eclipticLongitude < 0) eclipticLongitude += 360;

    const index = Math.floor(eclipticLongitude / 30) % 12;
    return signs[index];
};

function getMoonUpdate() {
    const now = new Date();
    const illumination = SunCalc.getMoonIllumination(new Date());

    const phases = [
        { name: 'New Moon', emoji: '🌑' },
        { name: 'Waxing Crescent', emoji: '🌒' },
        { name: 'First Quarter', emoji: '🌓' },
        { name: 'Waxing Gibbous', emoji: '🌔' },
        { name: 'Full Moon', emoji: '🌕' },
        { name: 'Waning Gibbous', emoji: '🌖' },
        { name: 'Last Quarter', emoji: '🌗' },
        { name: 'Waning Crescent', emoji: '🌘' }
    ];

    const index = Math.round(illumination.phase * 8) % 8;
    const currentPhase = phases[index];
    const percent = Math.round(illumination.fraction * 100);
    const moonSign = getMoonSign(now);

    document.getElementById('moon-sign').textContent = moonSign;
    document.getElementById('moon-emoji').textContent = currentPhase.emoji;
    document.getElementById('moon-phase').textContent = currentPhase.name;
    document.getElementById('moon-ill').textContent = `${percent}% illuminated`;
};

getMoonUpdate();
import localFont from 'next/font/local';

export const panchang = localFont({
    src: '../fonts/Panchang-Variable.woff2',
    variable: '--font-panchang',
    display: 'swap',
    weight: '300 900',
});

export const generalSans = localFont({
    src: '../fonts/GeneralSans-Variable.woff2',
    variable: '--font-general',
    display: 'swap',
    weight: '300 900',
});

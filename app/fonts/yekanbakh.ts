import localFont from 'next/font/local'

export const yekanBakh = localFont({
  variable: '--font-yekan',
  display: 'swap',
  src: [
    {
      path: './YekanBakhFaNum-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './YekanBakhFaNum-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './YekanBakhFaNum-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './YekanBakhFaNum-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

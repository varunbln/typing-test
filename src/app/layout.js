import './globals.css'
import { Atkinson_Hyperlegible } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const atkinson_hyperlegible = Atkinson_Hyperlegible({
  subsets: ['latin'], weight: '400',
})

export const metadata = {
  title: 'Typing Test',
  description: 'Created by Varun Balani',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={
      {
        variables: {
          colorBackground: "#111827",
          colorPrimary: "#1f2937",
          colorText: "#f3f4f6",
          colorAlphaShade: "#374151",
          colorTextOnPrimaryBackground: "#f3f4f6",
        },
        elements: {
          footerActionLink: "text-gray-200 hover:text-gray-200",
          socialButtonsBlockButton: {
            "border-color": "#374151"
          },
          badge: {
            color: "#a1a6ac",
          },
          profileSectionPrimaryButton: {
            color: "#a1a6ac"
          },
          formButtonReset: {
            color: "#a1a6ac"
          },
          fileDropAreaButtonPrimary: {
            color: "#a1a6ac",
          },
          userButtonPopoverActionButtonIcon: {
            color: "#a1a6ac"
          }
        }
      }
    }>
      <html lang="en" className="bg-gray-900 text-gray-400">
        <body className={atkinson_hyperlegible.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}

import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const MetaTags = () => (
  <Head>
    <meta
      name="description"
      content="VXLverse is an innovative software platform that combines the power of a 3D modeling software like Blender with the interactive elements of RPG games. It allows users to easily create immersive worlds with customizable characters, dialogues, NPCs, and more."
    />
    <meta name="keywords" content="Game Development, RPG, VXLverse, 3D Modeling, Game Design, IndieDev, Gaming" />
    <meta property="og:title" content="VXLverse - An All-in-One RPG Creation Tool" />
    <meta
      property="og:description"
      content="VXLverse is an innovative software platform that combines the power of a 3D modeling software like Blender with the interactive elements of RPG games. It allows users to easily create immersive worlds with customizable characters, dialogues, NPCs, and more."
    />
    <meta property="og:image" content="https://www.example.com/your-og-image.jpg" />
    <meta property="og:url" content="https://www.vxlverse.com/" />
    <meta property="og:type" content="website" />
    <meta name="twitter:title" content="VXLverse - An All-in-One RPG Creation Tool" />
    <meta
      name="twitter:description"
      content="VXLverse is an innovative software platform that combines the power of a 3D modeling software like Blender with the interactive elements of RPG games. It allows users to easily create immersive worlds with customizable characters, dialogues, NPCs, and more."
    />
    <meta name="twitter:image" content="https://www.example.com/your-twitter-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@YourTwitterHandle" />
    <link rel="canonical" href="https://www.vxlverse.com/" />
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8D51L7ND00" strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8D51L7ND00');
        `}
    </Script>
  </Head>
)

export default function Document() {
  return (
    <Html lang="en" data-theme="wireframe">
      <MetaTags />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

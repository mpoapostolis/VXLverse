import { Head, Html, Main, NextScript } from 'next/document'

const MetaTags = () => (
  <Head>
    <meta
      name="description"
      content="VXLverse is a revolutionary online platform designed to empower users to both create and play a wide variety of RPG games. Our mission is to provide an interactive and engaging space for game enthusiasts, offering them the opportunity to showcase their creativity and be rewarded for it."
    />
    <meta name="keywords" content="Game Development, RPG, VXLverse, 3D Modeling, Game Design, IndieDev, Gaming" />
    <meta property="og:title" content="VXLverse - Empower Your Creativity: Create and Play RPG Games with VXLverse" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/icons/192-192.png" />

    <meta
      property="og:description"
      content="VXLverse is a revolutionary online platform designed to empower users to both create and play a wide variety of RPG games. Our mission is to provide an interactive and engaging space for game enthusiasts, offering them the opportunity to showcase their creativity and be rewarded for it.."
    />
    <meta property="og:image" content="https://www.vxlverse.com/logo.png" />
    <meta property="og:url" content="https://www.vxlverse.com/" />
    <meta property="og:type" content="website" />
    <meta name="twitter:title" content="VXLverse - Empower Your Creativity: Create and Play RPG Games with VXLverse" />
    <meta
      name="twitter:description"
      content="VXLverse is a revolutionary online platform designed to empower users to both create and play a wide variety of RPG games. Our mission is to provide an interactive and engaging space for game enthusiasts, offering them the opportunity to showcase their creativity and be rewarded for it."
    />
    <meta name="twitter:image" content="https://www.example.com/your-twitter-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@mpoapostolis" />
    <link rel="canonical" href="https://www.vxlverse.com/" />
    <meta name="theme-color" content="#000000" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

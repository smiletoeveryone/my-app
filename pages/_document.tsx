import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Metalion 帶你從 Web2.0 踏入 Web3.0，透過虛實結合，展望元宇宙為商務帶的創新改變。邀請你與我們一起探索 NFT 虛實整合的多種賦能！"
          />
          <meta
            name="keywords"
            content="Web2.0, Web3.0, NFT, NFT賦能, 元宇宙, Metalion, 雄獅, Gonna, 台灣, 區塊鏈, 雄獅旅行社, Blockchain, NFT Utility, NFT Taiwan, 台灣NFT, NFT台灣, 亞洲NFT, Metaverse, Meta, Web3, Web2, 虛擬貨幣, Cryptocurrency, Crypto, Digital utility, NFT Perks, Coffee"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          {/* facebook shared link */}
          <meta
            property="og:title"
            content="Metalion 宙獅計劃 🌐 虛實結合，展望元宇宙商務賦能"
          />
          <meta property="og:image" content="/metalion-og-image.png" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

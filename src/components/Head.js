import React from 'react';
import Head from 'next/head';

export const HtmlHead = ({ title }) => {
  const description =
    'Stellas digital bank is your true mobile bank to spend, save, earn interest, ' +
    'anonymous transfer: ghost mode, automobile loans and more. Licensed & insured with NDIC.';
  const link = 'http://stellasbank.com';
  const logo = 'http://stellasbank.com/assets/Stellas-logo.png';

  const seoAttributes = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stellas Digital Bank ",
    "alternateName": ["Stellas Bank", "Stellas", "stellas mfb"],
    "url": "http://www.stellasbank.com",
    "sameAs": ["http://www.facebook.com/stellasbank", "http://www.twitter.com/stellasbank"],

    "logo": "https://www.stellasbank.com/assets/Stellas-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "09087339788",
      "contactType": "customer service"
    }
  }`;

  return (
    <Head>
      <title> {title} </title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link href="/fonts/style.css" rel="stylesheet" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={link} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={link} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={logo} />

      <script>
        {process.env.NEXT_PUBLIC_NODE_ENV !== 'development'
          ? 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function(){}'
          : ''}
      </script>

      <script>
        {process.env.NEXT_PUBLIC_NODE_ENV === 'production'
          ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TZNQKVQ');`
          : ''}
      </script>

      <noscript>
        {process.env.NEXT_PUBLIC_NODE_ENV === 'production'
          ? `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZNQKVQ" 
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          : ''}
      </noscript>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seoAttributes }} />

      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
    </Head>
  );
};

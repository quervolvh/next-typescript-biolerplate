import React from 'react';
import Head from 'next/head';

export const MetaHead: React.FC<Props> = ({ title = "company" }) => {

  const titleString = `${title || "company"}`;

  const description = `company description company description company description company description company description company description`;

  const link = 'http://company.com';

  const logo = 'company-company';

  const seoAttributes = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Company name",
    "url": "http://www.company.url",
    "sameAs": ["http://www.facebook.com/company", "http://www.twitter.com/company"],

    "logo": "company-logo-url",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "*********",
      "contactType": "customer service"
    }
  }`;

  return (
    <>
      <Head>
        <title>{titleString}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
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
      </Head>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <link href={'/fonts/style.css'} rel="stylesheet" />

      <script>
        {process.env.NEXT_PUBLIC_NODE_ENV !== 'development'
          ? 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function(){}'
          : ''}
      </script>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seoAttributes }} />

    </>
  );
};

interface Props {

  title?: string

};

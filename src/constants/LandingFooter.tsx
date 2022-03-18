import Twitter from 'assets/svg/social/Twitter.svg';

interface FooterTypes {
    logo?: string,
    text?: string,
    icons?: string[],
    iconLinks?: string[],
    icon?: string,
    title?: string,
    link?: string
};

export const SocialLinks = {
    facebook: "https://www.facebook.com/haladigital/",
    youtube: "https://www.youtube.com/channel/haladigital",
    instagram: "https://www.instagram.com/haladigital",
    twitter: "https://www.twitter.com/haladigital"
}

export const LandingFooterAbout: Array<FooterTypes> = [{
    logo: Twitter,
    text: ``,
    icons: [Twitter, Twitter, Twitter],
    iconLinks: [SocialLinks.instagram, SocialLinks.twitter, SocialLinks.facebook]
}]

export const LandingFooterServices: Array<FooterTypes> = [
    {
        title: "Digital Currency Exchange",
        link: "#"
    },
    {
        title: "Send Bulk SMS",
        link: "#"
    },
    {
        title: "Buy Airtime",
        link: "#"
    },
    {
        title: "Buy Data Plan",
        link: "#"
    },
    {
        title: "Cable TV",
        link: "#"
    },
    {
        title: "Electricity Bill",
        link: "#"
    },
];

export const LandingFooterSupport: Array<FooterTypes> = [
    {
        title: "Contact Us",
        link: "#"
    },
    {
        title: "Terms of Use",
        link: "#"
    },
    {
        title: "Privacy Policy",
        link: "#"
    },
    {
        title: "Laundry Policy",
        link: "#"
    },
];

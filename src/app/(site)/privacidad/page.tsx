import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Artesano Gallery",
  description:
    "Cómo recopilamos, usamos y protegemos tu información en Artesano Gallery.",
  robots: { index: true, follow: true },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold uppercase tracking-wide text-stone-900">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-stone-600">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-svh bg-stone-50 px-6 pb-24 pt-36 text-stone-700">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-700">
          Artesano Gallery
        </p>
        <h1 className="mt-3 font-serif text-4xl text-stone-900 sm:text-5xl">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-stone-600">
          <p>
            We dislike getting solicitor calls, junk mail, and spam as much as
            you do so we make sure the information you provide to us is never
            bought, sold, traded, or given to anyone else.
          </p>
          <p>
            We only use your information to provide answers to your questions,
            to deliver your products, and to reply to contacts you initiate. We
            provide your address and phone number to the freight companies so
            they can deliver your items without delay.
          </p>
          <p>
            We do not share your email address, phone number or credit card
            information to any other organization for any reason. In fact, we go
            to great pains to secure your information. When accessing the website
            you are agreeing to this policy.
          </p>
        </div>

        <Section title="What information do we collect?">
          <p>
            We collect information from you when you register on the site, place
            an order or communication such as e-mail, or participate in another
            site feature.
          </p>
          <p>
            When ordering or registering, we may ask you for your name, e-mail
            address, mailing address, phone number, credit card information or
            other information. You may, however, visit our site anonymously.
          </p>
          <p>
            Like many websites, we use &quot;cookies&quot; to enhance your
            experience and gather information about visitors and visits to our
            websites. Please refer to the &quot;Do we use cookies?&quot; section
            below for information about cookies and how we use them.
          </p>
        </Section>

        <Section title="How do we use your information?">
          <p>
            We may use the information we collect from you when you register,
            purchase products, or marketing communication, surf the website, or
            use certain other site features in the following ways:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              To personalize your site experience and to allow us to deliver the
              type of content and product offerings in which you are most
              interested.
            </li>
            <li>
              To allow us to better service you in responding to your customer
              service requests.
            </li>
            <li>To quickly process your transactions.</li>
          </ul>
          <p>
            If you have opted-in to receive our e-mail newsletter, we may send
            you periodic e-mails. If you would no longer like to receive
            promotional e-mail from us, please refer to the &quot;How can you
            opt-out, remove or modify information you have provided to us?&quot;
            section below. If you have not opted-in to receive e-mail
            newsletters, you will not receive these e-mails. Visitors who
            register or participate in other site features such as marketing
            programs and members-only content will be given a choice whether they
            would like to be on our e-mail list and receive e-mail communications
            from us.
          </p>
        </Section>

        <Section title="How do we protect visitor information?">
          <p>
            We implement a variety of security measures to maintain the safety of
            your personal information. Your personal information is contained
            behind secured networks and is only accessible by a limited number of
            persons who have special access rights to such systems, and are
            required to keep the information confidential. When you place orders
            or access your personal information, we offer the use of a secure
            server. All sensitive/credit information you supply is transmitted via
            Secure Socket Layer (SSL) technology and then encrypted into our
            databases to be only accessed as stated above.
          </p>
        </Section>

        <Section title='Do we use "cookies"?'>
          <p>
            Yes. Cookies are small files that a site or its service provider
            transfers to your computer&apos;s hard drive through your Web browser
            (if you allow) that enables the site&apos;s or service provider&apos;s
            systems to recognize your browser and capture and remember certain
            information. For instance, we use cookies to help us remember and
            process the items in your shopping cart. They are also used to help us
            understand your preferences based on previous or current site
            activity, which enables us to provide you with improved services. We
            also use cookies to help us compile aggregate data about site traffic
            and site interaction so that we can offer better site experiences and
            tools in the future. If you are visiting our site, you are agreeing to
            this policy.
          </p>
          <p>
            We may contract with third-party service providers to assist us in
            better understanding our site visitors. These service providers are
            not permitted to use the information collected on our behalf except to
            help us conduct and improve our business.
          </p>
          <p>
            You can choose to have your computer warn you each time a cookie is
            being sent, or you can choose to turn off all cookies. You do this
            through your browser settings. Each browser is a little different, so
            look at your browser Help menu to learn the correct way to modify your
            cookies. If you turn cookies off, you won&apos;t have access to many
            features that make your site experience more efficient and some of our
            services will not function properly. However, you can still place
            orders over the telephone by contacting customer service.
          </p>
        </Section>

        <Section title="Do we disclose the information we collect to outside parties?">
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your
            personally identifiable information unless we provide you with advance
            notice, except as described below. The term &quot;outside
            parties&quot; does not include Artesano Iron Works Home Decor. It also
            does not include website hosting partners and other parties who assist
            us in operating our website, conducting our business, or servicing
            you, so long as those parties agree to keep this information
            confidential. We may also release your information when we believe
            release is appropriate to comply with the law, enforce our site
            policies, or protect ours or others&apos; rights, property, or safety.
          </p>
          <p>
            However, non-personally identifiable visitor information may be
            provided to other parties for marketing, advertising, or other uses.
          </p>
        </Section>

        <Section title="How can you opt-out, remove or modify information you have provided to us?">
          <p>
            To modify your e-mail subscriptions, please let us know by modifying
            your preferences in the &quot;My Account&quot; section. Please note
            that due to email production schedules you may receive any emails
            already in production.
          </p>
          <p>
            To delete all of your online account information from our database,
            sign into the &quot;My Account&quot; section of our site and remove
            your shipping addresses, billing addresses &amp; payment information.
            Please note that we may maintain information about an individual sales
            transaction in order to service that transaction and for record
            keeping.
          </p>
        </Section>

        <Section title="Third party links">
          <p>
            In an attempt to provide you with increased value, we may include
            third party links on our site. These linked sites have separate and
            independent privacy policies. We therefore have no responsibility or
            liability for the content and activities of these linked sites.
            Nonetheless, we seek to protect the integrity of our site and welcome
            any feedback about these linked sites (including if a specific link
            does not work).
          </p>
        </Section>

        <Section title="Changes to our policy">
          <p>
            If we decide to change our privacy policy, we will post those changes
            on this page. Policy changes will apply only to information collected
            after the date of the change. This policy was last modified on April
            1, 2020.
          </p>
        </Section>

        <Section title="Questions and feedback">
          <p>
            We welcome your questions, comments, and concerns about privacy.
            Please send us any and all feedback pertaining to privacy, or any
            other issue.
          </p>
        </Section>

        <Section title="Online policy only">
          <p>
            This online privacy policy applies only to information collected
            through our website and not to information collected offline.
          </p>
        </Section>

        <Section title="Terms and conditions">
          <p>
            Please also visit our Terms and Conditions section establishing the
            use, disclaimers, and limitations of liability governing the use of
            our website.
          </p>
        </Section>

        <Section title="Your consent">
          <p>By using our site, you consent to our privacy policy.</p>
        </Section>

        <Section title="Sharing your personal information">
          <p>
            We share your Personal Information with third parties to help us use
            your Personal Information, as described above. For example, we use
            Shopify to power our online store — you can read more about how
            Shopify uses your Personal Information here:{" "}
            <a
              href="https://www.shopify.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline underline-offset-2"
            >
              shopify.com/legal/privacy
            </a>
            . We also use Google Analytics to help us understand how our customers
            use the Site — you can read more about how Google uses your Personal
            Information here:{" "}
            <a
              href="https://www.google.com/intl/en/policies/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline underline-offset-2"
            >
              Google Privacy
            </a>
            . You can also opt-out of Google Analytics here:{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline underline-offset-2"
            >
              Google Analytics Opt-out
            </a>
            .
          </p>
          <p>
            Finally, we may also share your Personal Information to comply with
            applicable laws and regulations, to respond to a subpoena, search
            warrant or other lawful request for information we receive, or to
            otherwise protect our rights.
          </p>
        </Section>

        <Section title="Behavioural advertising">
          <p>
            As described above, we use your Personal Information to provide you
            with targeted advertisements or marketing communications we believe
            may be of interest to you. For more information about how targeted
            advertising works, you can visit the Network Advertising
            Initiative&apos;s (&quot;NAI&quot;) educational page at{" "}
            <a
              href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline underline-offset-2"
            >
              networkadvertising.org
            </a>
            .
          </p>
          <p>You can opt out of targeted advertising by using the links below:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Facebook:{" "}
              <a
                href="https://www.facebook.com/settings/?tab=ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline underline-offset-2"
              >
                facebook.com/settings
              </a>
            </li>
            <li>
              Google:{" "}
              <a
                href="https://www.google.com/settings/ads/anonymous"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline underline-offset-2"
              >
                google.com/settings/ads
              </a>
            </li>
            <li>
              Bing:{" "}
              <a
                href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline underline-offset-2"
              >
                Bing personalized ads
              </a>
            </li>
          </ul>
          <p>
            Additionally, you can opt out of some of these services by visiting
            the Digital Advertising Alliance&apos;s opt-out portal at{" "}
            <a
              href="http://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline underline-offset-2"
            >
              optout.aboutads.info
            </a>
            .
          </p>
        </Section>

        <Section title="Do not track">
          <p>
            Please note that we do not alter our Site&apos;s data collection and
            use practices when we see a Do Not Track signal from your browser.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            If you are a United States resident, you have the right to access
            personal information we hold about you and to ask that your personal
            information be corrected, updated, or deleted. If you would like to
            exercise this right, please contact us through the contact information
            below.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            When you place an order through the Site, we will maintain your Order
            Information for our records unless and until you ask us to delete this
            information.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            We may update this privacy policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal or regulatory reasons.
          </p>
        </Section>

        <Section title="Microsoft Clarity">
          <p>
            We partner with Microsoft Clarity and Microsoft Advertising to capture
            how you use and interact with our website through behavioral metrics,
            heatmaps, and session replay to improve and market our
            products/services. Website usage data is captured using first and
            third-party cookies and other tracking technologies to determine the
            popularity of products/services and online activity. Additionally, we
            use this information for site optimization, fraud/security purposes,
            and advertising. For more information about how Microsoft collects and
            uses your data, visit the{" "}
            <a
              href="https://privacy.microsoft.com/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline underline-offset-2"
            >
              Microsoft Privacy Statement
            </a>
            .
          </p>
        </Section>

        <Section title="Minors">
          <p>
            The Site is not intended for individuals under the age of 18.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact us
            by e-mail at{" "}
            <a
              href="mailto:andresv@artesanoironworks.com"
              className="text-amber-700 underline underline-offset-2"
            >
              andresv@artesanoironworks.com
            </a>{" "}
            or by mail using the details provided below:
          </p>
          <p>
            Artesano Iron Works [Re: Privacy Compliance Officer]
            <br />
            4457 Main Street
            <br />
            Philadelphia, USA 19127
            <br />
            <a
              href="tel:2154839273"
              className="text-amber-700 underline underline-offset-2"
            >
              215-483-9273
            </a>
          </p>
        </Section>

        <div className="mt-16 border-t border-stone-200 pt-8">
          <Link
            href="/"
            className="text-sm font-medium text-amber-700 underline underline-offset-2 transition-colors hover:text-amber-800"
          >
            ← Volver al inicio
          </Link>
        </div>
      </article>
    </main>
  );
}

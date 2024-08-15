const privacy = `
<p><strong>Privacy Policy for TheDevStarter</strong></p><p><strong>Last Updated: 21st October 2023</strong></p><p>This Privacy Policy describes how TheDevStarter ("we," or "us") collects, uses, and protects your personal information when you use our product ("Service"). By using the Service, you agree to the terms outlined in this Privacy Policy.</p><p><strong>1. Information We Collect</strong></p><p>1.1. <strong>Personal Information:</strong> When you create an account or use our Service, we may collect personal information, including but not limited to your name, email address, and contact information.</p><p>1.2. <strong>Usage Data:</strong> We may collect information about how you use the Service, including log data, device information, and your interactions with the Service.</p><p><strong>2. How We Use Your Information</strong></p><p>2.1. We use your personal information to provide and improve our Service, respond to your inquiries, and send you important updates.</p><p>2.2. We may use usage data to analyze trends, monitor and improve the Service's performance, and personalize your experience.</p><p><strong>3. Sharing Your Information</strong></p><p>3.1. We do not sell, trade, or rent your personal information to third parties.</p><p>3.2. We may share your information with trusted service providers who assist us in operating the Service, but they are required to keep your information confidential.</p><p><strong>4. Security</strong></p><p>4.1. We implement industry-standard security measures to protect your personal information, but no method of transmission over the internet is entirely secure, and we cannot guarantee its absolute security.</p><p><strong>5. Cookies</strong></p><p>5.1. We use cookies and similar tracking technologies to enhance your experience on the Service and collect information about your browsing and usage patterns.</p><p><strong>6. Your Choices</strong></p><p>6.1. You can update your account information and communication preferences by logging into your account settings.</p><p>6.2. You may choose to opt-out of certain communications, such as marketing emails, by following the instructions provided.</p><p><strong>7. Changes to this Privacy Policy</strong></p><p>7.1. We reserve the right to modify or update this Privacy Policy at any time. We will notify you of any changes by posting the revised policy on our website.</p><p><strong>8. Contact Us</strong></p><p>8.1. If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <strong>hello@thedevstarter.com</strong>.</p>
`;

export default function PrivacyComponent() {
  return (
    <>
      <div className="">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-black text-black dark:text-white">
              Privacy Policy
            </h1>
          </div>

          <div className="flex flex-1 justify-center">
            <article className="prose prose-lg prose-pink mx-auto dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: privacy }}></div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

const terms = `
<p><strong>Terms and Conditions for <span className="text-[#0077B6]">TheDevStarter</span></strong></p><p><strong>Last Updated: 21st October 2023</strong></p><p>These Terms and Conditions ("Terms") govern your use of TheDevStarter ("Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.</p><p><strong>1. Account Registration</strong></p><p>1.1. You must create an account to use the Service.<br>
1.2. You are responsible for maintaining the confidentiality of your account information.<br>
1.3. You must be at least 18 years old to use the Service.</p><p><strong>2. Use of the Service</strong></p><p>2.1. You agree to use the Service only for lawful purposes.<br>
2.2. You may not use the Service for any illegal or unauthorized purpose.</p><p><strong>3. Payment and Billing</strong></p><p>3.1. You agree to pay all fees associated with your use of the Service as outlined in our pricing.<br>
3.2. Payments are non-refundable except as expressly stated in our refund policy.</p><p><strong>4. Intellectual Property</strong></p><p>4.1. All content and materials provided through the Service are the property of TheDevStarter and are protected by intellectual property laws.<br>
4.2. You may not reproduce, distribute, or create derivative works from our content without our express written consent.</p><p><strong>5. Privacy</strong></p><p>5.1. We collect and use your personal information as outlined in our Privacy Policy.<br>
5.2. By using the Service, you consent to our collection and use of your personal information as described in the Privacy Policy.</p><p><strong>6. Termination</strong></p><p>6.1. We reserve the right to terminate your access to the Service at our sole discretion.<br>
6.2. You may terminate your account at any time by following the instructions provided in the Service.</p><p><strong>7. Disclaimer of Warranties</strong></p><p>7.1. The Service is provided "as is" and "as available" without warranties of any kind, either express or implied.<br>
7.2. We do not guarantee that the Service will be error-free or uninterrupted.</p><p><strong>8. Limitation of Liability</strong></p><p>8.1. In no event shall TheDevStarter be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service.</p><p><strong>9. Changes to Terms</strong></p><p>9.1. We reserve the right to modify or update these Terms at any time. Any changes will be effective upon posting the revised Terms on our website.</p><p><strong>10. Contact Information</strong></p><p>10.1. For questions or concerns about these Terms, please contact us at <strong>hello@TheDevStarter.com</strong></p>

<p><strong>Disclaimer of Warranty</strong></p>
<p>The service is offered as-is and subject to availability. By using the service and our offerings, you agree that you assume sole responsibility for any associated risks. We expressly disclaim all warranties, whether implied or express, regarding the service and its use, including but not limited to warranties of merchantability, fitness for a specific purpose, and non-infringement, to the extent permitted by law.</p>
<p>We make no assurances or assertions regarding the accuracy or entirety of the service's content or any linked websites. We will not be liable or responsible for:</p>
<p>1. Errors, inaccuracies, or omissions in the content and materials.</p>
<p>2. Any personal injury or property damage resulting from your access and use of the service.</p>
<p>3. Unauthorized access to our secure servers or any stored personal or financial information.</p>
<p>4. Interruptions or termination of transmission to or from the service.</p>
<p>5. Viruses, bugs, or similar issues transmitted through the site by third parties.</p>
<p>6. Losses or damages incurred from using any posted or transmitted content via the service.</p>
<p>We do not guarantee, endorse, or assume liability for any products or services advertised by third parties on the site or linked websites. We are not responsible for overseeing any transactions between you and third-party providers. It's advisable to exercise caution and your best judgment when purchasing products or services in any environment or medium.</p>
<p></p>
<p><strong>Limitation of Liability</strong></p>
<p>Under no circumstances will we be held liable to you or any third party for direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including but not limited to lost profits, revenue, or data arising from your use of the service, even if we were informed of the potential for such damages. Regardless of any conflicting information stated here, our liability to you for any reason whatsoever and irrespective of the action's form will always be limited to the lesser amount, if any, that you paid to us.</p>
<p>Certain laws in some US states and international regulations might not permit limitations on implied warranties or the exclusion or restriction of specific damages. If these laws are applicable to you, some or all of the disclaimers or limitations mentioned above might not be applicable, and you might have additional rights.</p>
<p></p>
<p><strong>Waiver and Severability</strong></p>
<p>No waiver by us of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of us to assert a right or provision under Terms shall not constitute a waiver of such right or provision.</p>
<p></p>
<p>If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.</p>
<p></p>
<p><strong>Acknowledgement</strong></p>
<p>BY CONTINUING TO ACCESS OR USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</p>
<p></p>
`;

export default function Terms() {
  return (
    <div className="">
      <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-black text-black dark:text-white">
            Terms and Conditions
          </h1>
        </div>

        <div className="flex flex-1 justify-center">
          <article className="prose prose-lg prose-pink mx-auto dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: terms }}></div>
          </article>
        </div>
      </div>
    </div>
  );
}

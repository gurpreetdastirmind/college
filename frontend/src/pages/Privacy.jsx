export default function Privacy() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      <div className="container-custom py-12 max-w-4xl bg-white rounded-lg shadow p-8 space-y-4 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: 28 September 2026</p>
        <h2 className="text-xl font-bold text-primary">1. Information We Collect</h2>
        <p>We collect personal data submitted through admission forms, inquiry forms, and contact forms, including name, email, phone, and educational details.</p>

        <h2 className="text-xl font-bold text-primary">2. How We Use It</h2>
        <p>Your data is used strictly for admission processing, communication, and regulatory compliance as per UGC/NCTE/State Government norms.</p>

        <h2 className="text-xl font-bold text-primary">3. Data Security</h2>
        <p>All data is stored securely with SSL encryption. We do not share your data with third parties except affiliating universities and government scholarship portals.</p>

        <h2 className="text-xl font-bold text-primary">4. Cookies</h2>
        <p>We use minimal cookies to improve user experience. You may disable cookies in your browser settings.</p>

        <h2 className="text-xl font-bold text-primary">5. Contact</h2>
        <p>For privacy-related queries, email: info@college.ac.in</p>
      </div>
    </div>
  );
}
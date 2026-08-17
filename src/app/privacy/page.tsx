import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — PlotTwist",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-[#9ca3af] hover:text-yellow-400 transition-colors text-sm mb-6 inline-block">
          ← Back to Home
        </Link>
        <h1 className="font-title text-3xl font-bold text-[#f0ece8] mb-6">Privacy Policy</h1>
        <div className="card-glass rounded-2xl border border-white/8 p-6 prose prose-invert max-w-none text-[#9ca3af] text-sm leading-relaxed space-y-4">
          <p><strong className="text-[#f0ece8]">Entertainment Product Disclosure:</strong> PlotTwist is a fictional entertainment product. All movie results are generated for fun and are not psychological assessments, personality diagnoses, or predictions of any kind.</p>
          <h2 className="font-title text-xl text-[#f0ece8] mt-4">What We Collect</h2>
          <p>When you create a movie, we temporarily store your quiz answers to generate your story. We store your movie result associated with your share code so shared links work. We do not collect email addresses or account information for basic usage. We may collect standard web analytics data (page views, general location, device type) through Vercel Analytics.</p>
          <h2 className="font-title text-xl text-[#f0ece8] mt-4">What We Don't Do</h2>
          <p>We do not sell your data. We do not claim to analyze your real personality. We do not store sensitive personal information. We do not require account creation for basic usage.</p>
          <h2 className="font-title text-xl text-[#f0ece8] mt-4">Data Retention</h2>
          <p>Movie results and share URLs may expire after 90 days. You can contact us to request removal of your data.</p>
          <h2 className="font-title text-xl text-[#f0ece8] mt-4">Contact</h2>
          <p>For privacy questions or data deletion requests, contact us through the website.</p>
          <p className="text-xs text-[#6b7280] mt-6">Last updated: 2026</p>
        </div>
      </div>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ContactForm from "@/components/contactForm/ContactForm";

const WorkspacePage = async () => {
  const session = await auth();

  // Protect the route - only for non-admin clients
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="container-custom py-12 animate-fadeIn">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to Your Workspace</h1>
        <p className="text-textSoft text-lg">
          Hello, <span className="text-primary font-semibold">{session.user.username}</span>! 
          This is your private space to collaborate with our agency.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Submit Idea */}
        <div className="card p-8 bg-bgSoft rounded-2xl animate-fadeInLeft" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h2 className="text-2xl font-bold mb-6">Submit a New Idea</h2>
          <p className="text-textSoft mb-8">
            Tell us about the project you have in mind. Our team will review your 
            submission and get back to you within 24 hours.
          </p>
          <ContactForm userId={session.user.id} />
        </div>

        {/* Right Column: Project Status */}
        <div className="space-y-8 animate-fadeInRight" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <div className="card p-8 bg-bgSoft rounded-2xl border border-primary/20 hover:border-primary/40">
            <h2 className="text-2xl font-bold mb-4 text-primary">Project Status</h2>
            <div className="flex items-center gap-4 p-4 bg-bg rounded-xl">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium">Account Verification</p>
                <p className="text-sm text-textSoft">Your account is active. You can now submit ideas.</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-textSoft italic">
                "We don't just build websites, we build your future."
              </p>
            </div>
          </div>

          <div className="card p-8 bg-bgSoft rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Why Collaborate?</h2>
            <ul className="space-y-3 text-textSoft">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Direct access to our lead developers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Priority support for your ideas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Detailed project timeline & roadmaps
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;

import RegisterForm from "@/components/registerForm/registerForm";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-10 px-4 md:py-20 overflow-hidden">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 bg-bgSoft/30 rounded-3xl overflow-hidden border border-bgSoft/50 shadow-2xl animate-fadeIn">
        
        {/* Left Side: Marketing/Visual */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-900/40 to-primary/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-2xl font-bold text-white mb-12">IdeaReality</div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Start your <span className="text-primary">journey</span> with the elite <span className="text-blue-400">creatives</span>.
            </h2>
            {/* Illustration Image */}
            <div className="relative h-80 w-full mb-6 animate-imageReveal">
              <Image 
                src="/contact.png" 
                alt="3D Illustration" 
                fill 
                priority
                className="object-contain drop-shadow-[0_20px_50px_rgba(54,115,253,0.3)]"
              />
            </div>
            <p className="text-textSoft text-lg mb-8 max-w-md">
              Create an account to access our project management workspace and start building your dream project today.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8 mb-12">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-xs text-textSoft uppercase tracking-wider">Happy Clients</div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-bold text-blue-400 mb-1">10+</div>
                <div className="text-xs text-textSoft uppercase tracking-wider">Years Exp</div>
              </div>
            </div>
          </div>

          {/* Abstract background elements */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-soft"></div>
          <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-[80px] animate-pulse-soft" style={{ animationDelay: '3s' }}></div>
          
          <div className="relative z-10 mt-auto">
            <p className="text-sm text-textSoft italic">
              &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-3">Get Started</h1>
            <p className="text-textSoft">Create your free account today</p>
          </div>

          <RegisterForm />
          
          <div className="mt-8 pt-8 border-t border-bgSoft/50 text-center text-sm text-textSoft">
            <p className="mb-4 text-xs opacity-70">
              Join 1,000+ users building the future
            </p>
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline font-medium">
                Sign in instead
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


import LoginForm from "@/components/loginForm/loginForm";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-10 px-4 md:py-20 overflow-hidden">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 bg-bgSoft/30 rounded-3xl overflow-hidden border border-bgSoft/50 shadow-2xl animate-fadeIn">
        
        {/* Left Side: Marketing/Visual */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/20 to-blue-900/40 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-2xl font-bold text-white mb-12">IdeaReality</div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Turn your <span className="text-primary">vision</span> into a digital <span className="text-blue-400">reality</span>.
            </h2>

            {/* Illustration Image */}
            <div className="relative h-80 mb-6 w-full animate-imageReveal">
              <Image 
                src="/about.png" 
                alt="3D Illustration" 
                fill 
                priority
                className="object-contain drop-shadow-[0_20px_50px_rgba(54,115,253,0.3)]"
              />
            </div>

            <p className="text-textSoft text-lg mb-8 max-w-md">
              Join our exclusive client portal to track your project progress and collaborate with our experts.
            </p>
            
            <ul className="space-y-4 text-textSoft mb-12">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                <span>Real-time project tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                <span>Direct developer collaboration</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                <span>Premium case studies access</span>
              </li>
            </ul>
          </div>

          {/* Abstract background elements */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/30 rounded-full blur-[100px] animate-pulse-soft"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-[80px] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 mt-auto">
            <p className="text-sm text-textSoft italic">
              &quot;The best way to predict the future is to create it.&quot;
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
            <p className="text-textSoft">Sign in to your client portal</p>
          </div>

          <LoginForm />
          
          <div className="mt-8 pt-8 border-t border-bgSoft/50 text-center text-sm text-textSoft">
            <p className="mb-4 text-xs opacity-70">
              Trusted by 500+ companies worldwide
            </p>
            <p>
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-primary hover:underline font-medium">
                Create one for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


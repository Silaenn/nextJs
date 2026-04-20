import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/action";

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-20">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Card */}
        <div className="bg-bgSoft rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
            <p className="text-textSoft">Sign in to manage your projects and ideas</p>
          </div>

          {/* Login Form */}
          <LoginForm />
        </div>

        {/* Footer Link */}
        <p className="text-center mt-6 text-textSoft text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-primary hover:underline font-medium">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

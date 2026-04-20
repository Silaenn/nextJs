import RegisterForm from "@/components/registerForm/registerForm";

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-20">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Card */}
        <div className="bg-bgSoft rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-textSoft">Join us today and get started</p>
          </div>

          {/* Register Form */}
          <RegisterForm />
        </div>

        {/* Footer Link */}
        <p className="text-center mt-6 text-textSoft text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUsersForm/adminUsersForm";
import AdminInquiries from "@/components/adminInquiries/AdminInquiries";
import { auth } from "@/lib/auth";

const AdminPage = async () => {
  const session = await auth();

  return (
    <div className="relative min-h-screen py-24 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[70%] sm:w-[50%] h-[50%] bg-accent/5 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 reveal-up">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent mb-3 sm:mb-4 block">
            Control Center
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter mb-3 sm:mb-4 italic uppercase">
            Architecture{" "}
            <span className="text-white">Admin.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-textSoft font-medium">
            Precision management for your digital assets.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:gap-y-5 lg:gap-y-6">

          {/* Inbound Inquiries */}
          <div className="col-span-12">
            <div className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] p-5 sm:p-8 lg:p-12 border-white/5 flex flex-col reveal-up">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 lg:mb-10 flex-shrink-0">
                <div className="w-8 sm:w-12 h-[1px] bg-accent flex-shrink-0" />
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white italic">
                  Inbound Inquiries
                </h2>
              </div>
              <AdminInquiries />
            </div>
          </div>

          {/* Case Studies */}
          <div className="col-span-12 lg:col-span-7" style={{ animationDelay: "0.1s" }}>
            <div className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] p-5 sm:p-8 lg:p-12 border-white/5 h-full flex flex-col reveal-up">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 lg:mb-10 flex-shrink-0">
                <div className="w-8 sm:w-12 h-[1px] bg-accent flex-shrink-0" />
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white italic">
                  Case Studies
                </h2>
              </div>
              <div className="flex-1 min-h-0">
                <AdminPosts />
              </div>
            </div>
          </div>

          {/* Draft Content */}
          <div className="col-span-12 lg:col-span-5" style={{ animationDelay: "0.2s" }}>
            <div className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] p-5 sm:p-8 lg:p-12 border-white/5 h-full bg-accent/5 flex flex-col reveal-up">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 lg:mb-10 flex-shrink-0">
                <div className="w-8 sm:w-12 h-[1px] bg-accent flex-shrink-0" />
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white italic">
                  Draft Content
                </h2>
              </div>
              <AdminPostForm userId={session.user.id} />
            </div>
          </div>

          {/* Personnel */}
          <div className="col-span-12 lg:col-span-6" style={{ animationDelay: "0.3s" }}>
            <div className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] p-5 sm:p-8 lg:p-12 border-white/5 h-full flex flex-col reveal-up">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 lg:mb-10 flex-shrink-0">
                <div className="w-8 sm:w-12 h-[1px] bg-accent flex-shrink-0" />
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white italic">
                  Personnel
                </h2>
              </div>
              <div className="flex-1 min-h-0">
                <AdminUsers />
              </div>
            </div>
          </div>

          {/* Onboard Member */}
          <div className="col-span-12 lg:col-span-6" style={{ animationDelay: "0.4s" }}>
            <div className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] p-5 sm:p-8 lg:p-12 border-white/5 h-full flex flex-col reveal-up">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 lg:mb-10 flex-shrink-0">
                <div className="w-8 sm:w-12 h-[1px] bg-accent flex-shrink-0" />
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white italic">
                  Onboard Member
                </h2>
              </div>
              <AdminUserForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPage;
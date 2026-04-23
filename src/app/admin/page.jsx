import { Suspense } from "react";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUsersForm/adminUsersForm";
import AdminInquiries from "@/components/adminInquiries/AdminInquiries";
import { auth } from "@/lib/auth";
import { PostsSkeleton, UsersSkeleton, FormSkeleton } from "@/components/skeletons/skeletons";

const AdminPage = async () => {
  const session = await auth();

  return (
    <div className="relative min-h-screen py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="mb-12 reveal-up">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">Control Center</span>
            <h1 className="heading-xl leading-none tracking-tighter mb-4 italic uppercase">Architecture <span className="text-white">Admin.</span></h1>
            <p className="text-xl text-textSoft font-medium">Precision management for your digital assets.</p>
        </div>

        {/* Priority: Inquiries (Bento Style) */}
        <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 reveal-up">
                <div className="glass rounded-[3rem] p-8 md:p-12 border-white/5">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-[1px] bg-accent" />
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Inbound Inquiries</h2>
                    </div>
                    <Suspense fallback={<PostsSkeleton />}>
                        <AdminInquiries />
                    </Suspense>
                </div>
            </div>

            {/* Content Management Section */}
            <div className="col-span-12 lg:col-span-7 reveal-up" style={{ animationDelay: '0.1s' }}>
                <div className="glass rounded-[3rem] p-8 md:p-12 border-white/5 h-full">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-[1px] bg-accent" />
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Case Studies</h2>
                    </div>
                    <Suspense fallback={<PostsSkeleton />}>
                        <AdminPosts />
                    </Suspense>
                </div>
            </div>

            <div className="col-span-12 lg:col-span-5 reveal-up" style={{ animationDelay: '0.2s' }}>
                <div className="glass rounded-[3rem] p-8 md:p-12 border-white/5 h-full bg-accent/5">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-[1px] bg-accent" />
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Draft Content</h2>
                    </div>
                    <Suspense fallback={<FormSkeleton title="Add New Post" />}>
                        <AdminPostForm userId={session.user.id} />
                    </Suspense>
                </div>
            </div>

            {/* User Management Section */}
            <div className="col-span-12 lg:col-span-5 reveal-up" style={{ animationDelay: '0.3s' }}>
                <div className="glass rounded-[3rem] p-8 md:p-12 border-white/5 h-full">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-[1px] bg-accent" />
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Personnel</h2>
                    </div>
                    <Suspense fallback={<UsersSkeleton />}>
                        <AdminUsers />
                    </Suspense>
                </div>
            </div>

            <div className="col-span-12 lg:col-span-7 reveal-up" style={{ animationDelay: '0.4s' }}>
                <div className="glass rounded-[3rem] p-8 md:p-12 border-white/5 h-full">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-[1px] bg-accent" />
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Onboard Member</h2>
                    </div>
                    <Suspense fallback={<FormSkeleton title="Add New User" />}>
                        <AdminUserForm />
                    </Suspense>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

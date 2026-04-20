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
    <div className="container-custom py-12 animate-fadeIn">
      {/* Header */}
      <div className="mb-12 animate-fadeInLeft">
        <h1 className="text-4xl font-bold mb-2">Agency Dashboard</h1>
        <p className="text-textSoft">Manage your case studies, inquiries, and users</p>
      </div>

      {/* Inquiries Section - Priority for Admin */}
      <div className="mb-12 animate-scaleIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <Suspense fallback={<PostsSkeleton />}>
          <AdminInquiries />
        </Suspense>
      </div>

      {/* Posts Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="card">
          <Suspense fallback={<PostsSkeleton />}>
            <AdminPosts />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<FormSkeleton title="Add New Post" />}>
            <AdminPostForm userId={session.user.id} />
          </Suspense>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-bgSoft my-12"></div>

      {/* Users Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <Suspense fallback={<UsersSkeleton />}>
            <AdminUsers />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<FormSkeleton title="Add New User" />}>
            <AdminUserForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

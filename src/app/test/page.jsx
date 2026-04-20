import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models";

export const dynamic = 'force-dynamic';

export default async function TestPage() {
  let dbStatus = "Unknown";
  let userCount = 0;
  let error = null;

  try {
    await connectToDb();
    dbStatus = "Connected ✓";
    userCount = await User.countDocuments({});
  } catch (err) {
    dbStatus = "Failed ✗";
    error = err.message;
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">System Test</h1>
        
        <div className="card space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Database Connection</h2>
            <p className={`text-lg ${dbStatus.includes("✓") ? "text-green-500" : "text-red-500"}`}>
              Status: {dbStatus}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Users in Database</h2>
            <p className="text-2xl font-bold text-primary">{userCount}</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
              <h3 className="font-semibold mb-2">Error Details:</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="pt-4 border-t border-bgSoft">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <a href="/register" className="btn-primary">
                Test Register
              </a>
              <a href="/login" className="btn-secondary">
                Test Login
              </a>
            </div>
          </div>

          {userCount === 0 && (
            <div className="bg-blue-500/10 border border-blue-500 text-blue-500 px-4 py-3 rounded-lg mt-4">
              <p className="text-sm">
                ℹ️ No users in database. The first GitHub login will create an admin user.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

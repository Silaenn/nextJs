import { getUsers } from "@/lib/data";
import Image from "next/image";
import { deleteUser } from "@/lib/action";

const AdminUsers = async () => {
  const users = await getUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <span className="text-sm text-textSoft bg-bg px-3 py-1 rounded-full">
          {users.length} {users.length === 1 ? 'user' : 'users'}
        </span>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 text-textSoft">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p>No users yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div 
              key={user.id}
              className="flex items-center justify-between p-4 bg-bg/50 rounded-lg hover:bg-bg/70 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-bgSoft">
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {user.username}
                    </h3>
                    {user.isAdmin && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-textSoft">{user.email}</p>
                </div>
              </div>
              <form action={deleteUser}>
                <input type="hidden" name="id" value={user.id} />
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  disabled={user.isAdmin}
                >
                  {user.isAdmin ? 'Protected' : 'Delete'}
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

import { Inquiry } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

const AdminInquiries = async () => {
  await connectToDb();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });

  return (
    <div className="card p-6 bg-bgSoft rounded-2xl h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Client Inquiries</h2>
        <span className="text-sm text-textSoft bg-bg px-3 py-1 rounded-full">
          {inquiries.length} {inquiries.length === 1 ? 'inquiry' : 'inquiries'}
        </span>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-12 text-textSoft">
          <p>No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="p-4 bg-bg rounded-xl border border-gray-700 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                <h3 className="font-bold text-primary truncate max-w-full">{inquiry.name}</h3>
                <span className="text-xs text-textSoft flex-shrink-0">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-textSoft mb-2 italic truncate">{inquiry.email}</p>
              <p className="text-sm leading-relaxed break-words">{inquiry.message}</p>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-2 py-1 rounded">
                  {inquiry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;

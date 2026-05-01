import React from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // ✅ Safe online check
  const isOnline = (userId) =>
    onlineUsers.some((id) => id?.toString() === userId?.toString());

  // 🕒 Format last seen
  const formatLastSeen = (timestamp) => {
    const diff = Date.now() - new Date(timestamp);

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;

    return new Date(timestamp).toLocaleDateString();
  };

  if (!selectedUser) return null;

  const online = isOnline(selectedUser._id);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />

              {/* 🟢 Online dot */}
              {online && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>

            <p className="text-sm text-base-content/70">
              {online
                ? "Online"
                : selectedUser.lastSeen || selectedUser.lastseen
                ? `Last seen ${formatLastSeen(
                    selectedUser.lastSeen || selectedUser.lastseen
                  )}`
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
import { useState } from "react";

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  const phone = "0982947645";
  const zaloLink = `https://zalo.me/${phone}`;

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Contact options — shown when expanded */}
      {expanded && (
        <>
          {/* Phone */}
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2.5 bg-white rounded-full shadow-lg px-4 py-2.5 cursor-pointer hover:scale-105 transition-transform animate-fadeIn group"
            style={{ animation: "slideUp 0.2s ease-out" }}
          >
            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap group-hover:text-rose-500 transition-colors">
              0982.947.645
            </span>
            <div className="w-9 h-9 flex items-center justify-center bg-rose-500 rounded-full flex-shrink-0">
              <i className="ri-phone-fill text-white text-base" />
            </div>
          </a>

          {/* Zalo */}
          <a
            href={zaloLink}
            target="_blank"
            rel="nofollow noopener"
            className="flex items-center gap-2.5 bg-white rounded-full shadow-lg px-4 py-2.5 cursor-pointer hover:scale-105 transition-transform"
            style={{ animation: "slideUp 0.15s ease-out" }}
          >
            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap hover:text-green-600 transition-colors">
              Zalo hỗ trợ
            </span>
            <div className="w-9 h-9 flex items-center justify-center bg-green-500 rounded-full flex-shrink-0">
              <i className="ri-chat-smile-2-fill text-white text-base" />
            </div>
          </a>
        </>
      )}

      {/* Main toggle button */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`w-13 h-13 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap ${
          expanded
            ? "bg-gray-700 rotate-45"
            : "bg-rose-500 hover:bg-rose-600"
        }`}
        style={{ width: "52px", height: "52px" }}
        aria-label="Liên hệ hỗ trợ"
      >
        {expanded ? (
          <i className="ri-close-line text-white text-xl" />
        ) : (
          <i className="ri-customer-service-2-line text-white text-xl" />
        )}
      </button>

      {/* Pulse ring when closed */}
      {!expanded && (
        <span
          className="absolute bottom-0 right-0 w-full h-full rounded-full bg-rose-400 opacity-40 animate-ping pointer-events-none"
          style={{ width: "52px", height: "52px" }}
        />
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

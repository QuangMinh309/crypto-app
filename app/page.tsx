"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import { Eye, EyeOff, Lock, Unlock, Copy, Check, Leaf } from "lucide-react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [secretKey, setSecretKey] = useState("secret key of group 9");
  const [outputText, setOutputText] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleEncrypt = () => {
    if (!inputText) {
      alert("Vui lòng nhập văn bản cần mã hóa!");
      return;
    }
    if (!secretKey) {
      alert("Vui lòng nhập khóa bí mật!");
      return;
    }
    const encrypted = CryptoJS.AES.encrypt(inputText, secretKey);

    // object CipherParams
    console.log("Salt:", encrypted.salt?.toString());
    console.log("IV:", encrypted.iv?.toString());
    console.log("Key (derived):", encrypted.key?.toString());
    console.log("Ciphertext:", encrypted.ciphertext.toString());

    const ciphertext = encrypted.toString();

    setOutputText(ciphertext);
  };

  const handleDecrypt = () => {
    if (!inputText) {
      alert("Vui lòng nhập văn bản cần giải mã!");
      return;
    }
    if (!secretKey) {
      alert("Vui lòng nhập khóa bí mật!");
      return;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(inputText, secretKey);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (!originalText) {
        throw new Error("Sai khóa hoặc dữ liệu không hợp lệ");
      }
      setOutputText(originalText);
    } catch (error) {
      alert("Giải mã thất bại! Vui lòng kiểm tra lại đoạn mã hoặc khóa bí mật.");
      setOutputText("");
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#f4f9f4] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans text-emerald-950">
      {/* các mảng màu organic phía sau */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-green-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="fixed top-[20%] right-[-10%] w-100 h-100 bg-teal-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="fixed bottom-[-20%] left-[20%] w-150 h-150 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_32px_rgba(4,43,21,0.08)] border border-white/60">
          {/* header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Leaf className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-700 to-teal-600 tracking-tight">
                CRYPTO AES
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* cột trái: đầu vào + nút bấm */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-md font-bold text-emerald-800 mb-2 flex items-center gap-2">
                  Khóa bí mật
                </label>
                <div className="relative group">
                  <input
                    type={showKey ? "text" : "password"}
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="w-full text-lg p-4 pr-12 bg-white/50 border border-emerald-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all text-emerald-900 placeholder-emerald-500"
                    placeholder="Nhập khoá bảo mật..."
                  />

                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-600 transition-colors p-2 rounded-xl hover:bg-emerald-50"
                  >
                    {showKey ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-md font-bold text-emerald-800 mb-2 flex items-center gap-2">
                  Văn bản đầu vào
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  className="w-full text-lg flex-1 p-5 bg-white/50 border border-emerald-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all text-emerald-900 placeholder-emerald-500 resize-none"
                  placeholder="Nhập văn bản cần xử lý vào đây..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleEncrypt}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 cursor-pointer active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Mã Hóa
                </button>
                <button
                  onClick={handleDecrypt}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-teal-600/20 cursor-pointer active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <Unlock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Giải Mã
                </button>
              </div>
            </div>

            {/* cột phải: kết quả */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <label className="text-md font-bold text-emerald-800 flex items-center gap-2">
                  Văn bản kết quả
                </label>
                {outputText && (
                  <button
                    onClick={handleCopyOutput}
                    className="text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 transition-all flex items-center gap-1.5 font-semibold"
                  >
                    {copiedOutput ? (
                      <>
                        <Check className="w-4 h-4" /> Đã chép
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Sao chép
                      </>
                    )}
                  </button>
                )}
              </div>
              <textarea
                value={outputText}
                readOnly
                className="w-full text-lg flex-1 h-full min-h-75 p-6 bg-emerald-50 border border-emerald-200 rounded-4xl outline-none text-emerald-800 resize-none placeholder-emerald-500 shadow-inner cursor-default"
                placeholder="Kết quả sẽ hiển thị ở đây..."
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}

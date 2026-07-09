import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-16 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-xl font-semibold text-primary-400 mb-2">Tác giả: Mai Trương Thái Lâm (mage__08)</h3>
        <ul className="text-sm text-zinc-400 space-y-1 inline-block text-left">
          <li>• Thủ Khoa tỉnh Vĩnh Long, Á Khoa toàn quốc môn Tin học THPTQG năm 2026.</li>
          <li>• Đội tuyển HSGQG tỉnh Vĩnh Long 2025-2026.</li>
          <li>• Giải 3 HSG tỉnh Bến Tre năm 2023-2024 & 2024-2025.</li>
          <li>• Giải KK HSG tỉnh Vĩnh Long năm 2025-2026.</li>
          <li>• Đội trưởng PVT Bến Tre, Giải nhì Robocon ORC toàn quốc 2025.</li>
          <li>• Gia sư tại UnicornsEdu.</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

/* ============================================
   DOCS DATA — AI Gemini Presentation
   Author: Mage__08
   ============================================ */

const DOCS_DATA = [
  {
    id: 'doc-intro',
    title: '1. Giới thiệu tổng quan',
    icon: '🏠',
    content: `
      <h3>AI tạo hình ảnh & video là gì?</h3>
      <p>AI tạo hình ảnh (Image Generation AI) là công nghệ sử dụng mô hình học sâu (Deep Learning) để tạo ra hình ảnh mới từ mô tả bằng văn bản (Text-to-Image). Các mô hình phổ biến bao gồm:</p>
      <ul>
        <li><strong>Google Gemini</strong> — Mô hình đa phương thức mạnh mẽ nhất của Google</li>
        <li><strong>DALL·E 3</strong> — Mô hình của OpenAI</li>
        <li><strong>Midjourney</strong> — Chuyên về ảnh nghệ thuật</li>
        <li><strong>Stable Diffusion</strong> — Mã nguồn mở, linh hoạt</li>
      </ul>
      <p>Trong buổi chia sẻ này, chúng ta tập trung vào <strong>Google Gemini</strong> vì:</p>
      <ul>
        <li>Miễn phí</li>
        <li>Dễ sử dụng (giao diện chat)</li>
        <li>Hỗ trợ tiếng Việt tốt</li>
        <li>Tạo được cả ảnh lẫn video</li>
        <li>Có thể chỉnh sửa ảnh bằng ngôn ngữ tự nhiên</li>
      </ul>
    `
  },
  {
    id: 'doc-mindset',
    title: '2. Tư duy đúng về AI',
    icon: '🧠',
    content: `
      <h3>Thay đổi tư duy</h3>
      <p>Nhiều người nghĩ rằng để sử dụng AI tạo ảnh, cần phải "học viết Prompt". Đây là một hiểu lầm lớn.</p>
      
      <div class="doc-highlight">
        <strong>💡 Bí quyết:</strong> Bạn không cần học Prompt. Bạn cần học cách <em>mô tả chi tiết</em> điều bạn muốn.
      </div>
      
      <h4>Các yếu tố cần mô tả:</h4>
      <ol>
        <li><strong>Chủ thể (Subject):</strong> Ai/cái gì là trung tâm?</li>
        <li><strong>Bối cảnh (Setting):</strong> Ở đâu? Thời gian nào?</li>
        <li><strong>Ánh sáng (Lighting):</strong> Tự nhiên? Studio? Golden hour?</li>
        <li><strong>Góc máy (Camera Angle):</strong> Cận cảnh? Toàn cảnh? Từ trên xuống?</li>
        <li><strong>Phong cách (Style):</strong> Chân thực? Anime? 3D? Vintage?</li>
        <li><strong>Cảm xúc (Mood):</strong> Vui vẻ? U buồn? Huyền bí?</li>
        <li><strong>Chất lượng (Quality):</strong> 4K? 8K? Siêu nét?</li>
      </ol>
    `
  },
  {
    id: 'doc-prompt-write',
    title: '3. AI viết Prompt',
    icon: '✍️',
    content: `
      <h3>Cách nhờ AI viết Prompt</h3>
      <p>Thay vì tự viết Prompt phức tạp, bạn có thể nhờ Gemini viết hộ bằng cách sử dụng "meta-prompt".</p>
      
      <h4>Meta-Prompt tạo ảnh:</h4>
      <div class="doc-code-block">
        <div class="doc-code-header">
          <span>📋 Copy và dùng trực tiếp</span>
        </div>
        <pre>Bạn là Prompt Engineer chuyên nghiệp.

Hãy chuyển ý tưởng sau thành Prompt chi tiết để AI tạo ảnh.

Yêu cầu:
• Bổ sung chi tiết mô tả
• Góc máy (camera angle)
• Ánh sáng (lighting)
• Bố cục (composition)
• Phong cách (style)
• Màu sắc (color palette)
• Chất lượng (quality/resolution)
• Chỉ trả về Prompt cuối cùng

Ý tưởng: [ĐIỀN Ý TƯỞNG CỦA BẠN]</pre>
      </div>

      <h4>Cách sử dụng:</h4>
      <ol>
        <li>Copy meta-prompt ở trên</li>
        <li>Thay <code>[ĐIỀN Ý TƯỞNG CỦA BẠN]</code> bằng ý tưởng thô</li>
        <li>Paste vào Gemini</li>
        <li>Gemini sẽ trả về Prompt chuyên nghiệp</li>
        <li>Copy Prompt đó và dùng để tạo ảnh</li>
      </ol>
    `
  },
  {
    id: 'doc-prompt-optimize',
    title: '4. AI tối ưu Prompt',
    icon: '🚀',
    content: `
      <h3>Tối ưu hóa Prompt</h3>
      <p>Nếu bạn đã có Prompt nhưng kết quả chưa ưng ý, hãy nhờ AI đánh giá và tối ưu.</p>
      
      <h4>Meta-Prompt tối ưu:</h4>
      <div class="doc-code-block">
        <pre>Đánh giá Prompt sau và viết lại để:
• Điện ảnh hơn (more cinematic)
• Chân thực hơn (more realistic)
• Đẹp hơn (more aesthetic)
• Giữ nguyên ý tưởng gốc

Chỉ trả về Prompt cuối cùng.

Prompt cần tối ưu:
[PASTE PROMPT CỦA BẠN]</pre>
      </div>
      
      <h4>Các yếu tố AI sẽ bổ sung:</h4>
      <ul>
        <li>Chi tiết trang phục và chất liệu</li>
        <li>Ánh sáng cụ thể (golden hour, rim light, etc.)</li>
        <li>Thông số camera (focal length, aperture)</li>
        <li>Color grading chuyên nghiệp</li>
        <li>Độ phân giải cao (4K, 8K)</li>
        <li>Phong cách tham chiếu (editorial, cinematic, etc.)</li>
      </ul>
    `
  },
  {
    id: 'doc-create-image',
    title: '5. Tạo hình ảnh',
    icon: '🎨',
    content: `
      <h3>Hướng dẫn tạo hình ảnh với Gemini</h3>
      
      <h4>Bước 1: Truy cập Gemini</h4>
      <p>Vào <code>gemini.google.com</code> và đăng nhập tài khoản Google.</p>
      
      <h4>Bước 2: Chọn model phù hợp</h4>
      <p>Chọn model có hỗ trợ tạo ảnh (thường là model mới nhất).</p>
      
      <h4>Bước 3: Nhập Prompt</h4>
      <p>Paste Prompt đã được AI viết/tối ưu vào ô chat.</p>
      
      <h4>Bước 4: Đánh giá kết quả</h4>
      <ul>
        <li>Nếu ưng ý → Tải về</li>
        <li>Nếu chưa ưng → Yêu cầu chỉnh sửa hoặc tạo lại</li>
      </ul>
      
      <h4>Mẹo hay:</h4>
      <div class="doc-highlight">
        <strong>💡 Pro tip:</strong> Nếu kết quả không đúng ý, đừng tạo lại hoàn toàn. Hãy yêu cầu chỉnh sửa cụ thể phần bạn muốn thay đổi.
      </div>
    `
  },
  {
    id: 'doc-edit',
    title: '6. Chỉnh sửa ảnh',
    icon: '🖌️',
    content: `
      <h3>Chỉnh sửa ảnh bằng AI</h3>
      <p>Gemini cho phép chỉnh sửa ảnh đã tạo bằng ngôn ngữ tự nhiên, giữ nguyên các phần không thay đổi.</p>
      
      <h4>Meta-Prompt chỉnh sửa:</h4>
      <div class="doc-code-block">
        <pre>Giữ nguyên mọi thứ trong ảnh.
Chỉ thay đổi [MÔ TẢ THAY ĐỔI].

Ví dụ:
• Giữ nguyên mọi thứ, chỉ thay nền thành bãi biển
• Giữ nguyên khuôn mặt, đổi váy thành áo dài
• Thêm mưa nhẹ và hiệu ứng phản chiếu
• Đổi ánh sáng thành ban đêm với ánh đèn neon</pre>
      </div>
      
      <h4>Các loại chỉnh sửa phổ biến:</h4>
      <ul>
        <li><strong>Đổi nền (Background swap):</strong> Thay đổi bối cảnh</li>
        <li><strong>Đổi trang phục (Outfit change):</strong> Thay quần áo</li>
        <li><strong>Thêm hiệu ứng (Add effects):</strong> Mưa, tuyết, ánh sáng</li>
        <li><strong>Đổi phong cách (Style transfer):</strong> Realistic → Anime</li>
        <li><strong>Giữ khuôn mặt (Face preservation):</strong> Thay đổi mọi thứ trừ khuôn mặt</li>
      </ul>
    `
  },
  {
    id: 'doc-video',
    title: '7. Tạo video',
    icon: '🎬',
    content: `
      <h3>Tạo video bằng AI</h3>
      <p>Gemini có thể tạo video ngắn từ Prompt hoặc từ ảnh tĩnh.</p>
      
      <h4>Meta-Prompt tạo video:</h4>
      <div class="doc-code-block">
        <pre>Tạo video từ mô tả sau.

Thêm:
• Camera movement (pan, dolly, tilt, crane)
• Cinematic lighting (golden hour, dramatic)
• Smooth motion (fluid, natural)
• Realistic physics (fabric flow, hair movement)

Mô tả: [ĐIỀN MÔ TẢ VIDEO]</pre>
      </div>
      
      <h4>Các kỹ thuật camera phổ biến:</h4>
      <ul>
        <li><strong>Dolly in/out:</strong> Camera tiến/lùi</li>
        <li><strong>Pan left/right:</strong> Camera quay trái/phải</li>
        <li><strong>Tilt up/down:</strong> Camera ngước lên/cúi xuống</li>
        <li><strong>Crane shot:</strong> Camera nâng lên cao</li>
        <li><strong>Tracking shot:</strong> Camera di chuyển theo chủ thể</li>
        <li><strong>Slow motion:</strong> Chuyển động chậm</li>
      </ul>
    `
  },
  {
    id: 'doc-canva',
    title: '8. Kết hợp Canva',
    icon: '🎯',
    content: `
      <h3>Đưa sản phẩm AI vào Canva</h3>
      <p>Sau khi tạo ảnh/video bằng Gemini, bạn có thể đưa vào Canva để thiết kế poster, social media content, video ngắn.</p>
      
      <h4>Quy trình:</h4>
      <ol>
        <li><strong>Tải ảnh từ Gemini</strong> về máy</li>
        <li><strong>Mở Canva</strong> và chọn template phù hợp:
          <ul>
            <li>Instagram Post (1080x1080)</li>
            <li>Facebook Cover (820x312)</li>
            <li>TikTok Video (1080x1920)</li>
            <li>Poster A4 (210x297mm)</li>
          </ul>
        </li>
        <li><strong>Upload ảnh AI</strong> vào Canva</li>
        <li><strong>Thêm text, logo, CTA</strong> và các yếu tố thiết kế</li>
        <li><strong>Xuất file</strong> với định dạng phù hợp (PNG, JPG, MP4)</li>
      </ol>
      
      <div class="doc-highlight">
        <strong>💡 Mẹo:</strong> Canva có tính năng "Magic Resize" giúp bạn chuyển đổi kích thước cho nhiều nền tảng chỉ với 1 click.
      </div>
    `
  },
  {
    id: 'doc-tips',
    title: '9. Mẹo nâng cao',
    icon: '🧪',
    content: `
      <h3>Mẹo nâng cao khi tạo ảnh AI</h3>
      
      <h4>1. Sử dụng tham chiếu phong cách</h4>
      <p>Thêm tên nhiếp ảnh gia hoặc phong cách nổi tiếng:</p>
      <ul>
        <li>"Shot by Annie Leibovitz" — Chân dung editorial</li>
        <li>"Style of Wes Anderson" — Màu sắc đối xứng</li>
        <li>"Studio Ghibli aesthetic" — Anime Nhật Bản</li>
        <li>"Cyberpunk 2077 style" — Neon tương lai</li>
      </ul>
      
      <h4>2. Chỉ định thông số camera</h4>
      <p>Giúp AI hiểu bạn muốn ảnh trông như thế nào:</p>
      <ul>
        <li><code>35mm lens, f/1.4</code> — Ống kính góc rộng, nền mờ</li>
        <li><code>85mm lens, f/2.8</code> — Ống chân dung kinh điển</li>
        <li><code>200mm telephoto</code> — Nén phối cảnh, bokeh mạnh</li>
        <li><code>Fish-eye lens</code> — Góc cực rộng, biến dạng</li>
      </ul>
      
      <h4>3. Color grading</h4>
      <p>Chỉ định bảng màu giúp ảnh có tông màu nhất quán:</p>
      <ul>
        <li>"Warm amber tones" — Tông ấm vàng</li>
        <li>"Cool blue desaturated" — Tông lạnh xanh</li>
        <li>"High contrast black and white" — Đen trắng tương phản</li>
        <li>"Pastel dreamy colors" — Màu pastel mơ mộng</li>
      </ul>
    `
  },
  {
    id: 'doc-practice',
    title: '10. Bài tập thực hành',
    icon: '📝',
    content: `
      <h3>Bài tập thực hành</h3>
      <p>Hãy thực hành theo từng bước sau để nắm vững quy trình.</p>
      
      <h4>Bài 1: Viết ý tưởng (5 phút)</h4>
      <p>Viết 3 ý tưởng ảnh bạn muốn tạo bằng ngôn ngữ tự nhiên (tiếng Việt).</p>
      
      <h4>Bài 2: Nhờ AI viết Prompt (5 phút)</h4>
      <p>Dùng meta-prompt để nhờ Gemini chuyển ý tưởng thành Prompt chuyên nghiệp.</p>
      
      <h4>Bài 3: Tối ưu Prompt (5 phút)</h4>
      <p>Nhờ Gemini đánh giá và tối ưu Prompt vừa tạo.</p>
      
      <h4>Bài 4: Tạo ảnh (10 phút)</h4>
      <p>Paste Prompt vào Gemini để tạo ảnh. Thử tạo 2-3 lần với cùng Prompt.</p>
      
      <h4>Bài 5: Chỉnh sửa (10 phút)</h4>
      <p>Chọn ảnh ưng ý nhất và thử chỉnh sửa: đổi nền, đổi trang phục, thêm hiệu ứng.</p>
      
      <h4>Bài 6: Tạo video (10 phút)</h4>
      <p>Thử tạo video ngắn từ ảnh hoặc từ Prompt mới.</p>
      
      <h4>Bài 7: Đưa vào Canva (10 phút)</h4>
      <p>Import ảnh vào Canva và tạo một poster hoặc social media post hoàn chỉnh.</p>
    `
  }
];

window.DOCS_DATA = DOCS_DATA;

/* ============================================
   SLIDES DATA — AI Gemini Presentation
   Author: Mage__08
   ============================================ */

const SLIDES_DATA = [
  // ===== HERO =====
  {
    id: 'hero',
    type: 'hero',
    section: 'home',
    title: 'Tạo Hình Ảnh & Video<br>bằng AI với <span class="text-gradient">Gemini</span>',
    subtitle: 'Từ ý tưởng đến sản phẩm hoàn chỉnh chỉ trong vài phút.',
    badge: '✨ Powered by AI',
    cta: 'Bắt đầu khám phá',
    notes: 'Chào mừng đến với buổi chia sẻ. Hôm nay chúng ta sẽ tìm hiểu cách tạo hình ảnh và video bằng AI Gemini.'
  },

  // ===== SLIDE 1: Phép màu =====
  {
    id: 'slide-magic',
    type: 'split',
    section: 'intro',
    number: '01',
    title: 'Phép Màu Từ<br>Một Cú <span class="text-gradient">Click</span>',
    subtitle: 'AI đang thay đổi cách chúng ta tạo nội dung hình ảnh. Chỉ cần một dòng mô tả, AI có thể tạo ra hình ảnh chuyên nghiệp trong vài giây.',
    content: {
      left: {
        type: 'comparison',
        before: {
          label: 'Trước đây',
          icon: '⏰',
          items: [
            'Học Photoshop 6-12 tháng',
            'Thuê designer chuyên nghiệp',
            'Chi phí hàng triệu đồng',
            'Chờ đợi nhiều ngày'
          ]
        },
        after: {
          label: 'Bây giờ với AI',
          icon: '⚡',
          items: [
            'Viết một dòng mô tả',
            'AI tạo ảnh trong 10 giây',
            'Miễn phí hoặc chi phí thấp',
            'Chỉnh sửa không giới hạn'
          ]
        }
      },
      right: {
        type: 'image-showcase',
        images: [
          { src: 'images/portrait_ai.png', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Portrait AI', icon: '👤' },
          { src: 'images/product_shot.png', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Product Shot', icon: '📦' },
          { src: 'images/landscape.png', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Landscape', icon: '🏔️' },
          { src: 'images/food_drink.png', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Food & Drink', icon: '🍕' }
        ]
      }
    },
    notes: 'Trước đây, để có một bức ảnh đẹp cần rất nhiều kỹ năng. Giờ AI đã thay đổi hoàn toàn điều đó.'
  },

  // ===== SLIDE 2: AI không thay thế =====
  {
    id: 'slide-ai-human',
    type: 'center',
    section: 'ai-intro',
    number: '02',
    title: 'AI Không Thay Thế <span class="text-gradient">Con Người</span>',
    subtitle: 'AI là công cụ — Con người là người sáng tạo. AI giúp bạn thực hiện ý tưởng nhanh hơn, nhưng ý tưởng vẫn là của bạn.',
    content: {
      type: 'timeline',
      items: [
        {
          icon: '💡',
          title: 'Ý Tưởng',
          desc: 'Bạn nghĩ ra ý tưởng sáng tạo',
          color: 'var(--accent)'
        },
        {
          icon: '🤖',
          title: 'AI Thực Hiện',
          desc: 'AI biến ý tưởng thành hình ảnh/video',
          color: 'var(--primary)'
        },
        {
          icon: '🎨',
          title: 'Sản Phẩm',
          desc: 'Bạn tinh chỉnh và hoàn thiện',
          color: 'var(--secondary)'
        }
      ]
    },
    notes: 'Nhấn mạnh: AI là trợ lý, không phải người thay thế. Giá trị nằm ở ý tưởng và sự sáng tạo của con người.'
  },

  // ===== SLIDE 3: Tư duy đúng =====
  {
    id: 'slide-mindset',
    type: 'center',
    section: 'mindset',
    number: '03',
    title: 'Tư Duy <span class="text-gradient-accent">Đúng Cách</span>',
    subtitle: 'Bí quyết không phải là "học viết Prompt" — mà là "học cách mô tả chính xác".',
    content: {
      type: 'infographic',
      wrong: {
        label: '❌ Sai lầm phổ biến',
        text: '"Tôi cần học thuộc các Prompt phức tạp"'
      },
      right: {
        label: '✅ Tư duy đúng',
        text: '"Tôi cần biết cách mô tả chi tiết điều tôi muốn"'
      },
      tips: [
        { icon: '🎯', text: 'Mô tả cụ thể đối tượng chính' },
        { icon: '📸', text: 'Xác định góc chụp và bố cục' },
        { icon: '💡', text: 'Nêu rõ ánh sáng và không khí' },
        { icon: '🎨', text: 'Chọn phong cách nghệ thuật' }
      ]
    },
    notes: 'Nhiều người sợ AI vì nghĩ cần học Prompt phức tạp. Thực tế, chỉ cần biết mô tả rõ ràng.'
  },

  // ===== SLIDE 4: Ý tưởng thô =====
  {
    id: 'slide-raw-idea',
    type: 'center',
    section: 'mindset',
    number: '04',
    title: 'Bắt Đầu Từ <span class="text-gradient">Ý Tưởng Thô</span>',
    subtitle: 'Bạn không cần biết viết Prompt. Chỉ cần nói cho AI điều bạn muốn — bằng ngôn ngữ tự nhiên.',
    content: {
      type: 'raw-idea',
      examples: [
        {
          raw: 'Mình muốn một tấm ảnh người mẫu nữ mặc áo dài, đứng bên hồ, hoàng hôn, đẹp lãng mạn.',
          label: 'Ý tưởng thô',
          emoji: '💬'
        },
        {
          raw: 'Cần poster quảng cáo cà phê, phong cách vintage, ấm áp, có ly cà phê bốc khói.',
          label: 'Ý tưởng thô',
          emoji: '☕'
        },
        {
          raw: 'Muốn video ngắn sản phẩm son môi, quay cận cảnh, ánh sáng studio, sang trọng.',
          label: 'Ý tưởng thô',
          emoji: '💄'
        }
      ]
    },
    notes: 'Cho khán giả thấy ví dụ thực tế. Chỉ cần 1-2 câu đơn giản bằng tiếng Việt.'
  },

  // ===== SLIDE 5: AI viết Prompt =====
  {
    id: 'slide-ai-writes',
    type: 'split',
    section: 'ai-write',
    number: '05',
    title: 'AI Viết Prompt <span class="text-gradient">Cho Bạn</span>',
    subtitle: 'Gửi ý tưởng thô cho Gemini kèm hướng dẫn → AI sẽ viết Prompt chuyên nghiệp thay bạn.',
    content: {
      type: 'ai-writes',
      input: {
        label: '📝 Bạn gửi cho Gemini',
        text: 'Bạn là Prompt Engineer. Hãy chuyển ý tưởng sau thành Prompt chuyên nghiệp để AI tạo ảnh:\n\n"Người mẫu nữ mặc áo dài đứng bên hồ lúc hoàng hôn"\n\nYêu cầu: bổ sung chi tiết, góc máy, ánh sáng, bố cục, phong cách, màu sắc, chất lượng. Chỉ trả Prompt.'
      },
      output: {
        label: '🤖 Gemini trả lời',
        text: 'A Vietnamese woman wearing a traditional white áo dài with delicate floral embroidery, standing gracefully by the edge of a serene lake at golden hour. Soft warm sunlight bathes the scene, creating long shadows and golden reflections on the calm water. Shot from a low angle with the camera slightly tilted upward, shallow depth of field, f/1.8. The background features misty mountains and willow trees. Cinematic color grading with warm amber tones. Ultra-realistic, 8K resolution, professional fashion photography, editorial style.'
      }
    },
    notes: 'Demo: gửi ý tưởng → nhận Prompt. Khán giả sẽ thấy AI viết tốt hơn rất nhiều.'
  },

  // ===== SLIDE 6: AI tối ưu Prompt =====
  {
    id: 'slide-optimize',
    type: 'comparison',
    section: 'ai-optimize',
    number: '06',
    title: 'AI Tối Ưu <span class="text-gradient">Prompt</span>',
    subtitle: 'Gửi Prompt hiện tại cho Gemini đánh giá và viết lại — kết quả sẽ điện ảnh hơn, chân thực hơn, đẹp hơn.',
    content: {
      type: 'optimize',
      before: {
        label: 'PROMPT BAN ĐẦU',
        text: 'A woman in áo dài standing by a lake at sunset.'
      },
      after: {
        label: 'PROMPT SAU TỐI ƯU',
        text: 'A Vietnamese woman wearing a traditional white áo dài with delicate floral embroidery, standing gracefully by the edge of a serene lake at golden hour. <mark>Soft warm sunlight bathes the scene, creating long shadows and golden reflections on the calm water.</mark> <mark>Shot from a low angle with the camera slightly tilted upward, shallow depth of field, f/1.8.</mark> The background features <mark>misty mountains and willow trees.</mark> <mark>Cinematic color grading with warm amber tones. Ultra-realistic, 8K resolution,</mark> professional fashion photography, editorial style.'
      },
      improvements: [
        'Chi tiết trang phục',
        'Ánh sáng cụ thể',
        'Góc máy chuyên nghiệp',
        'Chất lượng 8K',
        'Phong cách điện ảnh'
      ]
    },
    notes: 'Highlight những phần được thêm. Cho thấy sự khác biệt rõ ràng giữa trước và sau tối ưu.'
  },

  // ===== SLIDE 7: Workflow =====
  {
    id: 'slide-workflow',
    type: 'center',
    section: 'ai-optimize',
    number: '07',
    title: 'Quy Trình <span class="text-gradient">Hoàn Chỉnh</span>',
    subtitle: 'Từ ý tưởng đến sản phẩm cuối cùng chỉ với 7 bước đơn giản.',
    content: {
      type: 'workflow',
      steps: [
        { icon: '💡', label: 'Ý tưởng', color: '#FFB84D' },
        { icon: '✍️', label: 'Prompt', color: '#6C63FF' },
        { icon: '🚀', label: 'Tối ưu', color: '#4FD1C5' },
        { icon: '🎨', label: 'Tạo ảnh', color: '#F472B6' },
        { icon: '🎬', label: 'Tạo video', color: '#FB923C' },
        { icon: '🖌️', label: 'Canva', color: '#A78BFA' },
        { icon: '✅', label: 'Hoàn thành', color: '#34D399' }
      ]
    },
    notes: 'Trình bày quy trình 7 bước. Mỗi bước click để highlight.'
  },

  // ===== SLIDE 8: Tạo hình ảnh =====
  {
    id: 'slide-create-image',
    type: 'split',
    section: 'create-image',
    number: '08',
    title: 'Tạo Hình Ảnh <span class="text-gradient">Chuyên Nghiệp</span>',
    subtitle: 'Paste Prompt vào Gemini → Nhận hình ảnh chất lượng cao trong vài giây.',
    content: {
      type: 'image-creation',
      prompt: 'A Vietnamese woman wearing a traditional white áo dài with delicate floral embroidery, standing gracefully by a serene lake at golden hour...',
      result: {
        src: 'images/portrait_ai.png',
        gradient: 'linear-gradient(135deg, #FFB84D 0%, #F472B6 50%, #6C63FF 100%)',
        label: 'Kết quả AI tạo ra',
        icon: '🖼️'
      },
      features: [
        { icon: '⚡', text: 'Tạo trong 10-30 giây' },
        { icon: '🔄', text: 'Tạo lại nếu chưa ưng' },
        { icon: '📐', text: 'Nhiều tỷ lệ khác nhau' },
        { icon: '🎭', text: 'Đa dạng phong cách' }
      ]
    },
    notes: 'Demo tạo ảnh trực tiếp nếu có Gemini. Hoặc show ảnh đã tạo sẵn.'
  },

  // ===== SLIDE 9: Chỉnh sửa =====
  {
    id: 'slide-edit',
    type: 'center',
    section: 'edit',
    number: '09',
    title: 'Chỉnh Sửa <span class="text-gradient-accent">Thông Minh</span>',
    subtitle: 'Giữ nguyên mọi thứ, chỉ thay đổi chi tiết bạn muốn. AI hiểu ngữ cảnh và chỉnh sửa chính xác.',
    content: {
      type: 'edit-showcase',
      edits: [
        {
          title: 'Thêm chi tiết',
          prompt: 'Giữ nguyên cô gái, thêm hoa sen rơi và phản chiếu hoàng hôn trên mặt nước',
          icon: '✨',
          src: 'images/edit_1.png',
          gradient: 'linear-gradient(135deg, #6C63FF 0%, #4FD1C5 100%)'
        },
        {
          title: 'Đổi bối cảnh',
          prompt: 'Giữ nguyên cô gái, đổi bối cảnh thành quán cà phê vintage ở Hội An',
          icon: '🏮',
          src: 'images/edit_2.png',
          gradient: 'linear-gradient(135deg, #FFB84D 0%, #F472B6 100%)'
        }
      ]
    },
    notes: 'Cho thấy 4 ví dụ chỉnh sửa phổ biến. Khán giả sẽ rất ấn tượng với khả năng giữ nguyên khuôn mặt.'
  },

  // ===== SLIDE 10: Tạo Video =====
  {
    id: 'slide-create-video',
    type: 'center',
    section: 'create-video',
    number: '10',
    title: 'Tạo Video <span class="text-gradient">Điện Ảnh</span>',
    subtitle: 'Từ ảnh tĩnh hoặc Prompt → Video ngắn với chuyển động camera, ánh sáng cinematic, smooth motion.',
    content: {
      type: 'video-creation',
      videoUrl: 'images/A_breathtaking_cinematic_vide.mp4',
      storyboard: [
        { frame: 1, desc: 'Toàn cảnh thành phố Cyberpunk...', icon: '🏙️', src: 'images/frame_1.png', gradient: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)' },
        { frame: 2, desc: 'Góc cận cảnh hoa sen...', icon: '🌸', src: 'images/frame_2.png', gradient: 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)' },
        { frame: 3, desc: 'Chuyển động camera...', icon: '🎥', src: 'images/frame_3.png', gradient: 'linear-gradient(135deg, #4A5568 0%, #718096 100%)' }
      ],
      features: [
        'Camera movement tự động',
        'Cinematic lighting',
        'Smooth motion',
        'Realistic physics'
      ]
    },
    notes: 'Video AI đang phát triển rất nhanh. Gemini có thể tạo video ngắn từ ảnh hoặc prompt.'
  },

  // ===== SLIDE 11: Canva =====
  {
    id: 'slide-canva',
    type: 'center',
    section: 'canva',
    number: '11',
    title: 'Kết Hợp <span class="text-gradient-accent">Canva</span>',
    subtitle: 'Đưa hình ảnh AI vào Canva để tạo poster, social media content, video ngắn cho các nền tảng.',
    content: {
      type: 'canva-flow',
      steps: [
        { icon: '🤖', label: 'Gemini', desc: 'Tạo ảnh/video' },
        { icon: '🎨', label: 'Canva', desc: 'Import & thiết kế' },
        { icon: '📱', label: 'Poster', desc: 'Thiết kế poster' },
        { icon: '📘', label: 'Facebook', desc: 'Đăng Facebook' },
        { icon: '🎵', label: 'TikTok', desc: 'Video TikTok' },
        { icon: '📷', label: 'Instagram', desc: 'Story & Post' }
      ]
    },
    notes: 'Kết hợp Gemini + Canva là combo mạnh nhất cho người không biết thiết kế.'
  },

  // ===== SLIDE 12: Quy trình 5 chạm =====
  {
    id: 'slide-5-touches',
    type: 'center',
    section: 'canva',
    number: '12',
    title: 'Quy Trình <span class="text-gradient">5 Chạm</span>',
    subtitle: 'Tổng kết toàn bộ quy trình trong một bản đồ tư duy tương tác.',
    content: {
      type: 'mindmap',
      center: 'Sản Phẩm\nHoàn Chỉnh',
      branches: {
        left: [
          { icon: '💡', label: 'Chạm 1: Ý tưởng', desc: 'Viết ý tưởng bằng ngôn ngữ tự nhiên' },
          { icon: '✍️', label: 'Chạm 2: Prompt', desc: 'AI viết Prompt chuyên nghiệp' },
          { icon: '🚀', label: 'Chạm 3: Tối ưu', desc: 'AI đánh giá & cải thiện Prompt' }
        ],
        right: [
          { icon: '🎨', label: 'Chạm 4: Tạo ảnh', desc: 'AI tạo hình ảnh từ Prompt' },
          { icon: '🖌️', label: 'Chạm 5: Hoàn thiện', desc: 'Chỉnh sửa & xuất ra Canva' }
        ]
      }
    },
    notes: 'Tổng kết: 5 bước đơn giản từ ý tưởng đến sản phẩm. Ai cũng có thể làm được.'
  }
];

// Make it globally available
window.SLIDES_DATA = SLIDES_DATA;

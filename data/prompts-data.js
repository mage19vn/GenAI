/* ============================================
   PROMPTS DATA — AI Gemini Presentation
   Author: Mage__08
   ============================================ */

const PROMPTS_DATA = [
  // --- Ảnh chân dung ---
  {
    id: 'p1',
    title: 'Chân dung thời trang',
    category: 'Realistic',
    tags: ['Fashion', 'Portrait'],
    level: 'Nâng cao',
    prompt: 'A fashion editorial portrait of a young Asian woman wearing a flowing emerald green silk dress, standing in an abandoned greenhouse overgrown with tropical plants. Golden hour sunlight streaming through broken glass panels, creating dramatic light beams and lens flares. Shot on Hasselblad H6D-100c, 80mm lens, f/2.0, shallow depth of field. Cinematic color grading with warm amber highlights and deep forest green shadows. Ultra-realistic, 8K resolution, Vogue editorial style.'
  },
  {
    id: 'p2',
    title: 'Poster quảng cáo cà phê',
    category: 'Marketing',
    tags: ['Food', 'Product', 'Marketing'],
    level: 'Trung bình',
    prompt: 'A premium coffee advertisement photo featuring a handcrafted ceramic cup of Vietnamese egg coffee (cà phê trứng) with a thick creamy foam top, placed on a dark walnut wooden table. Steam rising elegantly from the cup. Background: cozy Hanoi café with warm vintage lighting, bokeh lights. Styling: cinnamon sticks, coffee beans scattered artfully. Shot from 45-degree angle, Canon EOS R5, 85mm macro, f/2.8. Warm color palette, moody lighting, commercial product photography.'
  },
  {
    id: 'p3',
    title: 'Ảnh sản phẩm son môi',
    category: 'Product',
    tags: ['Product', 'Marketing'],
    level: 'Nâng cao',
    prompt: 'Luxury lipstick product photography: a rose gold lipstick tube opened at 45 degrees, revealing a rich crimson red bullet. Floating on a reflective water surface with pink rose petals and gold leaf scattered around. Soft studio lighting with two rim lights creating elegant specular highlights. Subtle water splash frozen in time. Background: gradient from deep burgundy to soft blush pink. Shot on Phase One IQ4 150MP, 120mm macro, f/4.0. Beauty commercial style, ultra-sharp focus, 8K.'
  },
  {
    id: 'p4',
    title: 'Ảnh kiến trúc hiện đại',
    category: 'Architecture',
    tags: ['Architecture', 'Realistic'],
    level: 'Trung bình',
    prompt: 'Modern minimalist Vietnamese villa photographed at twilight. Two-story concrete and glass structure with a cantilevered upper floor, floor-to-ceiling windows revealing warm interior lighting. Infinity pool in the foreground reflecting the building and dramatic orange-purple sunset sky. Tropical landscaping with palm trees and bougainvillea. Shot from a low angle, wide lens 24mm, f/8. Architectural Digest style, HDR, clean lines, symmetrical composition, 8K resolution.'
  },
  {
    id: 'p5',
    title: 'Ảnh anime phong cảnh',
    category: 'Anime',
    tags: ['Anime', 'Landscape'],
    level: 'Cơ bản',
    prompt: 'Studio Ghibli inspired anime landscape: a young girl with long flowing black hair sitting on a grassy hillside overlooking a vast valley filled with floating islands. Cherry blossom petals drifting in the wind. Massive fluffy cumulus clouds catching golden sunset light. Vibrant color palette with warm oranges, soft pinks, and deep greens. Hand-painted watercolor style with visible brush strokes. Hayao Miyazaki aesthetic, dreamy atmosphere, 4K wallpaper quality.'
  },
  {
    id: 'p6',
    title: 'Render 3D sản phẩm',
    category: '3D',
    tags: ['3D', 'Product'],
    level: 'Nâng cao',
    prompt: '3D render of wireless earbuds floating in mid-air, matte white finish with rose gold accents. Dynamic explosion composition: the charging case is open with earbuds emerging outward. Colorful sound waves and music notes visualized as flowing neon ribbons (electric blue, hot pink, gold) swirling around the product. Dark gradient background (#0A0A0A to #1A1A2E). Studio lighting with dramatic shadows. Octane render, volumetric fog, ray tracing, 8K.'
  },
  {
    id: 'p7',
    title: 'Poster sự kiện giáo dục',
    category: 'Education',
    tags: ['Education', 'Poster'],
    level: 'Cơ bản',
    prompt: 'Modern educational workshop poster design. Central image: a diverse group of young Vietnamese students collaborating around a holographic AI interface display. Futuristic classroom with glass walls and floating digital screens. Color scheme: deep navy blue background with electric blue and white accents. Space for title text at top. Clean geometric design elements, hexagonal patterns. Tech-forward aesthetic, professional but approachable. 2:3 aspect ratio, print-ready quality.'
  },
  {
    id: 'p8',
    title: 'Social Media carousel',
    category: 'Social Media',
    tags: ['Social Media', 'Marketing'],
    level: 'Cơ bản',
    prompt: 'Instagram carousel slide design for a digital marketing agency. Clean minimalist layout with bold typography placeholder areas. Background: soft gradient from midnight purple (#2D1B69) to dark blue (#1A1A2E). Decorative elements: floating 3D geometric shapes (spheres, cubes, torus) with glossy iridescent material. Subtle grid pattern overlay. Glass morphism card in center for content. 1:1 aspect ratio, social media optimized, modern aesthetic.'
  },
  {
    id: 'p9',
    title: 'Ảnh món ăn Việt Nam',
    category: 'Food',
    tags: ['Food', 'Realistic'],
    level: 'Trung bình',
    prompt: 'Overhead flat-lay food photography of a traditional Vietnamese phở bò (beef pho) spread. Large ceramic bowl of steaming pho with rare beef slices, fresh herbs, and bean sprouts. Surrounding: plate of fresh herbs (Thai basil, cilantro, mint), lime wedges, chili, hoisin sauce. Dark slate stone surface with subtle texture. Natural window light from top-left, soft shadows. Chopsticks and ceramic spoon placed artfully. Food styling: garnish drops, herb placement. Shot on Sony A7R V, 50mm, f/4. Dark moody food photography style.'
  },
  {
    id: 'p10',
    title: 'Quảng cáo thời trang',
    category: 'Fashion',
    tags: ['Fashion', 'Marketing'],
    level: 'Nâng cao',
    prompt: 'High-fashion advertising campaign: an Asian male model wearing an oversized deconstructed trench coat in camel color, paired with tailored black trousers. Standing in a surreal desert landscape with geometric mirror installations reflecting the sky. Wind blowing the coat dramatically. Shot at magic hour with warm directional sunlight. Fashion photography by Tim Walker style: surreal, editorial, avant-garde. Shot on Medium Format, 110mm, f/2.8. Desaturated warm tones with selective color pop. 8K, ultra-sharp.'
  },
  {
    id: 'p11',
    title: 'Video sản phẩm nước hoa',
    category: 'Video',
    tags: ['Video', 'Product'],
    level: 'Nâng cao',
    prompt: 'Cinematic product video: a luxury perfume bottle slowly rotating on a reflective black surface. Camera starts wide, slowly dollying in to a close-up. Golden liquid inside the bottle catches light and creates prismatic reflections. Smoke tendrils rise and swirl around the bottle in slow motion. Background transitions from pure black to a soft gradient of deep purple and gold. Dramatic rim lighting with two spotlights. Slow motion 120fps, 4K resolution. Commercial advertisement style.'
  },
  {
    id: 'p12',
    title: 'Video giới thiệu thương hiệu',
    category: 'Video',
    tags: ['Video', 'Marketing'],
    level: 'Trung bình',
    prompt: 'Brand introduction video: opening shot of a sunrise over Hội An ancient town, camera slowly panning right across the iconic yellow buildings and lanterns. Transition to: hands of an artisan carefully crafting traditional lacquerware. Next: young Vietnamese designers working in a modern co-working space with MacBooks. Final: product showcase with items arranged on a minimalist white surface. Smooth dolly and gimbal movements throughout. Natural lighting, warm color grade. 30-second duration, 4K cinematic.'
  },
  {
    id: 'p13',
    title: 'Poster concert âm nhạc',
    category: 'Poster',
    tags: ['Poster', 'Marketing'],
    level: 'Trung bình',
    prompt: 'Epic music concert poster: a silhouette of a guitarist performing on stage, shot from behind looking out at a massive crowd of 50,000 people holding phone flashlights creating a sea of lights. Dramatic stage lighting with laser beams in red, blue, and purple cutting through smoke/haze. Confetti and sparks falling. Space for artist name at top and event details at bottom. Dark background with vibrant lighting contrast. 2:3 vertical format, print quality, billboard-worthy composition.'
  },
  {
    id: 'p14',
    title: 'Ảnh quảng cáo bất động sản',
    category: 'Marketing',
    tags: ['Architecture', 'Marketing', 'Realistic'],
    level: 'Trung bình',
    prompt: 'Real estate advertisement photo: interior shot of a luxury penthouse apartment with panoramic city skyline view through floor-to-ceiling windows at sunset. Modern furniture in neutral tones (beige, cream, charcoal). Open-plan living area flowing into a gourmet kitchen with marble island. Warm ambient lighting from designer pendant lamps. A couple standing by the window enjoying the view (seen from behind). Interior design magazine style, wide-angle 16mm lens, f/5.6. Warm and inviting, aspirational lifestyle. 8K.'
  },
  {
    id: 'p15',
    title: 'Anime character design',
    category: 'Anime',
    tags: ['Anime', 'Character'],
    level: 'Nâng cao',
    prompt: 'Anime character design sheet: a Vietnamese female warrior mage character. Multiple views: front, side, back, and 3/4 angle. She has long silver-white hair with purple tips, glowing violet eyes. Wearing a modernized áo tứ thân battle outfit in dark purple and silver, with floating magical runes around her hands. Detailed accessories: jade earrings, armored gauntlets. Clean white background with height reference. Anime art style inspired by Fate/Grand Order. Detailed line art with flat cel-shading colors. 4K.'
  },
  {
    id: 'p16',
    title: '3D scene phòng game',
    category: '3D',
    tags: ['3D', 'Interior'],
    level: 'Nâng cao',
    prompt: '3D render of a cozy gaming room at night. Ultrawide curved monitor glowing with a cyberpunk game scene, RGB keyboard and mouse on a carbon fiber desk. Gaming chair in black and electric blue. Room lit by LED strip lights in purple and blue along ceiling edges and behind the monitor. Shelves with collectible figurines and manga volumes. Neon sign on wall reading "GG". Rain visible through a window. Isometric 3D view, stylized low-poly aesthetic meets photorealism. Unreal Engine 5, ray tracing, 8K.'
  }
];

window.PROMPTS_DATA = PROMPTS_DATA;

import os
from PIL import Image

src_dir = 'extracted_reports/images'
dest_dir = r'Swayam-VCE/frontend/src/assets/events'
os.makedirs(dest_dir, exist_ok=True)

images_to_convert = {
    # esummit-2025
    '2024-2025_11_img_11.png': 'esummit-2025-opening.webp',
    '2024-2025_11_img_16.png': 'esummit-2025-ipl-auction.webp',
    '2024-2025_11_img_18.png': 'esummit-2025-debate.webp',
    '2024-2025_11_img_24.png': 'esummit-2025-hackathon.webp',
    '2024-2025_11_img_26.png': 'esummit-2025-masterclass.webp',
    '2024-2025_11_img_28.png': 'esummit-2025-closing.webp',

    # future-4-conclave
    '2024-2025_01_img_7.png': 'future-4-conclave-workshop.webp',
    '2024-2025_01_img_8.png': 'future-4-conclave-fashion.webp',
    '2024-2025_01_img_13.png': 'future-4-conclave-sharktank.webp',
    '2024-2025_01_img_16.png': 'future-4-conclave-celebrity.webp',
    '2024-2025_01_img_17.png': 'future-4-conclave-tworks.webp',

    # thalir-innovation-fest
    '2024-2025_02_img_7.png': 'thalir-fest-lamp.webp',
    '2024-2025_02_img_8.png': 'thalir-fest-models.webp',
    '2024-2025_02_img_11.png': 'thalir-fest-jury.webp',
    '2024-2025_02_img_12.png': 'thalir-fest-assembly.webp',

    # trailblazer-talk
    '2024-2025_03_img_5.png': 'trailblazer-talk-speaker.webp',
    '2024-2025_03_img_6.png': 'trailblazer-talk-quiz.webp',
    '2024-2025_03_img_9.png': 'trailblazer-talk-qa.webp',
    '2024-2025_03_img_10.png': 'trailblazer-talk-audience.webp',

    # civeng-hackathon
    '2024-2025_06_img_4.png': 'civeng-hackathon-team8.webp',
    '2024-2025_06_img_5.png': 'civeng-hackathon-turbine.webp',
    '2024-2025_06_img_6.png': 'civeng-hackathon-presentation.webp',
    '2024-2025_06_img_8.png': 'civeng-hackathon-evaluation.webp',
    '2024-2025_06_img_10.png': 'civeng-hackathon-display.webp',
    '2024-2025_06_img_12.png': 'civeng-hackathon-winners.webp',

    # patangotsav
    '2024-2025_07_img_13.png': 'patangotsav-kiteflying.webp',
    '2024-2025_07_img_14.png': 'patangotsav-rangoli.webp',
    '2024-2025_07_img_15.png': 'patangotsav-tugofwar.webp',
    '2024-2025_07_img_16.png': 'patangotsav-kitemaking.webp',

    # venture-visit-tworks
    '2024-2025_08_img_3.png': 'venture-visit-prototyping.webp',
    '2024-2025_08_img_4.png': 'venture-visit-fabrication.webp',
    '2024-2025_08_img_5.png': 'venture-visit-3dprinting.webp',
    '2024-2025_08_img_6.png': 'venture-visit-pcb.webp',
    '2024-2025_08_img_12.png': 'venture-visit-thub-interaction.webp',

    # tie-idea-coach
    '2018-2020_tie_idea_coach_2019_img_2.jpeg': 'tie-idea-coach-presentation.webp',
    '2018-2020_tie_idea_coach_2019_img_3.jpeg': 'tie-idea-coach-session.webp',
    '2018-2020_tie_idea_coach_2019_img_4.jpeg': 'tie-idea-coach-feedback.webp',

    # design-thinking-workshop-2019
    '2018-2020_design_thinking_2019_img_1.png': 'design-thinking-2019-session.webp',
    '2018-2020_design_thinking_2019_img_2.png': 'design-thinking-2019-teamwork.webp',
}

for src_name, target_name in images_to_convert.items():
    sp = os.path.join(src_dir, src_name)
    dp = os.path.join(dest_dir, target_name)
    try:
        im = Image.open(sp).convert('RGB')
        im.save(dp, 'WEBP', quality=85)
        print(f"Saved {target_name} ({im.size[0]}x{im.size[1]}) - {os.path.getsize(dp)/1024:.1f} KB")
    except Exception as e:
        print(f"Error {src_name}: {e}")

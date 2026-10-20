/**
 * The two Veo videos: a silent demo loop for the product gallery and a 9:16
 * social ad in the Pop look. Plain data, no imports, so Node can load it.
 *
 *   npm run videos            # Veo clips  → assets/video/<id>.mp4 (git-ignored)
 *   npm run videos:build      # web files  → public/video/*.mp4 + posters
 */

/** Visual exclusions only. */
export const VEO_NEGATIVE =
  "text, captions, subtitles, logos, watermark, distorted hands, extra fingers, extra hands, extra devices, second mask, mask detaching from the device, morphing product";

const VEO_RULES =
  "The red device must keep exactly the same shape, colour, white arrow label and clear mask as in the first frame throughout. No dialogue, no voiceover, no music; quiet natural room tone only. No on-screen text.";

export type VideoClip = {
  id: string;
  /** A slot in app/data/image-slots.ts, used as the first frame. */
  firstFrame: string;
  prompt: string;
};

export const videoClips: VideoClip[] = [
  {
    id: "demo",
    firstFrame: "vidDemo",
    // First take (press-then-pull) had the device separate from a second mask; keep the motion minimal.
    prompt: `Calm first-aid training demonstration, close-up. One hand holds the red device steady, with its clear mask gently sealed over the relaxed woman's mouth and nose. The mask is attached to the end of the device and stays attached and sealed the entire time; the device does not leave her face. The hand makes one slow, small press toward her face, then holds still. She stays calm with eyes open. The camera slowly pushes in. ${VEO_RULES}`,
  },
  {
    id: "ad",
    firstFrame: "vidAd",
    prompt: `Bright, cheerful morning kitchen. The adult's hand sets the red device down on the white counter beside the high chair, lets go and moves out of frame, while the camera slowly pushes in toward the device until it is centred and in sharp focus. Soft morning light, gentle kitchen sounds. ${VEO_RULES}`,
  },
];

/** The social ad's captions (seconds into the 8 s clip), shown as HTML overlays. */
export const adCaptions = [
  { id: "cap1", from: 0.3, to: 2.8, text: "Choking happens fast." },
  { id: "cap2", from: 2.8, to: 5.3, text: "Help is 8–12 minutes away." },
  { id: "cap3", from: 5.3, to: 8, text: "Be faster.", sub: "Place. Press. Pull." },
];

/** Seconds the end card stays on screen after the clip. */
export const AD_END_SECONDS = 2.5;

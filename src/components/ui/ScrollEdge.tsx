/**
 * Frosted, fading backdrop behind the floating mobile controls (iOS-style
 * scroll-edge effect). Keeps content that scrolls underneath from clashing
 * with the glass buttons. Place as the first child of a fixed header.
 *
 * `dark` tints it near-black so it doesn't read as a grey smear when the page
 * under the controls is a dark section.
 */
export default function ScrollEdge({ visible, dark = false }: { visible: boolean; dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+1.75rem)] backdrop-blur-md transition-[opacity,background-color] duration-300 [-webkit-mask-image:linear-gradient(to_bottom,#000_55%,transparent)] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] ${
        dark ? "bg-near-black/70" : "bg-parchment/70"
      } ${visible ? "opacity-100" : "opacity-0"}`}
    />
  );
}

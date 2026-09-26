const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Toolset", href: "#toolset" },
  { label: "Contact", href: "#contact" },
  { label: "X", href: "https://x.com/Grav1tEdit" },
  { label: "YouTube", href: "https://www.youtube.com/@GRAV1Tz" },
  {
    label: "Email",
    href: "mailto:itzanimefam@gmail.com?subject=Video%20Editing%20Inquiry%20-%20GRAVIT",
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-bone/10 px-6 py-12 md:px-10 md:py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-display text-2xl text-bone">GRAVIT</span>
          <p className="micro-label mt-2 text-bone/40">
            Mastered in After Effects
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-7 gap-y-3">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor="hover"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="micro-label text-bone/50 transition-colors duration-300 hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="micro-label text-bone/30">© 2026 GRAVIT</p>
      </div>
    </footer>
  );
}

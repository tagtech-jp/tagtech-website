export default function Footer() {
  return (
    <footer className="border-t border-slate-edge bg-void mt-auto">
      <div className="max-w-[var(--page-max-width)] mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-body leading-body tracking-body text-smoke">
        <p>© 2026 TagTech</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a href="mailto:info@tagtech.jp" className="hover:text-snow transition-colors">
            info@tagtech.jp
          </a>
        </div>
      </div>
    </footer>
  )
}

import Link from "next/link";
import { TitusHeaderBackLink } from "@/components/titus-header-back-link";

export function TitusSiteHeader() {
  return (
    <header className="titus-site-header" aria-label="Titus site header">
      <div className="titus-site-header__brand-group">
        <TitusHeaderBackLink />
        <Link className="titus-site-header__brand" href="/">
          Titus
        </Link>
      </div>

      <div className="titus-site-header__slot" aria-hidden="true" />
    </header>
  );
}

export function TitusSiteFooter() {
  return (
    <footer className="titus-site-footer">
      <p>© 2026 Elm Farm. Titus is part of the Lex Canon Pattern Engine Project.</p>
    </footer>
  );
}

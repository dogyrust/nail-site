import { Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-muted/50 py-12">
    <div className="container">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            gracie's<span className="text-primary">nails</span>
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            Handcrafted press-on nails made with love. Look stunning, feel confident.
          </p>
        </div>
        {[
          { title: "Shop", links: ["Press-Ons", "Gel Nails", "Nail Art", "New Arrivals"] },
          { title: "Help", links: ["FAQ", "Shipping", "Returns", "Contact"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-body text-sm font-bold uppercase tracking-widest text-foreground">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
        <p className="font-body text-xs text-muted-foreground">© 2026 Gracie's Nails. All rights reserved.</p>
        <div className="flex gap-4 text-muted-foreground">
          <a href="#" aria-label="Instagram" className="transition-colors hover:text-primary"><Instagram size={18} /></a>
          <a href="#" aria-label="Twitter" className="transition-colors hover:text-primary"><Twitter size={18} /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

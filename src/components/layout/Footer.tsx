import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'Lançamentos', href: '/produtos' },
    { name: 'Masculino', href: '/produtos?genero=masculino' },
    { name: 'Feminino', href: '/produtos?genero=feminino' },
    { name: 'Promoções', href: '/promocoes' },
  ],
  sports: [
    { name: 'Corrida', href: '/esportes/corrida' },
    { name: 'Futebol', href: '/esportes/futebol' },
    { name: 'Treino', href: '/esportes/treino' },
    { name: 'Basquete', href: '/esportes/basquete' },
  ],
  support: [
    { name: 'Ajuda', href: '/ajuda' },
    { name: 'Entrega', href: '/entrega' },
    { name: 'Trocas', href: '/trocas' },
    { name: 'Contato', href: '/contato' },
  ],
  company: [
    { name: 'Sobre', href: '/sobre' },
    { name: 'Carreiras', href: '/carreiras' },
    { name: 'Sustentabilidade', href: '/sustentabilidade' },
    { name: 'Investidores', href: '/investidores' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
];

export function Footer() {
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-3xl tracking-wider text-dark-foreground">
                VELOCITY
              </span>
              <span className="font-display text-3xl text-accent">.</span>
            </Link>
            <p className="text-dark-foreground/60 text-sm mb-6">
              Impulsione sua performance com tecnologia de ponta.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-foreground/60 hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">LOJA</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">ESPORTES</h4>
            <ul className="space-y-3">
              {footerLinks.sports.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">SUPORTE</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">EMPRESA</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-foreground/40 text-sm">
            © 2024 Velocity. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacidade"
              className="text-dark-foreground/40 hover:text-accent text-sm transition-colors"
            >
              Privacidade
            </Link>
            <Link
              to="/termos"
              className="text-dark-foreground/40 hover:text-accent text-sm transition-colors"
            >
              Termos
            </Link>
            <Link
              to="/cookies"
              className="text-dark-foreground/40 hover:text-accent text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

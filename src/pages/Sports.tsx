import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { sports, getProductsBySport } from '@/data/products';

const Sports = () => {
  const { sportId } = useParams<{ sportId?: string }>();
  
  // If specific sport is selected
  if (sportId) {
    const sport = sports.find((s) => s.id === sportId);
    const sportProducts = getProductsBySport(sportId);

    if (!sport) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Esporte não encontrado</h1>
            <Button asChild>
              <Link to="/esportes">Ver Todos os Esportes</Link>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen">
        <Navbar />
        <CartDrawer />

        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={sport.image}
              alt={sport.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center"
          >
            <h1 className="font-display text-6xl md:text-8xl text-background mb-4">
              {sport.name.toUpperCase()}
            </h1>
            <p className="text-background/70 text-xl">{sport.description}</p>
          </motion.div>
        </section>

        {/* Products */}
        <main className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="font-display text-4xl text-foreground mb-2">
                PRODUTOS PARA {sport.name.toUpperCase()}
              </h2>
              <p className="text-muted-foreground">
                {sportProducts.length} produtos encontrados
              </p>
            </motion.div>

            {sportProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sportProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  Nenhum produto encontrado para este esporte
                </p>
                <Button asChild>
                  <Link to="/produtos">Ver Todos os Produtos</Link>
                </Button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // All sports overview
  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">
              ESPORTES
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Encontre os produtos perfeitos para sua modalidade favorita
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map((sport, index) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/esportes/${sport.id}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
                >
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-4xl text-background mb-2">
                      {sport.name.toUpperCase()}
                    </h3>
                    <p className="text-background/70 mb-4">{sport.description}</p>
                    <div className="flex items-center gap-2 text-accent font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Ver Produtos
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sports;

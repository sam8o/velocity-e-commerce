import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { products, sports } from '@/data/products';

const priceRanges = [
  { label: 'Até R$ 150', min: 0, max: 150 },
  { label: 'R$ 150 - R$ 200', min: 150, max: 200 },
  { label: 'R$ 200 - R$ 250', min: 200, max: 250 },
  { label: 'Acima de R$ 250', min: 250, max: Infinity },
];

const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSport = !selectedSport || product.sport.toLowerCase() === selectedSport.toLowerCase();
      const matchesPrice = selectedPriceRange === null || 
        (product.price >= priceRanges[selectedPriceRange].min && 
         product.price <= priceRanges[selectedPriceRange].max);
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sport.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSport && matchesPrice && matchesSearch;
    });
  }, [selectedSport, selectedPriceRange, searchQuery]);

  const clearFilters = () => {
    setSelectedSport(null);
    setSelectedPriceRange(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedSport || selectedPriceRange !== null || searchQuery;

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">
              TODOS OS PRODUTOS
            </h1>
            <p className="text-muted-foreground text-lg">
              {filteredProducts.length} produtos encontrados
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" size="lg" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Limpar
              </Button>
            )}
          </motion.div>

          {/* Filters Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-secondary/30 rounded-lg">
                  {/* Sport Filter */}
                  <div>
                    <h3 className="font-semibold mb-4">Esporte</h3>
                    <div className="flex flex-wrap gap-2">
                      {sports.map((sport) => (
                        <Button
                          key={sport.id}
                          variant={selectedSport === sport.id ? 'accent' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedSport(
                            selectedSport === sport.id ? null : sport.id
                          )}
                        >
                          {sport.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h3 className="font-semibold mb-4">Preço</h3>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((range, index) => (
                        <Button
                          key={range.label}
                          variant={selectedPriceRange === index ? 'accent' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedPriceRange(
                            selectedPriceRange === index ? null : index
                          )}
                        >
                          {range.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground mb-4">
                Nenhum produto encontrado
              </p>
              <Button onClick={clearFilters}>Limpar Filtros</Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;

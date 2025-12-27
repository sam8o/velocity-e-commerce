import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductGrid } from '@/components/home/ProductGrid';
import { SportsSection } from '@/components/home/SportsSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { getFeaturedProducts, getBestSellers } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      
      <main>
        <HeroSection />
        
        <ProductGrid
          title="LANÇAMENTOS"
          subtitle="Os modelos mais recentes com tecnologia de última geração"
          products={featuredProducts}
        />
        
        <SportsSection />
        
        <PromoBanner />
        
        <ProductGrid
          title="MAIS VENDIDOS"
          subtitle="Os favoritos dos nossos atletas"
          products={bestSellers}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

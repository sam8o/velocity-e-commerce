import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/store/cartStore';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group"
    >
      <Link to={`/produto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Button variant="default" className="w-full gap-2">
              <ShoppingBag className="h-4 w-4" />
              Ver Produto
            </Button>
          </motion.div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs font-medium text-accent uppercase tracking-wide">
              {product.sport}
            </span>
          </div>
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">({product.reviews})</span>
          </div>
          <p className="text-lg font-bold text-foreground">
            R$ {product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

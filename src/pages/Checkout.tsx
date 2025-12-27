import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CreditCard, QrCode, Check, Truck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/hooks/use-toast';

type PaymentMethod = 'pix' | 'card';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const total = getTotalPrice();
  const shipping = total > 300 ? 0 : 29.90;
  const finalTotal = total + shipping;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.address) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <h1 className="font-display text-4xl mb-4">Seu carrinho está vazio</h1>
              <Button asChild>
                <Link to="/produtos">Continuar Comprando</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <CartDrawer />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Check className="h-12 w-12 text-accent-foreground" />
              </motion.div>
              <h1 className="font-display text-5xl text-foreground mb-4">
                PEDIDO CONFIRMADO!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Obrigado pela sua compra! Você receberá um e-mail com os detalhes do pedido.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/produtos">Continuar Comprando</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/">Voltar ao Início</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Continuar Comprando
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-foreground mb-12"
          >
            CHECKOUT
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact Info */}
              <div className="bg-card rounded-lg p-6 shadow-card">
                <h2 className="font-display text-2xl mb-6">INFORMAÇÕES DE CONTATO</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome completo *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent md:col-span-2"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-card rounded-lg p-6 shadow-card">
                <h2 className="font-display text-2xl mb-6">ENDEREÇO DE ENTREGA</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Endereço completo *"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Cidade"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="Estado"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="CEP"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent md:col-span-2"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-lg p-6 shadow-card">
                <h2 className="font-display text-2xl mb-6">MÉTODO DE PAGAMENTO</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'card'
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="font-semibold">Cartão</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'pix'
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <QrCode className="h-6 w-6" />
                    <span className="font-semibold">PIX</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Número do cartão"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent md:col-span-2"
                    />
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Nome no cartão"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent md:col-span-2"
                    />
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="Validade (MM/AA)"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      name="cardCvv"
                      placeholder="CVV"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className="h-12 px-4 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="text-center py-8">
                    <div className="w-48 h-48 bg-secondary/50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      O QR Code será gerado após confirmar o pedido
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="accent"
                size="xl"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-accent-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  `Finalizar Pedido - R$ ${finalTotal.toFixed(2)}`
                )}
              </Button>
            </motion.form>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-card rounded-lg p-6 shadow-card sticky top-28">
                <h2 className="font-display text-2xl mb-6">RESUMO DO PEDIDO</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.product.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          Tamanho: {item.size} | Qtd: {item.quantity}
                        </p>
                        <p className="font-bold text-sm mt-1">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Frete
                    </span>
                    <span className={shipping === 0 ? 'text-accent font-semibold' : ''}>
                      {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Frete grátis em compras acima de R$ 300
                    </p>
                  )}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>R$ {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

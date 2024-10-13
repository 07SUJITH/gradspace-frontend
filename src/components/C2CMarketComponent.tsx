import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';

type Product = {
  id: number;
  name: string;
  description: string;
  status: 'Available' | 'Sold';
  price: number;
  contactDetails: string;
  contactType: 'Email' | 'Phone';
  image: string;
};

const dummyProducts: Product[] = [
  {
    id: 1,
    name: 'Introduction to Algorithms (CLRS)',
    description:
      'Popular textbook used in advanced algorithms courses. Great condition, no annotations.',
    status: 'Available',
    price: 30,
    contactDetails: 'alice.cs@email.com',
    contactType: 'Email',
    image: 'https://m.media-amazon.com/images/I/61Pgdn8Ys-L._SL1500_.jpg',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard (RGB)',
    description:
      'Tactile switches, customizable RGB lights. Ideal for programming sessions.',
    status: 'Available',
    price: 70,
    contactDetails: '555-987-1234',
    contactType: 'Phone',
    image: 'https://m.media-amazon.com/images/I/610P9MPegbL._SL1500_.jpg',
  },
  {
    id: 3,
    name: 'Python for Data Science Course Notes',
    description:
      'Personal notes from an online course on Python and Machine Learning.',
    status: 'Sold',
    price: 15,
    contactDetails: 'bob.data@email.com',
    contactType: 'Email',
    image:
      'https://imgs.search.brave.com/aRRYh04-roRbDrBX2X86_91YxPv2lBVmPWb71kcckIc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM25q/amNiaGJvamJvdC5j/bG91ZGZyb250Lm5l/dC9hcGkvdXRpbGl0/aWVzL3YxL2ltYWdl/cHJveHkvaHR0cHM6/Ly9jb3Vyc2VyYS1j/b3Vyc2UtcGhvdG9z/LnMzLmFtYXpvbmF3/cy5jb20vYTEvZjZh/MjNmYTBmNTQ1YWM4/NjU2ZmIxMjk3NDhm/YjJlL0ZpbmFsLUNs/b3VkLUFwcC1EZXZl/bG9wbWVudC5qcGc_/YXV0bz1mb3JtYXQs/Y29tcHJlc3MsJTIw/ZW5oYW5jZSZkcHI9/MSZ3PTI2NSZoPTIw/NCZmaXQ9Y3JvcCZx/PTUw',
  },
  {
    id: 4,
    name: 'Raspberry Pi 4 Model B',
    description:
      '4GB RAM, includes case and power adapter. Great for IoT projects.',
    status: 'Available',
    price: 55,
    contactDetails: '555-321-5678',
    contactType: 'Phone',
    image:
      'https://imgs.search.brave.com/wdcJOuEvfa8nnOpnv1Ebs1Tjn3Pkn163tmXGUtyGi6U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTF0WVFSNU1UYkwu/anBn',
  },
];

export default function C2CMarketComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">C2C Market</h1>

      <div className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2  gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className="h-full flex flex-col cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <CardHeader className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="mb-2">{product.name}</CardTitle>
                <p className="text-sm text-gray-600 mb-2">
                  {product.description.substring(0, 100)}...
                </p>
                <Badge
                  variant={
                    product.status === 'Available' ? 'default' : 'secondary'
                  }
                >
                  {product.status}
                </Badge>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <p className="font-bold text-lg">${product.price}</p>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProduct && (
          <Dialog
            open={!!selectedProduct}
            onOpenChange={() => setSelectedProduct(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <DialogDescription>
                <p className="mb-2">{selectedProduct.description}</p>
                <p className="font-bold mb-2">
                  Price: ${selectedProduct.price}
                </p>
                <p className="mb-2">Status: {selectedProduct.status}</p>
                <p className="mb-2">
                  Contact: {selectedProduct.contactDetails} (
                  {selectedProduct.contactType})
                </p>
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setSelectedProduct(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

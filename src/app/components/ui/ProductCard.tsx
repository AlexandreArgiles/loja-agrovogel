import type { Item } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
// TODO: Adicionar um botão "Adicionar ao Carrinho"

type ProductCardProps = {
  item: Item;
};

export function ProductCard({ item }: ProductCardProps) {
  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Link href={`/produtos/${item.slug}`} className="group block">
      <div className="border rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={item.images[0] || '/placeholder.png'}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
          <p className="text-xl font-bold text-blue-600 mt-2">{formatPrice(item.price)}</p>
          {item.stock !== null && item.stock <= 10 && item.stock > 0 && (
             <p className="text-sm text-yellow-600 mt-1">Últimas {item.stock} unidades!</p>
          )}
           {item.stock === 0 && (
             <p className="text-sm text-red-600 mt-1">Produto esgotado</p>
          )}
        </div>
      </div>
    </Link>
  );
}
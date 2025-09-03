import { ProductCard } from '@/components/ui/ProductCard'; // Usaremos um card genérico
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function HomePage() {
  // Busca as categorias que queremos exibir na home
  const categoriesToShow = [
    'conectividade-rural',
    'seguranca-eletronica',
    'automacao-residencial',
  ];
  
  const categoriesWithItems = await prisma.category.findMany({
    where: {
      slug: {
        in: categoriesToShow,
      },
    },
    include: {
      items: {
        take: 4, // Pega os 4 itens mais recentes de cada categoria
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* TODO: Adicionar um Hero Banner aqui */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">AgroVogel</h1>
        <p className="text-lg text-gray-600 mt-2">
          Conectando o campo e automatizando a sua vida.
        </p>
      </div>

      <div className="space-y-12">
        {categoriesWithItems.map((category) => (
          <section key={category.id}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
              <Link href={`/categoria/${category.slug}`} className="text-blue-600 hover:underline">
                Ver todos
              </Link>
            </div>
            {category.items.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.items.map((item) => (
                  // Reutilizamos o ProductCard para todos os itens
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p>Nenhum item encontrado nesta categoria no momento.</p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
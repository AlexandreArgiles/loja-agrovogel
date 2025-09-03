import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// TODO: Receber os itens do carrinho no corpo da requisição (body)
// Este é um exemplo com um item fixo.
export async function POST(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto', 'pix'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Kit de Instalação Completo',
            },
            unit_amount: 25000, // R$ 250,00 em centavos
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/carrinho`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Não foi possível iniciar o pagamento.' },
      { status: 500 }
    );
  }
}
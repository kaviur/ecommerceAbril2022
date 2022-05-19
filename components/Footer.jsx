import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return  (
    <footer className="w-full px-5 pt-10 border-t-2 border-slate-300 dark:border-neutral-300 bg-neutral-100 dark:bg-neutral-800 text-stone-900 dark:text-stone-50">
      <section className="flex flex-row pb-10 justify-evenly align-start">
        <div className="flex flex-col p-2">
          <p className="inline text-base">TIENDA ONLINE</p>
          <nav>
            <ul className="flex flex-col text-sm">
              <li className="inline p-1">
                <Link href="/comprar">
                  <a>Comprar</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/vender">
                  <a>Vender</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/regalar">
                  <a>Regalar</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/guia-de-tallas">
                  <a>Guía de tallas</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/contacto">
                  <a>Contacto</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/cambios-devoluciones">
                  <a>Cambios y devoluciones</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/envios-entregas">
                  <a>Envíos y entregas</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/medios-de-pago">
                  <a>Medios de pago</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col p-2">
          <p className="text-base">SOBRE **NOMBRE-EMPRESA**</p>
          <nav>
            <ul className="flex flex-col text-sm">
              <li className="inline p-1">
                <Link href="/sobre-nosotros">
                  <a>Sobre nosotros</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/trabaja-con-nosotros">
                  <a>Trabajá con nosotros</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/buscador-de-tiendas">
                  <a>Buscador de tiendas</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/terminos-condiciones">
                  <a>Términos y condiciones</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/politica-de-privacidad">
                  <a>Política de privacidad </a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/defensa-del-consumidor">
                  <a>Defensa del Consumidor</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col p-2">
          <p className="text-base">REDES SOCIALES</p>
          <nav>
            <ul className="flex flex-col text-sm">
              <li className="inline p-1">
                <Link href="/facebook">
                  <a>Facebook</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/instagram">
                  <a>Instagram</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/twitter">
                  <a>Twitter</a>
                </Link>
              </li>
              <li className="inline p-1">
                <Link href="/youtube">
                  <a>YouTube</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="w-full p-2 border-t-2 border-slate-300 dark:border-neutral-300">
        <h2 className='text-center'>
          Copyright © YYYY-2022 e-commerce.com Dirección. Todos los derechos
          reservados.
        </h2>
      </section>
    </footer>
  );
}

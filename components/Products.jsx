import React from "react";
import Product from "./Product";
import { useSession } from "next-auth/react";

export default function Products({ products }) {
  const { data: session } = useSession();

  return (
    <section>
     <div className="grid sm:grid-cols-4 gap-5">
          {products.map((product) => (
            <Product product={product} key={product.name} />
          ))}
        </div>
    </section>
  );
}

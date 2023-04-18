import { useParams, Link } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}
// ".." znaci go UP one level (go back one path)
/* /products/ i /products/:productId su siblings u route definitions, pa bi se ".." po 
defaultu (relative="route") vratio na parent route tj. /root/. Sa relative="path" gleda URL a ne route definitions. */

export default ProductDetailPage;

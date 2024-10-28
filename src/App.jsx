import { useEffect, useState } from "react";

async function fetchProducts() {
  const response = await fetch("/products.json");
  return response.json();
}

export default function App() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [category, setCategory] = useState("All"); 
  const [searchTerm, setSearchTerm] = useState(""); 


  useEffect(() => {
    (async () => {
      const productData = await fetchProducts();
      setProducts(productData);
      setFilteredProducts(productData); 
    })();
  }, []);

  useEffect(() => {
    const results = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.type === category.toLowerCase();
      const matchesSearchTerm = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
    setFilteredProducts(results);
  }, [category, searchTerm, products]);

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. beans"
              />
            </div>
          </form>
        </aside>
        <main>
          {filteredProducts.map((product) => (
            <section key={product.name} className={product.type}>
              <h2>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
              <img src={`/images/${product.image}`} alt={product.name} />
            </section>
          ))}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}

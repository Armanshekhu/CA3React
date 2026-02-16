import React, { useState, useEffect } from 'react';

const useSearch = (initialData) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = initialData.filter(item =>
      item.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery, initialData]);

  return { searchQuery, setSearchQuery, filteredData };
};

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search product..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ padding: '5px', marginBottom: '15px', width: '200px' }}
    />
  );
};


const ProductList = ({ filteredProducts, totalProductsCount }) => {
  return (
    <div>
      <p style={{ fontSize: '14px', marginBottom: '15px' }}>
        Showing {filteredProducts.length} of {totalProductsCount} products
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ fontSize: '14px' }}>
            {product.name} - ₹{product.price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {

  const productsData = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 },
    { id: 3, name: 'Tablet', price: 15000 },
    { id: 4, name: 'Keyboard', price: 1000 },
    { id: 5, name: 'Mouse', price: 500 }
  ];


  const { searchQuery, setSearchQuery, filteredData } = useSearch(productsData);

  return (
    <div style={{ padding: '20px', fontFamily: 'serif' }}>
      <h2>Product Search</h2>
      
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <ProductList 
        filteredProducts={filteredData} 
        totalProductsCount={productsData.length} 
      />
    </div>
  );
}
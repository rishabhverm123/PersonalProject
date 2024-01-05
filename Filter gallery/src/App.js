
import './App.css';
import Menu from './components/Menu.js';
import Product from './components/Product.js';
import React, { useState } from 'react';


import data from './components/Data.json'
function App() {
  const allCategories =['All', ...new Set(data.map((item)=>item.category))]
  const UpdateCategory=(category)=>{
      setCategory(category)
      updateProductList(category)
  }

  const updateProductList=(category)=>{
      if(category==='All'){
        setProducts(data);
        return;
      }
      const products=data.filter((item)=>item.category===category);
      setProducts(products);
  }
  const[products, setProducts]=useState(data);
  const[category, setCategory]=useState('All');
  return (
  <React.Fragment>
    <div className="App">
      <Menu items={allCategories} category={category} event={UpdateCategory}/>
      <Product items={products} />
    </div>
  </React.Fragment>

    
  );



}

export default App;

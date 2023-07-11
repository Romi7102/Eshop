
import './App.css';
import data from './data'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href='/'>EShop</a>
      </header>
      <main>
        <h1>Products</h1>
        {
          data.products.map(product => (
            <div key={product.token}>
              <h2>{product.name}</h2>
              <img alt='' src={product.img} width={300}></img>
              <p>{product.description}</p>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default App;

import './App.css';

function App() {

  const onButtonClick = () => {
    alert('hi')
  }
  return (
    <div className="App">
    <h1>Horaires de train</h1>
    <button onClick={onButtonClick}>Click me</button>
    </div>
  );
}

export default App;

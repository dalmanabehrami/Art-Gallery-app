import GlobalRouter from './routes/index';

function App() {
  return (
    // Nuk na duhet një tjetër <Router> këtu, pasi është i përfshirë në GlobalRouter
    <GlobalRouter />
  );
}

export default App;

import './HomePage.css';

const Home = () => {
  return (
    <div className="home-container">
      <aside className="sidebar left">
        <h2>Kategorier</h2>
        <ul>
          <li>Teknik</li>
          <li>Livsstil</li>
          <li>Mat & Dryck</li>
          <li>Resor</li>
        </ul>
      </aside>

      <main className="content">
        <h1>Anne-Lii´s Blogg</h1>
        <p>Här kommer blogginläggen att synas...</p>
      </main>

      <aside className="sidebar right">
        <h2>Senaste inlägg</h2>
        <ul>
          <li>Inlägg 1</li>
          <li>Inlägg 2</li>
          <li>Inlägg 3</li>
        </ul>
      </aside>
    </div>
  )
}

export default Home;


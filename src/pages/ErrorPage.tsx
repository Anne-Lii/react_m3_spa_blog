import '../pages/ErrorPage.css';
import cat from '../assets/cat.jpg';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>Nu blev det knas!</h1>
      <p>Testa <a href="https://react-m3-spa-blog.onrender.com/">https://react-m3-spa-blog.onrender.com/</a></p>
      <img src={cat} alt="Cool katt med solglasögon" />      
    </div>
  );
};

export default ErrorPage;

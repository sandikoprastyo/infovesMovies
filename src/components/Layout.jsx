import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function Layout({ children, isDashboard = false }) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <main className='flex-grow'>{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
}

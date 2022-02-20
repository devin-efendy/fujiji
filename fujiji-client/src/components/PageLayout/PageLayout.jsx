import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

export default function PageLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

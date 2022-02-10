import PropTypes from 'prop-types';

export default function Navigation({ title }) {
  return (
    <div>
      {title}
    </div>
  );
}

Navigation.propTypes = {
  title: PropTypes.string,
};

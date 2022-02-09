import PropTypes from 'prop-types';

export default function AdListings({ data }) {
  return (
    <div>
      {data.map((e) => (
        <div key={e}>{e}</div>
      ))}
    </div>
  );
}

AdListings.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

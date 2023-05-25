import PropTypes from 'prop-types';
import { NewsItem } from './NewsItem/NewsItem';
import { List } from './NewsList.styled';

export const NewsList = ({ news }) => {
  return (
    <List>
      {news &&
        news.length > 0 &&
        news.map(({ _id, imgUrl, title, text, date, url }) => (
          <NewsItem
            key={_id}
            imgUrl={imgUrl}
            title={title}
            text={text}
            date={date}
            url={url}
          />
        ))}
    </List>
  );
};

NewsItem.propTypes = {
  _id: PropTypes.string,
  imgUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

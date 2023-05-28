import { useState, useEffect } from 'react';
import Cat from '../../images/walking-cat.gif';
import { Loader } from 'components/Loader/Loader';
import { SearchNewsForm } from 'components/News/SearchNewsForm/SearchNewsForm';
import { ReusableTitle } from 'components/ReusableTitle/ReusableTitle';
import { NewsList } from '../../components/News/NewsList/NewsList';
import { Pagination } from '../Pagination/Pagination';
import { NotFound } from '../News/NewsNotFound/NewsNotFound';
import { theme } from '../../theme/theme';
import { Container } from 'components/Container/Container';
import { useSearchParams } from 'react-router-dom';
import { fetchNews } from '../../api/news.js';
// import { sortNewsByDate } from 'helpers/sortNewsByDate';

export const NewsData = () => {
  const limit = 6;
  const [search, setSearch] = useState('');
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') ?? '';
  const pageNumber = searchParams.get('page') ?? '';
  const isTablet = window.matchMedia(theme.media.md).matches;
  // const sortedNews = sortNewsByDate(news);

  useEffect(() => {
    setIsLoading(true);
    const getNews = async ({ search, page, limit }) => {
      try {
        const newNews = await fetchNews({ search, page, limit });
        console.log('newNews', newNews);
        if (!newNews.totalPages) {
          return;
        }
        setNews(newNews.data);
        setTotalPages(newNews.totalPages);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!search) {
      getNews({ page, limit });
      return;
    }
    getNews({ search, page, limit });
  }, [search, page, limit]);

  const handleSearchSubmit = search => {
    const nextParams = search !== '' ? { search } : {};
    setSearchParams(nextParams);
    setSearch(search);
    setPage(1);
  };

  const handlePageChange = pageNumber => {
    if (query) {
      setSearchParams({ query, page });
    }
    setPage(pageNumber);
  };

  return (
    <Container>
      <ReusableTitle>News</ReusableTitle>

      {isLoading && <Loader loaderSrc={Cat} size={160} />}
      {isError && !news.length && <NotFound />}

      <SearchNewsForm onSubmit={handleSearchSubmit} />
      {news && news.length > 0 && <NewsList news={news} />}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          paginationLength={isTablet ? 5 : 4}
        />
      )}
    </Container>
  );
};

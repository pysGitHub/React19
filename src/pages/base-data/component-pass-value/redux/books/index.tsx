import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, fetchAllBooks, fetchBookDetail } from '../../../../../store/modules/books';
import type { AppDispatch, RootState } from '../../../../../store';
import BookDetail from '../book-detail';

const Books: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // 分别获取各个部分的状态，而不是整个 state.books 对象
  const booksListState = useSelector((state: RootState) => state.books.booksList);
  const allBooksState = useSelector((state: RootState) => state.books.allBooks);
  const bookDetailState = useSelector((state: RootState) => state.books.bookDetail);
  
  const [selectedBook, setSelectedBook] = useState('');

  // 获取所有书名
  const handleFetchBooks = () => {
    dispatch(fetchBooks());
  };

  // 获取所有书籍数据
  const handleFetchAllBooks = () => {
    dispatch(fetchAllBooks());
  };

  // 获取特定书籍详情
  const handleFetchBookDetail = () => {
    if (selectedBook) {
      dispatch(fetchBookDetail(selectedBook));
    }
  };

  useEffect(() => {
    // 可以在这里初始化加载数据
  }, [dispatch]);

  return (
    <>
      <div className="books-container" style={{ padding: '20px' }}>
        <h2>Books Management</h2>

        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleFetchBooks} style={{ marginRight: '10px' }}>获取书名列表</button>
          <button onClick={handleFetchAllBooks} style={{ marginRight: '10px' }}>获取所有书籍数据</button>

          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="输入书籍名称"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button onClick={handleFetchBookDetail}>获取书籍详情</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '10px', minWidth: '300px' }}>
            <h3>书名列表</h3>
            {booksListState.loading ? (
              <p>Loading books list...</p>
            ) : (
              <ul>
                {Array.isArray(booksListState.response.data) && booksListState.response.data.map((book: any, index: number) => (
                  <li key={index}>{typeof book === 'string' ? book : book.name || book.title || 'Unknown Title'}</li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ flex: 1, marginLeft: '10px', marginRight: '10px', minWidth: '300px' }}>
            <h3>所有书籍数据</h3>
            {allBooksState.loading ? (
              <p>Loading all books...</p>
            ) : (
              <div>
                {Array.isArray(allBooksState.response.data) && allBooksState.response.data.map((book: any, index: number) => (
                  <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h4>{book.name || book.title || 'Unknown Title'}</h4>
                    <p><strong>作者:</strong> {book.author || 'Unknown Author'}</p>
                    <p><strong>价格:</strong> {book.price || 'N/A'}</p>
                    <p><strong>出版日期:</strong> {book.product_date || 'N/A'}</p>
                    <p><strong>描述:</strong> {book.introduction || 'No introduction'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: 1, marginLeft: '10px', minWidth: '300px' }}>
            <h3>书籍详情</h3>
            {bookDetailState.loading ? (
              <p>Loading book detail...</p>
            ) : (
              <div>
                {bookDetailState.response.data && Object.keys(bookDetailState.response.data).length > 0 ? (
                  <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                    <h4>{(bookDetailState.response.data as any).name || (bookDetailState.response.data as any).title || 'Unknown Title'}</h4>
                    <p><strong>作者:</strong> {(bookDetailState.response.data as any).author || 'Unknown Author'}</p>
                    <p><strong>描述:</strong> {(bookDetailState.response.data as any).introduction || 'No description'}</p>
                    <p><strong>Price:</strong> {(bookDetailState.response.data as any).price || 'N/A'}</p>
                    <p><strong>出版日期:</strong> {(bookDetailState.response.data as any).product_date || 'N/A'}</p>
                  </div>
                ) : (
                  <p>暂无书籍详情，请先查询</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <br />
      <BookDetail />

    </>
  );
};

export default Books;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, fetchAllBooks } from '../../../../../store/modules/books';
import type { RootState, AppDispatch } from '../../../../../store';
 
const Books: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { response, loading } = useSelector((state: RootState) => state.books);

  // 获取所有书名
  const handleFetchBooks = () => {
    dispatch(fetchBooks());
  };

  // 获取所有书籍数据
  const handleFetchAllBooks = () => {
    dispatch(fetchAllBooks());
  };

  useEffect(() => {
    // 可以在这里初始化加载数据
  }, []);

  return (
    <div className="books-container" style={{ padding: '20px' }}>
      <h2>书籍列表</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleFetchBooks} disabled={loading}>
          {loading ? '加载中...' : '获取所有书名'}
        </button>
        
        <button onClick={handleFetchAllBooks} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? '加载中...' : '获取所有书籍数据'}
        </button>
      </div>

      {loading && <p>正在加载...</p>}
      
      {!loading && response.data && response.data.length > 0 && (
        <div>
          <h3>书籍数据:</h3>
          <ul>
            {response.data.map((book: any, index: number) => (
              <li key={`${book.name}-${index}`}>
                {typeof book === 'object' ? `${book.name || book.title || 'Unknown'}` : book}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {!loading && (!response.data || response.data.length === 0) && (
        <p>暂无数据，请点击上方按钮获取数据</p>
      )}
    </div>
  );
}

export default Books;
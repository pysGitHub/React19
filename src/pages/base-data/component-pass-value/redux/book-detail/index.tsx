import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchBookDetail } from '../../../../../store/modules/books';
import type { AppDispatch, RootState } from '../../../../../store';

interface ApiResponse {
    code: number,
    message: string,
    data: any[],
    success: boolean
}

// 定义每个数据类型的状态接口
interface BookData {
    booksList: {
        response: ApiResponse;
        loading: boolean;
    };
    bookDetail: {
        response: ApiResponse;
        loading: boolean;
    };
    allBooks: {
        response: ApiResponse;
        loading: boolean;
    };
}

// 定义书籍项的类型
interface BookItem {
  id?: number;
  name?: string;
  title?: string;
  author?: string;
  introduction?: string;
  price?: number;
  product_date?: string;
}

const BookDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // 使用shallowEqual来避免不必要的重渲染
  const bookDetailState = useSelector((state: RootState) => state.books.bookDetail, shallowEqual);
  const [bookName, setBookName] = useState('');

  const handleFetchBookDetail = useCallback(() => {
    if (bookName.trim()) {
      dispatch(fetchBookDetail(bookName));
    }
  }, [dispatch, bookName]);

  // 书籍详情数据处理 - 可能是对象也可能是数组
  let bookData: BookItem | undefined;
  if (bookDetailState.response.data) {
    if (Array.isArray(bookDetailState.response.data)) {
      // 如果是数组，取第一个元素
      bookData = bookDetailState.response.data.length > 0 
        ? bookDetailState.response.data[0] as BookItem 
        : undefined;
    } else {
      // 如果是对象，直接使用
      bookData = bookDetailState.response.data as BookItem;
    }
  }

  // 渲染书籍详情
  const renderBookDetails = useCallback(() => {
    if (!bookData) {
      return <p>暂无书籍详情，请先查询</p>;
    }

    return (
      <div style={{ border: '1px solid #ccc', padding: '15px', backgroundColor: '#f9f9f9' }}>
        <h4>{bookData.name || bookData.title || '未知标题'}</h4>
        <p><strong>作者:</strong> {bookData.author || '未知作者'}</p>
        <p><strong>描述:</strong> {bookData.introduction || '暂无描述'}</p>
        <p><strong>Price:</strong> {bookData.price || 'N/A'}</p>
        <p><strong>出版日期:</strong> {bookData.product_date || 'N/A'}</p>
      </div>
    );
  }, [bookData]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>书籍详情</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="输入书籍名称"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button onClick={handleFetchBookDetail}>获取书籍详情</button>
      </div>

      <div>
        <h3>书籍详情内容</h3>
        {bookDetailState.loading ? (
          <p>正在加载书籍详情...</p>
        ) : (
          renderBookDetails()
        )}
      </div>
    </div>
  );
};

export default BookDetail;
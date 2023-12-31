import { useState } from "react";
import BookCard from "./components/BookCard";
import { toast } from "react-toastify";
import EditModal from "./components/EditModal";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeletId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  console.log(showEditModal, editItem);
  const handleSubmit = (e) => {
    //sayfanın yenilenmesini engeller.  e.preventDefault();
    e.preventDefault();
    //if (bookName === "") return; //input içi boş ise hiç birşey çalıştırma oyüzden return yazarız sadece
    //ya da  if (!bookName) return; böyle yaz.!bookName demek içi boş null demek
    if (!bookName) {
      //bildirim verme
      toast.warn("lütfen kitap ismi giriniz", { autoClose: 2500 });
      return; //fonksiyonu durudurur.
    }

    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    setBooks([...books, newBook]);
    setBookName("");
    toast.success("kitap eklendi", { autoClose: 3000 });
  };
  //modalı ele alma
  const handleModal = (id) => {
    setDeletId(id);
    setShowConfirm(true);
  };

  const handleDelete = (deletingId) => {
    const filtered = books.filter((item) => item.id !== deletingId);
    setBooks(filtered);
    //bildirim vermek için toastify kullanılır.
    toast.error("kitap silindi", { autoClose: 3000 });
  };

  const handleRead = (book) => {
    const updateBook = { ...book, isRead: !book.isRead };
    const cloneBooks = [...books];
    const index = books.findIndex((item) => item.id === book.id);

    cloneBooks.splice(index, 1, updateBook);
    console.log(cloneBooks);
    setBooks(cloneBooks);
  };
  const handleEditBook = () => {
    const index = books.findIndex((book) => book.id === editItem.id);
    const cloneBooks = [...books];
    cloneBooks.splice(index, 1, editItem);
    setBooks(cloneBooks);
    //modalı kapat
    setShowEditModal(false);
  };
  return (
    <div>
      <div className="bg-dark text-light px-5 py-2 fs-5 text-center">
        Kitap Kurdu
      </div>
      <div className="container border">
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        <div className="d-flex flex-column gap-3 py-5">
          {books.length === 0 && <h4>Henüz herhangi bir kitap eklenmedi</h4>}
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleModal={handleModal}
              handleRead={handleRead}
              setShowEditModal={setShowEditModal}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
      {/*modalı tanımlama */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner shadow">
            <h5>Silmek istiyor musunuz</h5>
            <button
              className=" btn btn-warning"
              onClick={() => setShowConfirm(false)}
            >
              Vazgeç
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(deleteId);
                setShowConfirm(false);
              }}
            >
              Onayla
            </button>
          </div>
        </div>
      )}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setEditItem={setEditItem}
          editItem={editItem}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}
export default App;

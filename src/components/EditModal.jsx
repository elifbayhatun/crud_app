const EditModal = ({
  setShowEditModal,
  setEditItem,
  editItem,
  handleEditBook,
}) => {
  //kaydet butonuna basınca çalışır.
  const handleSave = () => {
    //kitabı güncelle

    setShowEditModal(false);
  };
  return (
    <div className="confirm-modal">
      <div className="modal-inner">
        <h5>Kitap İsmini Düzenleyin</h5>
        <input
          value={editItem.title}
          type="text"
          className="form-control shadow"
          onChange={(e) =>
            setEditItem({
              ...editItem,
              title: e.target.value,
              date: new Date().toLocaleString(),
            })
          }
        />
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-warning"
            onClick={() => setShowEditModal(false)}
          >
            Vazgeç
          </button>
          <button className="btn btn-success" onClick={handleEditBook}>
            {" "}
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

import React, { useState, useEffect } from "react";
import api from "../../api";
import { FaPlus } from "react-icons/fa";
import Create from "../form/video/create"; // Ganti dengan form create video
import Update from "../form/video/update"; // Ganti dengan form update video
import Delete from "../form/video/delete"; // Ganti dengan form delete video

const Video = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    api.get("/videos") // Endpoint video
      .then((response) => {
        setData(response.data); // Ganti dengan data yang sesuai
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleOpenUpdateModal = (row) => {
    setCurrentData(row);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowUpdateModal(false);
    setDataToDelete(null);
    setCurrentData(null);
  };

  const handleOpenDeleteModal = (videoId) => {
    setDataToDelete(videoId);
  };

  const handleSubmitCreate = (formData) => {
    setLoading(true);

    api.post("/video/create", formData) // Endpoint untuk create video
      .then((response) => {
        setData([...data, response.data.data]);
        setShowCreateModal(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setLoading(false);
      });
  };

  const handleSubmitUpdate = (formData) => {
    setLoading(true);

    api.post(`/video/update/${currentData.id}`, formData) // Endpoint untuk update video
      .then((response) => {
        const updatedData = data.map((item) =>
          item.id === currentData.id ? response.data.data : item
        );
        setData(updatedData);
        setShowUpdateModal(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating form:", error);
        setLoading(false);
      });
  };

  const handleDelete = async () => {
    setLoading(true);

    if (dataToDelete) {
      try {
        await api.delete(`/video/delete/${dataToDelete}`); // Endpoint untuk delete video
        setData(data.filter((item) => item.id !== dataToDelete));
        setDataToDelete(null);
        setLoading(false);
      } catch (error) {
        console.error("Error deleting item:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="bg-white w-full max-w-full mx-auto rounded-lg shadow-lg p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">Data Video</h1>
          <button
            onClick={handleOpenCreateModal}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FaPlus className="inline-block mr-2 mb-1" /> Create Artikel
          </button>
        </div>

        <div className="overflow-x-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium">No</th>
                <th className="px-6 py-3 text-left font-medium">Kategori</th>
                <th className="px-6 py-3 text-left font-medium">Link</th>
                <th className="px-6 py-3 text-left font-medium">Judul</th>
                <th className="px-6 py-3 text-left font-medium">Deskripsi</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{row.kategori}</td>
                    <td className="px-6 py-4">{row.link}</td>
                    <td className="px-6 py-4">{row.judul}</td>
                    <td className="px-6 py-4">{row.dekskripsi}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleOpenUpdateModal(row)}
                        className="bg-teal-500 text-white py-1 px-3 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(row.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                    No videos available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <Create
          onSubmit={handleSubmitCreate}
          onClose={handleCloseModal}
          loading={loading}
        />
      )}

      {showUpdateModal && (
        <Update
          onSubmit={handleSubmitUpdate}
          onClose={handleCloseModal}
          initialData={currentData}
          loading={loading}
        />
      )}

      <Delete
        isOpen={dataToDelete !== null}
        onClose={handleCloseModal}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default Video;

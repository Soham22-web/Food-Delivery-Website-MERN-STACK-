import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch list of food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching list");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Remove food with confirmation
  const removeFood = async (foodId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return; // exit if user cancels

    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message || "Removed");
        fetchList(); // refresh list
      } else {
        toast.error(response.data.message || "Remove failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Remove failed");
    }
  };

  // EDIT popup state
  const [editPopup, setEditPopup] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const openEdit = (item) => {
    setEditData({
      _id: item._id,
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "",
    });
    setEditPopup(true);
  };

  const updateFood = async () => {
    try {
      const response = await axios.patch(`${url}/api/food/update`, editData);
      if (response.data.success) {
        toast.success(response.data.message || "Updated");
        setEditPopup(false);
        fetchList();
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Food List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
          <div className="list-table-format" key={item._id}>
            <img src={`${url}/uploads/${item.image}`} alt={item.name} />

            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>

            <div className="actions">
              <button className="edit-btn" onClick={() => openEdit(item)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => removeFood(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editPopup && (
        <div className="edit-modal">
          <div className="edit-box">
            <h3>Edit Food</h3>

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <label>Description</label>
            <input
              type="text"
              name="description"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />

            <label>Price</label>
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
            />

            <label>Category</label>
            <input
              type="text"
              name="category"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
            />

            <div className="edit-actions">
              <button
                className="cancel-btn"
                onClick={() => setEditPopup(false)}
              >
                Cancel
              </button>
              <button className="update-btn" onClick={updateFood}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

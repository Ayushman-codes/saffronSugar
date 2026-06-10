// src/pages/Admin.jsx
import { useState, useContext } from 'react';
import { LayoutDashboard, Package, ShoppingBag, PlusCircle, Trash2 } from 'lucide-react';
import { MenuContext } from '../context/MenuContext';
import { toast } from 'react-toastify'; // Import toast

export default function Admin() {
  const { menuItems, addMenuItem, deleteMenuItem } = useContext(MenuContext);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    image: '' // Start with an empty image
  });

  // --- NEW: Convert uploaded file to Base64 string so it can be saved ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is too large (LocalStorage has a ~5MB limit)
      if (file.size > 2 * 1024 * 1024) { 
        toast.error("File is too large. Please choose an image under 2MB.");
        e.target.value = ''; // Reset input
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newItem.image) {
      toast.error("Please upload a cake image first!");
      return;
    }
    
    addMenuItem({
      name: newItem.name,
      price: parseFloat(newItem.price),
      description: newItem.description,
      image: newItem.image
    });

    setNewItem({ name: '', price: '', description: '', image: '' });
    e.target.reset(); // Clears the file input field visually
    
    setSuccessMessage('Cake added to menu successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="text-amber-600 dark:text-amber-400" size={32} />
        <h1 className="text-3xl font-bold text-amber-900 dark:text-white">Admin Dashboard</h1>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            {/* <div>
              <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Total Revenue</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">₹8,400.00</h3>
            </div> */}
            <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg">
              <ShoppingBag className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Total Menu Items</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{menuItems.length}</h3>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg">
              <Package className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Menu Item Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700 overflow-hidden mb-12">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-amber-50/50 dark:bg-slate-800/50 flex items-center gap-2">
           <PlusCircle className="text-amber-600 dark:text-amber-400" size={20} />
           <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Cake to Menu</h2>
        </div>
        
        <div className="p-6">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg font-medium border border-green-200 dark:border-green-800">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Cake Name</label>
                <input 
                  type="text" 
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full border border-gray-300 dark:border-slate-600 bg-transparent dark:text-white rounded-lg p-3"
                  placeholder="e.g. Vanilla Bean Delight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Price (₹)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="w-full border border-gray-300 dark:border-slate-600 bg-transparent dark:text-white rounded-lg p-3"
                  placeholder="e.g. 500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
              <textarea 
                required
                rows="3"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                className="w-full border border-gray-300 dark:border-slate-600 bg-transparent dark:text-white rounded-lg p-3"
                placeholder="Describe the flavor, layers, and frosting..."
              ></textarea>
            </div>

            {/* --- NEW: Image Upload Field --- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Upload Image</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 dark:border-slate-600 bg-transparent dark:text-white rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 dark:file:bg-slate-700 dark:file:text-amber-400 cursor-pointer"
                />
                {newItem.image && (
                  <img 
                    src={newItem.image} 
                    alt="Preview" 
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm"
                  />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *Upload a square image under 2MB for the best results.
              </p>
            </div>

            <button 
              type="submit" 
              className="bg-amber-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-700 transition shadow-sm"
            >
              Add Item to Menu
            </button>
          </form>
        </div>
      </div>

      {/* Manage Menu Items Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700 overflow-hidden mb-12">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-amber-50/50 dark:bg-slate-800/50">
           <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Existing Menu</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">₹{Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteMenuItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition cursor-pointer"
                  title="Delete Cake"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            
            {menuItems.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">No cakes currently in the menu.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
/**
 * QR Studio Storage Manager
 * Handles local history, star favorites, export/import
 */

const STORAGE_KEY = 'phongdang_qr_history_v1';
const MAX_HISTORY_ITEMS = 50;

export const StorageManager = {
  /**
   * Get all history items
   */
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error reading QR history:', err);
      return [];
    }
  },

  /**
   * Save a new QR item to history
   */
  save(item) {
    try {
      const history = this.getAll();
      const newItem = {
        id: item.id || 'qr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        createdAt: item.createdAt || new Date().toISOString(),
        title: item.title || 'Mã QR mới',
        type: item.type || 'url',
        data: item.data || {},
        styleConfig: item.styleConfig || {},
        thumbnail: item.thumbnail || '',
        isStarred: item.isStarred || false
      };

      // Check if duplicate content exists, if so update it
      const existingIndex = history.findIndex(h => 
        h.type === newItem.type && 
        JSON.stringify(h.data) === JSON.stringify(newItem.data)
      );

      if (existingIndex >= 0) {
        history[existingIndex] = {
          ...history[existingIndex],
          ...newItem,
          createdAt: new Date().toISOString()
        };
      } else {
        history.unshift(newItem);
      }

      // Limit max items
      const trimmed = history.slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      return newItem;
    } catch (err) {
      console.error('Error saving QR item:', err);
      return null;
    }
  },

  /**
   * Toggle star favorite
   */
  toggleStar(id) {
    try {
      const history = this.getAll();
      const target = history.find(item => item.id === id);
      if (target) {
        target.isStarred = !target.isStarred;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return target.isStarred;
      }
    } catch (err) {
      console.error('Error toggling star:', err);
    }
    return false;
  },

  /**
   * Delete single history item
   */
  delete(id) {
    try {
      const history = this.getAll().filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      return true;
    } catch (err) {
      console.error('Error deleting QR item:', err);
      return false;
    }
  },

  /**
   * Clear all non-starred history
   */
  clear(clearStarred = false) {
    try {
      if (clearStarred) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        const history = this.getAll().filter(item => item.isStarred);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      }
      return true;
    } catch (err) {
      console.error('Error clearing history:', err);
      return false;
    }
  },

  /**
   * Export history as JSON
   */
  exportJSON() {
    const history = this.getAll();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', `phongdang-qr-history-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  },

  /**
   * Import history from JSON string
   */
  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        const existing = this.getAll();
        const merged = [...parsed, ...existing];
        // Deduplicate by ID
        const unique = Array.from(new Map(merged.map(item => [item.id || item.createdAt, item])).values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unique.slice(0, MAX_HISTORY_ITEMS)));
        return true;
      }
    } catch (err) {
      console.error('Error importing history JSON:', err);
    }
    return false;
  }
};

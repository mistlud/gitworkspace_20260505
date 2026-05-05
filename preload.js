const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  folder: {
    list: () => ipcRenderer.invoke('folder:list'),
    create: (name) => ipcRenderer.invoke('folder:create', name),
    rename: (oldName, newName) => ipcRenderer.invoke('folder:rename', { oldName, newName }),
    delete: (name) => ipcRenderer.invoke('folder:delete', name)
  },
  memo: {
    list: (folder) => ipcRenderer.invoke('memo:list', folder),
    read: (folder, name) => ipcRenderer.invoke('memo:read', { folder, name }),
    save: (folder, name, content) => ipcRenderer.invoke('memo:save', { folder, name, content }),
    rename: (folder, oldName, newName) => ipcRenderer.invoke('memo:rename', { folder, oldName, newName }),
    delete: (folder, name) => ipcRenderer.invoke('memo:delete', { folder, name })
  }
})

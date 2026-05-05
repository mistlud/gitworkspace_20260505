const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const isDev = !app.isPackaged
let memosRoot

function getMemosRoot() {
  if (!memosRoot) {
    memosRoot = path.join(app.getPath('userData'), 'memos')
    if (!fs.existsSync(memosRoot)) fs.mkdirSync(memosRoot, { recursive: true })
  }
  return memosRoot
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Folder IPC
ipcMain.handle('folder:list', () => {
  const root = getMemosRoot()
  return fs.readdirSync(root, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
})

ipcMain.handle('folder:create', (_, name) => {
  fs.mkdirSync(path.join(getMemosRoot(), name))
  return true
})

ipcMain.handle('folder:rename', (_, { oldName, newName }) => {
  const root = getMemosRoot()
  fs.renameSync(path.join(root, oldName), path.join(root, newName))
  return true
})

ipcMain.handle('folder:delete', (_, name) => {
  fs.rmSync(path.join(getMemosRoot(), name), { recursive: true })
  return true
})

// Memo IPC
ipcMain.handle('memo:list', (_, folder) => {
  const folderPath = path.join(getMemosRoot(), folder)
  return fs.readdirSync(folderPath)
    .filter(f => f.endsWith('.md'))
    .map(f => f.slice(0, -3))
})

ipcMain.handle('memo:read', (_, { folder, name }) => {
  const filePath = path.join(getMemosRoot(), folder, `${name}.md`)
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : ''
})

ipcMain.handle('memo:save', (_, { folder, name, content }) => {
  fs.writeFileSync(path.join(getMemosRoot(), folder, `${name}.md`), content, 'utf-8')
  return true
})

ipcMain.handle('memo:rename', (_, { folder, oldName, newName }) => {
  const root = getMemosRoot()
  fs.renameSync(
    path.join(root, folder, `${oldName}.md`),
    path.join(root, folder, `${newName}.md`)
  )
  return true
})

ipcMain.handle('memo:delete', (_, { folder, name }) => {
  fs.unlinkSync(path.join(getMemosRoot(), folder, `${name}.md`))
  return true
})

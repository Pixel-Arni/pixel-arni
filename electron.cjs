const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV !== 'production'

function createWindow() {
  // Hauptfenster erstellen
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets/icon.png'), // Optional: App-Icon
    show: false // Fenster erst zeigen wenn bereit
  })

  // React-App laden
  const startUrl = isDev
    ? 'http://localhost:5174'
    : `file://${path.join(__dirname, '../dist/index.html')}`
 
  mainWindow.loadURL(startUrl)

  // Fenster zeigen wenn bereit
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // DevTools in Entwicklung öffnen
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

// App ist bereit
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Alle Fenster geschlossen
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
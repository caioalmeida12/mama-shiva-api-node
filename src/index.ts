import { App } from './app'
import networkInterfaces from './lib/networkinterfaces'

// Server port
const PORT = 5000

// Start server
new App().server.listen(PORT)

for (const ipAddress of networkInterfaces) {
  console.log(`Servidor rodando em http://${ipAddress}:${PORT}`)
}

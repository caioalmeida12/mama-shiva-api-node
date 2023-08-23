import Os from 'os'

// Reading network interfaces and showing them
const ifaces = Object.values(Os.networkInterfaces()).map((iface) => {
  if (iface != null) return iface
  return []
})

const networkInterfaces = ifaces
  .flat()
  .filter((iface) => iface.family === 'IPv4')
  .map((iface) => iface.address)

export default networkInterfaces

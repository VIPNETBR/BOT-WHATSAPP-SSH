
const fs = require('fs')
const { appLink } = require('./config')

function formatearEntrega(linea) {
  const [user, pass, limit] = linea.split(':')
  const now = new Date()
  now.setDate(now.getDate() + 31) // duración fija de 31 días por ahora
  const vencimiento = now.toLocaleDateString('es-ES')

  return `✅ PAGO CONFIRMADO !\n\n` +
         `🧩ACCESO CREADO CON ÉXITO ✅\n\n` +
         `👤USUARIO: ${user}\n` +
         `🔐CONTRASEÑA: ${pass}\n` +
         `📲LÍMITE: ${limit || 1}\n` +
         `🗓️VENCIMIENTO: ${vencimiento}\n\n` +
         `📥 APLICACIÓN: ${appLink}`
}

function entregarCuenta() {
  const path = 'cuentas.txt'
  if (!fs.existsSync(path)) return null
  const cuentas = fs.readFileSync(path, 'utf8').split('\n').filter(Boolean)
  if (cuentas.length === 0) return null
  const cuenta = cuentas[0]
  fs.writeFileSync(path, cuentas.slice(1).join('\n'))
  return formatearEntrega(cuenta)
}

module.exports = entregarCuenta
